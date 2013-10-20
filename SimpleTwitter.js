if (Meteor.isClient) {
    // ①テンプレート関数の直接呼び出し
    // 初期化が完了したら
    Meteor.startup(function() {
        var header = Template.Header({
            dateTime: new Date
        });
        var playerList = Template.PlayerList({
            //name : Meteor.call('getUserName', 'Yutaro', 'Tanaka')
            name: "Yutaro"
        });
        document.body.innerHTML = header + playerList;
    });
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