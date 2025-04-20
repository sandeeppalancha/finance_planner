// Edit functions for all entity types

// Edit receivable by id
function editReceivable(id) {
  try {
    // Get all receivables
    const receivables = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECEIVABLES) || '[]');
    
    // Find the specified receivable
    const receivable = receivables.find(r => r.id == id);
    if (!receivable) {
      alert('Could not find the receivable to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('receivableModalTitle').textContent = 'Edit Receivable';
    
    // Populate form fields
    document.getElementById('receivableId').value = receivable.id;
    document.getElementById('receivableFrom').value = receivable.from;
    document.getElementById('receivableAmount').value = receivable.amount;
    
    // Format date for input field (YYYY-MM-DD)
    const dueDate = new Date(receivable.dueDate);
    const formattedDate = dueDate.toISOString().split('T')[0];
    document.getElementById('receivableDueDate').value = formattedDate;
    
    document.getElementById('receivableDescription').value = receivable.description || '';
    
    // Show modal with skipReset=true to prevent form reset
    showModal('receivableModal', true);
  } catch (err) {
    console.error('Error editing receivable:', err);
    alert('An error occurred while trying to edit the receivable.');
  }
}

// Edit payable by id
function editPayable(id) {
  try {
    // Get all payables
    const payables = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYABLES) || '[]');
    
    // Find the specified payable
    const payable = payables.find(p => p.id == id);
    if (!payable) {
      alert('Could not find the payable to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('payableModalTitle').textContent = 'Edit Payable';
    
    // Populate form fields
    document.getElementById('payableId').value = payable.id;
    document.getElementById('payableTo').value = payable.to;
    document.getElementById('payableAmount').value = payable.amount;
    
    // Format date for input field (YYYY-MM-DD)
    const dueDate = new Date(payable.dueDate);
    const formattedDate = dueDate.toISOString().split('T')[0];
    document.getElementById('payableDueDate').value = formattedDate;
    
    document.getElementById('payableDescription').value = payable.description || '';
    
    // Show modal with skipReset=true to prevent form reset
    showModal('payableModal', true);
  } catch (err) {
    console.error('Error editing payable:', err);
    alert('An error occurred while trying to edit the payable.');
  }
}

// Edit investment by id
function editInvestment(id) {
  try {
    // Get all investments
    const investments = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVESTMENTS) || '[]');
    
    // Find the specified investment
    const investment = investments.find(i => i.id == id);
    if (!investment) {
      alert('Could not find the investment to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('investmentModalTitle').textContent = 'Edit Investment';
    
    // Populate form fields
    document.getElementById('investmentId').value = investment.id;
    document.getElementById('investmentName').value = investment.name;
    document.getElementById('investmentAmount').value = investment.amount;
    document.getElementById('investmentType').value = investment.type || '';
    document.getElementById('investmentDescription').value = investment.description || '';
    
    // Set recurring fields
    if (investment.isRecurring) {
      document.getElementById('investmentRecurring').checked = true;
      
      // Display recurring fields
      document.getElementById('recurringInvestmentFields').style.display = 'block';
      
      // Set frequency
      document.getElementById('investmentFrequency').value = investment.frequency || 'monthly';
      
      // Set dates if available
      if (investment.startDate) {
        const startDate = new Date(investment.startDate);
        document.getElementById('investmentStartDate').value = startDate.toISOString().split('T')[0];
      }
      
      if (investment.endDate) {
        const endDate = new Date(investment.endDate);
        document.getElementById('investmentEndDate').value = endDate.toISOString().split('T')[0];
      }
    } else {
      document.getElementById('investmentOneTime').checked = true;
      document.getElementById('recurringInvestmentFields').style.display = 'none';
    }
    
    // Show modal with skipReset=true to prevent form reset
    showModal('investmentModal', true);
  } catch (err) {
    console.error('Error editing investment:', err);
    alert('An error occurred while trying to edit the investment.');
  }
}

// Edit budget by id
function editBudget(id) {
  try {
    // Get all budgets
    const budgets = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUDGETS) || '[]');
    
    // Find the specified budget
    const budget = budgets.find(b => b.id == id);
    if (!budget) {
      alert('Could not find the budget to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('budgetModalTitle').textContent = 'Edit Budget';
    
    // Populate form fields
    document.getElementById('budgetId').value = budget.id;
    document.getElementById('budgetName').value = budget.name;
    document.getElementById('budgetTargetAmount').value = budget.targetAmount;
    document.getElementById('budgetCategory').value = budget.category || '';
    
    // Format date for input field (YYYY-MM-DD)
    const deadline = new Date(budget.deadline);
    const formattedDate = deadline.toISOString().split('T')[0];
    document.getElementById('budgetDeadline').value = formattedDate;
    
    // Show modal with skipReset=true to prevent form reset
    showModal('budgetModal', true);
  } catch (err) {
    console.error('Error editing budget:', err);
    alert('An error occurred while trying to edit the budget.');
  }
}

// Edit account by id
function editAccount(id) {
  try {
    // Get all accounts
    const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
    
    // Find the specified account
    const account = accounts.find(a => a.id == id);
    if (!account) {
      alert('Could not find the account to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('accountModalTitle').textContent = 'Edit Account';
    
    // Populate form fields
    document.getElementById('accountId').value = account.id;
    document.getElementById('accountName').value = account.name;
    document.getElementById('accountNumber').value = account.accountNumber;
    document.getElementById('accountBalance').value = account.balance;
    
    // Show modal with skipReset=true to prevent form reset
    showModal('accountModal', true);
  } catch (err) {
    console.error('Error editing account:', err);
    alert('An error occurred while trying to edit the account.');
  }
}

// Edit chit by id
function editChit(id) {
  try {
    // Get all chits
    const chits = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHITS) || '[]');
    
    // Find the specified chit
    const chit = chits.find(c => c.id == id);
    if (!chit) {
      alert('Could not find the chit to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('chitModalTitle').textContent = 'Edit Chit';
    
    // Populate form fields
    document.getElementById('chitId').value = chit.id;
    document.getElementById('chitName').value = chit.name;
    document.getElementById('chitAmount').value = chit.amount;
    
    // Get start date values
    const startDate = new Date(chit.startDate);
    document.getElementById('chitStartMonth').value = startDate.getMonth().toString();
    document.getElementById('chitStartYear').value = startDate.getFullYear().toString();
    
    document.getElementById('chitDuration').value = chit.duration;
    document.getElementById('chitDescription').value = chit.description || '';
    
    // Show modal with skipReset=true to prevent form reset
    showModal('chitModal', true);
  } catch (err) {
    console.error('Error editing chit:', err);
    alert('An error occurred while trying to edit the chit.');
  }
}

// Edit money lent by id
function editMoneyLent(id) {
  try {
    // Get all money lent records
    const moneyLent = JSON.parse(localStorage.getItem(STORAGE_KEYS.MONEY_LENT) || '[]');
    
    // Find the specified record
    const record = moneyLent.find(m => m.id == id);
    if (!record) {
      alert('Could not find the money lent record to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('moneyLentModalTitle').textContent = 'Edit Money Lent';
    
    // Populate form fields
    document.getElementById('moneyLentId').value = record.id;
    document.getElementById('moneyLentTo').value = record.to;
    document.getElementById('moneyLentAmount').value = record.amount;
    document.getElementById('moneyLentDescription').value = record.description || '';
    
    // Format date for input field (YYYY-MM-DD)
    const date = new Date(record.date);
    const formattedDate = date.toISOString().split('T')[0];
    document.getElementById('moneyLentDate').value = formattedDate;
    
    // Show modal with skipReset=true to prevent form reset
    showModal('moneyLentModal', true);
  } catch (err) {
    console.error('Error editing money lent record:', err);
    alert('An error occurred while trying to edit the money lent record.');
  }
}

// Edit past expense by id
function editPastExpense(id) {
  try {
    // Get all past expenses
    const pastExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAST_EXPENSES) || '[]');
    
    // Find the specific expense
    const expense = pastExpenses.find(e => e.id == id);
    if (!expense) {
      alert('Could not find the past expense to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('pastExpenseModalTitle').textContent = 'Edit Past Expense';
    
    // Populate form fields
    document.getElementById('pastExpenseId').value = expense.id;
    document.getElementById('pastExpenseName').value = expense.name;
    document.getElementById('pastExpenseAmount').value = expense.amount;
    document.getElementById('pastExpenseCategory').value = expense.category || '';
    document.getElementById('pastExpenseDescription').value = expense.description || '';
    
    // Format date for input field (YYYY-MM-DD)
    const date = new Date(expense.date);
    const formattedDate = date.toISOString().split('T')[0];
    document.getElementById('pastExpenseDate').value = formattedDate;
    
    // Show modal with skipReset=true to prevent form reset
    showModal('pastExpenseModal', true);
  } catch (err) {
    console.error('Error editing past expense:', err);
    alert('An error occurred while trying to edit the past expense.');
  }
}

// Edit upcoming expense by id
function editUpcomingExpense(id) {
  try {
    // Get all upcoming expenses
    const upcomingExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.UPCOMING_EXPENSES) || '[]');
    
    // Find the specific expense
    const expense = upcomingExpenses.find(e => e.id == id);
    if (!expense) {
      alert('Could not find the upcoming expense to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('upcomingExpenseModalTitle').textContent = 'Edit Upcoming Expense';
    
    // Populate form fields
    document.getElementById('upcomingExpenseId').value = expense.id;
    document.getElementById('upcomingExpenseName').value = expense.name;
    document.getElementById('upcomingExpenseAmount').value = expense.amount;
    document.getElementById('upcomingExpenseCategory').value = expense.category || '';
    document.getElementById('upcomingExpenseDescription').value = expense.description || '';
    
    // Format date for input field (YYYY-MM-DD)
    const date = new Date(expense.date);
    const formattedDate = date.toISOString().split('T')[0];
    document.getElementById('upcomingExpenseDate').value = formattedDate;
    
    // Show modal with skipReset=true to prevent form reset
    showModal('upcomingExpenseModal', true);
  } catch (err) {
    console.error('Error editing upcoming expense:', err);
    alert('An error occurred while trying to edit the upcoming expense.');
  }
}

// Edit gold item by id
function editGoldItem(id) {
  try {
    // Get gold items
    const goldItems = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOLD_ITEMS) || '[]');
    
    // Find the gold item to edit
    const goldItem = goldItems.find(i => i.id == id);
    
    if (!goldItem) {
      console.error('Gold item not found:', id);
      return;
    }
    
    // Set form values
    document.getElementById('goldItemId').value = goldItem.id;
    document.getElementById('goldItemName').value = goldItem.name;
    document.getElementById('goldItemType').value = goldItem.type;
    document.getElementById('goldItemWeight').value = goldItem.weight;
    document.getElementById('goldItemUser').value = goldItem.user;
    document.getElementById('goldItemDescription').value = goldItem.description || '';
    
    // Set modal title
    document.getElementById('goldItemModalTitle').textContent = 'Edit Gold Item';
    
    // Show modal
    showModal('goldItemModal', true);
    
  } catch (err) {
    console.error('Error editing gold item:', err);
    alert('Failed to load gold item data. Please try again.');
  }
}

function editLoan(id) {
  try {
    // Get all loans
    const loans = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOANS) || '[]');
    
    // Find the specified loan
    const loan = loans.find(l => l.id == id);
    if (!loan) {
      alert('Could not find the loan to edit.');
      return;
    }
    
    // Set modal title
    document.getElementById('loanModalTitle').textContent = 'Edit Loan';
    
    // Populate form fields
    document.getElementById('loanId').value = loan.id;
    document.getElementById('loanName').value = loan.name;
    document.getElementById('loanType').value = loan.type;
    document.getElementById('loanAmount').value = loan.amount;
    document.getElementById('loanEMI').value = loan.emi;
    document.getElementById('loanTotalEMIs').value = loan.totalEMIs;
    document.getElementById('loanInterestRate').value = loan.interestRate || '';
    document.getElementById('loanLender').value = loan.lender;
    document.getElementById('loanDescription').value = loan.description || '';
    
    // Format date for input field (YYYY-MM-DD)
    const startDate = new Date(loan.startDate);
    const formattedDate = startDate.toISOString().split('T')[0];
    document.getElementById('loanStartDate').value = formattedDate;
    
    // Show modal with skipReset=true to prevent form reset
    showModal('loanModal', true);
  } catch (err) {
    console.error('Error editing loan:', err);
    alert('An error occurred while trying to edit the loan.');
  }
}