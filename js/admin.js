/*==================================================
    ADMIN.JS
    Part 1 - Admin Foundation
==================================================*/

"use strict";


/*=========================================
        Admin Storage
=========================================*/

const ADMIN_STORAGE_KEY =

"yaseen-ecommerce-admin";


/*=========================================
        Admin Object
=========================================*/

let admin = {

    id:null,

    fullName:"",

    email:"",

    role:"admin",

    isLoggedIn:false,

    lastLogin:null,

    createdAt:null

};


/*=========================================
        Dashboard Data
=========================================*/

let dashboardData = {

    totalProducts:0,

    totalOrders:0,

    totalUsers:0,

    totalRevenue:0,

    pendingOrders:0,

    completedOrders:0

};


/*=========================================
        Load Admin
=========================================*/

function loadAdmin(){

    try{

        const savedAdmin =

        localStorage.getItem(

            ADMIN_STORAGE_KEY

        );

        if(savedAdmin){

            const data =

            JSON.parse(savedAdmin);

            admin =

            data.admin ||

            admin;

            dashboardData =

            data.dashboard ||

            dashboardData;

        }

    }

    catch(error){

        console.error(

            "Admin Load Error:",

            error

        );

    }

}


/*=========================================
        Save Admin
=========================================*/

function saveAdmin(){

    try{

        localStorage.setItem(

            ADMIN_STORAGE_KEY,

            JSON.stringify({

                admin,

                dashboard:

                dashboardData

            })

        );

    }

    catch(error){

        console.error(

            "Admin Save Error:",

            error

        );

    }

}


/*=========================================
        Reset Admin
=========================================*/

function resetAdmin(){

    admin={

        id:null,

        fullName:"",

        email:"",

        role:"admin",

        isLoggedIn:false,

        lastLogin:null,

        createdAt:null

    };

    dashboardData={

        totalProducts:0,

        totalOrders:0,

        totalUsers:0,

        totalRevenue:0,

        pendingOrders:0,

        completedOrders:0

    };

    saveAdmin();

}


/*=========================================
        Get Dashboard
=========================================*/

function getDashboardData(){

    return{

        ...dashboardData

    };

}


/*=========================================
        Initialize Admin
=========================================*/

function initializeAdmin(){

    loadAdmin();

    console.log(

        "🛠 Admin Initialized"

    );

}


/*=========================================
        Start Admin
=========================================*/

initializeAdmin();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Admin Foundation Ready"

);
/*==================================================
    ADMIN.JS
    Part 2 - Dashboard Overview
==================================================*/


/*=========================================
        Dashboard Elements
=========================================*/

const totalProductsElement =

document.querySelector(".total-products");

const totalOrdersElement =

document.querySelector(".total-orders");

const totalUsersElement =

document.querySelector(".total-users");

const totalRevenueElement =

document.querySelector(".total-revenue");

const pendingOrdersElement =

document.querySelector(".pending-orders");

const completedOrdersElement =

document.querySelector(".completed-orders");

const recentActivityElement =

document.querySelector(".recent-activity");


/*=========================================
        Load Dashboard Statistics
=========================================*/

function loadDashboardStatistics(){

    dashboardData.totalProducts =

    JSON.parse(

        localStorage.getItem(

            "yaseen-products"

        )

    )?.length || 0;

    dashboardData.totalOrders =

    JSON.parse(

        localStorage.getItem(

            "yaseen-orders"

        )

    )?.length || 0;

    dashboardData.totalUsers =

    JSON.parse(

        localStorage.getItem(

            "yaseen-users"

        )

    )?.length || 0;

    const orders =

    JSON.parse(

        localStorage.getItem(

            "yaseen-orders"

        )

    ) || [];

    dashboardData.totalRevenue =

    orders.reduce(

        (total,order)=>

        total+(order.total||0),

        0

    );

    dashboardData.pendingOrders =

    orders.filter(order=>

        order.status==="pending"

    ).length;

    dashboardData.completedOrders =

    orders.filter(order=>

        order.status==="completed"

    ).length;

}


/*=========================================
        Render Dashboard
=========================================*/

function renderDashboard(){

    totalProductsElement &&

    (totalProductsElement.textContent=

    dashboardData.totalProducts);

    totalOrdersElement &&

    (totalOrdersElement.textContent=

    dashboardData.totalOrders);

    totalUsersElement &&

    (totalUsersElement.textContent=

    dashboardData.totalUsers);

    totalRevenueElement &&

    (totalRevenueElement.textContent=

    formatCurrency(

        dashboardData.totalRevenue

    ));

    pendingOrdersElement &&

    (pendingOrdersElement.textContent=

    dashboardData.pendingOrders);

    completedOrdersElement &&

    (completedOrdersElement.textContent=

    dashboardData.completedOrders);

}


/*=========================================
        Recent Activity
=========================================*/

function renderRecentActivity(){

    if(!recentActivityElement)

        return;

    recentActivityElement.innerHTML=`

        <div class="activity-item">

            <i class="fas fa-check-circle"></i>

            Dashboard loaded successfully.

        </div>

    `;

}


/*=========================================
        Refresh Dashboard
=========================================*/

function refreshDashboard(){

    loadDashboardStatistics();

    renderDashboard();

    renderRecentActivity();

    saveAdmin();

}


/*=========================================
        Auto Refresh
=========================================*/

setInterval(

    refreshDashboard,

    30000

);


/*=========================================
        Initialize Dashboard
=========================================*/

refreshDashboard();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Dashboard Overview Ready"

);
/*==================================================
    ADMIN.JS
    Part 3 - Product Management
==================================================*/


/*=========================================
        Product Elements
=========================================*/

const productForm =

document.querySelector(".product-form");

const productTable =

document.querySelector(".product-table tbody");

const productSearch =

document.querySelector("#productSearch");


/*=========================================
        Product Storage
=========================================*/

const PRODUCT_STORAGE_KEY =

"yaseen-products";

let adminProducts = [];


/*=========================================
        Load Products
=========================================*/

function loadAdminProducts(){

    try{

        adminProducts = JSON.parse(

            localStorage.getItem(

                PRODUCT_STORAGE_KEY

            )

        ) || [];

    }

    catch(error){

        console.error(

            "Product Load Error:",

            error

        );

        adminProducts = [];

    }

}


/*=========================================
        Save Products
=========================================*/

function saveAdminProducts(){

    localStorage.setItem(

        PRODUCT_STORAGE_KEY,

        JSON.stringify(

            adminProducts

        )

    );

}


/*=========================================
        Render Products
=========================================*/

function renderAdminProducts(

    products = adminProducts

){

    if(!productTable)

        return;

    productTable.innerHTML =

    products.map(product=>`

        <tr>

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>${formatCurrency(product.price)}</td>

            <td>${product.stock}</td>

            <td>

                <button

                class="btn btn-warning edit-product"

                data-id="${product.id}">

                    Edit

                </button>

                <button

                class="btn btn-danger delete-product"

                data-id="${product.id}">

                    Delete

                </button>

            </td>

        </tr>

    `).join("");

}


/*=========================================
        Product Validation
=========================================*/

function validateProduct(data){

    if(

        !data.name ||

        !data.category ||

        !data.price ||

        !data.stock

    ){

        showError(

            "Please complete all fields."

        );

        return false;

    }

    return true;

}


/*=========================================
        Add Product
=========================================*/

function addAdminProduct(data){

    if(!validateProduct(data))

        return;

    adminProducts.push({

        id:Date.now(),

        ...data

    });

    saveAdminProducts();

    renderAdminProducts();

    refreshDashboard();

    showSuccess(

        "Product added successfully."

    );

}


/*=========================================
        Delete Product
=========================================*/

function deleteAdminProduct(id){

    adminProducts =

    adminProducts.filter(product=>

        product.id!==Number(id)

    );

    saveAdminProducts();

    renderAdminProducts();

    refreshDashboard();

    showSuccess(

        "Product deleted."

    );

}


/*=========================================
        Search Products
=========================================*/

function searchAdminProducts(){

    const keyword =

    productSearch?.value

    .trim()

    .toLowerCase();

    const filtered =

    adminProducts.filter(product=>

        product.name

        .toLowerCase()

        .includes(keyword)

    );

    renderAdminProducts(filtered);

}


/*=========================================
        Events
=========================================*/

productSearch

?.addEventListener(

    "input",

    debounce(

        searchAdminProducts,

        300

    )

);


document.addEventListener(

    "click",

    event=>{

        const deleteButton =

        event.target.closest(

            ".delete-product"

        );

        if(deleteButton){

            deleteAdminProduct(

                deleteButton.dataset.id

            );

        }

    }

);


/*=========================================
        Initialize Products
=========================================*/

loadAdminProducts();

renderAdminProducts();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Product Management Ready"

);
/*==================================================
    ADMIN.JS
    Part 4 - Category Management
==================================================*/


/*=========================================
        Category Elements
=========================================*/

const categoryForm =

document.querySelector(".category-form");

const categoryTable =

document.querySelector(".category-table tbody");

const categorySearch =

document.querySelector("#categorySearch");


/*=========================================
        Category Storage
=========================================*/

const CATEGORY_STORAGE_KEY =

"yaseen-categories";

let categories = [];


/*=========================================
        Load Categories
=========================================*/

function loadCategories(){

    categories =

    loadFromStorage(

        CATEGORY_STORAGE_KEY,

        []

    );

}


/*=========================================
        Save Categories
=========================================*/

function saveCategories(){

    saveToStorage(

        CATEGORY_STORAGE_KEY,

        categories

    );

}


/*=========================================
        Render Categories
=========================================*/

function renderCategories(

    data = categories

){

    if(!categoryTable)

        return;

    categoryTable.innerHTML =

    data.map(category=>`

        <tr>

            <td>${category.id}</td>

            <td>${category.name}</td>

            <td>

                ${category.products}

            </td>

            <td>

                <button

                class="btn btn-warning edit-category"

                data-id="${category.id}">

                    Edit

                </button>

                <button

                class="btn btn-danger delete-category"

                data-id="${category.id}">

                    Delete

                </button>

            </td>

        </tr>

    `).join("");

}


/*=========================================
        Add Category
=========================================*/

function addCategory(data){

    if(!data.name){

        showError(

            "Category name is required."

        );

        return;

    }

    categories.push({

        id:generateID(),

        name:

        sanitizeInput(data.name),

        products:0

    });

    saveCategories();

    renderCategories();

    showSuccess(

        "Category added."

    );

}


/*=========================================
        Delete Category
=========================================*/

function deleteCategory(id){

    categories =

    categories.filter(category=>

        category.id!==id

    );

    saveCategories();

    renderCategories();

    showSuccess(

        "Category deleted."

    );

}


/*=========================================
        Search Categories
=========================================*/

function searchCategories(){

    const keyword =

    categorySearch?.value

    .trim()

    .toLowerCase();

    const filtered =

    categories.filter(category=>

        category.name

        .toLowerCase()

        .includes(keyword)

    );

    renderCategories(filtered);

}


/*=========================================
        Category Statistics
=========================================*/

function updateCategoryStatistics(){

    const total =

    document.querySelector(

        ".total-categories"

    );

    if(total){

        total.textContent =

        categories.length;

    }

}


/*=========================================
        Events
=========================================*/

categorySearch

?.addEventListener(

    "input",

    debounce(

        searchCategories,

        300

    )

);


document.addEventListener(

    "click",

    event=>{

        const deleteButton =

        event.target.closest(

            ".delete-category"

        );

        if(deleteButton){

            deleteCategory(

                deleteButton.dataset.id

            );

            updateCategoryStatistics();

        }

    }

);


/*=========================================
        Initialize Categories
=========================================*/

loadCategories();

renderCategories();

updateCategoryStatistics();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Category Management Ready"

);
/*==================================================
    ADMIN.JS
    Part 5 - Order Management
==================================================*/


/*=========================================
        Order Elements
=========================================*/

const orderTable =

document.querySelector(".order-table tbody");

const orderSearch =

document.querySelector("#orderSearch");

const orderStatusFilter =

document.querySelector("#orderStatus");


/*=========================================
        Order Storage
=========================================*/

const ADMIN_ORDER_KEY =

"yaseen-orders";

let adminOrders = [];


/*=========================================
        Load Orders
=========================================*/

function loadAdminOrders(){

    adminOrders =

    loadFromStorage(

        ADMIN_ORDER_KEY,

        []

    );

}


/*=========================================
        Save Orders
=========================================*/

function saveAdminOrders(){

    saveToStorage(

        ADMIN_ORDER_KEY,

        adminOrders

    );

}


/*=========================================
        Render Orders
=========================================*/

function renderAdminOrders(

    orders = adminOrders

){

    if(!orderTable)

        return;

    orderTable.innerHTML =

    orders.map(order=>`

        <tr>

            <td>${order.orderId}</td>

            <td>${order.customer?.fullName || "Customer"}</td>

            <td>${formatCurrency(order.total)}</td>

            <td>${order.status || "Pending"}</td>

            <td>

                <button

                class="btn btn-primary order-details"

                data-id="${order.orderId}">

                    Details

                </button>

                <button

                class="btn btn-warning update-order"

                data-id="${order.orderId}">

                    Update

                </button>

                <button

                class="btn btn-danger delete-order"

                data-id="${order.orderId}">

                    Delete

                </button>

            </td>

        </tr>

    `).join("");

}


/*=========================================
        Update Order Status
=========================================*/

function updateOrderStatus(

    orderId,

    status = "Completed"

){

    const order =

    adminOrders.find(item=>

        item.orderId===orderId

    );

    if(!order){

        showError(

            "Order not found."

        );

        return;

    }

    order.status = status;

    saveAdminOrders();

    renderAdminOrders();

    refreshDashboard();

    showSuccess(

        "Order updated."

    );

}


/*=========================================
        Delete Order
=========================================*/

function deleteAdminOrder(orderId){

    adminOrders =

    adminOrders.filter(order=>

        order.orderId!==orderId

    );

    saveAdminOrders();

    renderAdminOrders();

    refreshDashboard();

    showSuccess(

        "Order deleted."

    );

}


/*=========================================
        Search Orders
=========================================*/

function searchAdminOrders(){

    const keyword =

    orderSearch?.value

    .trim()

    .toLowerCase();

    const status =

    orderStatusFilter?.value;

    let filtered =

    [...adminOrders];

    if(keyword){

        filtered = filtered.filter(order=>

            order.orderId

            .toLowerCase()

            .includes(keyword)

            ||

            (order.customer?.fullName || "")

            .toLowerCase()

            .includes(keyword)

        );

    }

    if(

        status &&

        status!=="all"

    ){

        filtered = filtered.filter(order=>

            (order.status || "Pending")

            .toLowerCase()===

            status.toLowerCase()

        );

    }

    renderAdminOrders(filtered);

}


/*=========================================
        View Order Details
=========================================*/

function viewOrderDetails(orderId){

    const order =

    adminOrders.find(item=>

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

        `Viewing ${orderId}`

    );

}


/*=========================================
        Events
=========================================*/

orderSearch?.addEventListener(

    "input",

    debounce(

        searchAdminOrders,

        300

    )

);


orderStatusFilter?.addEventListener(

    "change",

    searchAdminOrders

);


document.addEventListener(

    "click",

    event=>{

        const details =

        event.target.closest(

            ".order-details"

        );

        const update =

        event.target.closest(

            ".update-order"

        );

        const remove =

        event.target.closest(

            ".delete-order"

        );

        if(details){

            viewOrderDetails(

                details.dataset.id

            );

        }

        if(update){

            updateOrderStatus(

                update.dataset.id

            );

        }

        if(remove){

            deleteAdminOrder(

                remove.dataset.id

            );

        }

    }

);


/*=========================================
        Initialize Orders
=========================================*/

loadAdminOrders();

renderAdminOrders();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Order Management Ready"

);
/*==================================================
    ADMIN.JS
    Part 6 - User Management
==================================================*/


/*=========================================
        User Elements
=========================================*/

const userTable =

document.querySelector(".user-table tbody");

const userSearch =

document.querySelector("#userSearch");


/*=========================================
        User Storage
=========================================*/

const USER_STORAGE_KEY =

"yaseen-users";

let adminUsers = [];


/*=========================================
        Load Users
=========================================*/

function loadAdminUsers(){

    adminUsers =

    loadFromStorage(

        USER_STORAGE_KEY,

        []

    );

}


/*=========================================
        Save Users
=========================================*/

function saveAdminUsers(){

    saveToStorage(

        USER_STORAGE_KEY,

        adminUsers

    );

}


/*=========================================
        Render Users
=========================================*/

function renderAdminUsers(

    users = adminUsers

){

    if(!userTable)

        return;

    userTable.innerHTML =

    users.map(user=>`

        <tr>

            <td>${user.id}</td>

            <td>${user.fullName}</td>

            <td>${user.email}</td>

            <td>${user.role || "Customer"}</td>

            <td>

                ${user.isBlocked

                ?'<span class="badge bg-danger">Blocked</span>'

                :'<span class="badge bg-success">Active</span>'}

            </td>

            <td>

                <button

                class="btn btn-warning edit-user"

                data-id="${user.id}">

                    Edit

                </button>

                <button

                class="btn btn-secondary toggle-user"

                data-id="${user.id}">

                    ${user.isBlocked

                    ?"Unblock"

                    :"Block"}

                </button>

                <button

                class="btn btn-danger delete-user"

                data-id="${user.id}">

                    Delete

                </button>

            </td>

        </tr>

    `).join("");

}


/*=========================================
        Delete User
=========================================*/

function deleteAdminUser(id){

    adminUsers =

    adminUsers.filter(user=>

        user.id!=id

    );

    saveAdminUsers();

    renderAdminUsers();

    refreshDashboard();

    showSuccess(

        "User deleted."

    );

}


/*=========================================
        Toggle User Status
=========================================*/

function toggleUserStatus(id){

    const user =

    adminUsers.find(user=>

        user.id==id

    );

    if(!user){

        showError(

            "User not found."

        );

        return;

    }

    user.isBlocked =

    !user.isBlocked;

    saveAdminUsers();

    renderAdminUsers();

    showSuccess(

        user.isBlocked

        ?"User blocked."

        :"User unblocked."

    );

}


/*=========================================
        Search Users
=========================================*/

function searchAdminUsers(){

    const keyword =

    userSearch?.value

    .trim()

    .toLowerCase();

    const filtered =

    adminUsers.filter(user=>

        user.fullName

        .toLowerCase()

        .includes(keyword)

        ||

        user.email

        .toLowerCase()

        .includes(keyword)

    );

    renderAdminUsers(filtered);

}


/*=========================================
        User Statistics
=========================================*/

function updateUserStatistics(){

    const total =

    document.querySelector(

        ".total-users-count"

    );

    const active =

    document.querySelector(

        ".active-users-count"

    );

    const blocked =

    document.querySelector(

        ".blocked-users-count"

    );

    if(total){

        total.textContent =

        adminUsers.length;

    }

    if(active){

        active.textContent =

        adminUsers.filter(user=>

            !user.isBlocked

        ).length;

    }

    if(blocked){

        blocked.textContent =

        adminUsers.filter(user=>

            user.isBlocked

        ).length;

    }

}


/*=========================================
        Events
=========================================*/

userSearch?.addEventListener(

    "input",

    debounce(

        searchAdminUsers,

        300

    )

);


document.addEventListener(

    "click",

    event=>{

        const toggle =

        event.target.closest(

            ".toggle-user"

        );

        const remove =

        event.target.closest(

            ".delete-user"

        );

        if(toggle){

            toggleUserStatus(

                toggle.dataset.id

            );

            updateUserStatistics();

        }

        if(remove){

            deleteAdminUser(

                remove.dataset.id

            );

            updateUserStatistics();

        }

    }

);


/*=========================================
        Initialize Users
=========================================*/

loadAdminUsers();

renderAdminUsers();

updateUserStatistics();


/*=========================================
        Console
=========================================*/

console.log(

"✅ User Management Ready"

);
/*==================================================
    ADMIN.JS
    Part 7 - Reports & Analytics
==================================================*/


/*=========================================
        Report Elements
=========================================*/

const salesReportElement =

document.querySelector(".sales-report");

const revenueReportElement =

document.querySelector(".revenue-report");

const analyticsTable =

document.querySelector(".analytics-table tbody");

const exportReportButton =

document.querySelector(".export-report");


/*=========================================
        Generate Analytics
=========================================*/

function generateAnalytics(){

    const orders =

    loadFromStorage(

        "yaseen-orders",

        []

    );

    const products =

    loadFromStorage(

        "yaseen-products",

        []

    );

    const users =

    loadFromStorage(

        "yaseen-users",

        []

    );

    const revenue =

    orders.reduce(

        (total,order)=>

        total+(order.total||0),

        0

    );

    return{

        totalSales:

        orders.length,

        totalRevenue:

        revenue,

        totalProducts:

        products.length,

        totalUsers:

        users.length

    };

}


/*=========================================
        Render Reports
=========================================*/

function renderReports(){

    const report =

    generateAnalytics();

    if(salesReportElement){

        salesReportElement.textContent=

        report.totalSales;

    }

    if(revenueReportElement){

        revenueReportElement.textContent=

        formatCurrency(

            report.totalRevenue

        );

    }

    if(!analyticsTable)

        return;

    analyticsTable.innerHTML=`

        <tr>

            <td>Total Products</td>

            <td>${report.totalProducts}</td>

        </tr>

        <tr>

            <td>Total Orders</td>

            <td>${report.totalSales}</td>

        </tr>

        <tr>

            <td>Total Users</td>

            <td>${report.totalUsers}</td>

        </tr>

        <tr>

            <td>Total Revenue</td>

            <td>${formatCurrency(

                report.totalRevenue

            )}</td>

        </tr>

    `;

}


/*=========================================
        Export Report
=========================================*/

function exportReport(){

    const report =

    generateAnalytics();

    const blob =

    new Blob(

        [

            JSON.stringify(

                report,

                null,

                2

            )

        ],

        {

            type:

            "application/json"

        }

    );

    const url =

    URL.createObjectURL(blob);

    const link =

    document.createElement("a");

    link.href = url;

    link.download =

    "analytics-report.json";

    link.click();

    URL.revokeObjectURL(url);

    showSuccess(

        "Report exported."

    );

}


/*=========================================
        Analytics Summary
=========================================*/

function showAnalyticsSummary(){

    console.table(

        generateAnalytics()

    );

}


/*=========================================
        Export Event
=========================================*/

exportReportButton

?.addEventListener(

    "click",

    exportReport

);


/*=========================================
        Refresh Reports
=========================================*/

function refreshReports(){

    renderReports();

    showAnalyticsSummary();

}


/*=========================================
        Initialize Reports
=========================================*/

refreshReports();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Reports & Analytics Ready"

);
/*==================================================
    ADMIN.JS
    Part 8 - Settings
==================================================*/


/*=========================================
        Settings Storage
=========================================*/

const ADMIN_SETTINGS_KEY =

"yaseen-admin-settings";


/*=========================================
        Settings Object
=========================================*/

let adminSettings = {

    storeName:"Yaseen E-Commerce",

    storeEmail:"",

    currency:"PKR",

    taxRate:0.17,

    shippingCost:250,

    notifications:true

};


/*=========================================
        Settings Elements
=========================================*/

const settingsForm =

document.querySelector(".admin-settings-form");


/*=========================================
        Load Settings
=========================================*/

function loadAdminSettings(){

    adminSettings =

    loadFromStorage(

        ADMIN_SETTINGS_KEY,

        adminSettings

    );

}


/*=========================================
        Save Settings
=========================================*/

function saveAdminSettings(){

    saveToStorage(

        ADMIN_SETTINGS_KEY,

        adminSettings

    );

}


/*=========================================
        Display Settings
=========================================*/

function displayAdminSettings(){

    if(!settingsForm)

        return;

    settingsForm.storeName.value =

    adminSettings.storeName;

    settingsForm.storeEmail.value =

    adminSettings.storeEmail;

    settingsForm.currency.value =

    adminSettings.currency;

    settingsForm.taxRate.value =

    adminSettings.taxRate;

    settingsForm.shippingCost.value =

    adminSettings.shippingCost;

    settingsForm.notifications.checked =

    adminSettings.notifications;

}


/*=========================================
        Update Settings
=========================================*/

function updateAdminSettings(){

    adminSettings.storeName =

    sanitizeInput(

        settingsForm.storeName.value

    );

    adminSettings.storeEmail =

    sanitizeInput(

        settingsForm.storeEmail.value

    );

    adminSettings.currency =

    settingsForm.currency.value;

    adminSettings.taxRate =

    Number(

        settingsForm.taxRate.value

    );

    adminSettings.shippingCost =

    Number(

        settingsForm.shippingCost.value

    );

    adminSettings.notifications =

    settingsForm.notifications.checked;

}


/*=========================================
        Validate Settings
=========================================*/

function validateAdminSettings(){

    if(

        !adminSettings.storeName ||

        !adminSettings.storeEmail

    ){

        showError(

            "Store information is required."

        );

        return false;

    }

    if(

        !isValidEmail(

            adminSettings.storeEmail

        )

    ){

        showError(

            "Enter a valid email."

        );

        return false;

    }

    return true;

}


/*=========================================
        Save Settings Event
=========================================*/

settingsForm?.addEventListener(

    "submit",

    event=>{

        event.preventDefault();

        updateAdminSettings();

        if(

            !validateAdminSettings()

        ) return;

        saveAdminSettings();

        showSuccess(

            "Settings saved successfully."

        );

    }

);


/*=========================================
        Reset Settings
=========================================*/

function resetAdminSettings(){

    localStorage.removeItem(

        ADMIN_SETTINGS_KEY

    );

    loadAdminSettings();

    displayAdminSettings();

    showInfo(

        "Settings reset."

    );

}


/*=========================================
        Initialize Settings
=========================================*/

loadAdminSettings();

displayAdminSettings();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Admin Settings Ready"

);
/*==================================================
    ADMIN.JS
    Part 9 - Security & Validation
==================================================*/


/*=========================================
        Security Configuration
=========================================*/

const ADMIN_ROLE = "admin";

let adminLocked = false;


/*=========================================
        Check Authentication
=========================================*/

function isAdminAuthenticated(){

    return (

        admin.isLoggedIn &&

        admin.role === ADMIN_ROLE

    );

}


/*=========================================
        Check Permission
=========================================*/

function hasAdminPermission(){

    if(!isAdminAuthenticated()){

        showError(

            "Administrator access required."

        );

        return false;

    }

    return true;

}


/*=========================================
        Sanitize Admin Data
=========================================*/

function sanitizeAdminData(data){

    return{

        ...data,

        storeName:

        sanitizeInput(

            data.storeName || ""

        ),

        storeEmail:

        sanitizeInput(

            data.storeEmail || ""

        )

    };

}


/*=========================================
        Validate Admin Settings
=========================================*/

function validateAdminSecurity(){

    if(!hasAdminPermission()){

        return false;

    }

    adminSettings =

    sanitizeAdminData(

        adminSettings

    );

    if(

        !isValidEmail(

            adminSettings.storeEmail

        )

    ){

        showError(

            "Invalid store email."

        );

        return false;

    }

    return true;

}


/*=========================================
        Lock Admin Actions
=========================================*/

function lockAdmin(){

    adminLocked = true;

}


function unlockAdmin(){

    adminLocked = false;

}


function canPerformAdminAction(){

    if(adminLocked){

        showWarning(

            "Please wait..."

        );

        return false;

    }

    return true;

}


/*=========================================
        Secure Action Wrapper
=========================================*/

function executeAdminAction(callback){

    if(

        !validateAdminSecurity()

    ){

        return;

    }

    if(

        !canPerformAdminAction()

    ){

        return;

    }

    lockAdmin();

    try{

        callback();

    }

    catch(error){

        console.error(error);

        showError(

            "Unexpected admin error."

        );

    }

    finally{

        setTimeout(

            unlockAdmin,

            1000

        );

    }

}


/*=========================================
        Session Validation
=========================================*/

function validateAdminSession(){

    if(

        !isAdminAuthenticated()

    ){

        window.location = "login.html";

    }

}


/*=========================================
        Initialize Security
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        validateAdminSession();

    }

);


/*=========================================
        Console
=========================================*/

console.log(

"✅ Admin Security Ready"

);
/*==================================================
    ADMIN.JS
    Part 10 - Final Optimization
==================================================*/


/*=========================================
        Safe Refresh
=========================================*/

function safeRefreshAdmin(){

    try{

        loadAdmin();

        loadAdminSettings();

        loadAdminProducts();

        loadAdminOrders();

        loadAdminUsers();

        loadCategories();

        refreshDashboard();

        renderAdminProducts();

        renderAdminOrders();

        renderAdminUsers();

        renderCategories();

        renderReports();

    }

    catch(error){

        console.error(

            "Admin Refresh Error:",

            error

        );

    }

}


/*=========================================
        Auto Save
=========================================*/

function autoSaveAdmin(){

    saveAdmin();

    saveAdminSettings();

    saveAdminProducts();

    saveAdminOrders();

    saveAdminUsers();

    saveCategories();

}


/*=========================================
        Storage Synchronization
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        const storageKeys=[

            ADMIN_STORAGE_KEY,

            ADMIN_SETTINGS_KEY,

            PRODUCT_STORAGE_KEY,

            ADMIN_ORDER_KEY,

            USER_STORAGE_KEY,

            CATEGORY_STORAGE_KEY

        ];

        if(

            storageKeys.includes(

                event.key

            )

        ){

            safeRefreshAdmin();

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
        Admin Analytics
=========================================*/

function getAdminAnalytics(){

    return{

        products:

        adminProducts.length,

        categories:

        categories.length,

        users:

        adminUsers.length,

        orders:

        adminOrders.length,

        revenue:

        dashboardData.totalRevenue

    };

}


/*=========================================
        Performance Report
=========================================*/

function adminPerformance(){

    console.table(

        getAdminAnalytics()

    );

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    safeRefreshAdmin

);


/*=========================================
        Auto Save Timer
=========================================*/

setInterval(

    autoSaveAdmin,

    30000

);


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        safeRefreshAdmin();

        adminPerformance();

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

"Admin Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
