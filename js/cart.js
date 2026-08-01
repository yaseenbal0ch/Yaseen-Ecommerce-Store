/*==================================================
    CART.JS
    Part 1 - Cart Foundation
==================================================*/


/*=========================================
        Cart Storage Key
=========================================*/

const CART_KEY = "yaseen-ecommerce-cart";


/*=========================================
        Cart Array
=========================================*/

let cart = [];


/*=========================================
        Load Cart
=========================================*/

function loadCart(){

    const savedCart = localStorage.getItem(CART_KEY);

    if(savedCart){

        try{

            cart = JSON.parse(savedCart);

        }catch(error){

            console.error("Cart Load Error:", error);

            cart = [];

        }

    }else{

        cart = [];

    }

}


/*=========================================
        Save Cart
=========================================*/

function saveCart(){

    localStorage.setItem(

        CART_KEY,

        JSON.stringify(cart)

    );

}


/*=========================================
        Clear Cart
=========================================*/

function clearCart(){

    cart = [];

    saveCart();

}


/*=========================================
        Get Cart
=========================================*/

function getCart(){

    return cart;

}


/*=========================================
        Cart Count
=========================================*/

function getCartCount(){

    return cart.reduce(

        (total,item)=>total + item.quantity,

        0

    );

}


/*=========================================
        Initialize Cart
=========================================*/

function initializeCart(){

    loadCart();

    console.log("🛒 Cart Initialized");

    console.log("Items:", getCartCount());

}


/*=========================================
        Start Cart
=========================================*/

initializeCart();
/*==================================================
    CART.JS
    Part 2 - Add To Cart
==================================================*/


/*=========================================
        Find Cart Item
=========================================*/

function findCartItem(productId){

    return cart.find(item => item.id === productId);

}


/*=========================================
        Add To Cart
=========================================*/

function addToCart(productId){

    productId = Number(productId);

    const product = getProductById(productId);

    if(!product){

        console.error("Product Not Found");

        return;

    }

    const existingItem = findCartItem(productId);

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }

    saveCart();

    updateCartCounter();

    showCartMessage(`${product.name} added to cart`);

}


/*=========================================
        Cart Message
=========================================*/

function showCartMessage(message){

    const toast = document.createElement("div");

    toast.className = "cart-toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}


/*=========================================
        Update Cart Counter
=========================================*/

function updateCartCounter(){

    const counter = document.querySelector(".cart-count");

    if(counter){

        counter.textContent = getCartCount();

    }

}


/*=========================================
        Add To Cart Events
=========================================*/

document.addEventListener("click",(event)=>{

    const button = event.target.closest(".cart-btn");

    if(!button) return;

    addToCart(button.dataset.id);

});


/*=========================================
        Initialize Counter
=========================================*/

updateCartCounter();


/*=========================================
        Console
=========================================*/

console.log("✅ Add To Cart Ready");
/*==================================================
    CART.JS
    Part 3 - Cart Rendering
==================================================*/


/*=========================================
        Cart Container
=========================================*/

const cartContainer = document.querySelector(".cart-items");


/*=========================================
        Empty Cart
=========================================*/

function renderEmptyCart(){

    if(!cartContainer) return;

    cartContainer.innerHTML = `

        <div class="empty-cart text-center py-5">

            <i class="fas fa-shopping-cart fa-3x mb-3"></i>

            <h3>Your Cart is Empty</h3>

            <p>Looks like you haven't added any products yet.</p>

        </div>

    `;

}


/*=========================================
        Cart Item Card
=========================================*/

function createCartItem(item){

    return `

    <div class="cart-item" data-id="${item.id}">

        <div class="cart-item-image">

            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy">

        </div>

        <div class="cart-item-details">

            <h5>${item.name}</h5>

            <p>${formatPrice(item.price)}</p>

        </div>

        <div class="cart-item-quantity">

            <button
                class="qty-btn decrease"
                data-id="${item.id}">

                <i class="fas fa-minus"></i>

            </button>

            <span class="quantity">

                ${item.quantity}

            </span>

            <button
                class="qty-btn increase"
                data-id="${item.id}">

                <i class="fas fa-plus"></i>

            </button>

        </div>

        <div class="cart-item-total">

            ${formatPrice(item.price * item.quantity)}

        </div>

        <button
            class="remove-cart-item"
            data-id="${item.id}">

            <i class="fas fa-trash"></i>

        </button>

    </div>

    `;

}


/*=========================================
        Render Cart
=========================================*/

function renderCart(){

    if(!cartContainer) return;

    if(cart.length === 0){

        renderEmptyCart();

        return;

    }

    cartContainer.innerHTML = cart
        .map(item => createCartItem(item))
        .join("");

}


/*=========================================
        Refresh Cart
=========================================*/

function refreshCart(){

    renderCart();

    updateCartCounter();

}


/*=========================================
        Initial Render
=========================================*/

refreshCart();


/*=========================================
        Console
=========================================*/

console.log("✅ Cart Rendering Ready");
/*==================================================
    CART.JS
    Part 4 - Quantity Management
==================================================*/


/*=========================================
        Update Quantity
=========================================*/

function updateQuantity(productId, action){

    productId = Number(productId);

    const item = findCartItem(productId);

    if(!item) return;

    const product = getProductById(productId);

    if(!product) return;

    if(action === "increase"){

        if(item.quantity >= product.stock){

            showCartMessage("Maximum stock reached");

            return;

        }

        item.quantity++;

    }

    if(action === "decrease"){

        if(item.quantity <= 1){

            return;

        }

        item.quantity--;

    }

    saveCart();

    refreshCart();

    updateCartTotals();

}


/*=========================================
        Quantity Events
=========================================*/

document.addEventListener("click",(event)=>{

    const increaseButton = event.target.closest(".increase");

    const decreaseButton = event.target.closest(".decrease");

    if(increaseButton){

        updateQuantity(

            increaseButton.dataset.id,

            "increase"

        );

    }

    if(decreaseButton){

        updateQuantity(

            decreaseButton.dataset.id,

            "decrease"

        );

    }

});


/*=========================================
        Quantity Validation
=========================================*/

function validateCartQuantity(){

    cart.forEach(item=>{

        const product = getProductById(item.id);

        if(!product) return;

        if(item.quantity > product.stock){

            item.quantity = product.stock;

        }

        if(item.quantity < 1){

            item.quantity = 1;

        }

    });

    saveCart();

}


/*=========================================
        Initialize Quantity
=========================================*/

validateCartQuantity();


/*=========================================
        Console
=========================================*/

console.log("✅ Quantity Management Ready");
/*==================================================
    CART.JS
    Part 5 - Remove Items
==================================================*/


/*=========================================
        Remove Cart Item
=========================================*/

function removeCartItem(productId){

    productId = Number(productId);

    const item = findCartItem(productId);

    if(!item) return;

    const confirmed = confirm(

        `Remove "${item.name}" from cart?`

    );

    if(!confirmed) return;

    cart = cart.filter(

        product => product.id !== productId

    );

    saveCart();

    refreshCart();

    updateCartTotals();

    showCartMessage("Product removed from cart");

}


/*=========================================
        Clear Cart
=========================================*/

function clearEntireCart(){

    if(cart.length === 0){

        showCartMessage("Cart is already empty");

        return;

    }

    const confirmed = confirm(

        "Are you sure you want to clear your cart?"

    );

    if(!confirmed) return;

    cart = [];

    saveCart();

    refreshCart();

    updateCartTotals();

    showCartMessage("Cart cleared successfully");

}


/*=========================================
        Remove Button Event
=========================================*/

document.addEventListener("click",(event)=>{

    const removeButton = event.target.closest(

        ".remove-cart-item"

    );

    if(!removeButton) return;

    removeCartItem(removeButton.dataset.id);

});


/*=========================================
        Clear Cart Button
=========================================*/

const clearCartButton =

document.querySelector(".clear-cart");

if(clearCartButton){

    clearCartButton.addEventListener(

        "click",

        clearEntireCart

    );

}


/*=========================================
        Auto Refresh
=========================================*/

function refreshCartAfterRemove(){

    refreshCart();

    updateCartCounter();

    updateCartTotals();

}


/*=========================================
        Console
=========================================*/

console.log("✅ Remove Item System Ready");
/*==================================================
    CART.JS
    Part 6 - Cart Calculations
==================================================*/


/*=========================================
        Calculation Settings
=========================================*/

const SHIPPING_COST = 500;

const TAX_RATE = 0.05;

let discountAmount = 0;


/*=========================================
        Calculate Subtotal
=========================================*/

function calculateSubtotal(){

    return cart.reduce((total,item)=>{

        return total + (item.price * item.quantity);

    },0);

}


/*=========================================
        Calculate Shipping
=========================================*/

function calculateShipping(subtotal){

    if(subtotal === 0){

        return 0;

    }

    if(subtotal >= 50000){

        return 0;

    }

    return SHIPPING_COST;

}


/*=========================================
        Calculate Tax
=========================================*/

function calculateTax(subtotal){

    return subtotal * TAX_RATE;

}


/*=========================================
        Grand Total
=========================================*/

function calculateGrandTotal(){

    const subtotal = calculateSubtotal();

    const shipping = calculateShipping(subtotal);

    const tax = calculateTax(subtotal);

    return subtotal + shipping + tax - discountAmount;

}


/*=========================================
        Update Cart Totals
=========================================*/

function updateCartTotals(){

    const subtotal = calculateSubtotal();

    const shipping = calculateShipping(subtotal);

    const tax = calculateTax(subtotal);

    const grandTotal = calculateGrandTotal();

    const subtotalElement = document.querySelector(".subtotal-price");

    const shippingElement = document.querySelector(".shipping-price");

    const taxElement = document.querySelector(".tax-price");

    const discountElement = document.querySelector(".discount-price");

    const totalElement = document.querySelector(".total-price");

    if(subtotalElement){

        subtotalElement.textContent = formatPrice(subtotal);

    }

    if(shippingElement){

        shippingElement.textContent = formatPrice(shipping);

    }

    if(taxElement){

        taxElement.textContent = formatPrice(tax);

    }

    if(discountElement){

        discountElement.textContent = formatPrice(discountAmount);

    }

    if(totalElement){

        totalElement.textContent = formatPrice(grandTotal);

    }

}


/*=========================================
        Apply Discount
=========================================*/

function applyDiscount(amount){

    discountAmount = Number(amount) || 0;

    updateCartTotals();

}


/*=========================================
        Reset Discount
=========================================*/

function resetDiscount(){

    discountAmount = 0;

    updateCartTotals();

}


/*=========================================
        Initialize Totals
=========================================*/

updateCartTotals();


/*=========================================
        Console
=========================================*/

console.log("✅ Cart Calculations Ready");
/*==================================================
    CART.JS
    Part 7 - Cart Sidebar
==================================================*/


/*=========================================
        Sidebar Elements
=========================================*/

const cartSidebar = document.querySelector(".cart-sidebar");

const cartOverlay = document.querySelector(".cart-overlay");

const openCartButtons = document.querySelectorAll(".open-cart");

const closeCartButton = document.querySelector(".close-cart");


/*=========================================
        Open Cart Sidebar
=========================================*/

function openCartSidebar(){

    if(!cartSidebar || !cartOverlay) return;

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/*=========================================
        Close Cart Sidebar
=========================================*/

function closeCartSidebar(){

    if(!cartSidebar || !cartOverlay) return;

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/*=========================================
        Toggle Sidebar
=========================================*/

function toggleCartSidebar(){

    if(!cartSidebar) return;

    if(cartSidebar.classList.contains("active")){

        closeCartSidebar();

    }else{

        openCartSidebar();

    }

}


/*=========================================
        Open Button Events
=========================================*/

openCartButtons.forEach(button=>{

    button.addEventListener("click",(event)=>{

        event.preventDefault();

        openCartSidebar();

    });

});


/*=========================================
        Close Button Event
=========================================*/

if(closeCartButton){

    closeCartButton.addEventListener(

        "click",

        closeCartSidebar

    );

}


/*=========================================
        Overlay Click
=========================================*/

if(cartOverlay){

    cartOverlay.addEventListener(

        "click",

        closeCartSidebar

    );

}


/*=========================================
        ESC Key Support
=========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeCartSidebar();

    }

});


/*=========================================
        Auto Open After Add To Cart
=========================================*/

function openCartAfterAdd(){

    openCartSidebar();

}


/*=========================================
        Console
=========================================*/

console.log("✅ Cart Sidebar Ready");
/*==================================================
    CART.JS
    Part 8 - Cart Counter + Badges
==================================================*/


/*=========================================
        Counter Elements
=========================================*/

const cartCounters = document.querySelectorAll(".cart-count");

const cartBadges = document.querySelectorAll(".cart-badge");


/*=========================================
        Total Cart Items
=========================================*/

function getTotalCartItems(){

    return cart.reduce((total,item)=>{

        return total + item.quantity;

    },0);

}


/*=========================================
        Update Cart Counter
=========================================*/

function updateCartCounter(){

    const totalItems = getTotalCartItems();

    cartCounters.forEach(counter=>{

        counter.textContent = totalItems;

        counter.style.display = totalItems > 0

            ? "flex"

            : "none";

    });

}


/*=========================================
        Update Cart Badge
=========================================*/

function updateCartBadge(){

    const totalItems = getTotalCartItems();

    cartBadges.forEach(badge=>{

        badge.textContent = totalItems;

        if(totalItems === 0){

            badge.classList.add("empty");

        }else{

            badge.classList.remove("empty");

        }

    });

}


/*=========================================
        Refresh Cart UI
=========================================*/

function refreshCartUI(){

    updateCartCounter();

    updateCartBadge();

    updateCartTotals();

}


/*=========================================
        Sync Cart
=========================================*/

function syncCart(){

    saveCart();

    refreshCartUI();

}


/*=========================================
        Cart Summary
=========================================*/

function getCartSummary(){

    return{

        items:getTotalCartItems(),

        subtotal:calculateSubtotal(),

        total:calculateGrandTotal()

    };

}


/*=========================================
        Initialize Counter
=========================================*/

refreshCartUI();


/*=========================================
        Console
=========================================*/

console.log("✅ Cart Counter & Badges Ready");
/*==================================================
    CART.JS
    Part 9 - Checkout Preparation
==================================================*/


/*=========================================
        Checkout Storage Key
=========================================*/

const CHECKOUT_KEY = "yaseen-ecommerce-checkout";


/*=========================================
        Validate Cart
=========================================*/

function validateCart(){

    if(cart.length === 0){

        showCartMessage("Your cart is empty.");

        return false;

    }

    return true;

}


/*=========================================
        Prepare Checkout Data
=========================================*/

function prepareCheckoutData(){

    return{

        items:[...cart],

        subtotal:calculateSubtotal(),

        shipping:calculateShipping(calculateSubtotal()),

        tax:calculateTax(calculateSubtotal()),

        discount:discountAmount,

        total:calculateGrandTotal(),

        createdAt:new Date().toISOString()

    };

}


/*=========================================
        Save Checkout Data
=========================================*/

function saveCheckoutData(){

    const checkoutData = prepareCheckoutData();

    localStorage.setItem(

        CHECKOUT_KEY,

        JSON.stringify(checkoutData)

    );

}


/*=========================================
        Proceed To Checkout
=========================================*/

function proceedToCheckout(){

    if(!validateCart()) return;

    saveCheckoutData();

    showCartMessage("Redirecting to checkout...");

    setTimeout(()=>{

        window.location.href = "pages/checkout.html";

    },1000);

}


/*=========================================
        Checkout Button
=========================================*/

const checkoutButton =

document.querySelector(".checkout-btn");

if(checkoutButton){

    checkoutButton.addEventListener(

        "click",

        proceedToCheckout

    );

}


/*=========================================
        Get Checkout Data
=========================================*/

function getCheckoutData(){

    const data = localStorage.getItem(CHECKOUT_KEY);

    return data ? JSON.parse(data) : null;

}


/*=========================================
        Clear Checkout Data
=========================================*/

function clearCheckoutData(){

    localStorage.removeItem(CHECKOUT_KEY);

}


/*=========================================
        Console
=========================================*/

console.log("✅ Checkout Preparation Ready");
/*==================================================
    CART.JS
    Part 10 - Final Optimization
==================================================*/


/*=========================================
        Safe Refresh
=========================================*/

function safeRefreshCart(){

    try{

        refreshCart();

        updateCartTotals();

        refreshCartUI();

    }catch(error){

        console.error("Cart Refresh Error:", error);

    }

}


/*=========================================
        Cart Analytics
=========================================*/

function getCartAnalytics(){

    const totalItems = getTotalCartItems();

    const uniqueProducts = cart.length;

    const subtotal = calculateSubtotal();

    const total = calculateGrandTotal();

    return{

        totalItems,

        uniqueProducts,

        subtotal,

        total

    };

}


/*=========================================
        Validate LocalStorage
=========================================*/

function validateCartStorage(){

    try{

        JSON.parse(localStorage.getItem(CART_KEY));

    }catch(error){

        console.warn("Invalid Cart Storage");

        localStorage.removeItem(CART_KEY);

        cart = [];

    }

}


/*=========================================
        Sync Cart
=========================================*/

function synchronizeCart(){

    validateCartStorage();

    saveCart();

    safeRefreshCart();

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener("focus",()=>{

    loadCart();

    safeRefreshCart();

});


/*=========================================
        Storage Sync
=========================================*/

window.addEventListener("storage",(event)=>{

    if(event.key===CART_KEY){

        loadCart();

        safeRefreshCart();

    }

});


/*=========================================
        Performance
=========================================*/

function cartPerformance(){

    console.log(

        "Cart Loaded:",

        getCartAnalytics()

    );

}


/*=========================================
        Error Handler
=========================================*/

window.addEventListener("error",(event)=>{

    console.error(

        "Cart Error:",

        event.message

    );

});


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    synchronizeCart();

    cartPerformance();

});


/*=========================================
        Production Ready
=========================================*/

console.log("===================================");

console.log("Yaseen E-Commerce Store");

console.log("Cart Module Version : 1.0.0");

console.log("Status : Production Ready");

console.log("===================================");
