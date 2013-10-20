if (Meteor.isClient) {
    // ②テンプレート関数の属性として定義
    Template.Header.dateTime = new Date;
    //Template.PlayerList.name = "Yutaro"; この書き方はだめ「name」
    Template.PlayerList.playerName = "Yutaro";
}

if (Meteor.isServer) {
    // プロセスが開始したら呼び出される
    Meteor.startup(function() {
        if (Meteor.is_client) {
            console.log("クライアント初期化！");
        } else {
            console.log("サーバ初期化！");
            Meteor.methods({
                getPlayerName: function(firstName, lastName) {
                    return firstName + " " + lastName;
                }
            });
        }
    });
}