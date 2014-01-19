angular.module("TimerJS", function () {
})
    .service("timerService", TimerService)
    .directive("ngEnter", EnterListener)
    .controller("AgendaController", AgendaController)
    .controller("TimerController", TimerController);