// Meteorが初期化された際に一度だけ呼び出される
Meteor.startup(function () {

    var Players = new Meteor.Collection('players');

    // データ公開
    Meteor.publish('all-players', function () {
        return Players.find(); // 全データ公開
    });

    Players.allow({
        insert: function () {
            return true;
        },

        update: function () {
            return true;
        },

        remove: function () {
            return true;
        }
    });

    // 全データ消去
    Players.remove({});

    // データ生成
    var data = [{
        playerName: 'たなか',
        age: 22,
        good: 0
    }, {
        playerName: 'もり',
        age: 22,
        good: 0
    }, {
        playerName: 'こいけ',
        age: 24,
        good: 0
    }, {
        playerName: 'こばやし',
        age: 22,
        good: 0
    }, {
        playerName: 'ばば',
        age: 26,
        good: 0
    }];
    data.forEach(function (player) {
        Players.insert(player);
    });




    if (Meteor.is_client) {
        console.log("クライアント初期化！");
    } else {
        console.log("サーバ初期化完了！");
    }
});