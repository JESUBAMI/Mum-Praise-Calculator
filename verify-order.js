// ====================================================
// SERVER-SIDE PRICE AUTHORITY
// ====================================================
// This file runs on Vercel's server, NOT in the customer's browser.
// The customer never receives this source code — only the JSON
// result it returns. This is the single source of truth for prices.
// Keep this list in sync with the one in script.js (script.js's copy
// is only used to build the search/browse UI, it is never trusted
// for the final total).

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

function findProductByName(name) {
  if (typeof name !== "string") return undefined;
  return marketProducts.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  );
}

module.exports = (req, res) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const items = body.items;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "No items were submitted for verification" });
    return;
  }

  const verifiedItems = [];
  const errors = [];

  items.forEach((rawItem, i) => {
    const product = findProductByName(rawItem && rawItem.name);
    if (!product) {
      errors.push(`Item ${i + 1}: "${rawItem && rawItem.name}" is not a recognized product`);
      return;
    }

    const unitIndex = Number(rawItem.unitIndex);
    const unitData = product.units[unitIndex];
    if (!unitData) {
      errors.push(`Item ${i + 1}: invalid measurement for "${product.name}"`);
      return;
    }

    let qty = Number(rawItem.qty);
    if (!Number.isInteger(qty) || qty < 1) qty = 1;
    if (qty > 100) qty = 100; // matches the max on the quantity input

    const price = unitData.price * qty;

    verifiedItems.push({
      name: product.name,
      unit: `${qty}x ${unitData.label}`,
      price,
    });
  });

  if (errors.length > 0) {
    res.status(400).json({ error: "Order verification failed", details: errors });
    return;
  }

  const total = verifiedItems.reduce((sum, item) => sum + item.price, 0);

  res.status(200).json({ items: verifiedItems, total });
};