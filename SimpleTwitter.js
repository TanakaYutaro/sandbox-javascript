var getPlayerName = function(firstName, lastName) {
        this.unblock();
        if (this.is_simulation) {
            // クライアントスタブ上での処理
            // 並列実行を許可する
            return firstName + " " + lastName;
        } else {
            // サーバ上で実行された際の処理
        }
}

if (Meteor.isClient) {
        Template.Header.dateTime = function() {
            return new Date;
        }
        Template.PlayerList.playerName = function() {
  //            return "Yutaro";
            return new getPlayerName('Yutaro', 'Tanaka');
        }
}

if (Meteor.isServer) {
    // プロセスが開始したら呼び出される
    Meteor.startup(function() {
        if (Meteor.is_client) {
            console.log("クライアント初期化！");
        } else {
            console.log("サーバ初期化！");
            // サーバ側をいじるためのメソッド！！！！！！！
            Meteor.methods({
                getPlayerName: function(firstName, lastName) {
                    this.unblock();
                    if (this.is_simulation) {
                        // クライアントスタブ上での処理
                        // 並列実行を許可する
                        return firstName + " " + lastName;
                    } else {
                        // サーバ上で実行された際の処理
                    }
                }
            });
        }
    });
}