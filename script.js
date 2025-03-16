//Program starts when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() 
{
    let balance=0;
    
    //Displays balance on page
    function displayBalance()
    {
        document.getElementById('balanceDisplay').textContent=balance;

        //Alerts if balance<0
        if (balance<0)
            {
                overdrawn();
            }
    }

    //Handles income form
    document.getElementById('incomeAmount').addEventListener('click', function()
    {
        //Adds the most recently inputted income value to balance
        let incomeAmount=document.getElementById('incomeAmount').value;
        balance=balance+incomeAmount;

        //Display updated balance
        displayBalance();
    });

    //Handles expense form
    document.getElementById('expenseAmount').addEventListener('click', function()
    {
        //Decreases balance by the most recently inputted income value
        let expenseAmount=document.getElementById('expenseAmount').value;
        balance=balance-expenseAmount;

        //Display updated balance
        displayBalance();
    });

});

//Alerts user that their balance<0
function overdrawn()
{
    alert("Your expenses exceed your income!");
    document.getElementById('balanceDisplayParagraph').backgroundColor='red';
}
