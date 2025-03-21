let incomeSource = '';
let incomeAmount = 0;
let expenses = [];

// Create containers for displaying incomes and expenses (instead of doing it in HTML)
let incomeDisplayContainer = document.createElement('div');
incomeDisplayContainer.id = 'incomeDisplayContainer';
document.querySelector('.incomes').appendChild(incomeDisplayContainer);

let expenseDisplayContainer = document.createElement('div');
expenseDisplayContainer.id = 'expenseDisplayContainer';
document.querySelector('.expenses').appendChild(expenseDisplayContainer);

// Handle income form submission
document.getElementById('incomeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  incomeSource = document.getElementById('incomeSource').value;
  incomeAmount = parseFloat(document.getElementById('incomeAmount').value);

  if (isNaN(incomeAmount) || incomeAmount <= 0) {
    alert('Please enter a valid income amount.');
    return;
  }

  console.log('Income added:', incomeSource, incomeAmount);

  // Create income display element
  let displayIncome = document.createElement('div');
  displayIncome.classList.add('incomeItem');
  displayIncome.textContent = incomeSource + ' $' + incomeAmount;

  // Add style dynamically (instead of CSS file)
  displayIncome.style.backgroundColor = '#65b1d7';
  displayIncome.style.padding = '10px';
  displayIncome.style.borderRadius = '8px';
  displayIncome.style.width = '45%';
  displayIncome.style.minWidth = '300px';
  displayIncome.style.textAlign = 'center';
  displayIncome.style.marginBottom = '10px';

  // Append to the container
  incomeDisplayContainer.appendChild(displayIncome);

  // Reset form
  document.getElementById('incomeForm').reset();
});

// Handle expense form submission
document.getElementById('expenseForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let category = document.getElementById('expenseCategory').value;
  let title = document.getElementById('expenseTitle').value;
  let amount = parseFloat(document.getElementById('expenseAmount').value);

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense amount.');
    return;
  }

  expenses.push({ category, title, amount });
  console.log('Expense added:', category, title, amount);

  // Create expense display element
  let displayExpense = document.createElement('div');
  displayExpense.classList.add('expenseItem');
  displayExpense.textContent = category + ' (' + title + ') ' + '$' + amount;

  // Add style dynamically (instead of CSS file)
  displayExpense.style.backgroundColor = '#f1c0a6';
  displayExpense.style.padding = '10px';
  displayExpense.style.borderRadius = '8px';
  displayExpense.style.width = '45%';
  displayExpense.style.minWidth = '300px';
  displayExpense.style.textAlign = 'center';
  displayExpense.style.marginBottom = '10px';

  // Append to the container
  expenseDisplayContainer.appendChild(displayExpense);

  // Reset form
  document.getElementById('expenseForm').reset();
});

// Show hidden input for "Add" category in expense form
document.getElementById('expenseCategory').addEventListener('change', function() {
  let category = document.getElementById('expenseCategory').value;
  let addExpenseCategoryInput = document.getElementById('addExpenseCategory'); // add box

  if (category === 'Add') {
    addExpenseCategoryInput.hidden = false;  // Show the input for custom category
  } else {
    addExpenseCategoryInput.hidden = true;   // Hide the input if "Add" is not selected
  }
});

// Handle balance calculation
let balance = 0;
function displayBalance() {
  document.getElementById('balanceDisplay').textContent = balance;
}

// When income is entered
document.getElementById('incomeAmount').addEventListener('click', function() {
  let incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
  if (!isNaN(incomeAmount) && incomeAmount > 0) {
    balance += incomeAmount; // Add income to balance
    displayBalance();
  }
});

// When expense is entered
document.getElementById('expenseAmount').addEventListener('click', function() {
  let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
  if (!isNaN(expenseAmount) && expenseAmount > 0) {
    balance -= expenseAmount; // Subtract expense from balance
    displayBalance();
  }
});
