//Program starts when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() 
{
    let incomeSource = '';
    let incomeAmount = 0;
    const expenses = [];
    const incomes = [];
    let balance=0;
    
    //Displays balance on page
    function displayBalance()
    {
        document.getElementById('balanceDisplay').textContent=balance;
    }

  
    // Handle income form submission
    document.getElementById('incomeForm').addEventListener('click', function(event) {
      event.preventDefault();
      incomeSource = document.getElementById('incomeSource').value;
      incomeAmount = parseFloat(document.getElementById('incomeAmount').value);

      if (isNaN(incomeAmount) || incomeAmount <= 0) {
        alert('Please enter a valid income amount.');
        return;
      }

      //Append current income object to the list of incomes
      let incomeObject={source: incomeSource, amount: incomeAmount};
      incomes.push(incomeObject);
      
      console.log('Income added:', incomeSource, incomeAmount);
      document.getElementById('incomeForm').reset();

      //Display updated balance
      balance=balance+incomeAmount;
      displayBalance();
    });

  
    // Handle expense form submission
    document.getElementById('expenseForm').addEventListener('submit', function(event) {
      event.preventDefault();

      let expenseCategory = document.getElementById('expenseCategory').value;
      let expenseTitle = document.getElementById('expenseTitle').value;
      let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

      if (isNaN(expenseAmount) || expenseAmount <= 0) {
        alert('Please enter a valid expense amount.');
        return;
      }
      
      //Append current expense object to the list of expenses
      let expenseObject={category: expenseCategory, title: expenseTitle, amount: expenseAmount};
      expenses.push(expenseObject);
      
      console.log('Expense added:', expenseCategory, expenseTitle, expenseAmount);
      document.getElementById('expenseForm').reset();

      //Display updated balance
      balance=balance-expenseAmount;
      displayBalance();
    });
  
  
  // Show hidden input for "Add" category in expense form
  document.getElementById('expenseCategory').addEventListener('change', function() {
    let category = document.getElementById('expenseCategory').value;
    let addExpenseCategoryInput = document.getElementById('addExpenseCategory');//add box

    if (category === 'Add') {
      addExpenseCategoryInput.hidden = false;  // Show the input for custom category
    } else {
      addExpenseCategoryInput.hidden = true;   // Hide the input if "Add" is not selected
    }
  });

});

