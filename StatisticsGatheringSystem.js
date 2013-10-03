var TeamLists = new Meteor.Collection("teamlists");
var Rosters = new Meteor.Collection("rosters");
var Games = new Meteor.Collection("games");

  if (Meteor.isClient) {
    Meteor.subscribe('all-teamlists', function() {
      if (!Session.get('teamlist_id')) {
        var teamlist = TeamLists.findOne({}, {sort: {name: 1}});
      if (teamlist)
        Router.setList(teamlist._id);
		}
  });
  Meteor.subscribe('all-rosters', function() {
    var teamlist_id = Session.get('teamlist_id');
		if (teamlist_id)
		  Meteor.subscribe('rosters', teamlist_id);
  });

  Meteor.subscribe('all-games');
  
  
/*	TEAM TAB	
============================================= */

	// ID of currently selected teamlist
	Session.set('teamlist_id', null);
	Session.set('teamlist_id_A', null);
	Session.set('teamlist_id_B', null);

	// When editing a teamlist name, ID of the teamlist
	Session.set('editing_teamlistname', null);

	// When editing player text, ID of the player
	Session.set('editing_playername', null);


	
	////////// Helpers for in-place editing //////////
	// Returns an event map that handles the "escape" and "return" keys and
	// "blur" events on a text input (given by selector) and interprets them
	// as "ok" or "cancel".
	var okCancelEvents = function (selector, callbacks) {
	  	var ok = callbacks.ok || function () {};
	  	var cancel = callbacks.cancel || function () {};
	
	  	var events = {};
	  	events['keyup '+selector+', keydown '+selector+', focusout '+selector] = function (evt) {
	  		if (evt.type === "keydown" && evt.which === 27) {
	        // escape = cancel
	        cancel.call(this, evt);
	      } else if (evt.type === "keyup" && evt.which === 13 || evt.type === "focusout") {
	        // blur/return/enter = ok/submit if non-empty
	        var value = String(evt.target.value || "");
	        if (value)
	          ok.call(this, value, evt);
	        else
	          cancel.call(this, evt);
	      }
	    };
	  return events;
	};
	
	var activateInput = function (input) {
	  input.focus();
	  input.select();
	};
	
	////////// TeamLists //////////
	Template.TeamLists.teamlists = function () {
	  return TeamLists.find();
	  //return TeamLists.find({}, {sort: {name: 1}});
	};
	
	Template.TeamLists.events({
	  'mousedown .list': function (evt) { // select list
      Router.setList(this._id);
	  },
	  'click .list': function (evt) {
	    // prevent clicks on <a> from refreshing the page.
	    evt.preventDefault();
	  },
	  'dblclick .list': function (evt, tmpl) { // start editing list name
	    Session.set('editing_teamlistname', this._id);
	    Meteor.flush(); // force DOM redraw, so we can focus the edit field
	    activateInput(tmpl.find("#list-name-input"));
	  },
	  'click .destroy_team': function () {
	    rmv = confirm('ロスター情報も削除されますがよろしいですか？');
	    if(rmv == true) {
	      TeamLists.remove(this._id);
	      Rosters.remove({teamlist_id:this._id}); 
	    }
	  }
	});
	
	
	// Attach events to keydown, keyup, and blur on "New list" input box.
	Template.TeamLists.events(okCancelEvents(
	  '#new-list',
	  {
	    ok: function (text, evt) {
	      var id = TeamLists.insert({teamname: text});
	      Router.setList(id);
	      evt.target.value = "";
	    }
	  }));
	
	Template.TeamLists.events(okCancelEvents(
	  '#list-name-input',
	  {
	    ok: function (value) {
	      TeamLists.update(this._id, {$set: {teamname: value}});
	      Session.set('editing_teamlistname', null);
	    },
	    cancel: function () {
	      Session.set('editing_teamlistname', null);
	    }
	  }));
	
	Template.TeamLists.selected = function () {
	  return Session.equals('teamlist_id', this._id) ? 'selected' : '';
	};
	
	Template.TeamLists.name_class = function () {
	  return this.teamname ? '' : 'empty';
	};
	
	Template.TeamLists.editing = function () {
	  return Session.equals('editing_teamlistname', this._id);
	};

	////////// Roster //////////
	Template.Rosters.any_list_selected = function () {
		return !Session.equals('teamlist_id', null);
	};
	
	Template.Rosters.events({
	  'click input.Add': function () {
			var num = $('#new-num').val();
			var playername = $('#new-name').val();
			Rosters.insert({
				teamlist_id: Session.get('teamlist_id'),
				num: num,
				playername: playername,
				threePOK: 0, 
    			threePNG: 0,  
    			twoPOK: 0, 
    			twoPNG: 0, 
    			ftOK: 0, 
    			ftNG: 0, 
    			offREB: 0, 
    			dffREB: 0, 
    			TO: 0, 
    			ST: 0, 
    			BS: 0, 
    			AS: 0, 
    			FOUL: 0, 
    			playTIME: 0, 
    			onCoat: false	
			});
			$('#new-num').val('');
			$('#new-name').val('');
		}
	});
	
	Template.Rosters.rosters = function () {
		var teamlist_id = Session.get('teamlist_id');
		if (!teamlist_id)
	    	return {};
	    
	    var sel = {teamlist_id: teamlist_id};
	    return Rosters.find(sel, {sort: {num: 1}});
	};
	
	Template.Roster_Player.editing = function () {
	  return Session.equals('editing_playername', this._id);
	};
	
	Template.Roster_Player.events({
	
	  'click .destroy': function () {
	    Rosters.remove(this._id);
	  },
	
	  'dblclick .display .player-text': function (evt, tmpl) {
	    Session.set('editing_playername', this._id);
	    Meteor.flush(); // update DOM before focus
	    activateInput(tmpl.find("#player-input"));
	  },
	});
	
	Template.Roster_Player.events(okCancelEvents(
	  '#player-input',
	  {
	    ok: function (value) {
	      Rosters.update(this._id, {$set: {text: value}});
	      Session.set('editing_playername', null);
	    },
	    cancel: function () {
	      Session.set('editing_playername', null);
	    }
	}));
	
	////////// Tracking selected list in URL //////////

	var RostersRouter = Backbone.Router.extend({
	  	routes: {
	    	":teamlist_id": "main"
	    },  
	    main: function (teamlist_id) {
	    	Session.set("teamlist_id", teamlist_id);
	    },
	    setList: function (teamlist_id) {
	    	this.navigate(teamlist_id, true);
	    }
	});
	
	Router = new RostersRouter;
	
	Meteor.startup(function () {
		Backbone.history.start({pushState: true});
	});

	/****************************************************************************
		GAME Management Tab	
	*****************************************************************************/
	///////////////// Create New Game /////////////////
	Template.createnewgame.events({
		'click #save': function (event, template) {
			var gamenum = template.find(".gamenum").value;
			
			//ダブルクリックされたチームの_idを取得
			var teamA_id = Session.get('dblclicked_team_A')
			var teamB_id = Session.get('dblclicked_team_B')
			
			var teamA = TeamLists.findOne({_id: teamA_id});
			var teamB = TeamLists.findOne({_id: teamB_id});
						
			if (gamenum.length && teamA.teamname.length && teamB.teamname.length) {
				Games.insert({
					gamelist_id : Session.get(this._id),
					gamenum: gamenum,
					teamA_name : teamA.teamname,
					teamB_name : teamB.teamname,
					teamA_id: teamA_id,
					teamB_id: teamB_id,
				});
			//modal を閉じる
			$('#newgame').modal('hide');
			} else {
				alert("入力不備！！");
			}	
		}
	});
	
	Template.createnewgame.error = function () {
		return Session.get("createError");
	};
	
	Template.teamA.teamlists = function () {
		return TeamLists.find({}, {sort: {teamname: 1}});
	};
	
	Template.teamB.teamlists = function () {
		return TeamLists.find({}, {sort: {teamname: 1}});
	};
	
	Template.teamA.dblclicked = function () {
		return Session.equals("dblclicked_team_A", this._id) ? "dblclicked" : '';
	};
	
	Template.teamA.events({
		//ダブルクリックされたチームのIDを取得
		'dblclick': function () {
			Session.set("dblclicked_team_A", this._id);
		}
	});
	
	Template.teamB.dblclicked = function () {
		return Session.equals("dblclicked_team_B", this._id) ? "dblclicked" : '';
	};
	
	Template.teamB.events({
		//ダブルクリックされたチームのIDを取得
		'dblclick': function () {
			Session.set("dblclicked_team_B", this._id);
		}
	});
	
	///////////////// Game Lists /////////////////
	///////////////// On Game View /////////////////
	Template.gamelists.games = function () {
		return Games.find({}, {sort: {gamenum: 1}});
	};
	
	Template.gamelists.events({
		  'click .destroy': function () {
		    Games.remove(this._id);
		  },
	});
	

	
	Template.gamelists.dblclicked = function () {
		return Session.equals("onGame_id", this._id) ? "dblclicked" : '';
	};
	
	//グローバル変数の定義
	var ongamenum = null;
	var ongame_teamA_id = null;
	var ongame_teamA_name = null;
	var ongame_teamB_id = null;
	var ongame_teamB_name = null;
	
	
	//ブラウザリロード時にmodalを消す
	Session.set('showOnGameModal', null);
	
	Template.gamelists.events({
		//ゲームリストのdivをダブルクリックした時の処理
		'dblclick': function () {
			Session.set("ongame_id", this._id);

			var ongame_id = Session.get("ongame_id");
			var onGameData = Games.findOne({_id: ongame_id});
			
			//onGame情報の書き換え
			ongamenum = onGameData.gamenum;
			ongame_teamA_id = onGameData.teamA_id;
			ongame_teamA_name = onGameData.teamA_name;
			ongame_teamB_id = onGameData.teamB_id;
			ongame_teamB_name = onGameData.teamB_name;
			
			openOnGameModal();
		}
	});

	// Create Party dialog
	var openOnGameModal = function () {
	  Session.set("showOnGameModal", true);
	};
	
	Template.Game.showOnGameModal = function () {
	  	return Session.get("showOnGameModal");
	};
	
	Template.ongamemodal.events({
	  //×ボタンをクリックするとウインドウを閉じる
	  'click button.close': function () {
	  	Session.set("showOnGameModal", false);
	  }
	});
	
	Template.ongamemodal.gamenum = function () {
		if(ongamenum) 
			return ongamenum;
	};
	
	Template.ongamemodal.teamA_name = function () {
		if(ongame_teamA_name)
			return ongame_teamA_name;
	};
	
	Template.ongamemodal.teamB_name = function () {
		if(ongame_teamB_name)
			return ongame_teamB_name;
	};
	
	
	////////////// ongame_teamA ///////////////////
	
	Template.ongame_teamA.rosters = function () {
		if (!ongame_teamA_id)
			return {};
		
		var sel = {teamlist_id: ongame_teamA_id};
		return Rosters.find(sel, {sort: {num: 1}});
	};
	
	
	//TEAM1のonCoat要素がtrueのものだけを表示する
	Template.onCoatPlayerA.oncoat = function () {
		//find [ ongame_teamA_id and onCoat is true ] in 〇〇
		var sel = {teamlist_id: ongame_teamA_id, onCoat: "true"};
	    return Rosters.find(sel, {sort: {num: 1}});
	};
	
	////////////// ongame_teamB ///////////////////
	
	Template.ongame_teamB.rosters = function () {
		if (!ongame_teamB_id)
			return {};
		
		var sel = {teamlist_id: ongame_teamB_id};
		return Rosters.find(sel, {sort: {num: 1}});
	};
	
	
	//TEAM1のonCoat要素がtrueのものだけを表示する
	Template.onCoatPlayerB.oncoat = function () {
		var sel = {teamlist_id: ongame_teamB_id, onCoat: "true"};
	    return Rosters.find(sel, {sort: {num: 1}});
	};
	
	
	
	Template.onCoatPlayerNumA.selected = function () {
		//セッションを比較して真ならselected、偽なら''
		return Session.equals("selected_player", this._id) ? "selected" : '';
	};
	
	Template.onCoatPlayerNumA.events({
		'click': function () {
			Session.set("selected_player", this._id);
		},
		'dblclick': function () {
			Session.set("selected_player", this._id);
			//selected_playerのonCoatをfalseにかえる。i.e.表示から消える
			Rosters.update(Session.get("selected_player"), {$unset: {onCoat:"true"}});
			Rosters.update(Session.get("selected_player"), {$set: {onCoat:"false"}});
		}
	});

	Template.rosterviewA.dblclicked = function () {
	  	return Session.equals("dblclicked_player", this._id) ? "dblclicked" : '';  
	};
	    
	Template.rosterviewA.events({
		'dblclick': function () {
	 		Session.set("dblclicked_player", this._id);
			//もしdblclicked_playerのonCoatがfalseならばtrueにかえる
	    	Rosters.update(Session.get("dblclicked_player"), {$unset: {onCoat:"false"}});
			Rosters.update(Session.get("dblclicked_player"), {$set: {onCoat:"true"}});
	   	}
	});	
	
	
	
	
	Template.onCoatPlayerNumB.selected = function () {
		//セッションを比較して真ならselected、偽なら''
		return Session.equals("selected_player", this._id) ? "selected" : '';
	};
	
	Template.onCoatPlayerNumB.events({
		'click': function () {
			Session.set("selected_player", this._id);
		},
		'dblclick': function () {
			Session.set("selected_player", this._id);
			//selected_playerのonCoatをfalseにかえる。i.e.表示から消える
			Rosters.update(Session.get("selected_player"), {$unset: {onCoat:"true"}});
			Rosters.update(Session.get("selected_player"), {$set: {onCoat:"false"}});
		}
	});

	Template.rosterviewB.dblclicked = function () {
	  	return Session.equals("dblclicked_player", this._id) ? "dblclicked" : '';  
	};
	    
	Template.rosterviewB.events({
		'dblclick': function () {
	 		Session.set("dblclicked_player", this._id);
			//もしdblclicked_playerのonCoatがfalseならばtrueにかえる
	    	Rosters.update(Session.get("dblclicked_player"), {$unset: {onCoat:"false"}});
			Rosters.update(Session.get("dblclicked_player"), {$set: {onCoat:"true"}});
	   	}
	});	
	
	/******************************
		statistics
	******************************/	
	
	Template.statistics.rosters = function () {
	    return Rosters.find({teamlist_id: ongame_teamA_id}, {sort: {num: 1}});
	};
	

	/******************************
		button template
	******************************/
		Template.button.events({
	'click input.3POK': function () {
		Rosters.update(Session.get("selected_player"), {$inc: {threePOK: 1}});
	},
	'click input.3PNG': function () {
	 	Rosters.update(Session.get("selected_player"), {$inc: {threePNG: 1}});
	},
	'click input.2POK': function () {
	 	Rosters.update(Session.get("selected_player"), {$inc: {twoPOK: 1}});
	},
	'click input.2PNG': function () {
	    Rosters.update(Session.get("selected_player"), {$inc: {twoPNG: 1}});
	},
	'click input.TFOK': function () {
		Rosters.update(Session.get("selected_player"), {$inc: {ftOK: 1}});
	},
	'click input.TFNG': function () {
	 	Rosters.update(Session.get("selected_player"), {$inc: {ftNG: 1}});
	},
	'click input.OFFREB': function () {
		Rosters.update(Session.get("selected_player"), {$inc: {offREB: 1}});
	},
	'click input.DFFREB': function () {
	  	Rosters.update(Session.get("selected_player"), {$inc: {dffREB: 1}});
	},
	'click input.TO': function () {
		Rosters.update(Session.get("selected_player"), {$inc: {TO: 1}});
	},
	'click input.ST': function () {
	 	Rosters.update(Session.get("selected_player"), {$inc: {ST: 1}});
	},
	'click input.BS': function () {
	 	Rosters.update(Session.get("selected_player"), {$inc: {BS: 1}});
	},
	'click input.AS': function () {
		Rosters.update(Session.get("selected_player"), {$inc: {AS: 1}});
	},
	'click input.FOUL': function () {
	  	Rosters.update(Session.get("selected_player"), {$inc: {FOUL: 1}});
	}
	
	});
 
}





if (Meteor.isServer) {
	//データ公開制限
	Meteor.publish("all-teamlists", function(){
  	return TeamLists.find();
	});
	Meteor.publish("all-rosters", function(){
  	return Rosters.find();
	});
	Meteor.publish("all-games", function(){
  	return Games.find();
	});
	
	//データ操作制限
  TeamLists.allow({
    insert: function(userId, doc) {
      return true;
    },
    update: function(userId, docs, fields, modifier) {
      return true;         
    },
    remove: function(userId, docs) {
      return true;
    },
    fetch: undefined
  });
  Rosters.allow({
    insert: function(userId, doc) {
      return true;
    },
    update: function(userId, docs, fields, modifier) {
      return true;         
    },
    remove: function(userId, docs) {
      return true;
    },
    fetch: undefined
  });
  Games.allow({
    insert: function(userId, doc) {
      return true;
    },
    update: function(userId, docs, fields, modifier) {
      return true;         
    },
    remove: function(userId, docs) {
      return true;
    },
    fetch: undefined
  });
	
	//初期化
	Meteor.startup(function () {
    // if the database is empty on server start, create some sample data.
    if (TeamLists.find().count() === 0) {
    	var data = [
    		{teamname: "Tech West",
	    		contents: [
	    			["4", "Steven Jobs"],
	    			["5", "Steve Ballmer"],
	    			["8", "Jeffrey Bezos"],
	    			["14", "William Gates"],
	    			["17", "Dennis Crowley"],
	    			["22", "Macs Revtin"],
	    			["23", "Elon Musk"],
	    			["34", "Mike Dell"],
	    			["55", "Tony Hsieh"],
	    			["94", "Mark Zuckerberg"]
				 ]
			},
	  
			{teamname: "Tech East",
				contents: [
					["6", "Masa Son"],
					["9", "Hiroyuki Nishimura"],
					["13", "Hiroshi Mikitani"],
					["27", "Tomoko Namba"],
					["31", "Yoshikaz Tanaka"],
					["48", "Susumu Fujita"],
					["77", "John Warnock"],
					["69", "Japanet Takata"],
					["84", "Dick Costolo"],
					["99", "Jimmy Wales"]
				]
			}
		];

    for (var i = 0; i < data.length; i++) {
    	var teamlist_id = TeamLists.insert({teamname: data[i].teamname});
    	for (var j = 0; j < data[i].contents.length; j++) {
        	var info = data[i].contents[j];
        	Rosters.insert({
				teamlist_id: teamlist_id,
				num: info[0],  
				playername: info[1],
				threePOK: 0, 
    			threePNG: 0,  
    			twoPOK: 0, 
    			twoPNG: 0, 
    			ftOK: 0, 
    			ftNG: 0, 
    			offREB: 0, 
    			dffREB: 0, 
    			TO: 0, 
    			ST: 0, 
    			BS: 0, 
    			AS: 0, 
    			FOUL: 0, 
    			playTIME: 0, 
    			onCoat: false
			});
		}
      }
    }
  });
}
