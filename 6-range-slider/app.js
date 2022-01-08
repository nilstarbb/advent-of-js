const slider = document.getElementById("priceRange");
const price = document.getElementsByClassName("dollars")[0];

const updatePrice = () => {
  price.innerHTML = (slider.value / 100).toFixed(2);
};

slider.oninput = updatePrice;
