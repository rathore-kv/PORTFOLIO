function addObserver(el, ops) {
  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (ops.fn) {
          ops.fn(entry.target);
        } else {
          entry.target.classList.add("active");
        }
        observer.unobserve(entry.target);
      }
    });
  }, ops);
  observer.observe(el);
}

function onScroll(selector, ops = { rootMargin: "0px 0px -100px 0px" }) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (!("IntersectionObserver" in window)) {
      ops.fn ? ops.fn(el) : el.classList.add("active");
      continue;
    }
    addObserver(el, ops);
  }
}

function $(v) {
  return document.querySelector(v);
}

var projects = [{}];

var projectsContainer = $(".projects");
for (var i = 0; i < projects.length; i++) {
  var p = projects[i];
  projectsContainer.innerHTML +=
    '<div class="project scroll-reveal scroll-reveal-img"><div class="content-box" data-img="' +
    p.img +
    '"><div class="content"><p>' +
    p.desc +
    '</p></div></div><a href="' +
    p.link +
    '" target="_blank" class="btn primary block tile">visit site</a></div>';
}

var submitBtn = $("#send");
var err = $(".form-err");
submitBtn.onclick = function () {
  err.innerText =
    "This feature doesn't yet work. Email me at mind.rollingks@gmail.com";
};

window.addEventListener("DOMContentLoaded", function () {
  onScroll(".scroll-reveal");

  onScroll(".scroll-reveal-slider", {
    rootMargin: "300px",
    fn: function (e) {
      var slider = e.getAttribute("data-slider");
      var rowcol = e.getAttribute("data-dim").split(" ");
      var slides = [];
      for (let i = 1; i < 7; i++) {
        slides.push("images/projects/main/" + slider + "/" + i + ".jpg");
      }
      initCubeSlider({
        el: '[data-slider="' + slider + '"]',
        slides: slides,
        controls: slider != "diary",
        row: rowcol[0],
        col: rowcol[1],
        size: slider == "diary" ? 300 : 30,
        unit: slider == "diary" ? "px" : "%",
        interval: 3500 + Math.round(Math.random() * 501),
      });
    },
  });

  onScroll(".scroll-reveal-img", {
    rootMargin: "150px",
    fn: function (e) {
      var img = e.querySelector(".content-box");
      img.style.backgroundImage =
        "url('images/projects/" + img.getAttribute("data-img") + "')";
    },
  });

  setTimeout(function () {
    document.body.removeChild($("#loader"));
  }, 500);
});
