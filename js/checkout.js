/*==================================================
    CHECKOUT.JS
    Part 1 - Checkout Foundation
==================================================*/

"use strict";


/*=========================================
        Checkout Storage Key
=========================================*/

const CHECKOUT_STORAGE_KEY =

"yaseen-ecommerce-checkout";


/*=========================================
        Checkout Object
=========================================*/

let checkout = {

    customer:{},

    shipping:{},

    payment:{},

    items:[],

    coupon:null,

    subtotal:0,

    shippingCost:0,

    tax:0,

    discount:0,

    total:0,

    orderId:null,

    createdAt:null

};


/*=========================================
        Load Checkout
=========================================*/

function loadCheckout(){

    try{

        const savedCheckout =

        localStorage.getItem(

            CHECKOUT_STORAGE_KEY

        );

        if(savedCheckout){

            checkout =

            JSON.parse(savedCheckout);

        }

    }

    catch(error){

        console.error(

            "Checkout Load Error:",

            error

        );

    }

}


/*=========================================
        Save Checkout
=========================================*/

function saveCheckout(){

    try{

        localStorage.setItem(

            CHECKOUT_STORAGE_KEY,

            JSON.stringify(checkout)

        );

    }

    catch(error){

        console.error(

            "Checkout Save Error:",

            error

        );

    }

}


/*=========================================
        Reset Checkout
=========================================*/

function resetCheckout(){

    checkout={

        customer:{},

        shipping:{},

        payment:{},

        items:[],

        coupon:null,

        subtotal:0,

        shippingCost:0,

        tax:0,

        discount:0,

        total:0,

        orderId:null,

        createdAt:null

    };

    saveCheckout();

}


/*=========================================
        Get Checkout
=========================================*/

function getCheckout(){

    return checkout;

}


/*=========================================
        Set Order Data
=========================================*/

function setOrderData(data={}){

    checkout={

        ...checkout,

        ...data

    };

    saveCheckout();

}


/*=========================================
        Initialize Checkout
=========================================*/

function initializeCheckout(){

    loadCheckout();

    console.log(

        "🧾 Checkout Initialized"

    );

    console.log(checkout);

}


/*=========================================
        Start Checkout
=========================================*/

initializeCheckout();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Checkout Foundation Ready"

);
/*==================================================
    CHECKOUT.JS
    Part 2 - Billing Details
==================================================*/


/*=========================================
        Billing Form
=========================================*/

const billingForm =

document.querySelector(".billing-form");


/*=========================================
        Billing Fields
=========================================*/

const billingFields={

    fullName:

    document.querySelector("#fullName"),

    email:

    document.querySelector("#email"),

    phone:

    document.querySelector("#phone")

};


/*=========================================
        Load Billing Data
=========================================*/

function loadBillingData(){

    if(!checkout.customer) return;

    billingFields.fullName &&

    (billingFields.fullName.value=

    checkout.customer.fullName || "");

    billingFields.email &&

    (billingFields.email.value=

    checkout.customer.email || "");

    billingFields.phone &&

    (billingFields.phone.value=

    checkout.customer.phone || "");

}


/*=========================================
        Save Billing Data
=========================================*/

function saveBillingData(){

    checkout.customer={

        fullName:

        sanitizeInput(

        billingFields.fullName?.value ||

        ""),

        email:

        sanitizeInput(

        billingFields.email?.value ||

        ""),

        phone:

        sanitizeInput(

        billingFields.phone?.value ||

        "")

    };

    saveCheckout();

}


/*=========================================
        Validate Billing
=========================================*/

function validateBilling(){

    const customer=

    checkout.customer;

    if(

        !isValidName(

        customer.fullName)

    ){

        showError(

        "Enter a valid full name.");

        return false;

    }

    if(

        !isValidEmail(

        customer.email)

    ){

        showError(

        "Enter a valid email.");

        return false;

    }

    if(

        !isValidPhone(

        customer.phone)

    ){

        showError(

        "Enter a valid phone number.");

        return false;

    }

    return true;

}


/*=========================================
        Auto Save
=========================================*/

Object.values(

billingFields

).forEach(field=>{

    if(!field) return;

    field.addEventListener(

        "input",

        ()=>{

            saveBillingData();

        }

    );

});


/*=========================================
        Billing Submit
=========================================*/

billingForm?.addEventListener(

"submit",

event=>{

event.preventDefault();

saveBillingData();

if(validateBilling()){

showSuccess(

"Billing details saved."

);

}

});


/*=========================================
        Initialize Billing
=========================================*/

loadBillingData();


/*=========================================
        Console
=========================================*/

console.log("✅ Billing Details Ready");
/*==================================================
    CHECKOUT.JS
    Part 3 - Shipping Address
==================================================*/


/*=========================================
        Shipping Form
=========================================*/

const shippingForm =

document.querySelector(".shipping-form");


/*=========================================
        Shipping Fields
=========================================*/

const shippingFields={

    country:

    document.querySelector("#country"),

    city:

    document.querySelector("#city"),

    address:

    document.querySelector("#address"),

    postalCode:

    document.querySelector("#postalCode")

};


/*=========================================
        Load Shipping Data
=========================================*/

function loadShippingData(){

    if(!checkout.shipping) return;

    shippingFields.country &&

    (shippingFields.country.value=

    checkout.shipping.country || "");

    shippingFields.city &&

    (shippingFields.city.value=

    checkout.shipping.city || "");

    shippingFields.address &&

    (shippingFields.address.value=

    checkout.shipping.address || "");

    shippingFields.postalCode &&

    (shippingFields.postalCode.value=

    checkout.shipping.postalCode || "");

}


/*=========================================
        Save Shipping Data
=========================================*/

function saveShippingData(){

    checkout.shipping={

        country:

        sanitizeInput(

        shippingFields.country?.value ||

        ""),

        city:

        sanitizeInput(

        shippingFields.city?.value ||

        ""),

        address:

        sanitizeInput(

        shippingFields.address?.value ||

        ""),

        postalCode:

        sanitizeInput(

        shippingFields.postalCode?.value ||

        "")

    };

    saveCheckout();

}


/*=========================================
        Validate Shipping
=========================================*/

function validateShipping(){

    const shipping=

    checkout.shipping;

    if(!isRequired(shipping.country)){

        showError("Country is required.");

        return false;

    }

    if(!isRequired(shipping.city)){

        showError("City is required.");

        return false;

    }

    if(!hasMinLength(shipping.address,5)){

        showError("Enter a valid address.");

        return false;

    }

    if(!hasMinLength(shipping.postalCode,3)){

        showError("Enter a valid postal code.");

        return false;

    }

    return true;

}


/*=========================================
        Auto Save
=========================================*/

Object.values(

shippingFields

).forEach(field=>{

    if(!field) return;

    field.addEventListener(

        "input",

        ()=>{

            saveShippingData();

        }

    );

});


/*=========================================
        Shipping Submit
=========================================*/

shippingForm?.addEventListener(

"submit",

event=>{

event.preventDefault();

saveShippingData();

if(validateShipping()){

showSuccess(

"Shipping address saved."

);

}

});


/*=========================================
        Initialize Shipping
=========================================*/

loadShippingData();


/*=========================================
        Console
=========================================*/

console.log("✅ Shipping Address Ready");
/*==================================================
    CHECKOUT.JS
    Part 4 - Payment Methods
==================================================*/


/*=========================================
        Payment Form
=========================================*/

const paymentForm =

document.querySelector(".payment-form");


/*=========================================
        Payment Options
=========================================*/

const paymentOptions =

document.querySelectorAll(

'input[name="paymentMethod"]'

);


/*=========================================
        Default Payment
=========================================*/

checkout.payment =

checkout.payment || {

    method:"cod"

};


/*=========================================
        Select Payment
=========================================*/

function selectPayment(method){

    checkout.payment.method = method;

    saveCheckout();

}


/*=========================================
        Load Payment
=========================================*/

function loadPaymentMethod(){

    paymentOptions.forEach(option=>{

        option.checked =

        option.value===

        checkout.payment.method;

    });

}


/*=========================================
        Save Payment
=========================================*/

function savePaymentMethod(){

    const selected =

    document.querySelector(

    'input[name="paymentMethod"]:checked'

    );

    if(!selected) return;

    checkout.payment = {

        method:selected.value

    };

    saveCheckout();

}


/*=========================================
        Validate Payment
=========================================*/

function validatePayment(){

    if(

        !checkout.payment ||

        !checkout.payment.method

    ){

        showError(

        "Please select a payment method."

        );

        return false;

    }

    return true;

}


/*=========================================
        Payment Change
=========================================*/

paymentOptions.forEach(option=>{

    option.addEventListener(

        "change",

        ()=>{

            selectPayment(

                option.value

            );

            showSuccess(

                `Payment: ${option.value.toUpperCase()}`

            );

        }

    );

});


/*=========================================
        Payment Submit
=========================================*/

paymentForm?.addEventListener(

"submit",

event=>{

event.preventDefault();

savePaymentMethod();

if(validatePayment()){

showSuccess(

"Payment method saved."

);

}

});


/*=========================================
        Supported Methods
=========================================*/

const PAYMENT_METHODS={

    cod:"Cash On Delivery",

    card:"Credit / Debit Card",

    jazzcash:"JazzCash",

    easypaisa:"Easypaisa",

    stripe:"Stripe"

};


/*=========================================
        Initialize Payment
=========================================*/

loadPaymentMethod();


/*=========================================
        Console
=========================================*/

console.log("✅ Payment Methods Ready");
/*==================================================
    CHECKOUT.JS
    Part 5 - Coupon System
==================================================*/


/*=========================================
        Coupon Database
=========================================*/

const COUPONS = {

    SAVE10:{

        type:"percentage",

        value:10,

        expiry:"2027-12-31"

    },

    SAVE20:{

        type:"percentage",

        value:20,

        expiry:"2027-12-31"

    },

    FLAT500:{

        type:"fixed",

        value:500,

        expiry:"2027-12-31"

    }

};


/*=========================================
        Coupon Elements
=========================================*/

const couponInput =

document.querySelector("#couponCode");

const applyCouponButton =

document.querySelector(".apply-coupon");

const removeCouponButton =

document.querySelector(".remove-coupon");


/*=========================================
        Validate Coupon
=========================================*/

function validateCoupon(code){

    code = code.trim().toUpperCase();

    const coupon = COUPONS[code];

    if(!coupon){

        showError("Invalid coupon code.");

        return null;

    }

    const today = new Date();

    const expiry = new Date(coupon.expiry);

    if(today > expiry){

        showError("Coupon has expired.");

        return null;

    }

    return coupon;

}


/*=========================================
        Apply Coupon
=========================================*/

function applyCoupon(){

    const code =

    couponInput?.value

    .trim()

    .toUpperCase();

    if(!code){

        showWarning(

            "Enter a coupon code."

        );

        return;

    }

    const coupon =

    validateCoupon(code);

    if(!coupon) return;

    checkout.coupon={

        code,

        ...coupon

    };

    calculateCouponDiscount();

    saveCheckout();

    updateOrderSummary();

    showSuccess(

        `Coupon ${code} applied.`

    );

}


/*=========================================
        Calculate Discount
=========================================*/

function calculateCouponDiscount(){

    if(!checkout.coupon){

        checkout.discount = 0;

        return;

    }

    const subtotal =

    checkout.subtotal;

    if(

        checkout.coupon.type===

        "percentage"

    ){

        checkout.discount =

        subtotal *

        checkout.coupon.value /

        100;

    }

    else{

        checkout.discount =

        checkout.coupon.value;

    }

}


/*=========================================
        Remove Coupon
=========================================*/

function removeCoupon(){

    checkout.coupon = null;

    checkout.discount = 0;

    saveCheckout();

    updateOrderSummary();

    if(couponInput){

        couponInput.value="";

    }

    showInfo(

        "Coupon removed."

    );

}


/*=========================================
        Coupon Events
=========================================*/

applyCouponButton

?.addEventListener(

"click",

applyCoupon

);

removeCouponButton

?.addEventListener(

"click",

removeCoupon

);


/*=========================================
        Console
=========================================*/

console.log("✅ Coupon System Ready");
/*==================================================
    CHECKOUT.JS
    Part 6 - Order Summary
==================================================*/


/*=========================================
        Summary Elements
=========================================*/

const summaryItems =

document.querySelector(".order-items");

const subtotalElement =

document.querySelector(".summary-subtotal");

const shippingElement =

document.querySelector(".summary-shipping");

const taxElement =

document.querySelector(".summary-tax");

const discountElement =

document.querySelector(".summary-discount");

const totalElement =

document.querySelector(".summary-total");

const itemCountElement =

document.querySelector(".summary-items");


/*=========================================
        Render Order Items
=========================================*/

function renderOrderItems(){

    if(!summaryItems) return;

    if(!checkout.items ||

       checkout.items.length===0){

        summaryItems.innerHTML=`

        <div class="empty-order">

            No products available.

        </div>

        `;

        return;

    }

    summaryItems.innerHTML=

    checkout.items.map(item=>`

        <div class="order-item">

            <img

            src="${item.image}"

            alt="${item.name}"

            loading="lazy">

            <div class="order-info">

                <h6>${item.name}</h6>

                <small>

                Qty: ${item.quantity}

                </small>

            </div>

            <div class="order-price">

                ${formatCurrency(

                item.price *

                item.quantity

                )}

            </div>

        </div>

    `).join("");

}


/*=========================================
        Calculate Summary
=========================================*/

function calculateOrderSummary(){

    checkout.subtotal=

    checkout.items.reduce(

        (total,item)=>

        total+

        (item.price*

        item.quantity),

        0

    );

    checkout.shippingCost=

    checkout.subtotal>=

    CONFIG.freeShippingLimit

    ?0

    :CONFIG.shippingCost;

    checkout.tax=

    checkout.subtotal*

    CONFIG.taxRate;

    checkout.total=

    checkout.subtotal+

    checkout.shippingCost+

    checkout.tax-

    checkout.discount;

}


/*=========================================
        Update Summary
=========================================*/

function updateOrderSummary(){

    calculateOrderSummary();

    renderOrderItems();

    subtotalElement &&

    (subtotalElement.textContent=

    formatCurrency(

    checkout.subtotal));

    shippingElement &&

    (shippingElement.textContent=

    formatCurrency(

    checkout.shippingCost));

    taxElement &&

    (taxElement.textContent=

    formatCurrency(

    checkout.tax));

    discountElement &&

    (discountElement.textContent=

    formatCurrency(

    checkout.discount));

    totalElement &&

    (totalElement.textContent=

    formatCurrency(

    checkout.total));

    itemCountElement &&

    (itemCountElement.textContent=

    checkout.items.length);

}


/*=========================================
        Order Statistics
=========================================*/

function getOrderStatistics(){

    return{

        items:

        checkout.items.length,

        subtotal:

        checkout.subtotal,

        shipping:

        checkout.shippingCost,

        tax:

        checkout.tax,

        discount:

        checkout.discount,

        total:

        checkout.total

    };

}


/*=========================================
        Initialize Summary
=========================================*/

updateOrderSummary();


/*=========================================
        Console
=========================================*/

console.log("✅ Order Summary Ready");
/*==================================================
    CHECKOUT.JS
    Part 7 - Place Order
==================================================*/


/*=========================================
        Place Order Button
=========================================*/

const placeOrderButton =

document.querySelector(".place-order");


/*=========================================
        Generate Order ID
=========================================*/

function generateOrderId(){

    return "ORD-" +

    Date.now() +

    "-" +

    Math.floor(

        Math.random()*10000

    );

}


/*=========================================
        Validate Checkout
=========================================*/

function validateCheckout(){

    if(!validateBilling()){

        return false;

    }

    if(!validateShipping()){

        return false;

    }

    if(!validatePayment()){

        return false;

    }

    if(checkout.items.length===0){

        showError(

            "Your cart is empty."

        );

        return false;

    }

    return true;

}


/*=========================================
        Save Order
=========================================*/

function saveOrder(){

    checkout.orderId =

    generateOrderId();

    checkout.createdAt =

    new Date().toISOString();

    const orders =

    loadFromStorage(

        "yaseen-orders",

        []

    );

    orders.push({

        ...checkout

    });

    saveToStorage(

        "yaseen-orders",

        orders

    );

}


/*=========================================
        Clear Cart
=========================================*/

function clearCartAfterOrder(){

    cart = [];

    saveCart();

    refreshCart();

}


/*=========================================
        Place Order
=========================================*/

function placeOrder(){

    if(!validateCheckout()){

        return;

    }

    saveOrder();

    clearCartAfterOrder();

    saveCheckout();

    showSuccess(

        "Order placed successfully."

    );

    setTimeout(()=>{

        window.location.href =

        "order-success.html";

    },1500);

}


/*=========================================
        Place Order Event
=========================================*/

placeOrderButton?.addEventListener(

    "click",

    placeOrder

);


/*=========================================
        Order History
=========================================*/

function getOrderHistory(){

    return loadFromStorage(

        "yaseen-orders",

        []

    );

}


/*=========================================
        Console
=========================================*/

console.log("✅ Place Order Ready");
/*==================================================
    CHECKOUT.JS
    Part 8 - Order Confirmation
==================================================*/


/*=========================================
        Confirmation Elements
=========================================*/

const confirmationContainer =

document.querySelector(".order-confirmation");

const invoiceButton =

document.querySelector(".print-invoice");

const downloadButton =

document.querySelector(".download-order");

const reorderButton =

document.querySelector(".reorder-btn");


/*=========================================
        Render Confirmation
=========================================*/

function renderOrderConfirmation(){

    if(!confirmationContainer) return;

    confirmationContainer.innerHTML = `

        <div class="confirmation-card">

            <h2>🎉 Order Confirmed</h2>

            <p>

                Thank you for your purchase.

            </p>

            <p>

                <strong>Order ID:</strong>

                ${checkout.orderId}

            </p>

            <p>

                <strong>Date:</strong>

                ${formatDateTime(checkout.createdAt)}

            </p>

            <p>

                <strong>Total:</strong>

                ${formatCurrency(checkout.total)}

            </p>

        </div>

    `;

}


/*=========================================
        Print Invoice
=========================================*/

function printInvoice(){

    window.print();

}


/*=========================================
        Download Order
=========================================*/

function downloadOrder(){

    const blob = new Blob(

        [

            JSON.stringify(

                checkout,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    const url =

    URL.createObjectURL(blob);

    const link =

    document.createElement("a");

    link.href = url;

    link.download =

    `${checkout.orderId}.json`;

    link.click();

    URL.revokeObjectURL(url);

}


/*=========================================
        Prepare Email Data
=========================================*/

function getConfirmationEmailData(){

    return{

        orderId:checkout.orderId,

        customer:

        checkout.customer,

        total:checkout.total,

        items:checkout.items,

        date:checkout.createdAt

    };

}


/*=========================================
        Reorder
=========================================*/

function reorderItems(){

    if(

        checkout.items.length===0

    ){

        showInfo(

            "No products available."

        );

        return;

    }

    checkout.items.forEach(item=>{

        addToCart(item.id);

    });

    showSuccess(

        "Products added to cart."

    );

}


/*=========================================
        Button Events
=========================================*/

invoiceButton?.addEventListener(

    "click",

    printInvoice

);

downloadButton?.addEventListener(

    "click",

    downloadOrder

);

reorderButton?.addEventListener(

    "click",

    reorderItems

);


/*=========================================
        Initialize Confirmation
=========================================*/

renderOrderConfirmation();


/*=========================================
        Console
=========================================*/

console.log("✅ Order Confirmation Ready");
/*==================================================
    CHECKOUT.JS
    Part 9 - Security & Validation
==================================================*/


/*=========================================
        Submit Protection
=========================================*/

let isOrderSubmitting = false;


/*=========================================
        Sanitize Checkout Data
=========================================*/

function sanitizeCheckoutData(){

    checkout.customer.fullName =

    sanitizeInput(

        checkout.customer.fullName || ""

    );

    checkout.customer.email =

    sanitizeInput(

        checkout.customer.email || ""

    );

    checkout.customer.phone =

    sanitizeInput(

        checkout.customer.phone || ""

    );

    checkout.shipping.address =

    sanitizeInput(

        checkout.shipping.address || ""

    );

}


/*=========================================
        Required Validation
=========================================*/

function validateRequiredFields(){

    if(

        !checkout.customer.fullName ||

        !checkout.customer.email ||

        !checkout.customer.phone ||

        !checkout.shipping.country ||

        !checkout.shipping.city ||

        !checkout.shipping.address ||

        !checkout.payment.method

    ){

        showError(

            "Please complete all required fields."

        );

        return false;

    }

    return true;

}


/*=========================================
        Duplicate Order Protection
=========================================*/

function preventDuplicateOrder(){

    if(isOrderSubmitting){

        showWarning(

            "Order is already being processed."

        );

        return false;

    }

    isOrderSubmitting = true;

    return true;

}


/*=========================================
        Unlock Submission
=========================================*/

function unlockOrderSubmission(){

    isOrderSubmitting = false;

}


/*=========================================
        Order Integrity Check
=========================================*/

function verifyOrderIntegrity(){

    if(checkout.items.length===0){

        showError(

            "Invalid order."

        );

        return false;

    }

    if(checkout.total<=0){

        showError(

            "Invalid total amount."

        );

        return false;

    }

    return true;

}


/*=========================================
        Final Security Validation
=========================================*/

function validateCheckoutSecurity(){

    sanitizeCheckoutData();

    if(!validateRequiredFields()){

        return false;

    }

    if(!verifyOrderIntegrity()){

        return false;

    }

    if(!preventDuplicateOrder()){

        return false;

    }

    return true;

}


/*=========================================
        Secure Place Order
=========================================*/

function securePlaceOrder(){

    if(!validateCheckoutSecurity()){

        return;

    }

    try{

        placeOrder();

    }

    finally{

        setTimeout(

            unlockOrderSubmission,

            1500

        );

    }

}


/*=========================================
        Console
=========================================*/

console.log("✅ Checkout Security Ready");
/*==================================================
    CHECKOUT.JS
    Part 10 - Final Optimization
==================================================*/


/*=========================================
        Safe Checkout Refresh
=========================================*/

function safeRefreshCheckout(){

    try{

        updateOrderSummary();

        renderOrderConfirmation();

    }

    catch(error){

        console.error(

            "Checkout Refresh Error:",

            error

        );

    }

}


/*=========================================
        Auto Save Draft
=========================================*/

function autoSaveCheckout(){

    saveCheckout();

}


/*=========================================
        Storage Synchronization
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key===

            CHECKOUT_STORAGE_KEY

        ){

            loadCheckout();

            safeRefreshCheckout();

        }

    }

);


/*=========================================
        Online / Offline Status
=========================================*/

window.addEventListener(

    "online",

    ()=>{

        showSuccess(

            "Internet connection restored."

        );

    }

);


window.addEventListener(

    "offline",

    ()=>{

        showWarning(

            "You are currently offline."

        );

    }

);


/*=========================================
        Checkout Analytics
=========================================*/

function checkoutAnalytics(){

    return{

        orderId:checkout.orderId,

        totalItems:

        checkout.items.length,

        totalAmount:

        checkout.total,

        paymentMethod:

        checkout.payment.method ||

        "Not Selected"

    };

}


/*=========================================
        Performance Report
=========================================*/

function checkoutPerformance(){

    console.table(

        checkoutAnalytics()

    );

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    ()=>{

        loadCheckout();

        safeRefreshCheckout();

    }

);


/*=========================================
        Auto Save
=========================================*/

setInterval(

    autoSaveCheckout,

    30000

);


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadCheckout();

        safeRefreshCheckout();

        checkoutPerformance();

    }

);


/*=========================================
        Production Ready
=========================================*/

console.log("===================================");

console.log(

"Yaseen E-Commerce Store"

);

console.log(

"Checkout Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
