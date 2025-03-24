/*Chana Leah Nissel
  Temima Lewing
  Sara Nechama Isenberg*/
  
// Program starts when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    let incomeSource = '';
    let incomeAmount = 0;
    const expenses = [];
    const incomes = [];
    let balance = 0.0;
  
    // Create containers for displaying incomes and expenses (instead of doing it in HTML)
    let incomeDisplayContainer = document.createElement('div');
    incomeDisplayContainer.id = 'incomeDisplayContainer';
    document.querySelector('.incomes').appendChild(incomeDisplayContainer);
  
    let expenseDisplayContainer = document.createElement('div');
    expenseDisplayContainer.id = 'expenseDisplayContainer';
    document.querySelector('.expenses').appendChild(expenseDisplayContainer);
  
    //Filter income by category
    const sourceSelect = document.getElementById('incomeFilter');
    sourceSelect.addEventListener('change', () => {
        const selectedSource = sourceSelect.value;
        const items = document.querySelectorAll('.incomeItem');
        items.forEach(item => {
            if (selectedSource === 'All Incomes' || item.dataset.source === selectedSource) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
  
    // Filter by expense category
    const categorySelect = document.getElementById('expenseFilter');
  
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        const items = document.querySelectorAll('.expenseItem');
        items.forEach(item => {
            if (selectedCategory === 'All Expenses' || item.dataset.category === selectedCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
  
    // Displays balance on page
    function displayBalance() {
        document.getElementById('balanceDisplay').textContent = balance.toFixed(2);
        // Display alert if balance < 0
        if (balance < 0) {
            document.getElementById('balanceDisplayParagraph').style.backgroundColor = 'red';
            alert('You exceeded your budget.');
        } else {
            document.getElementById('balanceDisplayParagraph').style.backgroundColor = 'rgb(198, 190, 190)';
        }
    }
  
    // Handle income form submission
    document.getElementById('incomeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        incomeSource = document.getElementById('incomeSource').value;
        incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
        const incomeDate = document.getElementById('incomeDate').value;
        if (isNaN(incomeAmount) || incomeAmount <= 0) {
            alert('Please enter a valid income amount.');
            return;
        }
        // Append current income object to the list of incomes
        let incomeObject = { source: incomeSource, amount: incomeAmount, date: incomeDate || new Date().toISOString().split('T')[0] };
        incomes.push(incomeObject);
  
        console.log('Income added:', incomeSource, incomeAmount, incomeDate);
  
        // Display updated balance
        balance += incomeAmount;
        displayBalance();
  
        // Add the new income source to the filter options
        if (!document.querySelector(`#incomeFilter option[value="${incomeSource}"]`)) {
            document.getElementById('incomeFilter').innerHTML +=
                `<option value="${incomeSource}">${incomeSource}</option>`;
        }
  
        // Create income display element
        let displayIncome = document.createElement('div');
        displayIncome.classList.add('incomeItem');
        displayIncome.dataset.source = incomeSource; // Set the data attribute for filtering
        displayIncome.textContent = `${incomeSource} $${incomeAmount.toFixed(2)} (${incomeObject.date})`;
        // Add style dynamically (instead of CSS file)
        displayIncome.style.backgroundColor = '#65b1d7';
        displayIncome.style.padding = '10px';
        displayIncome.style.borderRadius = '8px';
        displayIncome.style.width = '45%';
        displayIncome.style.minWidth = '300px';
        displayIncome.style.textAlign = 'center';
        displayIncome.style.marginBottom = '10px';
  
        // Displays container of new income
        incomeDisplayContainer.appendChild(displayIncome);
  
        // Update nodelist of option elements
        document.getElementById('incomeForm').reset();
    });
  
    // Handle expense form submission
    document.getElementById('expenseForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let expenseCategory = document.getElementById('expenseCategory').value;
        let expenseTitle = document.getElementById('expenseTitle').value;
        let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
        const expenseDate = document.getElementById('expenseDate').value;
        if (isNaN(expenseAmount) || expenseAmount <= 0) {
            alert('Please enter a valid expense amount.');
            return;
        }
  
        // Append current expense object to the list of expenses
        let expenseObject = { category: expenseCategory, title: expenseTitle, amount: expenseAmount, date: expenseDate || new Date().toISOString().split('T')[0] };
        expenses.push(expenseObject);
  
        console.log('Expense added:', expenseCategory, expenseTitle, expenseAmount, expenseDate);
  
        // Display updated balance
        balance -= expenseAmount;
        displayBalance();
  
        if (expenseCategory === 'Add') {
            expenseCategory = document.getElementById('addExpenseCategory').value; // Changes expenseCategory to the new one
            // Add the new category to both dropdown lists if it isn't already there:
            if (!document.querySelector(`#expenseCategory option[value="${expenseCategory}"]`)) {
                document.getElementById('expenseCategory').innerHTML +=
                    `<option value="${expenseCategory}">${expenseCategory}</option>`;
                document.getElementById('expenseFilter').innerHTML +=
                    `<option value="${expenseCategory}">${expenseCategory}</option>`;
            }
  
        }

        document.getElementById('expenseForm').reset();
        ///////////////////////////////////////////////////////////////////////
        let addExpenseCategoryInput = document.getElementById('addExpenseCategory');
        addExpenseCategoryInput.hidden = true;
  
        // Create expense display element
        let displayExpense = document.createElement('div');
        displayExpense.classList.add('expenseItem');
        displayExpense.dataset.category = expenseCategory; // Set the data attribute for filtering
        displayExpense.textContent = `${expenseCategory} (${expenseTitle}) $${expenseAmount.toFixed(2)} (${expenseObject.date})`;
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
  
    });
  
    // Sort by date
    document.getElementById('sortByDate').addEventListener('click', () => {
        // Sort incomes by date
        incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Sort expenses by date
        expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  
        // Clear current display
        incomeDisplayContainer.innerHTML = '';
        expenseDisplayContainer.innerHTML = '';
  
        // Re-display sorted incomes
        incomes.forEach(income => {
            let displayIncome = document.createElement('div');
            displayIncome.classList.add('incomeItem');
            displayIncome.dataset.source = income.source; // Set the data attribute for filtering
            displayIncome.textContent = `${income.source} $${income.amount.toFixed(2)} (${income.date})`;
            displayIncome.style.backgroundColor = '#65b1d7';
            displayIncome.style.padding = '10px';
            displayIncome.style.borderRadius = '8px';
            displayIncome.style.width = '45%';
            displayIncome.style.minWidth = '300px';
            displayIncome.style.textAlign = 'center';
            displayIncome.style.marginBottom = '10px';
            incomeDisplayContainer.appendChild(displayIncome);
        });
  
        // Re-display sorted expenses
        expenses.forEach(expense => {
            let displayExpense = document.createElement('div');
            displayExpense.classList.add('expenseItem');
            displayExpense.dataset.category = expense.category; // Set the data attribute for filtering
            displayExpense.textContent = `${expense.category} (${expense.title}) $${expense.amount.toFixed(2)} (${expense.date})`;
            displayExpense.style.backgroundColor = '#f1c0a6';
            displayExpense.style.padding = '10px';
            displayExpense.style.borderRadius = '8px';
            displayExpense.style.width = '45%';
            displayExpense.style.minWidth = '300px';
            displayExpense.style.textAlign = 'center';
            displayExpense.style.marginBottom = '10px';
            expenseDisplayContainer.appendChild(displayExpense);
        });
    });
  
  
    // Show hidden input for "Add" category in expense form
    document.getElementById('expenseCategory').addEventListener('change', function() {
        let category = document.getElementById('expenseCategory').value;
        let addExpenseCategoryInput = document.getElementById('addExpenseCategory'); // Add box
        if (category === 'Add') {
            addExpenseCategoryInput.hidden = false; // Show the input for custom category
        } else {
            addExpenseCategoryInput.hidden = true; // Hide the input if "Add" is not selected
        }
    });
  });
  