// コレクションの生成
var Players = new Meteor.Collection('players');
Meteor.subscribe('all-players');


Template.Header.dateTime = function () {
    return new Date;
};

Template.PlayerList.Players = function () {
    // コレクションの全データ
    return Players.find();
};

Template.PlayerList.events = {
    'click .plus_button': function () {
        Players.update(this._id, {
            $inc: {
                good: 1
            }
        });
    }
};