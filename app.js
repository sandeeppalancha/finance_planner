// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/finance_planner/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Global variable to track if modals are ready
window.modalsLoaded = true; // Set to true since modals are now embedded in the HTML

// Initialize app
function initApp() {
  console.log('Initializing app...');
  
  // DOM Elements
  const offlineBanner = document.getElementById('offlineBanner');
  const startupScreen = document.getElementById('startupScreen');
  
  // Hide startup screen after a delay
  setTimeout(() => {
    if (startupScreen) {
      startupScreen.classList.add('hide');
    }
  }, 2000);
  
  // Show offline banner if needed
  checkConnectivity();
  
  // Add event listeners
  window.addEventListener('online', checkConnectivity);
  window.addEventListener('offline', checkConnectivity);
  
  // Load ALL data
  console.log('Loading all data on app start');
  loadAllData();
  
  // Update financial summary
  updateFinancialSummary();
  
  // Add page-switching event listeners
  addPageSwitchListeners();
  
  // Setup add buttons
  setupAddButtons();
  
  // Setup form listeners
  setupFormListeners();
  
  // Setup investment tab toggling
  setupInvestmentTabListeners();
}

// Setup investment tab toggling
function setupInvestmentTabListeners() {
  const recurringRadio = document.getElementById('investmentRecurring');
  const oneTimeRadio = document.getElementById('investmentOneTime');
  const recurringFields = document.getElementById('recurringInvestmentFields');
  
  if (recurringRadio && oneTimeRadio && recurringFields) {
    recurringRadio.addEventListener('change', function() {
      if (this.checked) {
        recurringFields.style.display = 'block';
      }
    });
    
    oneTimeRadio.addEventListener('change', function() {
      if (this.checked) {
        recurringFields.style.display = 'none';
      }
    });
  } else {
    console.log('Investment radio buttons not found yet. Will try again later.');
    setTimeout(setupInvestmentTabListeners, 500);
  }
}

// Setup add buttons to handle the case when modals aren't loaded yet
function setupAddButtons() {
  // Get all add buttons
  const addButtons = {
    'addReceivableBtn': 'receivableModal',
    'addPayableBtn': 'payableModal',
    'addInvestmentBtn': 'investmentModal',
    'addGoldItemBtn': 'goldItemModal',
    'addBudgetBtn': 'budgetModal',
    'addAccountBtn': 'accountModal',
    'addChitBtn': 'chitModal',
    'addMoneyLentBtn': 'moneyLentModal',
    'addPastExpenseBtn': 'pastExpenseModal',
    'addUpcomingExpenseBtn': 'upcomingExpenseModal',
    'addLoanBtn': 'loanModal'
  };
  
  // Add click listeners to each button
  for (const [buttonId, modalId] of Object.entries(addButtons)) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', function() {
        // Now, we can simply call showModal directly
        showModal(modalId);
      });
    }
  }
}

// Setup form listeners
function setupFormListeners() {
  console.log('Setting up form listeners...');
  
  // Setup receivable form
  const receivableForm = document.getElementById('receivableForm');
  if (receivableForm) {
    receivableForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('receivableId').value;
      const from = document.getElementById('receivableFrom').value;
      const amount = document.getElementById('receivableAmount').value;
      const dueDate = document.getElementById('receivableDueDate').value;
      const description = document.getElementById('receivableDescription').value;
      
      // Create or update receivable
      const receivable = {
        id: id ? parseInt(id) : Date.now(), // Use existing ID or create new one
        from,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate).toISOString(),
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('receivable', receivable);
      
      // Refresh receivables list
      loadReceivables();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('receivableModal');
    });
  } else {
    console.error('Receivable form not found');
  }
  
  // Setup payable form
  const payableForm = document.getElementById('payableForm');
  if (payableForm) {
    payableForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('payableId').value;
      const to = document.getElementById('payableTo').value;
      const amount = document.getElementById('payableAmount').value;
      const dueDate = document.getElementById('payableDueDate').value;
      const description = document.getElementById('payableDescription').value;
      
      // Create or update payable
      const payable = {
        id: id ? parseInt(id) : Date.now(),
        to,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate).toISOString(),
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('payable', payable);
      
      // Refresh payables list
      loadPayables();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('payableModal');
    });
  } else {
    console.error('Payable form not found');
  }
  
  // Setup investment form
  const investmentForm = document.getElementById('investmentForm');
  if (investmentForm) {
    investmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('investmentId').value;
      const name = document.getElementById('investmentName').value;
      const amount = document.getElementById('investmentAmount').value;
      const type = document.getElementById('investmentType').value;
      const description = document.getElementById('investmentDescription').value;
      const isRecurring = document.getElementById('investmentRecurring').checked;
      
      // Create investment object with common properties
      let investment = {
        id: id ? parseInt(id) : Date.now(),
        name,
        amount: parseFloat(amount),
        type,
        description,
        isRecurring
      };
      
      // Add recurring-specific properties if applicable
      if (isRecurring) {
        const frequency = document.getElementById('investmentFrequency').value;
        const startDate = document.getElementById('investmentStartDate').value;
        const endDate = document.getElementById('investmentEndDate').value;
        
        investment = {
          ...investment,
          frequency,
          startDate: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
          endDate: endDate ? new Date(endDate).toISOString() : null
        };
      }
      
      // Save to localStorage
      saveToLocalStorage('investment', investment);
      
      // Refresh investments list
      loadInvestments();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('investmentModal');
    });
  } else {
    console.error('Investment form not found');
  }
  
  // Setup gold item form
  const goldItemForm = document.getElementById('goldItemForm');
  if (goldItemForm) {
    goldItemForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('goldItemId').value;
      const name = document.getElementById('goldItemName').value;
      const type = document.getElementById('goldItemType').value;
      const weight = document.getElementById('goldItemWeight').value;
      const user = document.getElementById('goldItemUser').value;
      const description = document.getElementById('goldItemDescription').value;
      
      // Create or update gold item
      const goldItem = {
        id: id ? parseInt(id) : Date.now(),
        name,
        type,
        weight: parseFloat(weight),
        user,
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('goldItem', goldItem);
      
      // Refresh gold items list
      loadGoldItems();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('goldItemModal');
    });
  } else {
    console.error('Gold item form not found');
  }

  const loanForm = document.getElementById('loanForm');
  if (loanForm) {
    loanForm.addEventListener('submit', function(e) {
      e.preventDefault();

      console.log("Loan submit handler");
      
      
      // Get form data
      const id = document.getElementById('loanId').value;
      const name = document.getElementById('loanName').value;
      const type = document.getElementById('loanType').value;
      const amount = document.getElementById('loanAmount').value;
      const emi = document.getElementById('loanEMI').value;
      const startDate = document.getElementById('loanStartDate').value;
      const totalEMIs = document.getElementById('loanTotalEMIs').value;
      const interestRate = document.getElementById('loanInterestRate').value;
      const lender = document.getElementById('loanLender').value;
      const description = document.getElementById('loanDescription').value;
      
      // Create or update loan
      const loan = {
        id: id ? parseInt(id) : Date.now(),
        name,
        type,
        amount: parseFloat(amount),
        emi: parseFloat(emi),
        startDate: new Date(startDate).toISOString(),
        totalEMIs: parseInt(totalEMIs),
        interestRate: interestRate ? parseFloat(interestRate) : null,
        lender,
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('loan', loan);
      
      // Refresh loans list
      loadLoans();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('loanModal');
    });
  } else {
    console.error('Loan form not found');
  }
  
  // Setup budget form
  const budgetForm = document.getElementById('budgetForm');
  if (budgetForm) {
    budgetForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('budgetId').value;
      const name = document.getElementById('budgetName').value;
      const targetAmount = document.getElementById('budgetTargetAmount').value;
      const category = document.getElementById('budgetCategory').value;
      const deadline = document.getElementById('budgetDeadline').value;
      
      // Create or update budget
      const budget = {
        id: id ? parseInt(id) : Date.now(),
        name,
        targetAmount: parseFloat(targetAmount),
        category,
        deadline: new Date(deadline).toISOString()
      };
      
      // Save to localStorage
      saveToLocalStorage('budget', budget);
      
      // Refresh budgets list
      loadBudgets();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('budgetModal');
    });
  } else {
    console.error('Budget form not found');
  }
  
  // Setup account form
  const accountForm = document.getElementById('accountForm');
  if (accountForm) {
    accountForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('accountId').value;
      const name = document.getElementById('accountName').value;
      const accountNumber = document.getElementById('accountNumber').value;
      const balance = document.getElementById('accountBalance').value;
      
      // Create or update account
      const account = {
        id: id ? parseInt(id) : Date.now(),
        name,
        accountNumber,
        balance: parseFloat(balance)
      };
      
      // Save to localStorage
      saveToLocalStorage('account', account);
      
      // Refresh accounts list
      loadAccounts();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('accountModal');
    });
  } else {
    console.error('Account form not found');
  }
  
  // Setup chit form
  const chitForm = document.getElementById('chitForm');
  if (chitForm) {
    chitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('chitId').value;
      const name = document.getElementById('chitName').value;
      const amount = document.getElementById('chitAmount').value;
      const startMonth = document.getElementById('chitStartMonth').value;
      const startYear = document.getElementById('chitStartYear').value;
      const duration = document.getElementById('chitDuration').value;
      const description = document.getElementById('chitDescription').value;
      
      // Create start and maturity dates
      const startDate = new Date(parseInt(startYear), parseInt(startMonth), 1);
      const maturityDate = new Date(startDate);
      maturityDate.setMonth(maturityDate.getMonth() + parseInt(duration));
      
      // Create or update chit
      const chit = {
        id: id ? parseInt(id) : Date.now(),
        name,
        amount: parseFloat(amount),
        startDate: startDate.toISOString(),
        maturityDate: maturityDate.toISOString(),
        duration: parseInt(duration),
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('chit', chit);
      
      // Refresh chits list
      loadChits();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('chitModal');
    });
  } else {
    console.error('Chit form not found');
  }
  
  // Setup money lent form
  const moneyLentForm = document.getElementById('moneyLentForm');
  if (moneyLentForm) {
    moneyLentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('moneyLentId').value;
      const to = document.getElementById('moneyLentTo').value;
      const amount = document.getElementById('moneyLentAmount').value;
      const date = document.getElementById('moneyLentDate').value;
      const description = document.getElementById('moneyLentDescription').value;
      
      // Create or update money lent
      const moneyLent = {
        id: id ? parseInt(id) : Date.now(),
        to,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('moneyLent', moneyLent);
      
      // Refresh money lent list
      loadMoneyLent();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('moneyLentModal');
    });
  } else {
    console.error('Money lent form not found');
  }
  
  // Setup past expense form
  const pastExpenseForm = document.getElementById('pastExpenseForm');
  if (pastExpenseForm) {
    pastExpenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('pastExpenseId').value;
      const name = document.getElementById('pastExpenseName').value;
      const amount = document.getElementById('pastExpenseAmount').value;
      const date = document.getElementById('pastExpenseDate').value;
      const category = document.getElementById('pastExpenseCategory').value;
      const description = document.getElementById('pastExpenseDescription').value;
      
      // Create or update past expense
      const pastExpense = {
        id: id ? parseInt(id) : Date.now(),
        name,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
        category,
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('pastExpense', pastExpense);
      
      // Refresh past expenses list
      loadPastExpenses();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('pastExpenseModal');
    });
  } else {
    console.error('Past expense form not found');
  }
  
  // Setup upcoming expense form
  const upcomingExpenseForm = document.getElementById('upcomingExpenseForm');
  if (upcomingExpenseForm) {
    upcomingExpenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const id = document.getElementById('upcomingExpenseId').value;
      const name = document.getElementById('upcomingExpenseName').value;
      const amount = document.getElementById('upcomingExpenseAmount').value;
      const date = document.getElementById('upcomingExpenseDate').value;
      const category = document.getElementById('upcomingExpenseCategory').value;
      const description = document.getElementById('upcomingExpenseDescription').value;
      
      // Create or update upcoming expense
      const upcomingExpense = {
        id: id ? parseInt(id) : Date.now(),
        name,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
        category,
        description
      };
      
      // Save to localStorage
      saveToLocalStorage('upcomingExpense', upcomingExpense);
      
      // Refresh upcoming expenses list
      loadUpcomingExpenses();
      
      // Update dashboard
      updateFinancialSummary();
      
      // Close modal
      hideModal('upcomingExpenseModal');
    });
  } else {
    console.error('Upcoming expense form not found');
  }
}

// Add listeners for page switching to ensure data is always refreshed
function addPageSwitchListeners() {
  // When dashboard tab is clicked, refresh all summary data
  const dashboardTab = document.querySelector('.tab[onclick*="switchPage(\'dashboardPage\')"]');
  if (dashboardTab) {
    dashboardTab.addEventListener('click', function() {
      // Need a slight delay to ensure the page is actually showing
      setTimeout(() => {
        updateFinancialSummary();
      }, 100);
    });
  }
  
  // For the money tab, ensure the appropriate subpage is loaded with fresh data
  const moneyTab = document.querySelector('.tab[onclick*="switchPage(\'moneyPage\')"]');
  if (moneyTab) {
    moneyTab.addEventListener('click', function() {
      // Need a slight delay to ensure the page is actually showing
      setTimeout(() => {
        loadReceivables(); // Default subpage for money tab
      }, 100);
    });
  }
  
  // For the investments tab
  const investmentsTab = document.querySelector('.tab[onclick*="switchPage(\'investmentsPage\')"]');
  if (investmentsTab) {
    investmentsTab.addEventListener('click', function() {
      // Need a slight delay to ensure the page is actually showing
      setTimeout(() => {
        loadInvestments();
      }, 100);
    });
  }
  
  // For the planning tab
  const planningTab = document.querySelector('.tab[onclick*="switchPage(\'planningPage\')"]');
  if (planningTab) {
    planningTab.addEventListener('click', function() {
      // Need a slight delay to ensure the page is actually showing
      setTimeout(() => {
        loadBudgets(); // Default subpage for planning tab
      }, 100);
    });
  }
}

// Check if offline
function checkConnectivity() {
  const offlineBanner = document.getElementById('offlineBanner');
  if (!offlineBanner) return;
  
  if (navigator.onLine) {
    offlineBanner.classList.remove('visible');
  } else {
    offlineBanner.classList.add('visible');
  }
}

// Initialize financial data
function initializeFinancialData() {
  // Only use data from localStorage - no dummy data
  loadAllData();
  
  // Also create appropriate page-switching events
  addPageSwitchListeners();
  
  // Update financial summary based on localStorage data
  updateFinancialSummary();
}

// Call init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);