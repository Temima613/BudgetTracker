// let incomeSource = '';
// let incomeAmount = 0;
// let expenses = [];

// // Handle income form submission
// document.getElementById('incomeForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   incomeSource = document.getElementById('incomeSource').value;
//   incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
 
//   if (isNaN(incomeAmount) || incomeAmount <= 0) {
//     alert('Please enter a valid income amount.');
//     return;
//   }

//   console.log('Income added:', incomeSource, incomeAmount);
//   document.getElementById('incomeForm').reset();
// });

// // Handle expense form submission
// document.getElementById('expenseForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   let category = document.getElementById('expenseCategory').value;
//   let title = document.getElementById('expenseTitle').value;
//   let amount = parseFloat(document.getElementById('expenseAmount').value);

//   if (isNaN(amount) || amount <= 0) {
//     alert('Please enter a valid expense amount.');
//     return;
//   }

//   expenses.push({ category, title, amount });
//   console.log('Expense added:', category, title, amount);
//   document.getElementById('expenseForm').reset();
// });

let incomeSource = '';
let incomeAmount = 0;
let expenses = [];

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
  document.getElementById('expenseForm').reset();
});

// Show hidden input for "Add" category in expense form
document.getElementById('expenseCategory').addEventListener('change', function() {
  let category = document.getElementById('expenseCategory').value;
  let addExpenseCategoryInput = document.getElementById('addExpenseCategory');

  if (category === 'Add') {
    addExpenseCategoryInput.hidden = false;  // Show the input for custom category
  } else {
    addExpenseCategoryInput.hidden = true;   // Hide the input if "Add" is not selected
  }
});

