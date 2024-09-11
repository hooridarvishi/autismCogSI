let categories = document.querySelectorAll("[data-category]:not(.item)");
let logBox = document.querySelector(".logBox");

categories.forEach((category) => {
  new Sortable(category, {
    animation: 150,
    group: "category",
    draggable: `.item`,
    onMove: function (evt, originalEvent) {
      let itemCategory = evt.dragged.getAttribute("data-category");
      let dropCategory = evt.to.getAttribute("data-category");

      // Ensure categories are properly compared and processed
      if (itemCategory !== dropCategory) {
        if (dropCategory !== "all") {
          evt.to.classList.add("bg-error");
          setTimeout(() => {
            evt.to.classList.remove("bg-error");
          }, 2000);
          return false; // Cancel the drop if categories don't match
        }
      } else {
        evt.to.classList.add("bg-success");
        setTimeout(() => {
          evt.to.classList.remove("bg-success");
        }, 2000);
      }
    },
    onEnd: function (evt) {
      let all = document.querySelector('[data-category="all"]:not(.item)');

      // Use children.length instead of childElementCount for more reliable count
      if (all && all.children.length === 0) {
        logBox.classList.add("show");
        setTimeout(function () {
          window.location.href = "../boxtwo/2.html";
        }, 3000);
      } else {
        logBox.classList.remove("show");
      }
    },
  });
});
