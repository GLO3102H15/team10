// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function (num) {
    return new Array(num + 1).join(this);
};

(function ($) {

    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
        $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function () {
        $(this).closest('.input-group, .form-group').removeClass('focus');
    });

    /*// Add segments to a slider
    $.fn.addSliderSegments = function (amount, orientation) {
        return this.each(function () {
            if (orientation === 'vertical') {
                var output = '';
                var i;
                for (i = 1; i <= amount - 2; i++) {
                    output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>';
                }
                $(this).prepend(output);
            } else {
                var segmentGap = 100 / (amount - 1) + '%';
                var segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
                $(this).prepend(segment.repeat(amount - 2));
            }
        });
    };

    // Todo list
    $('.todo').on('click', 'li', function () {
        $(this).toggleClass('todo-done');
    });

    // Custom Selects
    if ($('[data-toggle="select"]').length) {
        $('[data-toggle="select"]').select2();
    }

    // Checkboxes and Radio buttons
    $('[data-toggle="checkbox"]').radiocheck();
    $('[data-toggle="radio"]').radiocheck();

    // Tooltips
    $('[data-toggle=tooltip]').tooltip('show');

    // jQuery UI Sliders
    var $slider = $('#slider');
    if ($slider.length > 0) {
        $slider.slider({
            min: 1,
            max: 5,
            value: 3,
            orientation: 'horizontal',
            range: 'min'
        }).addSliderSegments($slider.slider('option').max);
    }

    var $verticalSlider = $('#vertical-slider');
    if ($verticalSlider.length) {
        $verticalSlider.slider({
            min: 1,
            max: 5,
            value: 3,
            orientation: 'vertical',
            range: 'min'
        }).addSliderSegments($verticalSlider.slider('option').max, 'vertical');
    }

    console.log("swag");
    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
        $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function () {
        $(this).closest('.input-group, .form-group').removeClass('focus');
    });

    // Make pagination demo work
    $('.pagination').on('click', 'a', function () {
        $(this).parent().siblings('li').removeClass('active').end().addClass('active');
    });

    $('.btn-group').on('click', 'a', function () {
        $(this).siblings().removeClass('active').end().addClass('active');
    });

    // Disable link clicks to prevent page scrolling
    $(document).on('click', 'a[href="#fakelink"]', function (e) {
        e.preventDefault();
    });

    // Switches
    if ($('[data-toggle="switch"]').length) {
        $('[data-toggle="switch"]').bootstrapSwitch();
    }

    // make code pretty
    window.prettyPrint && prettyPrint();*/

})(jQuery);