let totalBudget = 0;
let totalExpenses = 0;

const budgetInput = document.getElementById('total-budget');
const productNameInput = document.getElementById('product-name');
const priceInput = document.getElementById('price');
const productCountInput = document.getElementById('product-count');

const addProductButton = document.getElementById('add-product');
const productList = document.getElementById('product-list');
const totalExpensesElement = document.getElementById('total-expenses');
const remainingBudgetElement = document.getElementById('remaining-budget');
const totalMoneyElement = document.getElementById('total-money');

// Function to update the summary (expenses and remaining budget)
function updateSummary() {
    totalExpensesElement.textContent = totalExpenses;
    const remaining = totalBudget - totalExpenses;
    remainingBudgetElement.textContent = remaining >= 0 ? remaining : 0;
    totalMoneyElement.textContent = totalBudget;
}

// Function to add product to the list
function addProduct() {
    const productName = productNameInput.value;
    const price = parseFloat(priceInput.value);
    const productCount = parseInt(productCountInput.value);

    if (!productName || price <= 0 || productCount <= 0) {
        alert('Please enter valid product details.');
        return;
    }

    const productCost = price * productCount;
    totalExpenses += productCost;

    const productRow = document.createElement('div');
    productRow.classList.add('product-row');
    productRow.innerHTML = `
        <span>${productName}</span>
        <span>$${productCost}</span>
        <button onclick="deleteProduct(this, ${productCost})">Delete</button>
    `;

    productList.appendChild(productRow);
    updateSummary();

    // Clear inputs
    productNameInput.value = '';
    priceInput.value = '';
    productCountInput.value = '';
}

// Function to delete product from the list
function deleteProduct(element, productCost) {
    productList.removeChild(element.parentElement);
    totalExpenses -= productCost;
    updateSummary();
}

// Event listener to add product on button click
addProductButton.addEventListener('click', () => {
    totalBudget = parseFloat(budgetInput.value);
    addProduct();
    updateSummary();
});
