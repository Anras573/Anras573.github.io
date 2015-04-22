
function getHash() {
    if (location.hash) {
        var hash = location.hash.replace('#', '');
        fade(hash);
    } else {
        var hash = 'experience';
        fade(hash);
    }
}
function fade(target) {
    $('#menu li').removeClass('active');
    $('#menu a[href=#' + target + ']').parent('li').addClass('active');
    $('.content').fadeOut(200, function () {
        $('.content > div').addClass('not-active').removeClass('active');
        $('.content .' + target).addClass('active').removeClass('not-active');
        $('.content').fadeIn(200, function () {
            if ($(document).width() <= 770 && location.hash) {
                $('html, body').animate({
                    scrollTop: $('#menu').height() + $('.header-container').innerHeight()
                }, 'slow');
            }
        });
    });
}
$(document).ready(function () {
    getHash();
    window.onhashchange = function () {
        getHash();
    };
    $('#menu li').on('click', function () {
        var href = $(this).find('a').attr('href');
        if (window.location.origin.indexOf('undefined') !== -1) {
            window.location.href = window.location.origin.replace('undefined', '') + '/' + href;
        } else {
            window.location.href = window.location.origin + '/' + href;
        }
    });
    $('#menu li a').on('click', function (event) {
        event.stopPropagation();
    });
});
