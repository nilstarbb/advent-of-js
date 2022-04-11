const lists = document.getElementsByTagName("li");

for (let i = 0; i < lists.length; i++) {
  lists[i].addEventListener("click", function () {
    this.classList.toggle("expand");
    for (let j = 0; j < lists.length; j++) {
      if (j != i) {
        lists[j].classList.remove("expand");
      }
    }
  });
}

