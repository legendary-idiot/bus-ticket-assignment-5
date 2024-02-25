const buttons = document.querySelectorAll(
  "#A1, #A2, #A3, #A4, #B1, #B2, #B3, #B4"
);

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const classLists = document.getElementById(button).classList;
    let count = 0;
    let isFound = 0;
    for (classList of classLists) {
      if (classList === "bg-[#1DD100]") {
        isFound = 1;
      }
    }
    if (count !== 4) {
      if (isFound === 0) {
        count += 1;
        document.getElementById(button).classList.add("bg-[#1DD100]");
        let newItem = document.createElement("div");
        newItem.classList.add("flex", "justify-between", "mb-2");
        newItem.id = `item-${button}`;
        newItem.innerHTML = `
                    <p>${button}</p>
                    <p>Economy</p>
                    <p>550</p>
      `;
        document.getElementById("selected-items").appendChild(newItem);
        console.log(count);
        //Remove Seat
        let newSeat = collectNumber("seatsLeft");
        newSeat--;
        setNumber("seatsLeft", newSeat);
        //Add Seat
        setNumber("selectedSeats", count);
        setNumber("totalPrice", count * 550);
      } else {
        count -= 1;
        document.getElementById(getID).classList.remove("bg-[#1DD100]");
        const elementToRemove = document.getElementById(`item-${button}`);
        document.getElementById("selected-items").removeChild(elementToRemove);
        setNumber("selectedSeats", count);
        let newSeat = collectNumber("seatsLeft");
        newSeat++;
        setNumber("seatsLeft", newSeat);
        setNumber("totalPrice", count * 550);
      }
    }
  });
});

function collectNumber(getElement) {
  const currentSeat = parseInt(document.getElementById(getElement).textContent);
  return currentSeat;
}
function setNumber(getElement, number) {
  document.getElementById(getElement).innerText = number;
}
