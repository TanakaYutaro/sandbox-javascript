describe("TimerJS>", function () {
    var $injector;
    var controller;
    var scope;

    beforeEach(function () {
        $injector = angular.injector(["ngMock", "TimerJS"]);
    });
    beforeEach(module("TimerJS"));

    describe("AgendaController>", function () {
        it("メソッドAddAgendaのテスト", function () {
            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                controller = $controller("AgendaController", {$scope: scope});
            });

            // 値準備
            scope.agendas = [
                "hoge",
                "huga"
            ];
            scope.newAgenda = "hoge";

            // テスト対象実行
            scope.addAgenda();

            expect(scope.agendas.length).toEqual(3);
        });
    });
});