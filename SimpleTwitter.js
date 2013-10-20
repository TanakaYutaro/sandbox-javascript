(function() {

    // コレクションの生成
    var Players = new Meteor.Collection('players');

    //クライアント上でのみ動作する
    if (Meteor.isClient) {
        Template.Header.dateTime = function() {
            return new Date;
        };
        
        Template.PlayerList.Players = function() {
            // コレクションの全データ
            return Players.find();
        };
    }
    //サーバ上でのみ動作する
    if (Meteor.isServer) {
        // プロセスが開始したら呼び出される
        Meteor.startup(function() {
            if (Meteor.is_client) {
                console.log("クライアント初期化！");
            } else {
/*
                Meteor.methods({
                    updateXXXX: function(firstName, lastName) {}
                });
*/

                // 全データ消去
                Players.remove({});
                
                // データ生成
                var data = [
                  {playerName : 'たなか', age : 22, good : 0, bad : 0},
                  {playerName : 'もり', age : 22, good : 0, bad : 0},
                  {playerName : 'こいけ', age : 24, good : 0, bad : 0},
                  {playerName : 'こばやし', age : 22, good : 0, bad : 0}, 
                  {playerName : 'ばば', age : 26, good : 0, bad : 0}
                ];
                data.forEach(function(player) {
                  Players.insert(player);
                });
                
                console.log("サーバ初期化完了！");
            }
        });
    }
})();