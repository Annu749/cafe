// Cart data structure
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart UI
function updateCartUI() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
    cartItemsEl.appendChild(li);
    total += item.price;
  });
  cartTotalEl.textContent = `Total: ₹${total.toFixed(2)}`;
}

updateCartUI();

// Checkout button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Thank you for your order! Total: ₹' + cart.reduce((a, b) => a + b.price, 0).toFixed(2));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  });
}

// Customization questions data
const questions = [
  {
    id: 'drinkType',
    text: 'Would you like Coffee or Tea?',
    options: [
      { text: 'Coffee', price: 0 },
      { text: 'Tea', price: 0 }
    ]
  },
  {
    id: 'milk',
    text: 'Choose your milk type:',
    options: [
      { text: 'Whole Milk', price: 0.5 },
      { text: 'Skim Milk', price: 0.5 },
      { text: 'Soy Milk', price: 0.7 },
      { text: 'Almond Milk', price: 0.8 },
      { text: 'No Milk', price: 0 }
    ]
  },
  {
    id: 'sugar',
    text: 'How much sugar would you like?',
    options: [
      { text: 'No Sugar', price: 0 },
      { text: 'Less Sugar', price: 0 },
      { text: 'Regular Sugar', price: 0 },
      { text: 'Extra Sugar', price: 0 }
    ]
  },
  {
    id: 'toppings',
    text: 'Choose toppings (select one):',
    options: [
      { text: 'Whipped Cream', price: 0.7 },
      { text: 'Cinnamon', price: 0.4 },
      { text: 'Chocolate Syrup', price: 0.8 },
      { text: 'Caramel Drizzle', price: 0.8 },
      { text: 'No Toppings', price: 0 }
    ]
  }
];

// Food suggestions based on drink type
const foodSuggestions = {
  Coffee: [
    { name: 'Croissant', price: 3.5 },
    { name: 'Chocolate Cake', price: 4.0 },
    { name: 'Ham Sandwich', price: 5.0 }
  ],
  Tea: [
    { name: 'Lemon Tart', price: 3.0 },
    { name: 'Fruit Salad', price: 4.5 },
    { name: 'Cheese Sandwich', price: 4.5 }
  ]
};

let currentQuestionIndex = 0;
let customizationSelections = {};
let baseDrinkPrice = 3.0;

const greetingEl = document.getElementById('greeting');
const questionSection = document.getElementById('question-section');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const skipBtn = document.getElementById('skip-btn');
const foodSuggestionSection = document.getElementById('food-suggestion-section');
const foodSuggestionsList = document.getElementById('food-suggestions');
const finishBtn = document.getElementById('finish-btn');

if (greetingEl && questionSection) {
  setTimeout(() => {
    greetingEl.classList.add('hidden');
    questionSection.classList.remove('hidden');
    showQuestion();
  }, 3500);
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showFoodSuggestions();
    return;
  }
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.text;
  optionsContainer.innerHTML = '';

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `${option.text} <span class="option-price">+₹${option.price.toFixed(2)}</span>`;
    btn.addEventListener('click', () => {
      customizationSelections[q.id] = option;
      currentQuestionIndex++;
      showQuestion();
    });
    optionsContainer.appendChild(btn);
  });
}

if (skipBtn) {
  skipBtn.addEventListener('click', () => {
    customizationSelections = {};
    currentQuestionIndex = questions.length;
    showFoodSuggestions();
  });
}

function showFoodSuggestions() {
  questionSection.classList.add('hidden');
  foodSuggestionSection.classList.remove('hidden');

  const drinkType = customizationSelections.drinkType ? customizationSelections.drinkType.text : 'Coffee';
  const suggestions = foodSuggestions[drinkType] || [];

  foodSuggestionsList.innerHTML = '';
  suggestions.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtn.className = 'add-food-btn';
    addBtn.addEventListener('click', () => {
      addToCart(item.name, item.price);
    });
    li.appendChild(addBtn);
    foodSuggestionsList.appendChild(li);
  });
}

if (finishBtn) {
  finishBtn.addEventListener('click', () => {
    const drinkType = customizationSelections.drinkType ? customizationSelections.drinkType.text : 'Coffee';
    let drinkName = drinkType;
    let drinkPrice = baseDrinkPrice;

    ['milk', 'sugar', 'toppings'].forEach(key => {
      if (customizationSelections[key]) {
        drinkName += ` + ${customizationSelections[key].text}`;
        drinkPrice += customizationSelections[key].price;
      }
    });

    addToCart(drinkName, drinkPrice);
    alert('Your customized drink and selected food items have been added to the cart!');
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Ready-made items
const readyMadeItems = {
  coffee: [
    { name: 'Espresso', description: 'Strong and bold espresso shot.', price: 3.0, image: 'images/coffee1.jpg' },
    { name: 'Latte', description: 'Creamy milk with rich espresso.', price: 4.0, image: 'images/coffee2.jpg' },
    { name: 'Cappuccino', description: 'Espresso with steamed milk foam.', price: 4.5, image: 'images/coffee3.jpg' }
  ],
  tea: [
    { name: 'Green Tea', description: 'Fresh and soothing green tea.', price: 3.5, image: 'images/tea1.jpg' },
    { name: 'Black Tea', description: 'Classic black tea with robust flavor.', price: 3.0, image: 'images/tea2.jpg' },
    { name: 'Herbal Tea', description: 'Relaxing blend of herbs and spices.', price: 3.8, image: 'images/tea3.jpg' }
  ],
  food: [
    { name: 'Croissant', description: 'Flaky buttery croissant.', price: 3.5, image: 'images/pastry1.jpg' },
    { name: 'Ham Sandwich', description: 'Fresh sandwich with ham and cheese.', price: 5.0, image: 'images/pastry2.jpg' },
    { name: 'Chocolate Cake', description: 'Rich and moist chocolate cake slice.', price: 4.0, image: 'images/pastry3.jpg' }
  ]
};

function renderReadyMadeItems() {
  const coffeeContainer = document.getElementById('coffee-items');
  const teaContainer = document.getElementById('tea-items');
  const foodContainer = document.getElementById('food-items');

  function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="menu-item-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="menu-item-footer">
        <div class="price">₹${item.price.toFixed(2)}</div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      addToCart(item.name, item.price);
      alert(`${item.name} added to cart!`);
    });
    return card;
  }

  if (coffeeContainer) {
    readyMadeItems.coffee.forEach(item => coffeeContainer.appendChild(createItemCard(item)));
  }
  if (teaContainer) {
    readyMadeItems.tea.forEach(item => teaContainer.appendChild(createItemCard(item)));
  }
  if (foodContainer) {
    readyMadeItems.food.forEach(item => foodContainer.appendChild(createItemCard(item)));
  }
}

if (document.getElementById('coffee-items')) {
  renderReadyMadeItems();
}

// Universal support for buttons using data attributes
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    addToCart(name, price);
    alert(`${name} added to cart!`);
  });
});
