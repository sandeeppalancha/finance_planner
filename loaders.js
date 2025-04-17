// Load all data from localStorage
function loadAllData() {
  console.log('Starting to load all data...');
  try {
    console.log('Loading receivables...');
    loadReceivables();
    
    console.log('Loading payables...');
    loadPayables();
    
    console.log('Loading investments...');
    loadInvestments();
    
    console.log('Loading gold items...');
    loadGoldItems();
    
    console.log('Loading budgets...');
    loadBudgets();
    
    console.log('Loading accounts...');
    loadAccounts();
    
    console.log('Loading chits...');
    loadChits();
    
    console.log('Loading money lent...');
    loadMoneyLent();
    
    console.log('Loading past expenses...');
    loadPastExpenses();
    
    console.log('Loading upcoming expenses...');
    loadUpcomingExpenses();
    
    console.log('Updating financial summary...');
    updateFinancialSummary();
    
    console.log('All data loaded successfully!');
  } catch (error) {
    console.error('Error loading all data:', error);
  }
}

// Load receivables from localStorage
function loadReceivables() {
  try {
    const receivables = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECEIVABLES) || '[]');
    const tbody = document.querySelector('#receivablesTable tbody');
    
    if (!tbody) {
      console.error('Receivables table body not found');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (receivables.length === 0) {
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">No receivables yet. Click "+ Add Receivable" to create one.</td></tr>`;
      return;
    }
    
    // Sort by due date (ascending)
    receivables.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Add rows
    receivables.forEach((receivable) => {
      const dueDate = new Date(receivable.dueDate);
      const formattedDate = `${dueDate.toLocaleString('default', { month: 'short' })} ${dueDate.getDate()}`;
      
      const row = document.createElement('tr');
      row.id = `receivable-${receivable.id}`;
      row.innerHTML = `
        <td>${receivable.from}</td>
        <td>₹${receivable.amount.toLocaleString()}</td>
        <td>${formattedDate}</td>
        <td>
          <button onclick="editReceivable(${receivable.id})">Edit</button>
          <button onclick="deleteReceivable(${receivable.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading receivables:', err);
  }
}

// Load payables from localStorage
function loadPayables() {
  try {
    const payables = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYABLES) || '[]');
    const tbody = document.querySelector('#payablesTable tbody');
    
    if (!tbody) {
      console.error('Payables table body not found');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (payables.length === 0) {
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">No payables yet. Click "+ Add Payable" to create one.</td></tr>`;
      return;
    }
    
    // Sort by due date (ascending)
    payables.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Add rows
    payables.forEach((payable) => {
      const dueDate = new Date(payable.dueDate);
      const formattedDate = `${dueDate.toLocaleString('default', { month: 'short' })} ${dueDate.getDate()}`;
      
      const row = document.createElement('tr');
      row.id = `payable-${payable.id}`;
      row.innerHTML = `
        <td>${payable.to}</td>
        <td>₹${payable.amount.toLocaleString()}</td>
        <td>${formattedDate}</td>
        <td>
          <button onclick="editPayable(${payable.id})">Edit</button>
          <button onclick="deletePayable(${payable.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading payables:', err);
  }
}

// Load investments from localStorage
function loadInvestments() {
  try {
    const investments = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVESTMENTS) || '[]');
    const tbody = document.querySelector('#investmentsTable tbody');
    
    if (!tbody) {
      console.error('Investments table body not found');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (investments.length === 0) {
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No investments yet. Click "+ Add Investment" to create one.</td></tr>`;
      return;
    }
    
    // Add rows
    investments.forEach((investment) => {
      const frequencyText = investment.isRecurring 
        ? (investment.frequency || 'Monthly')
        : 'One-time';
      
      const row = document.createElement('tr');
      row.id = `investment-${investment.id}`;
      row.innerHTML = `
        <td>${investment.name}</td>
        <td>${investment.type || 'General'}</td>
        <td>₹${investment.amount.toLocaleString()}</td>
        <td>${frequencyText}</td>
        <td>
          <button onclick="editInvestment(${investment.id})">Edit</button>
          <button onclick="deleteInvestment(${investment.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading investments:', err);
  }
}

// Load gold items from localStorage
function loadGoldItems() {
  try {
    const goldItems = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOLD_ITEMS) || '[]');
    const tbody = document.querySelector('#goldItemsTable tbody');
    
    if (!tbody) {
      console.error('Gold items table body not found');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (goldItems.length === 0) {
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No gold items yet. Click "+ Add Gold Item" to create one.</td></tr>`;
      return;
    }
    
    // Add rows
    goldItems.forEach((item) => {
      const row = document.createElement('tr');
      row.id = `goldItem-${item.id}`;
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.weight.toFixed(2)} g</td>
        <td>${item.user}</td>
        <td>
          <button onclick="editGoldItem(${item.id})">Edit</button>
          <button onclick="deleteGoldItem(${item.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading gold items:', err);
  }
}

// Load budgets from localStorage
function loadBudgets() {
  try {
    const budgets = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUDGETS) || '[]');
    const tbody = document.querySelector('#budgetsTable tbody');
    
    if (!tbody) {
      console.error('Budgets table body not found');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (budgets.length === 0) {
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">No budgets yet. Click "+ Add Budget" to create one.</td></tr>`;
      return;
    }
    
    // Add rows
    budgets.forEach((budget) => {
      const deadline = new Date(budget.deadline);
      const formattedDate = `${deadline.toLocaleString('default', { month: 'short' })} ${deadline.getFullYear()}`;
      
      const row = document.createElement('tr');
      row.id = `budget-${budget.id}`;
      row.innerHTML = `
        <td>${budget.name}</td>
        <td>₹${budget.targetAmount.toLocaleString()}</td>
        <td>${formattedDate}</td>
        <td>
          <button onclick="editBudget(${budget.id})">Edit</button>
          <button onclick="deleteBudget(${budget.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading budgets:', err);
  }
}

// Load accounts from localStorage
function loadAccounts() {
  console.log('Loading accounts data');
  try {
    // Get the accounts data
    const accountsJSON = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    console.log('Raw accounts JSON from localStorage:', accountsJSON);
    
    const accounts = JSON.parse(accountsJSON || '[]');
    console.log('Parsed accounts data:', accounts);
    
    // Important - make sure we're looking at the right element
    const accountsTable = document.getElementById('accountsTable');
    console.log('Found accountsTable?', accountsTable ? 'Yes' : 'No');
    
    // Now get the tbody
    const tbody = document.querySelector('#accountsTable tbody');
    console.log('Found accounts table body?', tbody ? 'Yes' : 'No');
    
    if (!tbody) {
      console.error('Could not find accounts table body element');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (accounts.length === 0) {
      console.log('No accounts found, showing empty state');
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">No accounts yet. Click "+ Add Account" to create one.</td></tr>`;
      return;
    }
    
    // Add rows
    accounts.forEach((account) => {
      const row = document.createElement('tr');
      row.id = `account-${account.id}`;
      row.innerHTML = `
        <td>${account.name}</td>
        <td>${account.accountNumber}</td>
        <td>₹${parseFloat(account.balance).toLocaleString()}</td>
        <td>
          <button onclick="editAccount(${account.id})">Edit</button>
          <button onclick="deleteAccount(${account.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
    
    console.log('Accounts loaded successfully');
  } catch (err) {
    console.error('Error loading accounts:', err);
  }
}

// Load chits from localStorage
function loadChits() {
  try {
    const chits = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHITS) || '[]');
    const chitsList = document.getElementById('chitsList');
    const maturityList = document.querySelector('.maturity-list');
    
    if (!chitsList || !maturityList) {
      console.error('Chits list or maturity list element not found');
      return;
    }
    
    // Clear existing items
    chitsList.innerHTML = '';
    maturityList.innerHTML = '';
    
    if (chits.length === 0) {
      // Show empty state
      chitsList.innerHTML = `<p class="empty-state">No chits yet. Click "+ Add Chit" to create one.</p>`;
      maturityList.innerHTML = `<p class="empty-state">No upcoming maturities.</p>`;
      return;
    }
    
    // Add chit items
    chits.forEach((chit) => {
      const startDate = new Date(chit.startDate);
      const maturityDate = new Date(chit.maturityDate);
      const formattedStartDate = startDate.toLocaleString('default', { month: 'short' }) + ' ' + startDate.getFullYear();
      
      // Calculate current value
      const currentValue = calculateChitValue(startDate, chit.amount, chit.duration);
      
      const chitItem = document.createElement('div');
      chitItem.className = 'list-item';
      chitItem.id = `chit-${chit.id}`;
      chitItem.innerHTML = `
        <div class="item-main">
          <div class="item-name">${chit.name}</div>
          <div class="item-details">₹${chit.amount.toLocaleString()} monthly • Started: ${formattedStartDate}</div>
        </div>
        <div class="item-amount">₹${currentValue.toLocaleString()}</div>
        <div class="item-actions">
          <button class="edit-button" onclick="editChit(${chit.id})">Edit</button>
          <button class="delete-button" onclick="deleteChit(${chit.id})">Delete</button>
        </div>
      `;
      
      chitsList.appendChild(chitItem);
      
      // Add to maturity timeline
      const monthsRemaining = getRemainingMonths(maturityDate);
      const progress = (chit.duration - monthsRemaining) / chit.duration * 100;
      const finalAmount = chit.amount * chit.duration;
      
      const maturityItem = document.createElement('div');
      maturityItem.className = 'maturity-item';
      maturityItem.innerHTML = `
        <div class="maturity-info">
          <span class="maturity-name">${chit.name}</span>
          <span class="maturity-date">${formatDateMMYYYY(maturityDate)}</span>
        </div>
        <div class="maturity-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="maturity-details">
            <span class="months-remaining">${monthsRemaining} months remaining</span>
            <span class="final-amount">Final: ₹${finalAmount.toLocaleString()}</span>
          </div>
        </div>
      `;
      
      maturityList.appendChild(maturityItem);
    });
  } catch (err) {
    console.error('Error loading chits:', err);
  }
}

// Load money lent from localStorage
function loadMoneyLent() {
  console.log('Loading money lent data');
  try {
    const moneyLent = JSON.parse(localStorage.getItem(STORAGE_KEYS.MONEY_LENT) || '[]');
    const tbody = document.querySelector('#moneyLentTable tbody');
    
    console.log('Money lent data:', moneyLent);
    console.log('Found money lent table body:', tbody ? 'Yes' : 'No');
    
    if (!tbody) {
      console.error('Could not find money lent table body element');
      return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (moneyLent.length === 0) {
      console.log('No money lent found, showing empty state');
      // Show empty state
      tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No money lent yet. Click "+ Add Money Lent" to create one.</td></tr>`;
      return;
    }
    
    // Sort by date (descending)
    moneyLent.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Calculate total
    let total = 0;
    
    // Add rows
    moneyLent.forEach((item) => {
      const lentDate = new Date(item.date);
      const formattedDate = `${lentDate.toLocaleString('default', { month: 'short' })} ${lentDate.getDate()}, ${lentDate.getFullYear()}`;
      
      // Add to total
      total += parseFloat(item.amount);
      
      const row = document.createElement('tr');
      row.id = `moneyLent-${item.id}`;
      row.innerHTML = `
        <td>${item.to}</td>
        <td>₹${parseFloat(item.amount).toLocaleString()}</td>
        <td>${formattedDate}</td>
        <td>${item.description || '-'}</td>
        <td>
          <button onclick="editMoneyLent(${item.id})">Edit</button>
          <button onclick="deleteMoneyLent(${item.id})">Delete</button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
      <td><strong>Total</strong></td>
      <td><strong>₹${total.toLocaleString()}</strong></td>
      <td colspan="3"></td>
    `;
    tbody.appendChild(totalRow);
    
  } catch (err) {
    console.error('Error loading money lent:', err);
  }
}

// Load past expenses from localStorage
function loadPastExpenses() {
  try {
    const pastExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAST_EXPENSES) || '[]');
    const pastExpensesList = document.getElementById('pastExpensesList');
    const totalRow = document.getElementById('pastExpensesTotalRow');
    
    if (!pastExpensesList || !totalRow) {
      console.error('Past expenses list or total row element not found');
      return;
    }
    
    // Clear existing items
    pastExpensesList.innerHTML = '';
    
    if (pastExpenses.length === 0) {
      // Show empty state
      pastExpensesList.innerHTML = `<p class="empty-state">No past expenses yet. Click "+ Add Expense" to create one.</p>`;
      totalRow.innerHTML = `
        <span class="total-label">Total</span>
        <span class="total-amount">₹0</span>
      `;
      return;
    }
    
    // Sort by date (descending)
    pastExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Calculate total
    let total = 0;
    
    // Add items
    pastExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const formattedDate = `${expenseDate.toLocaleString('default', { month: 'short' })} ${expenseDate.getFullYear()}`;
      
      // Add to total
      total += parseFloat(expense.amount);
      
      const item = document.createElement('div');
      item.className = 'list-item';
      item.id = `pastExpense-${expense.id}`;
      item.innerHTML = `
        <div class="item-main">
          <div class="item-name">${expense.name}</div>
          <div class="item-details">${formattedDate} • ${expense.category || 'General'}</div>
        </div>
        <div class="item-amount">₹${parseFloat(expense.amount).toLocaleString()}</div>
        <div class="item-actions">
          <button class="edit-button" onclick="editPastExpense(${expense.id})">Edit</button>
          <button class="delete-button" onclick="deletePastExpense(${expense.id})">Delete</button>
        </div>
      `;
      
      pastExpensesList.appendChild(item);
    });
    
    // Update total row
    totalRow.innerHTML = `
      <span class="total-label">Total</span>
      <span class="total-amount">₹${total.toLocaleString()}</span>
    `;
  } catch (err) {
    console.error('Error loading past expenses:', err);
  }
}

// Load upcoming expenses from localStorage
function loadUpcomingExpenses() {
  try {
    const upcomingExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.UPCOMING_EXPENSES) || '[]');
    const upcomingExpensesList = document.getElementById('upcomingExpensesList');
    const totalRow = document.getElementById('upcomingExpensesTotalRow');
    
    if (!upcomingExpensesList || !totalRow) {
      console.error('Upcoming expenses list or total row element not found');
      return;
    }
    
    // Clear existing items
    upcomingExpensesList.innerHTML = '';
    
    if (upcomingExpenses.length === 0) {
      // Show empty state
      upcomingExpensesList.innerHTML = `<p class="empty-state">No upcoming expenses yet. Click "+ Add Expense" to create one.</p>`;
      totalRow.innerHTML = `
        <span class="total-label">Total</span>
        <span class="total-amount">₹0</span>
      `;
      return;
    }
    
    // Sort by date (ascending)
    upcomingExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate total
    let total = 0;
    
    // Add items
    upcomingExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const formattedDate = `${expenseDate.toLocaleString('default', { month: 'short' })} ${expenseDate.getFullYear()}`;
      
      // Add to total
      total += parseFloat(expense.amount);
      
      const item = document.createElement('div');
      item.className = 'list-item';
      item.id = `upcomingExpense-${expense.id}`;
      item.innerHTML = `
        <div class="item-main">
          <div class="item-name">${expense.name}</div>
          <div class="item-details">${formattedDate} • ${expense.category || 'General'}</div>
        </div>
        <div class="item-amount">₹${parseFloat(expense.amount).toLocaleString()}</div>
        <div class="item-actions">
          <button class="edit-button" onclick="editUpcomingExpense(${expense.id})">Edit</button>
          <button class="delete-button" onclick="deleteUpcomingExpense(${expense.id})">Delete</button>
        </div>
      `;
      
      upcomingExpensesList.appendChild(item);
    });
    
    // Update total row
    totalRow.innerHTML = `
      <span class="total-label">Total</span>
      <span class="total-amount">₹${total.toLocaleString()}</span>
    `;
  } catch (err) {
    console.error('Error loading upcoming expenses:', err);
  }
}

// Update financial summary on dashboard
function updateFinancialSummary() {
  try {
    // Calculate totals from localStorage
    const receivables = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECEIVABLES) || '[]');
    const payables = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYABLES) || '[]');
    const investments = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVESTMENTS) || '[]');
    const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
    const chits = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHITS) || '[]');
    const moneyLent = JSON.parse(localStorage.getItem(STORAGE_KEYS.MONEY_LENT) || '[]');
    
    // Calculate totals
    const totalReceivables = receivables.reduce((sum, r) => sum + Number(r.amount), 0);
    const totalMoneyLent = moneyLent.reduce((sum, m) => sum + Number(m.amount), 0);
    const totalPayables = payables.reduce((sum, p) => sum + Number(p.amount), 0);
    const totalInvestments = investments.reduce((sum, i) => sum + Number(i.amount), 0);
    const totalBankBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
    
    // Calculate total chit value
    let totalChits = 0;
    chits.forEach(chit => {
      const startDate = new Date(chit.startDate);
      totalChits += calculateChitValue(startDate, Number(chit.amount), Number(chit.duration));
    });
    
    // Calculate net worth
    const netWorth = totalBankBalance + totalReceivables + totalMoneyLent + totalInvestments + totalChits - totalPayables;
    
    // Update UI
    document.getElementById('totalReceivables').textContent = '₹' + totalReceivables.toLocaleString();
    document.getElementById('totalMoneyLent').textContent = '₹' + totalMoneyLent.toLocaleString();
    document.getElementById('totalPayables').textContent = '₹' + totalPayables.toLocaleString();
    document.getElementById('totalInvestments').textContent = '₹' + totalInvestments.toLocaleString();
    document.getElementById('totalChits').textContent = '₹' + totalChits.toLocaleString();
    document.getElementById('totalBankBalance').textContent = '₹' + totalBankBalance.toLocaleString();
    document.getElementById('netWorth').textContent = '₹' + netWorth.toLocaleString();
    
    // Update dashboard tables
    updateDashboardReceivables(receivables);
    updateDashboardMoneyLent(moneyLent);
    updateDashboardPayables(payables);
  } catch (err) {
    console.error('Error updating financial summary:', err);
  }
}

// Update dashboard receivables table
function updateDashboardReceivables(receivables) {
  const table = document.getElementById('dashboardReceivablesTable').getElementsByTagName('tbody')[0];
  if (!table) {
    console.error('Dashboard receivables table body not found');
    return;
  }
  
  table.innerHTML = '';
  
  // Sort by due date (ascending)
  receivables.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  // Take only the first 3 items for dashboard
  const topReceivables = receivables.slice(0, 3);
  
  if (topReceivables.length === 0) {
    const row = table.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 3;
    cell.textContent = 'No receivables found';
    cell.style.textAlign = 'center';
    cell.style.padding = '10px';
    return;
  }
  
  topReceivables.forEach(receivable => {
    const row = table.insertRow();
    
    const fromCell = row.insertCell(0);
    fromCell.textContent = receivable.from;
    
    const amountCell = row.insertCell(1);
    amountCell.textContent = '₹' + Number(receivable.amount).toLocaleString();
    
    const dateCell = row.insertCell(2);
    const dueDate = new Date(receivable.dueDate);
    dateCell.textContent = formatDateMMDD(dueDate);
  });
}

// Update dashboard payables table
function updateDashboardPayables(payables) {
  const table = document.getElementById('dashboardPayablesTable').getElementsByTagName('tbody')[0];
  if (!table) {
    console.error('Dashboard payables table body not found');
    return;
  }
  
  table.innerHTML = '';
  
  // Sort by due date (ascending)
  payables.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  // Take only the first 3 items for dashboard
  const topPayables = payables.slice(0, 3);
  
  if (topPayables.length === 0) {
    const row = table.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 3;
    cell.textContent = 'No payables found';
    cell.style.textAlign = 'center';
    cell.style.padding = '10px';
    return;
  }
  
  topPayables.forEach(payable => {
    const row = table.insertRow();
    
    const toCell = row.insertCell(0);
    toCell.textContent = payable.to;
    
    const amountCell = row.insertCell(1);
    amountCell.textContent = '₹' + Number(payable.amount).toLocaleString();
    
    const dateCell = row.insertCell(2);
    const dueDate = new Date(payable.dueDate);
    dateCell.textContent = formatDateMMDD(dueDate);
  });
}

// Update dashboard money lent table
function updateDashboardMoneyLent(moneyLent) {
  const table = document.getElementById('dashboardMoneyLentTable').getElementsByTagName('tbody')[0];
  if (!table) {
    console.error('Dashboard money lent table body not found');
    return;
  }
  
  table.innerHTML = '';
  
  // Sort by date (descending - most recent first)
  moneyLent.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Take only the first 3 items for dashboard
  const topMoneyLent = moneyLent.slice(0, 3);
  
  if (topMoneyLent.length === 0) {
    const row = table.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 3;
    cell.textContent = 'No money lent found';
    cell.style.textAlign = 'center';
    cell.style.padding = '10px';
    return;
  }
  
  topMoneyLent.forEach(item => {
    const row = table.insertRow();
    
    const toCell = row.insertCell(0);
    toCell.textContent = item.to;
    
    const amountCell = row.insertCell(1);
    amountCell.textContent = '₹' + Number(item.amount).toLocaleString();
    
    const dateCell = row.insertCell(2);
    const lentDate = new Date(item.date);
    dateCell.textContent = formatDateMMDD(lentDate);
  });
}