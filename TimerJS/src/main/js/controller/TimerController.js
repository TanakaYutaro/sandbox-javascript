function TimerController($scope, timerService) {
    var interval;
    var scope = $scope;

    var DEFAULT_TIME = 0;
    var INTERVAL = 1;
    var START_NUM = 1;
    var END_NUM = 59;

    $scope.Running = false;

    $scope.start = function () {
        $scope.Running = true;

//        timerService.intValidation(scope.hour);
//        timerService.intValidation(scope.minutes);
//        timerService.intValidation(scope.seconds);

        if (!scope.hour || scope.hour < DEFAULT_TIME || END_NUM < scope.hour) {
            scope.hour = DEFAULT_TIME;
        }
        if (!scope.minutes || scope.minutes < DEFAULT_TIME || END_NUM < scope.minutes) {
            scope.minutes = DEFAULT_TIME;
        }
        if (!scope.seconds || scope.seconds < DEFAULT_TIME || END_NUM < scope.seconds) {
            scope.seconds = DEFAULT_TIME;
        }

        interval = setInterval(function () {
            if (START_NUM <= scope.seconds && scope.seconds <= END_NUM) {
                scope.$apply(function () {
                    scope.seconds -= INTERVAL;
                });
            } else if (scope.seconds == DEFAULT_TIME) {
                if (START_NUM <= scope.minutes && scope.minutes <= END_NUM) {
                    scope.$apply(function () {
                        scope.minutes -= INTERVAL;
                        scope.seconds = END_NUM;
                    });
                } else if (scope.minutes == DEFAULT_TIME) {
                    if (START_NUM <= scope.hour && scope.hour <= END_NUM) {
                        scope.$apply(function () {
                            scope.hour -= INTERVAL;
                            scope.minutes = END_NUM;
                        });
                    } else if (scope.hour == DEFAULT_TIME) {
                        console.log("Time Up !!!");
                        scope.$apply(function () {
                            scope.Running = false;
                        });
                        clearInterval(interval);
                    }
                }
            }
        }, 1000);
    };

    $scope.stop = function () {
        $scope.Running = false;

        if (interval) {
            clearInterval(interval);
        }
    };

}

