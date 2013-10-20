if (Meteor.isClient) {
        Template.Header.dateTime = function() {
            return new Date;
        }
        Template.PlayerList.playerName = function() {
            return "Yutaro Tanaka";
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
                updateXXXX: function(firstName, lastName) {
                    
                }
            });
        }
    });
}