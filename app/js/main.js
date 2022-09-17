$(function() {
    $(document).ready(function () {

        $('.header-burger-open').on('click', function () {
            $(this).hide();
            $('.header-burger-close__wrap').show();
            $('.header-nav-mob').slideToggle(200);
        })

        $('.header-burger-close__wrap').on('click', function () {
            $(this).hide();
            $('.header-burger-open').show();
            $('.header-nav-mob').slideToggle(200);
        })

        $('#opd-1').on('change', function () {
            let val = $(this).prop('checked');
            $('#form-1 button').prop('disabled', !val);
        })

        $('#opd-2').on('change', function () {
            let val = $(this).prop('checked');
            $('#form-2 button').prop('disabled', !val);
        })

        $('#opd-3').on('change', function () {
            let val = $(this).prop('checked');
            $('#form-3 button').prop('disabled', !val);
        })

        $(".phone-input").mask("9 999 999 99 99", { placeholder: " " });

        $('.popup-close').on('click', function () {
            $('#popup-overlay-form').hide();
        })

        $('.popup-open').on('click', function () {
            $('#popup-overlay-form').css('display', 'flex');
        })

        $('#close-opd').on('click', function () {
            $('#popup-overlay-opd').hide();
        })

        $('#popup-overlay-opd').on('click', function () {
            $(this).hide();
        })

        $('.open-opd').on('click', function () {
            $('#popup-overlay-opd').show();
        })

    })
})