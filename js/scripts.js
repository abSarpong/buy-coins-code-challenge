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
  document.getElementById("tab-two").style.display == "block";
  document.getElementById("tab-item-two").classList.add("active-tab");
}

for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    let tab = this.id;
    if (tab == "tab-item-one") {
      document.getElementById("tab-one").style.display = "block";
      document.getElementById("tab-item-one").classList.add("active-tab");
    } else {
      document.getElementById("tab-one").style.display = "";
      document.getElementById("tab-item-one").classList.remove("active-tab");
    }
    if (tab == "tab-item-two") {
      document.getElementById("tab-two").style.display = "block";
      document.getElementById("tab-item-two").classList.add("active-tab");
    } else {
      document.getElementById("tab-two").style.display = "";
      document.getElementById("tab-item-two").classList.remove("active-tab");
    }
    if (tab == "tab-item-three") {
      document.getElementById("tab-three").style.display = "block";
      document.getElementById("tab-item-three").classList.add("active-tab");
    } else {
      document.getElementById("tab-three").style.display = "";
      document.getElementById("tab-item-three").classList.remove("active-tab");
    }
    if (tab == "tab-item-four") {
      document.getElementById("tab-four").style.display = "block";
      document.getElementById("tab-item-four").classList.add("active-tab");
    } else {
      document.getElementById("tab-four").style.display = "";
      document.getElementById("tab-item-four").classList.remove("active-tab");
    }
  });
}
