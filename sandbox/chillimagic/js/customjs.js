window.addEventListener("load", function () {
  AOS.init();
});

$(".navbar-collapse a").click(function () {
  $(".navbar-collapse").collapse("hide");
});

window.addEventListener(
  "load",
  function () {
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  },
  500
);

$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});

$(".owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  dots: false,
  margin: 0,
  center: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 5,
    },
  },
});
