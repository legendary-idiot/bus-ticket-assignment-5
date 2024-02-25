//Declaring as global variable
let count = 0;
const seatIDList = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "D4",
  "E1",
  "E2",
  "E3",
  "E4",
  "F1",
  "F2",
  "F3",
  "F4",
  "G1",
  "G2",
  "G3",
  "G4",
  "H1",
  "H2",
  "H3",
  "H4",
];
function onClickAction(event) {
  const getID = event.srcElement.id;
  for (seatID of seatIDList) {
    if (getID === seatID) {
      const classLists = document.getElementById(getID).classList;
      let isFound = 0;
      for (classList of classLists) {
        if (classList === "bg-[#1DD100]") {
          isFound = 1;
        }
      }
      if (count !== 4) {
        if (isFound === 0) {
          count += 1;
          document.getElementById(getID).classList.add("bg-[#1DD100]");
          let newItem = document.createElement("div");
          newItem.classList.add("flex", "justify-between", "mb-2");
          newItem.id = `item-${getID}`;
          newItem.innerHTML = `
                    <p>${getID}</p>
                    <p>Economy</p>
                    <p>550</p>
      `;
          document.getElementById("selected-items").appendChild(newItem);
          //Remove Seat
          let newSeat = collectNumber("seatsLeft");
          newSeat--;
          setNumber("seatsLeft", newSeat);
          //Add Seat
          setNumber("selectedSeats", count);
          setNumber("totalPrice", count * 550);
          setNumber("grandTotal", count * 550);
          clearDiscount(); //Corner Case: Clear discount if new seat selected
          toggleCouponButton();
          enableNextButton();
        } else {
          count -= 1;
          document.getElementById(getID).classList.remove("bg-[#1DD100]");
          const elementToRemove = document.getElementById(`item-${getID}`);
          document
            .getElementById("selected-items")
            .removeChild(elementToRemove);
          setNumber("selectedSeats", count);
          let newSeat = collectNumber("seatsLeft");
          newSeat++;
          setNumber("seatsLeft", newSeat);
          setNumber("totalPrice", count * 550);
          setNumber("grandTotal", count * 550);
          clearDiscount();
          toggleCouponButton();
          enableNextButton();
        }
      } else {
        alert("You cannot select more than 4 tickets!");
      }
    }
  }
}

document.addEventListener("click", onClickAction);

// Utility Functions
function collectNumber(getElement) {
  const currentSeat = parseInt(document.getElementById(getElement).textContent);
  return currentSeat;
}
function setNumber(getElement, number) {
  document.getElementById(getElement).innerText = number;
}
function toggleCouponButton() {
  const button = document.getElementById("couponButton");
  const couponField = document.getElementById("couponInput");
  if (count >= 2) {
    button.disabled = false;
    couponField.disabled = false;
  } else {
    button.disabled = true;
    couponField.disabled = true;
  }
}

function validateCoupon() {
  const enteredCode = document.getElementById("couponInput").value;
  const button = document.getElementById("couponButton");
  const couponField = document.getElementById("couponInput");
  const price = collectNumber("totalPrice");
  if (enteredCode === "NEW15") {
    setNumber("grandTotal", price * 0.85);
    displayDiscount(price * 0.15);
    button.disabled = true;
    couponField.disabled = true;
  } else if (enteredCode === "Couple 20") {
    setNumber("grandTotal", price * 0.8);
    displayDiscount(price * 0.2);
    button.disabled = true;
    couponField.disabled = true;
  } else {
    alert("You've entered an invalid coupon!");
  }
}
function displayDiscount(value) {
  document.getElementById("displayDiscount").classList.remove("hidden");
  const discountValue = document.getElementById("discount-amount");
  discountValue.innerText = value;
}
function clearDiscount() {
  document.getElementById("couponInput").value = "";
  document.getElementById("displayDiscount").classList.add("hidden");
}
function enableNextButton() {
  const submitButton = document.getElementById("submit-button");
  if (count >= 1) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
