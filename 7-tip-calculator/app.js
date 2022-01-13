const calculateAmount = () => {
  const tipPer =
    document.querySelector('input[name="tip"]:checked').value.slice(0, -1) *
    0.01;
  const bill = document
    .getElementById("bill-amount")
    .value.replace(/[^0-9\.]/g, "");
  const numPeople = document
    .getElementById("number-of-people")
    .value.replace(/[^0-9\.]/g, "");

  const tipAmount = (tipPer * bill).toFixed(2);
  const totalPer = (((1 + tipPer) * bill) / numPeople).toFixed(2);

  document.getElementById("tip-amount").innerHTML = tipAmount;
  document.getElementById("total-per-person").innerHTML = totalPer;
};

const btn = document.getElementById("calculate");
btn.onclick = calculateAmount;
