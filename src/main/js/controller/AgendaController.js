function AgendaController($scope) {
    $scope.agendas = [
    ];


    $scope.addAgenda = function () {
        if ($scope.newAgenda) {
            $scope.agendas.push($scope.newAgenda);
            $scope.newAgenda = "";
        }
    };

    $scope.deleteAgenda = function(index) {
        $scope.agendas.splice(index, 1);
    };
}