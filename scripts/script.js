'use strict';

const billAmount = document.getElementById('bill-amount');
const amountPaid = document.getElementById('amount-paid');
const btnCalculate = document.getElementById('btn-calculate');
const errorMessage = document.getElementById('error-message');
const successContainer = document.getElementById('success-container');
const successMessage = document.getElementById('success-message');

const denominationContainer = document.getElementById('denomination');

//Variable
const denominations = [2000, 500, 100, 20, 10, 5, 1];
let denominationCount = [];

// Functions

const showErrorMessage = function (message) {
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
};

const showSuccess = function (message) {
  successContainer.style.display = 'block';
  successMessage.textContent = message;
};

const calculateChange = function (change) {
  for (let i = 0; i < denominations.length; i++) {
    denominationCount.push(Math.trunc(change / denominations[i]));
    change = change % denominations[i];
  }
};
const showUI = function () {
  let ul = document.createElement('ul');
  ul.classList = 'denomination';
  successContainer.appendChild(ul);
  denominations.forEach(function (denomination, index) {
    let li = document.createElement('li');
    li.classList = 'list-item';
    ul.appendChild(li);
    li.innerHTML += `<strong>₹${denomination}</strong><span>#${denominationCount[index]}</span>`;
  });
};

function cashRegistrar() {
  let billValue = +billAmount.value;
  let paidValue = +amountPaid.value;
  let change = paidValue - billValue;
  if (billValue > 0 && paidValue > 0) {
    if (change >= 0) {
      showSuccess(`your balance is ₹${change}`);
      calculateChange(change);
      showUI();
    } else {
      showErrorMessage('You should Pay More');
    }
  } else {
    showErrorMessage('Enter valid Bill and Amount');
  }
}

// Event Listeners

btnCalculate.addEventListener('click', cashRegistrar);
