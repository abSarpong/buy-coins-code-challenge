const renderElement = (id, value) => {
  document.getElementById(id).innerHTML = value;
};

const renderImage = (id, value) => {
  let avatar = document.getElementById(id);
  avatar.setAttribute("src", value);
};

function toggleNav(id) {
  let element = document.getElementById(id);

  if (element.classList.contains("mob-nav")) {
    element.classList.remove("mob-nav");
  } else {
    element.classList.add("mob-nav");
  }
}

let tabs = document.querySelectorAll(".tab-item");

showTab();
function showTab() {
  document.getElementById("tab-item-two-1").classList.remove("hide");
  document.getElementById("tab-item-two").classList.add("active-tab");
}

for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    let tab = this.id;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute("id") == tab) {
        document.getElementById(tab).classList.add("active-tab");
        document.getElementById(tab + "-" + i).style.display = "block";
      } else {
        document
          .getElementById(tabs[i].getAttribute("id"))
          .classList.remove("active-tab");
        document.getElementById(
          tabs[i].getAttribute("id") + "-" + i
        ).style.display = "none";
      }
    }
  });
}
