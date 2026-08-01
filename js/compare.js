/*==================================================
    COMPARE.JS
    Part 1 - Compare Foundation
==================================================*/

"use strict";


/*=========================================
        Compare Storage
=========================================*/

const COMPARE_STORAGE_KEY =

"yaseen-ecommerce-compare";


/*=========================================
        Compare Array
=========================================*/

let compare = [];


/*=========================================
        Load Compare
=========================================*/

function loadCompare(){

    try{

        const savedCompare =

        localStorage.getItem(

            COMPARE_STORAGE_KEY

        );

        compare = savedCompare

            ? JSON.parse(savedCompare)

            : [];

    }

    catch(error){

        console.error(

            "Compare Load Error:",

            error

        );

        compare = [];

    }

}


/*=========================================
        Save Compare
=========================================*/

function saveCompare(){

    try{

        localStorage.setItem(

            COMPARE_STORAGE_KEY,

            JSON.stringify(compare)

        );

    }

    catch(error){

        console.error(

            "Compare Save Error:",

            error

        );

    }

}


/*=========================================
        Get Compare
=========================================*/

function getCompare(){

    return [...compare];

}


/*=========================================
        Compare Count
=========================================*/

function getCompareCount(){

    return compare.length;

}


/*=========================================
        Check Compare Item
=========================================*/

function isCompareItem(productId){

    return compare.some(item=>

        item.id===Number(productId)

    );

}


/*=========================================
        Clear Compare
=========================================*/

function clearCompare(){

    compare = [];

    saveCompare();

}


/*=========================================
        Initialize Compare
=========================================*/

function initializeCompare(){

    loadCompare();

    console.log(

        "⚖️ Compare Initialized"

    );

    console.log(

        "Compare Items:",

        getCompareCount()

    );

}


/*=========================================
        Start Compare
=========================================*/

initializeCompare();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Foundation Ready"

);
/*==================================================
    COMPARE.JS
    Part 2 - Add / Remove Compare
==================================================*/


/*=========================================
        Compare Limit
=========================================*/

const MAX_COMPARE_ITEMS = 4;


/*=========================================
        Find Compare Item
=========================================*/

function findCompareItem(productId){

    return compare.find(item=>

        item.id===Number(productId)

    );

}


/*=========================================
        Add To Compare
=========================================*/

function addToCompare(productId){

    productId = Number(productId);

    const product =

    getProductById(productId);

    if(!product){

        showError(

            "Product not found."

        );

        return;

    }

    if(isCompareItem(productId)){

        showInfo(

            "Already added for comparison."

        );

        return;

    }

    if(compare.length>=MAX_COMPARE_ITEMS){

        showWarning(

            `You can compare only ${MAX_COMPARE_ITEMS} products.`

        );

        return;

    }

    compare.push({

        id:product.id,

        name:product.name,

        price:product.price,

        image:product.image,

        category:product.category,

        brand:product.brand,

        rating:product.rating

    });

    saveCompare();

    updateCompareCounter();

    updateCompareButtons();

    showSuccess(

        "Product added to compare."

    );

}


/*=========================================
        Remove From Compare
=========================================*/

function removeFromCompare(productId){

    compare = compare.filter(item=>

        item.id!==Number(productId)

    );

    saveCompare();

    updateCompareCounter();

    updateCompareButtons();

    showInfo(

        "Product removed from compare."

    );

}


/*=========================================
        Toggle Compare
=========================================*/

function toggleCompare(productId){

    if(isCompareItem(productId)){

        removeFromCompare(productId);

    }

    else{

        addToCompare(productId);

    }

}


/*=========================================
        Compare Counter
=========================================*/

function updateCompareCounter(){

    document

    .querySelectorAll(".compare-count")

    .forEach(counter=>{

        counter.textContent =

        getCompareCount();

    });

}


/*=========================================
        Compare Buttons
=========================================*/

function updateCompareButtons(){

    document

    .querySelectorAll(".product-compare")

    .forEach(button=>{

        const id =

        Number(button.dataset.id);

        if(isCompareItem(id)){

            button.classList.add("active");

        }

        else{

            button.classList.remove("active");

        }

    });

}


/*=========================================
        Compare Events
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const button =

        event.target.closest(

            ".product-compare"

        );

        if(!button) return;

        toggleCompare(

            button.dataset.id

        );

    }

);


/*=========================================
        Initialize Compare UI
=========================================*/

updateCompareCounter();

updateCompareButtons();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Add / Remove Ready"

);
/*==================================================
    COMPARE.JS
    Part 3 - Compare Rendering
==================================================*/


/*=========================================
        Compare Container
=========================================*/

const compareContainer =

document.querySelector(".compare-items");


/*=========================================
        Empty Compare
=========================================*/

function renderEmptyCompare(){

    if(!compareContainer) return;

    compareContainer.innerHTML = `

        <div class="empty-compare text-center py-5">

            <i class="fas fa-balance-scale fa-3x mb-3"></i>

            <h3>No Products Selected</h3>

            <p>

                Add products to compare.

            </p>

        </div>

    `;

}


/*=========================================
        Compare Card
=========================================*/

function createCompareCard(product){

    return `

    <div class="compare-card">

        <div class="compare-image">

            <img

            src="${product.image}"

            alt="${product.name}"

            loading="lazy">

        </div>

        <div class="compare-content">

            <h5>

                ${product.name}

            </h5>

            <p>

                ${product.category}

            </p>

            <p>

                <strong>Brand:</strong>

                ${product.brand}

            </p>

            <p>

                <strong>Price:</strong>

                ${formatCurrency(product.price)}

            </p>

            <p>

                <strong>Rating:</strong>

                ⭐ ${product.rating}

            </p>

            <button

            class="btn btn-danger remove-compare"

            data-id="${product.id}">

                Remove

            </button>

        </div>

    </div>

    `;

}


/*=========================================
        Render Compare
=========================================*/

function renderCompare(){

    if(!compareContainer) return;

    if(compare.length===0){

        renderEmptyCompare();

        return;

    }

    compareContainer.innerHTML =

    compare

    .map(createCompareCard)

    .join("");

}


/*=========================================
        Refresh Compare
=========================================*/

function refreshCompare(){

    renderCompare();

    updateCompareCounter();

    updateCompareButtons();

}


/*=========================================
        Remove Event
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const button =

        event.target.closest(

            ".remove-compare"

        );

        if(!button) return;

        removeFromCompare(

            button.dataset.id

        );

        refreshCompare();

    }

);


/*=========================================
        Initialize Compare
=========================================*/

refreshCompare();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Rendering Ready"

);
/*==================================================
    COMPARE.JS
    Part 4 - Compare Features
==================================================*/


/*=========================================
        Compare Fields
=========================================*/

const compareFields=[

    {

        label:"Price",

        key:"price"

    },

    {

        label:"Rating",

        key:"rating"

    },

    {

        label:"Category",

        key:"category"

    },

    {

        label:"Brand",

        key:"brand"

    }

];


/*=========================================
        Check Difference
=========================================*/

function hasDifference(key){

    if(compare.length<2){

        return false;

    }

    return compare.some(product=>

        product[key]!==

        compare[0][key]

    );

}


/*=========================================
        Format Compare Value
=========================================*/

function formatCompareValue(

    key,

    value

){

    switch(key){

        case "price":

            return formatCurrency(value);

        case "rating":

            return `⭐ ${value}`;

        default:

            return value;

    }

}


/*=========================================
        Create Compare Table
=========================================*/

function createCompareTable(){

    const table =

    document.querySelector(

        ".compare-table"

    );

    if(!table) return;

    table.innerHTML="";

    compareFields.forEach(field=>{

        const row=

        document.createElement("tr");

        const highlight=

        hasDifference(field.key)

        ?"highlight"

        :"";

        row.innerHTML=`

            <th>

                ${field.label}

            </th>

            ${compare.map(product=>`

                <td class="${highlight}">

                    ${formatCompareValue(

                        field.key,

                        product[field.key]

                    )}

                </td>

            `).join("")}

        `;

        table.appendChild(row);

    });

}


/*=========================================
        Compare Summary
=========================================*/

function getCompareSummary(){

    return{

        totalProducts:

        compare.length,

        categories:[

            ...new Set(

                compare.map(item=>

                    item.category

                )

            )

        ].length,

        brands:[

            ...new Set(

                compare.map(item=>

                    item.brand

                )

            )

        ].length

    };

}


/*=========================================
        Refresh Compare Features
=========================================*/

function refreshCompareFeatures(){

    createCompareTable();

}


/*=========================================
        Initialize
=========================================*/

refreshCompareFeatures();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Features Ready"

);
/*==================================================
    COMPARE.JS
    Part 5 - Compare Actions
==================================================*/


/*=========================================
        Move To Cart
=========================================*/

function moveCompareItemToCart(productId){

    if(typeof addToCart!=="function"){

        showError(

            "Cart module not available."

        );

        return;

    }

    addToCart(Number(productId));

    showSuccess(

        "Product added to cart."

    );

}


/*=========================================
        Add To Wishlist
=========================================*/

function moveCompareItemToWishlist(productId){

    if(typeof addToWishlist!=="function"){

        showError(

            "Wishlist module not available."

        );

        return;

    }

    addToWishlist(Number(productId));

    showSuccess(

        "Product added to wishlist."

    );

}


/*=========================================
        Clear Compare
=========================================*/

function clearAllCompare(){

    if(compare.length===0){

        showInfo(

            "Compare list is already empty."

        );

        return;

    }

    clearCompare();

    refreshCompare();

    refreshCompareFeatures();

    showSuccess(

        "Compare list cleared."

    );

}


/*=========================================
        Share Compare
=========================================*/

async function shareCompare(){

    if(compare.length===0){

        showInfo(

            "No products to share."

        );

        return;

    }

    const compareNames =

    compare

    .map(item=>item.name)

    .join(", ");

    if(navigator.share){

        try{

            await navigator.share({

                title:

                "Product Comparison",

                text:

                compareNames,

                url:

                window.location.href

            });

        }

        catch(error){

            console.error(error);

        }

    }

    else{

        copyToClipboard(

            window.location.href

        );

        showSuccess(

            "Comparison link copied."

        );

    }

}


/*=========================================
        Export Compare
=========================================*/

function exportCompare(){

    const blob =

    new Blob(

        [

            JSON.stringify(

                compare,

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

    "compare-products.json";

    link.click();

    URL.revokeObjectURL(url);

}


/*=========================================
        Action Events
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const cartButton =

        event.target.closest(

            ".compare-cart"

        );

        const wishlistButton =

        event.target.closest(

            ".compare-wishlist"

        );

        if(cartButton){

            moveCompareItemToCart(

                cartButton.dataset.id

            );

        }

        if(wishlistButton){

            moveCompareItemToWishlist(

                wishlistButton.dataset.id

            );

        }

    }

);


document

.querySelector(

    ".clear-compare"

)

?.addEventListener(

    "click",

    clearAllCompare

);


document

.querySelector(

    ".share-compare"

)

?.addEventListener(

    "click",

    shareCompare

);


document

.querySelector(

    ".export-compare"

)

?.addEventListener(

    "click",

    exportCompare

);


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Actions Ready"

);
/*==================================================
    COMPARE.JS
    Part 6 - Search & Filter
==================================================*/


/*=========================================
        Compare Search Elements
=========================================*/

const compareSearch =

document.querySelector("#compareSearch");

const compareCategory =

document.querySelector("#compareCategory");

const compareSort =

document.querySelector("#compareSort");


/*=========================================
        Filter Compare
=========================================*/

function filterCompare(){

    let filtered = [...compare];

    const keyword =

    compareSearch?.value

    .trim()

    .toLowerCase();

    if(keyword){

        filtered = filtered.filter(item=>

            item.name

            .toLowerCase()

            .includes(keyword)

        );

    }

    const category =

    compareCategory?.value;

    if(

        category &&

        category!=="all"

    ){

        filtered = filtered.filter(item=>

            item.category===category

        );

    }

    sortCompare(filtered);

}


/*=========================================
        Sort Compare
=========================================*/

function sortCompare(products){

    const sort =

    compareSort?.value;

    switch(sort){

        case "name":

            products.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

        case "price-low":

            products.sort((a,b)=>

                a.price-b.price

            );

            break;

        case "price-high":

            products.sort((a,b)=>

                b.price-a.price

            );

            break;

    }

    renderFilteredCompare(products);

}


/*=========================================
        Render Filtered Compare
=========================================*/

function renderFilteredCompare(products){

    if(!compareContainer) return;

    if(products.length===0){

        compareContainer.innerHTML=`

        <div class="empty-compare">

            <i class="fas fa-search"></i>

            <h3>No Products Found</h3>

            <p>

                Try another search.

            </p>

        </div>

        `;

        return;

    }

    compareContainer.innerHTML=

    products

    .map(createCompareCard)

    .join("");

}


/*=========================================
        Debounced Search
=========================================*/

const compareSearchHandler=

debounce(

filterCompare,

300

);


/*=========================================
        Search Events
=========================================*/

compareSearch

?.addEventListener(

"input",

compareSearchHandler

);

compareCategory

?.addEventListener(

"change",

filterCompare

);

compareSort

?.addEventListener(

"change",

filterCompare

);


/*=========================================
        Refresh Search
=========================================*/

function refreshCompareSearch(){

    filterCompare();

}


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Search & Filter Ready"

);
/*==================================================
    COMPARE.JS
    Part 7 - Export & Print
==================================================*/


/*=========================================
        Export Compare
=========================================*/

function exportCompareData(){

    if(compare.length===0){

        showInfo(

            "No products to export."

        );

        return;

    }

    const blob =

    new Blob(

        [

            JSON.stringify(

                compare,

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

    "compare-products.json";

    link.click();

    URL.revokeObjectURL(url);

}


/*=========================================
        Print Compare
=========================================*/

function printCompare(){

    window.print();

}


/*=========================================
        Copy Compare Link
=========================================*/

function copyCompareLink(){

    copyToClipboard(

        window.location.href

    );

    showSuccess(

        "Comparison link copied."

    );

}


/*=========================================
        Download Compare
=========================================*/

function downloadCompare(){

    exportCompareData();

}


/*=========================================
        Backup Compare
=========================================*/

function backupCompare(){

    saveCompare();

    showSuccess(

        "Compare data backed up."

    );

}


/*=========================================
        Restore Compare
=========================================*/

function restoreCompare(){

    loadCompare();

    refreshCompare();

    refreshCompareFeatures();

    showSuccess(

        "Compare restored."

    );

}


/*=========================================
        Export Events
=========================================*/

document

.querySelector(".export-compare")

?.addEventListener(

    "click",

    exportCompareData

);


document

.querySelector(".print-compare")

?.addEventListener(

    "click",

    printCompare

);


document

.querySelector(".copy-compare-link")

?.addEventListener(

    "click",

    copyCompareLink

);


document

.querySelector(".backup-compare")

?.addEventListener(

    "click",

    backupCompare

);


document

.querySelector(".restore-compare")

?.addEventListener(

    "click",

    restoreCompare

);


/*=========================================
        Console
=========================================*/

console.log(

"✅ Compare Export & Print Ready"

);
/*==================================================
    COMPARE.JS
    Part 8 - Final Optimization
==================================================*/


/*=========================================
        Safe Refresh
=========================================*/

function safeRefreshCompare(){

    try{

        loadCompare();

        refreshCompare();

        refreshCompareFeatures();

    }

    catch(error){

        console.error(

            "Compare Refresh Error:",

            error

        );

    }

}


/*=========================================
        Auto Save
=========================================*/

function autoSaveCompare(){

    saveCompare();

}


/*=========================================
        Storage Synchronization
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key===

            COMPARE_STORAGE_KEY

        ){

            safeRefreshCompare();

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
        Compare Analytics
=========================================*/

function getCompareAnalytics(){

    return{

        totalProducts:

        compare.length,

        categories:

        [

            ...new Set(

                compare.map(

                    item=>item.category

                )

            )

        ].length,

        brands:

        [

            ...new Set(

                compare.map(

                    item=>item.brand

                )

            )

        ].length,

        averagePrice:

        compare.length

        ? compare.reduce(

            (total,item)=>

            total+item.price,

            0

        )/compare.length

        :0

    };

}


/*=========================================
        Performance Report
=========================================*/

function comparePerformance(){

    console.table(

        getCompareAnalytics()

    );

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    safeRefreshCompare

);


/*=========================================
        Auto Save Timer
=========================================*/

setInterval(

    autoSaveCompare,

    30000

);


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        safeRefreshCompare();

        comparePerformance();

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

"Compare Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
