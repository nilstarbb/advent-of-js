const playAudio = (index) => {
  const audio = new Audio("./audio/key-" + (index + 1) + ".mp3");
  if (audio) {
    audio.play();
  }
};

const keys = document.querySelectorAll("a");

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
  // key.addEventListener("click", () => playAudio(index));
  key.onclick = () => playAudio(index);
}
