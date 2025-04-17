// Helper function to save entity to localStorage
function saveToLocalStorage(type, item) {
  // Map of entity types to their storage keys
  const entityMap = {
    'receivable': { 
      key: STORAGE_KEYS.RECEIVABLES, 
      name: 'Receivable'
    },
    'payable': { 
      key: STORAGE_KEYS.PAYABLES, 
      name: 'Payable'
    },
    'investment': { 
      key: STORAGE_KEYS.INVESTMENTS, 
      name: 'Investment'
    },
    'budget': { 
      key: STORAGE_KEYS.BUDGETS, 
      name: 'Budget'
    },
    'account': { 
      key: STORAGE_KEYS.ACCOUNTS, 
      name: 'Account'
    },
    'chit': { 
      key: STORAGE_KEYS.CHITS, 
      name: 'Chit'
    },
    'moneyLent': { 
      key: STORAGE_KEYS.MONEY_LENT, 
      name: 'Money Lent'
    },
    'goldItem': { 
      key: STORAGE_KEYS.GOLD_ITEMS, 
      name: 'Gold Item'
    },
    'pastExpense': {
      key: STORAGE_KEYS.PAST_EXPENSES,
      name: 'Past Expense'
    },
    'upcomingExpense': {
      key: STORAGE_KEYS.UPCOMING_EXPENSES,
      name: 'Upcoming Expense'
    }
  };
  
  const storageKey = entityMap[type]?.key;
  if (!storageKey) return;
  
  try {
    // Get current items
    let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Check if item with the same ID already exists
    const existingIndex = items.findIndex(i => i.id == item.id);
    
    if (existingIndex >= 0) {
      // Update existing item
      items[existingIndex] = item;
    } else {
      // Add new item
      items.push(item);
    }
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(items));
    
    // Update last sync time
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    
    console.log(`Saved ${entityMap[type].name.toLowerCase()} to localStorage:`, item);
  } catch (err) {
    console.error('Error saving to localStorage:', err);
    alert('Failed to save data. Please try again.');
  }
}

// Generic delete function for all entity types
function deleteItem(type, id) {
  // Map of entity types to their storage keys and friendly names
  const entityMap = {
    'receivable': { 
      key: STORAGE_KEYS.RECEIVABLES, 
      name: 'Receivable', 
      loader: loadReceivables 
    },
    'payable': { 
      key: STORAGE_KEYS.PAYABLES, 
      name: 'Payable', 
      loader: loadPayables 
    },
    'investment': { 
      key: STORAGE_KEYS.INVESTMENTS, 
      name: 'Investment', 
      loader: loadInvestments 
    },
    'budget': { 
      key: STORAGE_KEYS.BUDGETS, 
      name: 'Budget', 
      loader: loadBudgets
    },
    'account': { 
      key: STORAGE_KEYS.ACCOUNTS, 
      name: 'Account', 
      loader: loadAccounts 
    },
    'chit': { 
      key: STORAGE_KEYS.CHITS, 
      name: 'Chit', 
      loader: loadChits 
    },
    'moneyLent': { 
      key: STORAGE_KEYS.MONEY_LENT, 
      name: 'Money Lent', 
      loader: loadMoneyLent 
    },
    'goldItem': { 
      key: STORAGE_KEYS.GOLD_ITEMS, 
      name: 'Gold Item', 
      loader: loadGoldItems 
    },
    'pastExpense': {
      key: STORAGE_KEYS.PAST_EXPENSES,
      name: 'Past Expense',
      loader: loadPastExpenses
    },
    'upcomingExpense': {
      key: STORAGE_KEYS.UPCOMING_EXPENSES,
      name: 'Upcoming Expense',
      loader: loadUpcomingExpenses
    }
  };
  
  const entity = entityMap[type];
  if (!entity) return;
  
  if (confirm(`Are you sure you want to delete this ${entity.name.toLowerCase()}?`)) {
    try {
      // Get current items from localStorage
      let items = JSON.parse(localStorage.getItem(entity.key) || '[]');
      
      // Filter out the item to delete
      items = items.filter(item => item.id != id);
      
      // Save back to localStorage
      localStorage.setItem(entity.key, JSON.stringify(items));
      
      // Reload the appropriate list using the loader function
      if (entity.loader && typeof entity.loader === 'function') {
        entity.loader();
      }
      
      // Update financial totals on dashboard
      updateFinancialSummary();
      
      console.log(`${entity.name} with ID ${id} deleted successfully!`);
    } catch (err) {
      console.error('Error deleting item:', err);
      alert(`Error deleting ${entity.name.toLowerCase()}. Please try again.`);
    }
  }
}

// Helper functions for specific entity types (for backwards compatibility)
function deleteReceivable(id) {
  deleteItem('receivable', id);
}

function deletePayable(id) {
  deleteItem('payable', id);
}

function deleteInvestment(id) {
  deleteItem('investment', id);
}

function deleteBudget(id) {
  deleteItem('budget', id);
}

function deleteAccount(id) {
  deleteItem('account', id);
}

function deleteChit(id) {
  deleteItem('chit', id);
}

function deleteMoneyLent(id) {
  deleteItem('moneyLent', id);
}

function deleteGoldItem(id) {
  deleteItem('goldItem', id);
}

function deletePastExpense(id) {
  deleteItem('pastExpense', id);
}

function deleteUpcomingExpense(id) {
  deleteItem('upcomingExpense', id);
}

// Helper function to format date as MMM DD
function formatDateMMDD(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

// Format date for display (MMM YYYY format)
function formatDateMMYYYY(date) {
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Calculate current chit value based on start date and monthly amount
function calculateChitValue(startDate, monthlyAmount, duration) {
  // Get current date and ensure we're working with Date objects
  const today = new Date();
  startDate = new Date(startDate);
  
  // Set both dates to the 1st of their respective months for accurate month counting
  const startDateFirstOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const todayFirstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Calculate months elapsed since start (1st of each month) 
  const monthsElapsed = (todayFirstOfMonth.getFullYear() - startDateFirstOfMonth.getFullYear()) * 12 + 
                      (todayFirstOfMonth.getMonth() - startDateFirstOfMonth.getMonth());
  
  // If started in the future, value is 0
  if (monthsElapsed < 0) return 0;
  
  // +1 to include the current month if we're past the 1st of the month
  const effectiveMonths = monthsElapsed + 1;
  
  // Calculate based on months elapsed up to duration
  const contributingMonths = Math.min(effectiveMonths, duration);
  return contributingMonths * monthlyAmount;
}

// Get the remaining months until maturity
function getRemainingMonths(maturityDate) {
  const today = new Date();
  maturityDate = new Date(maturityDate);
  
  return (maturityDate.getFullYear() - today.getFullYear()) * 12 + 
       (maturityDate.getMonth() - today.getMonth());
}

// Show modal
function showModal(modalId, skipReset = false) {
  console.log(`Showing modal: ${modalId}`);
  
  const modalElement = document.getElementById(modalId);
  if (!modalElement) {
    console.error(`Modal element with ID ${modalId} not found`);
    return;
  }
  
  modalElement.classList.add('active');
  
  // Only reset the form if skipReset is false (for new items)
  if (!skipReset) {
    if (modalId === 'receivableModal') {
      document.getElementById('receivableModalTitle').textContent = 'Add Receivable';
      document.getElementById('receivableForm').reset();
      document.getElementById('receivableId').value = '';
      
      // Set today's date by default
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      document.getElementById('receivableDueDate').value = formattedDate;
    } 
    else if (modalId === 'payableModal') {
      document.getElementById('payableModalTitle').textContent = 'Add Payable';
      document.getElementById('payableForm').reset();
      document.getElementById('payableId').value = '';
      
      // Set today's date by default
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      document.getElementById('payableDueDate').value = formattedDate;
    }
    else if (modalId === 'investmentModal') {
      document.getElementById('investmentModalTitle').textContent = 'Add Investment';
      document.getElementById('investmentForm').reset();
      document.getElementById('investmentId').value = '';
    }
    else if (modalId === 'budgetModal') {
      document.getElementById('budgetModalTitle').textContent = 'Add Budget';
      document.getElementById('budgetForm').reset();
      document.getElementById('budgetId').value = '';
      
      // Set a default deadline date (1 year from now)
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      const formattedDate = oneYearFromNow.toISOString().split('T')[0];
      document.getElementById('budgetDeadline').value = formattedDate;
    }
    else if (modalId === 'accountModal') {
      document.getElementById('accountModalTitle').textContent = 'Add Bank Account';
      document.getElementById('accountForm').reset();
      document.getElementById('accountId').value = '';
    }
    else if (modalId === 'chitModal') {
      document.getElementById('chitModalTitle').textContent = 'Add Chit';
      document.getElementById('chitForm').reset();
      document.getElementById('chitId').value = '';
      
      // Set default values for new chit
      const today = new Date();
      document.getElementById('chitStartMonth').value = today.getMonth().toString();
      document.getElementById('chitStartYear').value = today.getFullYear().toString();
      document.getElementById('chitDuration').value = '24'; // 2 years default
    }
    else if (modalId === 'moneyLentModal') {
      document.getElementById('moneyLentModalTitle').textContent = 'Add Money Lent';
      document.getElementById('moneyLentForm').reset();
      document.getElementById('moneyLentId').value = '';
      
      // Set today's date by default
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      document.getElementById('moneyLentDate').value = formattedDate;
    }
    else if (modalId === 'pastExpenseModal') {
      document.getElementById('pastExpenseModalTitle').textContent = 'Add Past Expense';
      document.getElementById('pastExpenseForm').reset();
      document.getElementById('pastExpenseId').value = '';
      
      // Set today's date by default
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      document.getElementById('pastExpenseDate').value = formattedDate;
    }
    else if (modalId === 'upcomingExpenseModal') {
      document.getElementById('upcomingExpenseModalTitle').textContent = 'Add Upcoming Expense';
      document.getElementById('upcomingExpenseForm').reset();
      document.getElementById('upcomingExpenseId').value = '';
      
      // Set a default date 30 days from now by default
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const formattedDate = futureDate.toISOString().split('T')[0];
      document.getElementById('upcomingExpenseDate').value = formattedDate;
    }
    else if (modalId === 'goldItemModal') {
      document.getElementById('goldItemModalTitle').textContent = 'Add Gold Item';
      document.getElementById('goldItemForm').reset();
      document.getElementById('goldItemId').value = '';
    }
  }
}

// Hide modal
function hideModal(modalId) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) {
    console.error(`Modal element with ID ${modalId} not found while trying to hide it`);
    return;
  }
  
  modalElement.classList.remove('active');
}