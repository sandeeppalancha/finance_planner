// Get DOM Elements
const pages = document.querySelectorAll('.page');
const tabs = document.querySelectorAll('.tab');

// Switch between pages
function switchPage(pageId) {
  console.log('Switching to page:', pageId);
  
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Handle grouped pages
  if (pageId === 'moneyPage') {
    console.log('Money page selected, showing receivablesPage and money submenu');
    // Show Receivables by default when Money tab is clicked
    const receivablesPage = document.getElementById('receivablesPage');
    if (receivablesPage) {
      receivablesPage.classList.add('active');
      
      // Load receivables data
      loadReceivables();
      
      // Also load Money submenu
      loadSubMenu('money');
    } else {
      console.error('receivablesPage element not found');
    }
  } else if (pageId === 'planningPage') {
    console.log('Planning page selected, showing budgetsPage and planning submenu');
    // Show Budgets by default when Planning tab is clicked
    const budgetsPage = document.getElementById('budgetsPage');
    if (budgetsPage) {
      budgetsPage.classList.add('active');
      
      // Load budgets data
      loadBudgets();
      
      // Also load Planning submenu
      loadSubMenu('planning');
    } else {
      console.error('budgetsPage element not found');
    }
  } else {
    console.log('Regular page selected:', pageId);
    // Show the exact page for non-grouped tabs
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      
      // Load data for investmentsPage (includes gold items)
      if (pageId === 'investmentsPage') {
        loadInvestments();
        // Gold Items will be loaded when tab is switched
      }
    } else {
      console.error('Page not found:', pageId);
    }
    
    // Clear any submenu
    clearSubMenu();
  }
  
  // Update tabs
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Find the tab that points to this page
  const activeTab = Array.from(tabs).find(tab => {
    const onclickAttr = tab.getAttribute('onclick') || '';
    return onclickAttr.includes(pageId);
  });
  
  if (activeTab) {
    activeTab.classList.add('active');
  } else {
    console.error('No matching tab found for page:', pageId);
  }
}

function highlightMainTab(mainTabId) {
  // Remove active class from all tabs
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Find and activate the correct tab
  const activeTab = Array.from(tabs).find(tab => {
    const onclickAttr = tab.getAttribute('onclick') || '';
    return onclickAttr.includes(mainTabId);
  });
  
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

// Handle submenu for grouped pages
function loadSubMenu(group) {
  console.log(`Loading submenu for group: ${group}`);
  
  // Clear any existing submenu
  clearSubMenu();
  
  // Create submenu container if it doesn't exist
  let submenu = document.getElementById('submenu');
  if (!submenu) {
    submenu = document.createElement('div');
    submenu.id = 'submenu';
    submenu.className = 'submenu';
    
    // Add to DOM
    const mainContent = document.querySelector('.app-container');
    if (mainContent) {
      mainContent.insertBefore(submenu, mainContent.firstChild);
    } else {
      console.error('Could not find .app-container to insert submenu');
      return;
    }
  }
  
  // Add appropriate submenu options based on group
  if (group === 'money') {
    submenu.innerHTML = `
      <a href="#" class="submenu-item active" onclick="switchSubPage('receivablesPage')">Receivables</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('payablesPage')">Payables</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('accountsPage')">Accounts</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('moneyLentPage')">Money Lent</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('loansPage')">Loans</a>
    `;
  } else if (group === 'planning') {
    submenu.innerHTML = `
      <a href="#" class="submenu-item active" onclick="switchSubPage('budgetsPage')">Budgets</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('chitsPage')">Chits</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('pastExpensesPage')">Past Expenses</a>
      <a href="#" class="submenu-item" onclick="switchSubPage('upcomingExpensesPage')">Upcoming Expenses</a>
    `;
  }
}

function clearSubMenu() {
  const submenu = document.getElementById('submenu');
  if (submenu) {
    submenu.remove();
  }
}

function switchSubPage(pageId) {
  console.log(`Switching to sub-page: ${pageId}`);
  
  // First check if the page element exists
  const pageElement = document.getElementById(pageId);
  if (!pageElement) {
    console.error(`Page element with ID ${pageId} does not exist`);
    return;
  }
  
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Show the selected subpage
  pageElement.classList.add('active');
  
  // Update submenu items
  const submenuItems = document.querySelectorAll('.submenu-item');
  submenuItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Find and activate the clicked submenu item
  const activeItem = Array.from(submenuItems).find(item => {
    const onclickAttr = item.getAttribute('onclick') || '';
    return onclickAttr.includes(pageId);
  });
  
  if (activeItem) {
    activeItem.classList.add('active');
  }
  
  // Also ensure the correct main tab is highlighted
  setTimeout(() => {
    switch (pageId) {
      case 'receivablesPage':
      case 'payablesPage':
      case 'accountsPage':
      case 'moneyLentPage':
      case 'loansPage':
        // Highlight money tab
        highlightMainTab('moneyPage');
        break;
      case 'budgetsPage':
      case 'chitsPage':
      case 'pastExpensesPage':
      case 'upcomingExpensesPage':
        // Highlight planning tab
        highlightMainTab('planningPage');
        break;
    }
    
    // Load appropriate data
    switch (pageId) {
      case 'receivablesPage':
        loadReceivables();
        break;
      case 'payablesPage':
        loadPayables();
        break;
      case 'accountsPage':
        loadAccounts();
        break;
      case 'moneyLentPage':
        loadMoneyLent();
        break;
      case 'loansPage':
        loadLoans();
        break;
      case 'budgetsPage':
        loadBudgets();
        break;
      case 'chitsPage':
        loadChits();
        break;
      case 'pastExpensesPage':
        loadPastExpenses();
        break;
      case 'upcomingExpensesPage':
        loadUpcomingExpenses();
        break;
      default:
        console.log(`No specific data loading for ${pageId}`);
    }
  }, 100);
}

// Handle switching between investment tabs
function switchInvestmentTab(tab) {
  console.log(`Switching investment tab to: ${tab}`);
  
  const regularTab = document.getElementById('regularInvestmentsTab');
  const goldTab = document.getElementById('goldInvestmentsTab');
  
  if (!regularTab || !goldTab) {
    console.error('Investment tabs not found:', regularTab, goldTab);
    return;
  }
  
  const tabButtons = document.querySelectorAll('.page-tab');
  
  if (tab === 'regular') {
    regularTab.style.display = 'block';
    goldTab.style.display = 'none';
    
    if (tabButtons.length >= 2) {
      tabButtons[0].classList.add('active');
      tabButtons[1].classList.remove('active');
    }
    
    loadInvestments();
  } else if (tab === 'gold') {
    regularTab.style.display = 'none';
    goldTab.style.display = 'block';
    
    if (tabButtons.length >= 2) {
      tabButtons[0].classList.remove('active');
      tabButtons[1].classList.add('active');
    }
    
    loadGoldItems();
  }
}