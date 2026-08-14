// ====================================================
// 1. STORE CONFIGURATION & COMPLETE PRODUCT DATABASE
// ====================================================

// Target WhatsApp phone number (International format without '+' or spaces)
const STORE_WHATSAPP_NUMBER = "2347062729106";

const marketProducts = [
  // SECTION 1: Food Colouring, Oils & Spices
  { name: "Milk Flavour", units: [{ label: "Unit/Pack", price: 250 }] },
  { name: "Power Oil", units: [{ label: "Sachet", price: 200 }] },
  { name: "Potatoes", units: [{ label: "Unit/Portion", price: 500 }] },
  {
    name: "Spicy Jollof Rice Colour",
    units: [
      { label: "1 sachet", price: 100 },
      { label: "1 Roll", price: 800 },
    ],
  },
  {
    name: "Spicy Crayfish Colour",
    units: [
      { label: "1 sachet", price: 100 },
      { label: "1 Roll", price: 800 },
    ],
  },
  {
    name: "Vegetable Oil",
    units: [
      { label: "1/2 bottle", price: 1000 },
      { label: "Bottle", price: 2000 },
    ],
  },
  {
    name: "Palm Oil",
    units: [
      { label: "1/2 bottle", price: 800 },
      { label: "Bottle", price: 1600 },
    ],
  },
  { name: "akara Powder", units: [{ label: "1 piece", price: 200 }] },
  { name: "Crayfish", units: [{ label: "1 Cup", price: 900 }] },
  { name: "Akumadiju", units: [{ label: "1 Cup", price: 500 }] },

  // SECTION 2: Pasta, Seasoning Cubes & Eggs
  { name: "Macaroni - Mama's Pride", units: [{ label: "Pack", price: 850 }] },
  {
    name: "Macaroni - Golden Penny (Big)",
    units: [{ label: "Big Pack", price: 1000 }],
  },
  {
    name: "Macaroni - Golden Penny (Small)",
    units: [{ label: "Small Pack", price: 500 }],
  },
  { name: "Macaroni - Honeywell", units: [{ label: "Pack", price: 800 }] },
  {
    name: "Tomato Paste - Party Jollof",
    units: [
      { label: "roll of 5 Sachets", price: 1000 },
      { label: "1 Sachet", price: 200 },
    ],
  },
  {
    name: "Tomato Paste - Asun",
    units: [
      { label: "roll of 5 Sachets", price: 900 },
      { label: "1 Sachet", price: 200 },
    ],
  },
  {
    name: "Tomato Paste - Pepper Chicken",
    units: [
      { label: "roll of 5 Sachets", price: 900 },
      { label: "1 Sachet", price: 200 },
    ],
  },
  {
    name: "Tomato Paste - Gino",
    units: [
      { label: "roll of 5 Sachets", price: 900 },
      { label: "1 Sachet", price: 200 },
    ],
  },
  { name: "Maggi - Chicken Flavour", units: [{ label: "Pack", price: 350 }] },
  { name: "Maggi - Gino Max", units: [{ label: "Pack", price: 400 }] },
  { name: "Maggi - Asun", units: [{ label: "Pack", price: 250 }] },
  { name: "Maggi - Selects", units: [{ label: "Pack", price: 500 }] },
  { name: "Maggi - Pepper Chicken", units: [{ label: "Pack", price: 250 }] },
  { name: "Maggi - Terra", units: [{ label: "Pack", price: 350 }] },
  { name: "Maggi - Terra Gold", units: [{ label: "Pack", price: 350 }] },
  { name: "Maggi - Jumbo x2", units: [{ label: "Pack", price: 170 }] },
  {
    name: "Eggs",
    units: [
      { label: "1 Crate", price: 5600 },
      { label: "1 piece", price: 200 },
    ],
  },

  // SECTION 3: Bar Soap, Garri, Curry/Thyme, Snacks & Seasoning
  { name: "Bar Soap - Classy Big", units: [{ label: "1 Bar", price: 600 }] },
  { name: "Bar Soap - Classy Small", units: [{ label: "1 Bar", price: 200 }] },
  {
    name: "Bar Soap - Abuwe",
    units: [
      { label: "1 Bar", price: 250 },
      { label: "1 Pack", price: 1200 },
    ],
  },
  {
    name: "Bar Soap - Eva",
    units: [
      { label: "1 Bar", price: 700 },
      { label: "1 Pack", price: 2800 },
    ],
  },
  {
    name: "Bar Soap - Premier Cool",
    units: [
      { label: "1 Bar", price: 500 },
      { label: "1 Pack", price: 2800 },
    ],
  },
  {
    name: "Garri",
    units: [
      { label: "1 Cup", price: 50 },
      { label: "1 Congo", price: 500 },
    ],
  },
  {
    name: "Curry",
    units: [
      { label: "1 piece", price: 60 },
      { label: "1 Roll", price: 600 },
    ],
  },
  {
    name: "Thyme",
    units: [
      { label: "1 piece", price: 60 },
      { label: "1 Roll", price: 600 },
    ],
  },
  {
    name: "Curry Masala",
    units: [
      { label: "1 piece", price: 60 },
      { label: "1 Roll", price: 600 },
    ],
  },
  { name: "Chin Chin", units: [{ label: "Pack", price: 100 }] },
  { name: "Epa (Groundnut)", units: [{ label: "Pack", price: 100 }] },
  { name: "Kuli-Kuli", units: [{ label: "Pack", price: 200 }] },
  { name: "Egusi", units: [{ label: "1 Cup", price: 500 }] },
  { name: "Atagungun", units: [{ label: "1 Cup", price: 700 }] },
  {
    name: "Sachet Atagungun",
    units: [
      { label: "1 Sachet", price: 60 },
      { label: "1 Roll", price: 600 },
    ],
  },
  {
    name: "Lasor small",
    units: [
      { label: "1 piece", price: 100 },
      { label: "1 Roll", price: 600 },
    ],
  },
  { name: "Lasor Chicken (Big)", units: [{ label: "Pack", price: 900 }] },
  { name: "Jollof Rice Seasoning", units: [{ label: "Pack", price: 600 }] },

  // SECTION 4: Milk, Noodles, Toothpaste, Detergent
  {
    name: "Milo",
    units: [
      { label: "1 Sachet", price: 200 },
      { label: "Roll", price: 1900 },
    ],
  },
  {
    name: "Peak Milk",
    units: [
      { label: "1 Sachet", price: 200 },
      { label: "Roll", price: 1900 },
    ],
  },
  {
    name: "Good time Milk",
    units: [
      { label: "1 Unit", price: 100 },
      { label: "Pack/Tin", price: 900 },
    ],
  },
  {
    name: "kremela Milk",
    units: [
      { label: "1 Unit", price: 100 },
      { label: "Pack", price: 900 },
    ],
  },
  {
    name: "Hollandia Milk",
    units: [
      { label: "1 Sachet", price: 250 },
      { label: "Big Pack", price: 1900 },
    ],
  },
  {
    name: "Noodles - Indomie Table",
    units: [
      { label: "1 Pack", price: 240 },
      { label: "1 Carton", price: 10400 },
    ],
  },
  {
    name: "Noodles - Oriental",
    units: [
      { label: "1 Pack", price: 270 },
      { label: "1 Carton", price: 10400 },
    ],
  },
  {
    name: "Noodles - Golden Penny",
    units: [
      { label: "1 Pack", price: 220 },
      { label: "1 Carton", price: 8400 },
    ],
  },
  {
    name: "Noodles - Mimee",
    units: [
      { label: "1 Pack", price: 220 },
      { label: "1 Carton", price: 8400 },
    ],
  },
  { name: "Toothpaste - Oracare", units: [{ label: "Tube", price: 1000 }] },
  {
    name: "Toothpaste - Close Up (Big)",
    units: [{ label: "Big Tube", price: 1200 }],
  },
  {
    name: "Toothpaste - Close Up (Small)",
    units: [{ label: "Small Tube", price: 300 }],
  },
  {
    name: "Toothpaste - Pepsodent (Big)",
    units: [{ label: "Big Tube", price: 1300 }],
  },
  {
    name: "Toothpaste - Pepsodent (Small)",
    units: [{ label: "Small Tube", price: 550 }],
  },
  {
    name: "Toothpaste - My My (Big)",
    units: [{ label: "Big Tube", price: 700 }],
  },
  {
    name: "Toothpaste - My My (Small)",
    units: [{ label: "Small Tube", price: 350 }],
  },
  { name: "Detergent - Viva Big", units: [{ label: "Pack", price: 500 }] },
  { name: "Detergent - Viva Small", units: [{ label: "Pack", price: 250 }] },
  { name: "Detergent - Viva 40g", units: [{ label: "Sachet", price: 150 }] },
  {
    name: "Detergent - Roll of Big",
    units: [{ label: "1 Roll", price: 20000 }],
  },
  {
    name: "Detergent - Roll of Small",
    units: [{ label: "1 Roll", price: 1000 }],
  },
  { name: "Lighter", units: [{ label: "1 Piece", price: 150 }] },

  // SECTION 5: Beans, Rice, Spaghetti
  {
    name: "Beans - Oloyin",
    units: [
      { label: "1 Cup", price: 240 },
      { label: "Congo", price: 2400 },
    ],
  },
  {
    name: "Beans - Drum",
    units: [
      { label: "1 Cup", price: 150 },
      { label: "Congo", price: 1900 },
    ],
  },
  {
    name: "Beans - Milk",
    units: [
      { label: "1 Cup", price: 200 },
      { label: "Congo", price: 1000 },
    ],
  },
  {
    name: "Beans - White",
    units: [
      { label: "1 Cup", price: 170 },
      { label: "Congo", price: 1700 },
    ],
  },
  {
    name: "Rice",
    units: [
      { label: "1 Cup", price: 220 },
      { label: "Congo", price: 2000 },
    ],
  },
  {
    name: "Spaghetti - Golden Penny",
    units: [{ label: "1  Piece", price: 1050 }],
  },
  {
    name: "Spaghetti - Auntie B",
    units: [{ label: "1 Piece", price: 800 }],
  },
  {
    name: "Spaghetti - Mama's Pride",
    units: [{ label: "1 Piece", price: 850 }],
  },
  { name: "Spaghetti - Dangote", units: [{ label: "1 Piece", price: 700 }] },
  { name: "Spaghetti - Honeywell", units: [{ label: "1 Piece", price: 750 }] },
  { name: "Spaghetti - Crown", units: [{ label: "1 Piece", price: 950 }] },
];

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
}

function getGrandTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
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

function openBankApp(appType) {
  const accNum = document.getElementById("account-number").textContent;
  navigator.clipboard.writeText(accNum);

  alert(
    `Account number (${accNum}) copied! Opening ${appType.toUpperCase()}...`,
  );

  if (appType === "opay") {
    window.location.href = "opay://";
    setTimeout(() => {
      window.location.href = "https://p.opayweb.com";
    }, 1500);
  } else if (appType === "moniepoint") {
    window.location.href = "moniepoint://";
    setTimeout(() => {
      window.location.href = "https://moniepoint.com";
    }, 1500);
  }
}

let uploadedReceiptFile = null; // Holds the real File object for native sharing later

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

function confirmPayment() {
  const senderName = document.getElementById("sender-name").value.trim();
  if (!senderName) {
    alert("Please enter the sender's account name for payment verification.");
    return;
  }

  const hasReceipt = !!uploadedReceiptFile;
  const grandTotal = getGrandTotal();

  let orderItemsText = "";
  cart.forEach((item, index) => {
    orderItemsText += `${index + 1}. *${item.name}* (${item.unit}) - ₦${item.price.toLocaleString()}\n`;
  });

  const receiptStatusText = hasReceipt
    ? "📎 *Receipt Attached:* Yes (sending the screenshot as a separate attachment)"
    : "📎 *Receipt Attached:* No screenshot attached";

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

  // Try to hand the actual receipt photo to the phone's native share sheet
  // so the customer can send it as a real WhatsApp attachment. A wa.me link
  // can only pre-fill text — it can never attach a file on its own.
  if (
    hasReceipt &&
    navigator.canShare &&
    navigator.canShare({ files: [uploadedReceiptFile] })
  ) {
    navigator
      .share({
        files: [uploadedReceiptFile],
        title: "Payment Receipt",
        text: "Here's my payment receipt screenshot.",
      })
      .catch((err) => {
        // AbortError just means the customer closed the share sheet — not a real error
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      });
  } else if (hasReceipt) {
    alert(
      "Your order message will open in WhatsApp now.\n\nThis device/browser can't auto-attach your screenshot, so please manually attach it in the WhatsApp chat that opens.",
    );
  }

  document.getElementById("payment-view").classList.add("hidden");
  document.getElementById("success-view").classList.remove("hidden");

  window.open(whatsappUrl, "_blank");
}

function resetApp() {
  cart = [];
  uploadedReceiptFile = null;
  localStorage.removeItem("marketCart"); // Clear storage on fresh session
  renderCart();
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
