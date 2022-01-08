const keys = document.getElementsByClassName("key");

const keyDown = (e) => {
  e.preventDefault();
  const jiggleKey = document.getElementsByClassName("jiggle")[0];
  if (jiggleKey.dataset.key == e.key.toUpperCase()) {
    jiggleKey.classList.remove("jiggle");
    keys[Math.floor(Math.random() * keys.length)].classList.add('jiggle');
  }
};

window.onkeydown = keyDown;
