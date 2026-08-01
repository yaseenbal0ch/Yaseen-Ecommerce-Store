/*==================================================
    PROFILE.JS
    Part 1 - Profile Foundation
==================================================*/

"use strict";


/*=========================================
        Profile Storage
=========================================*/

const PROFILE_STORAGE_KEY =

"yaseen-ecommerce-profile";


/*=========================================
        Profile Object
=========================================*/

let profile = {

    id:null,

    fullName:"",

    username:"",

    email:"",

    phone:"",

    avatar:"",

    gender:"",

    dateOfBirth:"",

    createdAt:null,

    updatedAt:null

};


/*=========================================
        Load Profile
=========================================*/

function loadProfile(){

    try{

        const savedProfile =

        localStorage.getItem(

            PROFILE_STORAGE_KEY

        );

        if(savedProfile){

            profile =

            JSON.parse(savedProfile);

        }

    }

    catch(error){

        console.error(

            "Profile Load Error:",

            error

        );

    }

}


/*=========================================
        Save Profile
=========================================*/

function saveProfile(){

    try{

        profile.updatedAt =

        new Date().toISOString();

        localStorage.setItem(

            PROFILE_STORAGE_KEY,

            JSON.stringify(profile)

        );

    }

    catch(error){

        console.error(

            "Profile Save Error:",

            error

        );

    }

}


/*=========================================
        Reset Profile
=========================================*/

function resetProfile(){

    profile = {

        id:null,

        fullName:"",

        username:"",

        email:"",

        phone:"",

        avatar:"",

        gender:"",

        dateOfBirth:"",

        createdAt:null,

        updatedAt:null

    };

    saveProfile();

}


/*=========================================
        Get Profile
=========================================*/

function getProfile(){

    return profile;

}


/*=========================================
        Initialize Profile
=========================================*/

function initializeProfile(){

    loadProfile();

    console.log(

        "👤 Profile Initialized"

    );

}


/*=========================================
        Start Profile
=========================================*/

initializeProfile();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Profile Foundation Ready"

);
/*==================================================
    PROFILE.JS
    Part 2 - Profile Information
==================================================*/


/*=========================================
        Profile Form
=========================================*/

const profileForm =

document.querySelector(".profile-form");


/*=========================================
        Profile Fields
=========================================*/

const profileFields={

    fullName:

    document.querySelector("#profileFullName"),

    username:

    document.querySelector("#profileUsername"),

    email:

    document.querySelector("#profileEmail"),

    phone:

    document.querySelector("#profilePhone"),

    gender:

    document.querySelector("#profileGender"),

    dateOfBirth:

    document.querySelector("#profileDateOfBirth")

};


/*=========================================
        Display Profile
=========================================*/

function displayProfile(){

    if(!profile) return;

    profileFields.fullName &&

    (profileFields.fullName.value=

    profile.fullName || "");

    profileFields.username &&

    (profileFields.username.value=

    profile.username || "");

    profileFields.email &&

    (profileFields.email.value=

    profile.email || "");

    profileFields.phone &&

    (profileFields.phone.value=

    profile.phone || "");

    profileFields.gender &&

    (profileFields.gender.value=

    profile.gender || "");

    profileFields.dateOfBirth &&

    (profileFields.dateOfBirth.value=

    profile.dateOfBirth || "");

}


/*=========================================
        Update Profile
=========================================*/

function updateProfile(){

    profile.fullName=

    sanitizeInput(

    profileFields.fullName?.value||

    "");

    profile.username=

    sanitizeInput(

    profileFields.username?.value||

    "");

    profile.email=

    sanitizeInput(

    profileFields.email?.value||

    "");

    profile.phone=

    sanitizeInput(

    profileFields.phone?.value||

    "");

    profile.gender=

    sanitizeInput(

    profileFields.gender?.value||

    "");

    profile.dateOfBirth=

    profileFields.dateOfBirth?.value||

    "";

}


/*=========================================
        Validate Profile
=========================================*/

function validateProfile(){

    if(

        !isValidName(

        profile.fullName)

    ){

        showError(

        "Enter a valid full name.");

        return false;

    }

    if(

        !isValidEmail(

        profile.email)

    ){

        showError(

        "Enter a valid email.");

        return false;

    }

    return true;

}


/*=========================================
        Save Profile
=========================================*/

function saveProfileInformation(){

    updateProfile();

    if(!validateProfile()){

        return;

    }

    saveProfile();

    showSuccess(

    "Profile updated successfully."

    );

}


/*=========================================
        Profile Submit
=========================================*/

profileForm?.addEventListener(

"submit",

event=>{

event.preventDefault();

saveProfileInformation();

});


/*=========================================
        Initialize
=========================================*/

displayProfile();


/*=========================================
        Console
=========================================*/

console.log("✅ Profile Information Ready");
/*==================================================
    PROFILE.JS
    Part 3 - Avatar Management
==================================================*/


/*=========================================
        Avatar Elements
=========================================*/

const avatarInput =

document.querySelector("#profileAvatar");

const avatarPreview =

document.querySelector(".profile-avatar");

const removeAvatarButton =

document.querySelector(".remove-avatar");


/*=========================================
        Default Avatar
=========================================*/

const DEFAULT_AVATAR =

"assets/images/default-avatar.png";


/*=========================================
        Preview Avatar
=========================================*/

function previewAvatar(file){

    if(!file) return;

    if(!file.type.startsWith("image/")){

        showError(

        "Please select a valid image."

        );

        return;

    }

    const reader =

    new FileReader();

    reader.onload = event=>{

        avatarPreview.src =

        event.target.result;

    };

    reader.readAsDataURL(file);

}


/*=========================================
        Save Avatar
=========================================*/

function saveAvatar(file){

    if(!file) return;

    const reader =

    new FileReader();

    reader.onload = event=>{

        profile.avatar =

        event.target.result;

        saveProfile();

        showSuccess(

        "Profile picture updated."

        );

    };

    reader.readAsDataURL(file);

}


/*=========================================
        Restore Avatar
=========================================*/

function restoreAvatar(){

    avatarPreview.src =

    profile.avatar ||

    DEFAULT_AVATAR;

}


/*=========================================
        Remove Avatar
=========================================*/

function removeAvatar(){

    profile.avatar = "";

    saveProfile();

    avatarPreview.src =

    DEFAULT_AVATAR;

    if(avatarInput){

        avatarInput.value = "";

    }

    showInfo(

    "Profile picture removed."

    );

}


/*=========================================
        Avatar Events
=========================================*/

avatarInput?.addEventListener(

    "change",

    event=>{

        const file =

        event.target.files[0];

        previewAvatar(file);

        saveAvatar(file);

    }

);


removeAvatarButton

?.addEventListener(

    "click",

    removeAvatar

);


/*=========================================
        Initialize Avatar
=========================================*/

restoreAvatar();


/*=========================================
        Console
=========================================*/

console.log("✅ Avatar Management Ready");
/*==================================================
    PROFILE.JS
    Part 4 - Account Settings
==================================================*/


/*=========================================
        Settings Storage
=========================================*/

const SETTINGS_STORAGE_KEY =

"yaseen-ecommerce-settings";


/*=========================================
        Settings Object
=========================================*/

let accountSettings = {

    theme:"light",

    language:"en",

    notifications:true,

    marketingEmails:false,

    profileVisibility:"public"

};


/*=========================================
        Settings Fields
=========================================*/

const settingsFields={

    theme:

    document.querySelector("#theme"),

    language:

    document.querySelector("#language"),

    notifications:

    document.querySelector("#notifications"),

    marketingEmails:

    document.querySelector("#marketingEmails"),

    profileVisibility:

    document.querySelector("#profileVisibility")

};


/*=========================================
        Load Settings
=========================================*/

function loadSettings(){

    try{

        const savedSettings=

        localStorage.getItem(

            SETTINGS_STORAGE_KEY

        );

        if(savedSettings){

            accountSettings=

            JSON.parse(savedSettings);

        }

    }

    catch(error){

        console.error(

            "Settings Load Error:",

            error

        );

    }

}


/*=========================================
        Save Settings
=========================================*/

function saveSettings(){

    try{

        localStorage.setItem(

            SETTINGS_STORAGE_KEY,

            JSON.stringify(accountSettings)

        );

    }

    catch(error){

        console.error(

            "Settings Save Error:",

            error

        );

    }

}


/*=========================================
        Display Settings
=========================================*/

function displaySettings(){

    if(settingsFields.theme)

        settingsFields.theme.value=

        accountSettings.theme;

    if(settingsFields.language)

        settingsFields.language.value=

        accountSettings.language;

    if(settingsFields.notifications)

        settingsFields.notifications.checked=

        accountSettings.notifications;

    if(settingsFields.marketingEmails)

        settingsFields.marketingEmails.checked=

        accountSettings.marketingEmails;

    if(settingsFields.profileVisibility)

        settingsFields.profileVisibility.value=

        accountSettings.profileVisibility;

}


/*=========================================
        Update Settings
=========================================*/

function updateSettings(){

    accountSettings.theme=

    settingsFields.theme?.value ||

    "light";

    accountSettings.language=

    settingsFields.language?.value ||

    "en";

    accountSettings.notifications=

    settingsFields.notifications?.checked ||

    false;

    accountSettings.marketingEmails=

    settingsFields.marketingEmails?.checked ||

    false;

    accountSettings.profileVisibility=

    settingsFields.profileVisibility?.value ||

    "public";

}


/*=========================================
        Apply Theme
=========================================*/

function applyTheme(){

    document.documentElement

    .setAttribute(

        "data-theme",

        accountSettings.theme

    );

}


/*=========================================
        Save Preferences
=========================================*/

function savePreferences(){

    updateSettings();

    saveSettings();

    applyTheme();

    showSuccess(

        "Account settings saved."

    );

}


/*=========================================
        Auto Save
=========================================*/

Object.values(

settingsFields

).forEach(field=>{

    if(!field) return;

    field.addEventListener(

        "change",

        savePreferences

    );

});


/*=========================================
        Initialize Settings
=========================================*/

loadSettings();

displaySettings();

applyTheme();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Account Settings Ready"

);
/*==================================================
    PROFILE.JS
    Part 5 - Order History
==================================================*/


/*=========================================
        Order History Elements
=========================================*/

const orderHistoryContainer =

document.querySelector(".order-history");


/*=========================================
        Order Storage
=========================================*/

const ORDER_HISTORY_KEY =

"yaseen-orders";


/*=========================================
        Load Orders
=========================================*/

function loadOrders(){

    try{

        return JSON.parse(

            localStorage.getItem(

                ORDER_HISTORY_KEY

            )

        ) || [];

    }

    catch(error){

        console.error(

            "Order Load Error:",

            error

        );

        return [];

    }

}


/*=========================================
        Order Status
=========================================*/

function getOrderStatus(status){

    const statusMap={

        pending:"🟡 Pending",

        processing:"🔵 Processing",

        shipped:"🟣 Shipped",

        delivered:"🟢 Delivered",

        cancelled:"🔴 Cancelled"

    };

    return statusMap[status] ||

    "🟡 Pending";

}


/*=========================================
        Order Card
=========================================*/

function createOrderCard(order){

    return `

    <div class="order-card">

        <div class="order-header">

            <h5>

                ${order.orderId}

            </h5>

            <span>

                ${getOrderStatus(

                    order.status

                )}

            </span>

        </div>

        <div class="order-body">

            <p>

                <strong>Date:</strong>

                ${formatDateTime(

                    order.createdAt

                )}

            </p>

            <p>

                <strong>Items:</strong>

                ${order.items.length}

            </p>

            <p>

                <strong>Total:</strong>

                ${formatCurrency(

                    order.total

                )}

            </p>

        </div>

        <button

            class="btn btn-primary view-order"

            data-id="${order.orderId}">

            View Details

        </button>

    </div>

    `;

}


/*=========================================
        Empty Orders
=========================================*/

function renderEmptyOrders(){

    if(!orderHistoryContainer)

        return;

    orderHistoryContainer.innerHTML=`

    <div class="empty-orders">

        <i class="fas fa-box-open"></i>

        <h3>No Orders Found</h3>

        <p>

            You haven't placed any orders yet.

        </p>

    </div>

    `;

}


/*=========================================
        Render Orders
=========================================*/

function renderOrderHistory(){

    if(!orderHistoryContainer)

        return;

    const orders=

    loadOrders();

    if(orders.length===0){

        renderEmptyOrders();

        return;

    }

    orderHistoryContainer.innerHTML=

    orders

    .map(createOrderCard)

    .join("");

}


/*=========================================
        View Order Details
=========================================*/

function viewOrderDetails(orderId){

    const orders=

    loadOrders();

    const order=

    orders.find(item=>

        item.orderId===orderId

    );

    if(!order){

        showError(

            "Order not found."

        );

        return;

    }

    console.table(order);

    showInfo(

        `Order ${orderId} loaded.`

    );

}


/*=========================================
        Events
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const button=

        event.target.closest(

            ".view-order"

        );

        if(!button)

            return;

        viewOrderDetails(

            button.dataset.id

        );

    }

);


/*=========================================
        Refresh Orders
=========================================*/

function refreshOrderHistory(){

    renderOrderHistory();

}


/*=========================================
        Initialize
=========================================*/

refreshOrderHistory();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Order History Ready"

);
/*==================================================
    PROFILE.JS
    Part 6 - Saved Addresses
==================================================*/


/*=========================================
        Address Storage
=========================================*/

const ADDRESS_STORAGE_KEY =

"yaseen-ecommerce-addresses";

let addresses = [];


/*=========================================
        Address Form
=========================================*/

const addressForm =

document.querySelector(".address-form");

const addressList =

document.querySelector(".address-list");


/*=========================================
        Load Addresses
=========================================*/

function loadAddresses(){

    try{

        addresses = JSON.parse(

            localStorage.getItem(

                ADDRESS_STORAGE_KEY

            )

        ) || [];

    }

    catch(error){

        console.error(

            "Address Load Error:",

            error

        );

        addresses = [];

    }

}


/*=========================================
        Save Addresses
=========================================*/

function saveAddresses(){

    localStorage.setItem(

        ADDRESS_STORAGE_KEY,

        JSON.stringify(addresses)

    );

}


/*=========================================
        Add Address
=========================================*/

function addAddress(data){

    addresses.push({

        id:generateID(),

        fullName:data.fullName,

        phone:data.phone,

        city:data.city,

        address:data.address,

        postalCode:data.postalCode,

        isDefault:

        addresses.length===0

    });

    saveAddresses();

    renderAddresses();

}


/*=========================================
        Delete Address
=========================================*/

function deleteAddress(id){

    addresses = addresses.filter(

        address=>

        address.id!==id

    );

    saveAddresses();

    renderAddresses();

}


/*=========================================
        Set Default Address
=========================================*/

function setDefaultAddress(id){

    addresses.forEach(address=>{

        address.isDefault=

        address.id===id;

    });

    saveAddresses();

    renderAddresses();

}


/*=========================================
        Render Addresses
=========================================*/

function renderAddresses(){

    if(!addressList)

        return;

    if(addresses.length===0){

        addressList.innerHTML=`

        <div class="empty-address">

            No saved addresses.

        </div>

        `;

        return;

    }

    addressList.innerHTML=

    addresses.map(address=>`

    <div class="address-card">

        <h5>

            ${address.fullName}

        </h5>

        <p>

            ${address.phone}

        </p>

        <p>

            ${address.address}

        </p>

        <p>

            ${address.city}

        </p>

        <p>

            ${address.postalCode}

        </p>

        ${address.isDefault

        ?'<span class="badge bg-success">Default</span>'

        :''}

        <div class="mt-3">

            <button

            class="btn btn-sm btn-success default-address"

            data-id="${address.id}">

            Default

            </button>

            <button

            class="btn btn-sm btn-danger delete-address"

            data-id="${address.id}">

            Delete

            </button>

        </div>

    </div>

    `).join("");

}


/*=========================================
        Address Validation
=========================================*/

function validateAddress(data){

    if(

        !data.fullName ||

        !data.phone ||

        !data.city ||

        !data.address

    ){

        showError(

            "Please fill all required fields."

        );

        return false;

    }

    return true;

}


/*=========================================
        Address Submit
=========================================*/

addressForm?.addEventListener(

    "submit",

    event=>{

        event.preventDefault();

        const data={

            fullName:

            addressForm.fullName.value,

            phone:

            addressForm.phone.value,

            city:

            addressForm.city.value,

            address:

            addressForm.address.value,

            postalCode:

            addressForm.postalCode.value

        };

        if(

            !validateAddress(data)

        ) return;

        addAddress(data);

        addressForm.reset();

        showSuccess(

            "Address added successfully."

        );

    }

);


/*=========================================
        Address Events
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const defaultButton=

        event.target.closest(

            ".default-address"

        );

        const deleteButton=

        event.target.closest(

            ".delete-address"

        );

        if(defaultButton){

            setDefaultAddress(

                defaultButton.dataset.id

            );

        }

        if(deleteButton){

            deleteAddress(

                deleteButton.dataset.id

            );

        }

    }

);


/*=========================================
        Initialize Addresses
=========================================*/

loadAddresses();

renderAddresses();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Saved Addresses Ready"

);
/*==================================================
    PROFILE.JS
    Part 7 - User Dashboard
==================================================*/


/*=========================================
        Dashboard Elements
=========================================*/

const dashboardName =

document.querySelector(".dashboard-name");

const dashboardEmail =

document.querySelector(".dashboard-email");

const totalOrdersElement =

document.querySelector(".dashboard-orders");

const totalWishlistElement =

document.querySelector(".dashboard-wishlist");

const totalCartElement =

document.querySelector(".dashboard-cart");

const recentOrdersContainer =

document.querySelector(".recent-orders");


/*=========================================
        Dashboard Statistics
=========================================*/

function getDashboardStatistics(){

    const orders =

    loadOrders();

    const wishlist =

    JSON.parse(

        localStorage.getItem(

            "yaseen-ecommerce-wishlist"

        )

    ) || [];

    const cart =

    JSON.parse(

        localStorage.getItem(

            "yaseen-ecommerce-cart"

        )

    ) || [];

    return{

        totalOrders:

        orders.length,

        totalWishlist:

        wishlist.length,

        totalCart:

        cart.length

    };

}


/*=========================================
        User Summary
=========================================*/

function renderUserSummary(){

    if(dashboardName){

        dashboardName.textContent =

        profile.fullName ||

        "Guest User";

    }

    if(dashboardEmail){

        dashboardEmail.textContent =

        profile.email ||

        "No Email";

    }

}


/*=========================================
        Dashboard Cards
=========================================*/

function renderDashboardCards(){

    const stats =

    getDashboardStatistics();

    if(totalOrdersElement){

        totalOrdersElement.textContent =

        stats.totalOrders;

    }

    if(totalWishlistElement){

        totalWishlistElement.textContent =

        stats.totalWishlist;

    }

    if(totalCartElement){

        totalCartElement.textContent =

        stats.totalCart;

    }

}


/*=========================================
        Recent Orders
=========================================*/

function renderRecentOrders(){

    if(!recentOrdersContainer)

        return;

    const orders =

    loadOrders()

    .slice(-5)

    .reverse();

    if(orders.length===0){

        recentOrdersContainer.innerHTML =

        "<p>No recent orders.</p>";

        return;

    }

    recentOrdersContainer.innerHTML =

    orders.map(order=>`

        <div class="recent-order">

            <strong>

                ${order.orderId}

            </strong>

            <span>

                ${formatCurrency(

                    order.total

                )}

            </span>

        </div>

    `).join("");

}


/*=========================================
        Quick Actions
=========================================*/

function initializeQuickActions(){

    document

    .querySelectorAll(

        "[data-dashboard-link]"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                window.location.href =

                button.dataset.dashboardLink;

            }

        );

    });

}


/*=========================================
        Refresh Dashboard
=========================================*/

function refreshDashboard(){

    renderUserSummary();

    renderDashboardCards();

    renderRecentOrders();

}


/*=========================================
        Initialize Dashboard
=========================================*/

refreshDashboard();

initializeQuickActions();


/*=========================================
        Console
=========================================*/

console.log(

"✅ User Dashboard Ready"

);
/*==================================================
    PROFILE.JS
    Part 8 - Final Optimization
==================================================*/


/*=========================================
        Safe Refresh
=========================================*/

function safeRefreshProfile(){

    try{

        loadProfile();

        loadSettings();

        loadAddresses();

        refreshOrderHistory();

        refreshDashboard();

        displayProfile();

        displaySettings();

        renderAddresses();

    }

    catch(error){

        console.error(

            "Profile Refresh Error:",

            error

        );

    }

}


/*=========================================
        Auto Save
=========================================*/

function autoSaveProfile(){

    saveProfile();

    saveSettings();

    saveAddresses();

}


/*=========================================
        Storage Synchronization
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key===PROFILE_STORAGE_KEY ||

            event.key===SETTINGS_STORAGE_KEY ||

            event.key===ADDRESS_STORAGE_KEY

        ){

            safeRefreshProfile();

        }

    }

);


/*=========================================
        Online / Offline
=========================================*/

window.addEventListener(

    "online",

    ()=>{

        showSuccess(

            "Connection restored."

        );

    }

);


window.addEventListener(

    "offline",

    ()=>{

        showWarning(

            "You are offline."

        );

    }

);


/*=========================================
        Profile Analytics
=========================================*/

function getProfileAnalytics(){

    return{

        fullName:

        profile.fullName,

        email:

        profile.email,

        addresses:

        addresses.length,

        orders:

        loadOrders().length,

        wishlist:

        JSON.parse(

            localStorage.getItem(

                "yaseen-ecommerce-wishlist"

            )

        )?.length || 0

    };

}


/*=========================================
        Performance Report
=========================================*/

function profilePerformance(){

    console.table(

        getProfileAnalytics()

    );

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    safeRefreshProfile

);


/*=========================================
        Auto Save Timer
=========================================*/

setInterval(

    autoSaveProfile,

    30000

);


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        safeRefreshProfile();

        profilePerformance();

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

"Profile Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
