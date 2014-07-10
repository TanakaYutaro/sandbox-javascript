$().ready(function () {
    var panel = $('.panel');
    panel.on({
        'mouseenter': function () {
            var target = $(this);
            if (target.hasClass('panel')) {
                target.addClass('green');
            }
        },
        'touchmove': function (event) {
            var touch = event.originalEvent.touches[0];
            var target = $(document.elementFromPoint(touch.clientX, touch.clientY));

            if (target.hasClass('panel')) {
                target.addClass('green');
            }
        }
    });

    panel.each(function (i, val) {
        $(this).text(i + 1);
    });
});