const autoFocus = (e) => {
  if (e.target.value.length == 1 && e.target.nextElementSibling) {
    e.target.nextElementSibling.focus();
  }
};

const autoPaste = (e) => {
  e.preventDefault();
  // const pasteVal = e.clipboardData.getData("text").replace(/\s+/g, '').split(""); // remove whitespace
  const pasteVal = e.clipboardData.getData("text").replace(/\D/g,'').split(""); // remove non-numeric
  let currentInput = e.target;
  let i = 0;
  while (currentInput && pasteVal[i]) {
    currentInput.value = pasteVal[i];
    i++;
    currentInput = currentInput.nextElementSibling;
  }
};

const inputs = document.querySelectorAll('input[type="text"');

inputs.forEach((input) => {
  input.onkeyup = autoFocus;
  input.onpaste = autoPaste;
});