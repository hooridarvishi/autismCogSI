let categories = document.querySelectorAll("[data-category]:not(.item)");
let logBox = document.querySelector(".logBox");

categories.forEach((category) => {
  new Sortable(category, {
    animation: 150,
    group: "category",
    draggable: `.item`,
    onMove: function (/**Event*/ evt, /**Event*/ originalEvent) {
      let itemCategory = evt.dragged.getAttribute("data-category");
      let dropCategory = evt.to.getAttribute("data-category");
      if (itemCategory != dropCategory) {
        if (dropCategory != "all") {
          evt.to.classList.add("bg-error");
          setTimeout(() => {
            evt.to.classList.remove("bg-error");
          }, 2000);
          return false;
        }
      } else {
        evt.to.classList.add("bg-success");
        setTimeout(() => {
          evt.to.classList.remove("bg-success");
        }, 2000);
      }
    },
    onEnd: function (/**Event*/ evt) {
      let all = document.querySelector('[data-category="all"]:not(.item)');
      if (all.childElementCount == 0) {
        logBox.classList.add("show");
        setTimeout(function(){
        window.location.href="../eighthteen/18.html";},3000)
      } else {
        logBox.classList.remove("show");
      }
    },
  });
});
