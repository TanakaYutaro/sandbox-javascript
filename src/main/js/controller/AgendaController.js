function AgendaController($scope) {
    $scope.agendas = [
        "hoge",
        "huga"
    ];


    $scope.addAgenda = function () {
        if ($scope.newAgenda) {
            $scope.agendas.push($scope.newAgenda);
            $scope.newAgenda = "";
        }
    };
}