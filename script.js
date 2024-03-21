
// header
$(function () {
    $(window).scroll(function () {
        var winTop = $(window).scrollTop();
        if (winTop >= 30) {
            $("body").addClass("sticky-header");
            $("header").css("background-color", "#3c3c3c"); // Mantém a cor do cabeçalho
        } else {
            $("body").removeClass("sticky-header");

        }
    });
});
// header