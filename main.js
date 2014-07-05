$().ready(function () {
    var panel = $('.panel');
    panel.bind('touchmove', function (evt) {
        var touch = evt.originalEvent.touches[0];
        var target = $(document.elementFromPoint(touch.clientX, touch.clientY));

        if (target.hasClass('panel')) {
            panel.removeClass('green');
            target.addClass('green');
        }
    });
});