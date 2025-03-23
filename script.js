//Program starts when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() 
{
    let incomeSource = '';
    let incomeAmount = 0;
    const expenses = [];
    const incomes = [];
    let balance= 0.00;
  
    // Create containers for displaying incomes and expenses (instead of doing it in HTML)
    let incomeDisplayContainer = document.createElement('div');
    incomeDisplayContainer.id = 'incomeDisplayContainer';
    document.querySelector('.incomes').appendChild(incomeDisplayContainer);

    let expenseDisplayContainer = document.createElement('div');
    expenseDisplayContainer.id = 'expenseDisplayContainer';
    document.querySelector('.expenses').appendChild(expenseDisplayContainer);

   
    //Displays balance on page
    function displayBalance()
    {
        document.getElementById('balanceDisplay').textContent=balance;

        //Alerts if balance<0
        if (balance<0)
        {
          document.getElementById('balanceDisplay').style.backgroundColor='red';
          alert("You exceeded your budget.");
        }
    }

    
  // Handle income form submission
    document.getElementById('incomeForm').addEventListener('submit', function(event) {
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
      
      //Display updated balance
      balance=balance+incomeAmount;
      displayBalance();
  
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
  
      //Displays container of new income
      incomeDisplayContainer.appendChild(displayIncome);

      document.getElementById('incomeForm').reset();
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
      
      //Display updated balance
      balance=balance-expenseAmount;
      displayBalance();
      
      // Create expense display element
      let displayExpense = document.createElement('div');
      displayExpense.classList.add('expenseItem');
      displayExpense.textContent = expenseCategory + ' (' + expenseTitle + ') ' + '$' + expenseAmount;

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
      
      document.getElementById('expenseForm').reset();
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
  
