// ====================================================
// 1. STORE CONFIGURATION & COMPLETE PRODUCT DATABASE
// ====================================================

// Target WhatsApp phone number (International format without '+' or spaces)
const STORE_WHATSAPP_NUMBER = "2347045465015";

// Free image-hosting API key from api.imgbb.com — replace the placeholder
// below with your real key. Used to upload the receipt screenshot so a
// viewable link can be included automatically in the WhatsApp message.
const IMGBB_API_KEY = "003dd6e6f9429388213a5a252ac3c9b5";

// Products are now loaded live from a Google Sheet, so prices/items can be
// edited there directly — no code changes or redeployment needed.
// The sheet must have 3 columns in this order: Product Name | Unit Label | Price
const PRODUCTS_SHEET_ID = "1asqli9G4_sbl2wrcKmKKmAC1KM2AYuDzG4vBXrIZKCY";

let marketProducts = [];

// Fetches the published sheet, parses it, and groups rows by product name
// into the same {name, units: [{label, price}, ...]} shape the rest of the
// app already expects. Falls back to an error state if anything goes wrong.
async function loadProductsFromSheet() {
  const url = `https://docs.google.com/spreadsheets/d/${PRODUCTS_SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);?\s*$/s);
    if (!match) throw new Error("Unexpected response format from Google Sheets");

    const json = JSON.parse(match[1]);
    const rows = json.table.rows || [];

    const grouped = {};
    rows.forEach((row) => {
      const cells = row.c || [];
      const name = cells[0] && cells[0].v ? String(cells[0].v).trim() : null;
      const label = cells[1] && cells[1].v ? String(cells[1].v).trim() : null;
      const priceRaw = cells[2] ? cells[2].v : null;
      const price = typeof priceRaw === "number" ? priceRaw : parseFloat(priceRaw);

      if (!name || !label || isNaN(price)) return; // skip incomplete/blank rows

      if (!grouped[name]) grouped[name] = { name, units: [] };
      grouped[name].units.push({ label, price });
    });

    marketProducts = Object.values(grouped);

    if (marketProducts.length === 0) {
      throw new Error("Sheet loaded but no valid product rows were found");
    }

    productSearchInput.disabled = false;
    productSearchInput.placeholder = "Type to search items (e.g. Milk, Oil, Beans)...";
  } catch (err) {
    console.error("Failed to load products from Google Sheet:", err);
    productSearchInput.disabled = true;
    productSearchInput.placeholder = "Unable to load items — please refresh or try again later";
  }
}


// Application State Variables
let cart = [];
let selectedProductIndex = null;
let currentSelectedPrice = 0;

// DOM Element References
const productSearchInput = document.getElementById("product-search");
const suggestionsBox = document.getElementById("product-suggestions");
const unitSelect = document.getElementById("unit-select");
const quantityInput = document.getElementById("item-quantity");
const unitPriceDisplay = document.getElementById("unit-price-display");
const addItemBtn = document.getElementById("add-item-btn");
const cartList = document.getElementById("cart-list");
const grandTotalDisplay = document.getElementById("grand-total-display");
const checkoutBtn = document.getElementById("checkout-btn");

// Hide suggestions box if clicking outside the input
document.addEventListener("click", (e) => {
  if (e.target !== productSearchInput) {
    suggestionsBox.classList.add("hidden");
  }
});

// ====================================================
// 2. LOCALSTORAGE HELPER FUNCTIONS (BUG PREVENTION)
// ====================================================

function saveCartToStorage() {
  try {
    localStorage.setItem("marketCart", JSON.stringify(cart));
  } catch (e) {
    console.error("Unable to save cart to localStorage:", e);
  }
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("marketCart");
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        cart = parsedCart;
        renderCart();
      }
    } catch (e) {
      console.error("Corrupted localStorage data, resetting cart:", e);
      localStorage.removeItem("marketCart");
      cart = [];
    }
  }
}

// ====================================================
// 3. SEARCH & DYNAMIC FILTERING LOGIC
// ====================================================

function filterProducts() {
  const query = productSearchInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (query === "") {
    suggestionsBox.classList.add("hidden");
    resetSelection();
    return;
  }

  // Filter items matching typed characters
  const matchedProducts = marketProducts
    .map((prod, index) => ({ ...prod, originalIndex: index }))
    .filter((prod) => prod.name.toLowerCase().includes(query));

  if (matchedProducts.length === 0) {
    suggestionsBox.innerHTML = `<div class="suggestion-item" style="color:#888;">No matching items found</div>`;
    suggestionsBox.classList.remove("hidden");
    return;
  }

  // Populate dynamic suggestion list
  matchedProducts.forEach((prod) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "suggestion-item";
    itemDiv.textContent = prod.name;
    itemDiv.onclick = () => selectProduct(prod.originalIndex);
    suggestionsBox.appendChild(itemDiv);
  });

  suggestionsBox.classList.remove("hidden");
}

function selectProduct(index) {
  selectedProductIndex = index;
  const product = marketProducts[index];

  // Set input value to selected item name
  productSearchInput.value = product.name;
  suggestionsBox.classList.add("hidden");

  // Load measurement options into dropdown
  unitSelect.innerHTML = '<option value="">-- Choose measurement --</option>';
  product.units.forEach((u, uIndex) => {
    const opt = document.createElement("option");
    opt.value = uIndex;
    opt.textContent = `${u.label} - ₦${u.price.toLocaleString()}`;
    unitSelect.appendChild(opt);
  });

  unitSelect.disabled = false;
  unitSelect.value = "0"; // Auto-select first measurement option
  updateCalculatedPrice();
}

function resetSelection() {
  selectedProductIndex = null;
  unitSelect.innerHTML = '<option value="">-- Search item first --</option>';
  unitSelect.disabled = true;
  quantityInput.value = "1";
  unitPriceDisplay.value = "₦0.00";
  currentSelectedPrice = 0;
  addItemBtn.disabled = true;
}

// ====================================================
// 4. CALCULATION & MULTIPLIER LOGIC
// ====================================================

function handleUnitChange() {
  updateCalculatedPrice();
}

function updateCalculatedPrice() {
  if (selectedProductIndex === null || unitSelect.value === "") {
    unitPriceDisplay.value = "₦0.00";
    currentSelectedPrice = 0;
    addItemBtn.disabled = true;
    return;
  }

  let qty = parseInt(quantityInput.value) || 1;
  if (qty < 1) {
    qty = 1;
    quantityInput.value = "1";
  }

  const product = marketProducts[selectedProductIndex];
  const unitData = product.units[unitSelect.value];
  currentSelectedPrice = unitData.price * qty;

  unitPriceDisplay.value = `₦${currentSelectedPrice.toLocaleString()} (${qty}x)`;
  addItemBtn.disabled = false;
}

// ====================================================
// 5. CART & ORDER LOGIC WITH PERSISTENCE
// ====================================================

function addToCart() {
  if (selectedProductIndex === null || unitSelect.value === "") return;

  const qty = parseInt(quantityInput.value) || 1;
  const product = marketProducts[selectedProductIndex];
  const unitData = product.units[unitSelect.value];
  const totalPrice = unitData.price * qty;

  const cartItem = {
    id: Date.now(),
    name: product.name,
    unit: `${qty}x ${unitData.label}`,
    price: totalPrice,
  };

  cart.push(cartItem);
  saveCartToStorage(); // Save persistent state
  renderCart();

  // Reset inputs for next search
  productSearchInput.value = "";
  resetSelection();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCartToStorage(); // Save updated state after removal
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart-msg">No items added yet.</p>`;
    grandTotalDisplay.textContent = "₦0.00";
    checkoutBtn.disabled = true;
    updateBudgetRemaining();
    return;
  }

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-title">${item.name}</span>
        <span class="cart-item-unit">${item.unit}</span>
      </div>
      <div>
        <span style="font-weight: 600;">₦${item.price.toLocaleString()}</span>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartList.appendChild(div);
  });

  grandTotalDisplay.textContent = `₦${total.toLocaleString()}`;
  checkoutBtn.disabled = false;
  updateBudgetRemaining();
}

// Reads the customer's optional budget and shows how much of it is left
// (or how far over they've gone) as items are added to the cart.
function updateBudgetRemaining() {
  const budgetInput = document.getElementById("customer-budget");
  const budgetCard = document.getElementById("budget-remaining-card");
  const budgetLabel = document.getElementById("budget-remaining-label");
  const budgetDisplay = document.getElementById("budget-remaining-display");

  const budget = parseFloat(budgetInput.value) || 0;

  if (budget <= 0) {
    budgetCard.classList.add("hidden");
    return;
  }

  budgetCard.classList.remove("hidden");
  const remaining = budget - getGrandTotal();

  if (remaining < 0) {
    budgetCard.classList.add("budget-over");
    budgetLabel.textContent = "Over Budget By:";
    budgetDisplay.textContent = `₦${Math.abs(remaining).toLocaleString()}`;
  } else {
    budgetCard.classList.remove("budget-over");
    budgetLabel.textContent = "Budget Remaining:";
    budgetDisplay.textContent = `₦${remaining.toLocaleString()}`;
  }
}

function getGrandTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function getTotalItemQuantity() {
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

// Fills the final "Order Ready" screen with a big item count, a matching
// row of icons (capped so a bulk order doesn't flood the screen), and the
// total — so the total can be checked at a glance without reading anything.
const MAX_CONFIRM_ICONS = 12;

function populateConfirmationScreen() {
  const totalQty = getTotalItemQuantity();
  const grandTotal = getGrandTotal();

  document.getElementById("confirm-item-count").textContent = totalQty;
  document.getElementById("confirm-total-amount").textContent =
    `₦${grandTotal.toLocaleString()}`;

  const iconsContainer = document.getElementById("confirm-icons");
  iconsContainer.innerHTML = "";

  const iconsToShow = Math.min(totalQty, MAX_CONFIRM_ICONS);
  for (let i = 0; i < iconsToShow; i++) {
    const icon = document.createElement("span");
    icon.className = "confirm-icon";
    icon.textContent = "🛍️";
    iconsContainer.appendChild(icon);
  }

  if (totalQty > MAX_CONFIRM_ICONS) {
    const overflow = document.createElement("span");
    overflow.className = "confirm-icon-overflow";
    overflow.textContent = `+${totalQty - MAX_CONFIRM_ICONS}`;
    iconsContainer.appendChild(overflow);
  }

  const receiptStatusEl = document.getElementById("confirm-receipt-status");
  if (uploadedReceiptFile) {
    receiptStatusEl.classList.remove("hidden");
  } else {
    receiptStatusEl.classList.add("hidden");
  }
}

// ====================================================
// 6. PAYMENT & WHATSAPP INTEGRATION
// ====================================================

function goToPayment() {
  if (cart.length === 0) return;

  document.getElementById("calculator-view").classList.add("hidden");
  document.getElementById("payment-view").classList.remove("hidden");

  const total = getGrandTotal();
  document.getElementById("payment-total-display").textContent =
    `₦${total.toLocaleString()}`;

  const summaryContainer = document.getElementById("payment-items-summary");
  summaryContainer.innerHTML = "";
  cart.forEach((item) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.fontSize = "0.85rem";
    row.style.marginBottom = "4px";
    row.innerHTML = `
      <span>${item.name} (${item.unit})</span>
      <span style="font-weight: 600;">₦${item.price.toLocaleString()}</span>
    `;
    summaryContainer.appendChild(row);
  });
}

function backToCalculator() {
  document.getElementById("payment-view").classList.add("hidden");
  document.getElementById("calculator-view").classList.remove("hidden");
}

function copyAccountNumber() {
  const accNum = document.getElementById("account-number").textContent;
  navigator.clipboard.writeText(accNum);
  alert("Account number copied to clipboard!");
}

function openBankApp() {
  const accNum = document.getElementById("account-number").textContent;
  navigator.clipboard.writeText(accNum);

  alert(`Account number (${accNum}) copied! Opening Moniepoint...`);

  window.location.href = "moniepoint://";
  setTimeout(() => {
    window.location.href = "https://moniepoint.com";
  }, 1500);
}

let uploadedReceiptFile = null; // Holds the real File object for uploading later

function handleReceiptPreview(event) {
  const file = event.target.files[0];
  const previewContainer = document.getElementById("receipt-preview-container");
  const previewImg = document.getElementById("receipt-preview");

  if (file) {
    uploadedReceiptFile = file;
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewContainer.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    uploadedReceiptFile = null;
    previewContainer.classList.add("hidden");
    previewImg.src = "";
  }
}

// Uploads the receipt photo to imgbb (free image host, no backend needed)
// and returns a viewable URL. Returns null if the upload fails for any
// reason, so the caller can fall back gracefully instead of breaking.
async function uploadReceiptToImgbb(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data && data.success && data.data && data.data.url) {
      return data.data.url;
    }

    console.error("imgbb upload did not return a URL:", data);
    return null;
  } catch (err) {
    console.error("Receipt upload failed:", err);
    return null;
  }
}

async function confirmPayment() {
  const senderName = document.getElementById("sender-name").value.trim();
  if (!senderName) {
    alert("Please enter the sender's account name for payment verification.");
    return;
  }

  const hasReceipt = !!uploadedReceiptFile;
  const grandTotal = getGrandTotal();
  const confirmBtn = document.getElementById("confirm-payment-btn");

  let receiptUrl = null;

  if (hasReceipt) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = "Uploading receipt...";
    receiptUrl = await uploadReceiptToImgbb(uploadedReceiptFile);
    confirmBtn.disabled = false;
    confirmBtn.textContent = "I Have Made the Transfer";
  }

  let orderItemsText = "";
  cart.forEach((item, index) => {
    orderItemsText += `${index + 1}. *${item.name}* (${item.unit}) - ₦${item.price.toLocaleString()}\n`;
  });

  let receiptStatusText;
  if (hasReceipt && receiptUrl) {
    receiptStatusText = `📎 *Receipt:* ${receiptUrl}`;
  } else if (hasReceipt && !receiptUrl) {
    receiptStatusText =
      "📎 *Receipt Attached:* Yes (upload failed — customer will attach it manually in this chat)";
  } else {
    receiptStatusText = "📎 *Receipt Attached:* No screenshot attached";
  }

  const message = `*NEW MARKET ORDER & PAYMENT ALERT* 🛒

*Customer Name:* ${senderName}
*Payment Method:* Bank Transfer
${receiptStatusText}

*ORDER BREAKDOWN:*
${orderItemsText}
*TOTAL AMOUNT PAID:* ₦${grandTotal.toLocaleString()}

----------------------------------
_Please confirm receipt of this bank transfer._`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Only fall back to the manual-attach instruction if the automatic
  // upload genuinely failed — otherwise the link is already in the message.
  if (hasReceipt && !receiptUrl) {
    alert(
      "We couldn't upload your receipt automatically. WhatsApp will open now — please tap the 📎 attach icon in that same chat and select your receipt screenshot to send it too.",
    );
  }

  populateConfirmationScreen();

  document.getElementById("payment-view").classList.add("hidden");
  document.getElementById("success-view").classList.remove("hidden");

  window.open(whatsappUrl, "_blank");
}

function resetApp() {
  cart = [];
  uploadedReceiptFile = null;
  localStorage.removeItem("marketCart"); // Clear storage on fresh session
  renderCart();
  document.getElementById("customer-budget").value = "";
  document.getElementById("budget-remaining-card").classList.add("hidden");
  document.getElementById("sender-name").value = "";
  document.getElementById("receipt-upload").value = "";
  document.getElementById("receipt-preview-container").classList.add("hidden");
  document.getElementById("success-view").classList.add("hidden");
  document.getElementById("calculator-view").classList.remove("hidden");
}

// ====================================================
// 7. INITIALIZE APP ON FIRST LOAD
// ====================================================
loadCartFromStorage();
loadProductsFromSheet();