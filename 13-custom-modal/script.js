const showBtn = document.getElementById("something");
const closeBtn = document.getElementById("close");
const modal = document.getElementById("modal");

closeBtn.onclick = () => modal.classList.add("hidden");

showBtn.onclick = () => modal.classList.remove("hidden");
