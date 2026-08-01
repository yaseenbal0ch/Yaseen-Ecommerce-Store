/*==================================================
    WISHLIST.JS
    Part 1 - Wishlist Foundation
==================================================*/

"use strict";


/*=========================================
        Wishlist Storage
=========================================*/

const WISHLIST_STORAGE_KEY =

"yaseen-ecommerce-wishlist";


/*=========================================
        Wishlist Array
=========================================*/

let wishlist = [];


/*=========================================
        Load Wishlist
=========================================*/

function loadWishlist(){

    try{

        const savedWishlist =

        localStorage.getItem(

            WISHLIST_STORAGE_KEY

        );

        wishlist = savedWishlist

            ? JSON.parse(savedWishlist)

            : [];

    }

    catch(error){

        console.error(

            "Wishlist Load Error:",

            error

        );

        wishlist = [];

    }

}


/*=========================================
        Save Wishlist
=========================================*/

function saveWishlist(){

    try{

        localStorage.setItem(

            WISHLIST_STORAGE_KEY,

            JSON.stringify(wishlist)

        );

    }

    catch(error){

        console.error(

            "Wishlist Save Error:",

            error

        );

    }

}


/*=========================================
        Get Wishlist
=========================================*/

function getWishlist(){

    return [...wishlist];

}


/*=========================================
        Wishlist Count
=========================================*/

function getWishlistCount(){

    return wishlist.length;

}


/*=========================================
        Check Wishlist Item
=========================================*/

function isWishlistItem(productId){

    return wishlist.some(item=>

        item.id===Number(productId)

    );

}


/*=========================================
        Clear Wishlist
=========================================*/

function clearWishlist(){

    wishlist = [];

    saveWishlist();

}


/*=========================================
        Initialize Wishlist
=========================================*/

function initializeWishlist(){

    loadWishlist();

    console.log(

        "❤️ Wishlist Initialized"

    );

    console.log(

        "Wishlist Items:",

        getWishlistCount()

    );

}


/*=========================================
        Start Wishlist
=========================================*/

initializeWishlist();


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Foundation Ready");
/*==================================================
    WISHLIST.JS
    Part 2 - Add / Remove Wishlist
==================================================*/


/*=========================================
        Find Wishlist Item
=========================================*/

function findWishlistItem(productId){

    return wishlist.find(item=>

        item.id===Number(productId)

    );

}


/*=========================================
        Add To Wishlist
=========================================*/

function addToWishlist(productId){

    productId=Number(productId);

    const product=getProductById(productId);

    if(!product){

        showError("Product not found.");

        return;

    }

    if(isWishlistItem(productId)){

        showInfo("Already in wishlist.");

        return;

    }

    wishlist.push({

        id:product.id,

        name:product.name,

        price:product.price,

        image:product.image,

        category:product.category

    });

    saveWishlist();

    updateWishlistCounter();

    updateWishlistIcons();

    showSuccess("Added to wishlist.");

}


/*=========================================
        Remove From Wishlist
=========================================*/

function removeFromWishlist(productId){

    productId=Number(productId);

    wishlist=wishlist.filter(item=>

        item.id!==productId

    );

    saveWishlist();

    updateWishlistCounter();

    updateWishlistIcons();

    showInfo("Removed from wishlist.");

}


/*=========================================
        Toggle Wishlist
=========================================*/

function toggleWishlist(productId){

    if(isWishlistItem(productId)){

        removeFromWishlist(productId);

    }

    else{

        addToWishlist(productId);

    }

}


/*=========================================
        Wishlist Counter
=========================================*/

function updateWishlistCounter(){

    document

    .querySelectorAll(".wishlist-count")

    .forEach(counter=>{

        counter.textContent=

        getWishlistCount();

    });

}


/*=========================================
        Wishlist Icons
=========================================*/

function updateWishlistIcons(){

    document

    .querySelectorAll(".product-wishlist")

    .forEach(button=>{

        const id=

        Number(button.dataset.id);

        const icon=

        button.querySelector("i");

        if(!icon) return;

        if(isWishlistItem(id)){

            button.classList.add("active");

            icon.classList.remove("far");

            icon.classList.add("fas");

        }

        else{

            button.classList.remove("active");

            icon.classList.remove("fas");

            icon.classList.add("far");

        }

    });

}


/*=========================================
        Wishlist Events
=========================================*/

document.addEventListener("click",(event)=>{

    const button=

    event.target.closest(

        ".product-wishlist"

    );

    if(!button) return;

    toggleWishlist(

        button.dataset.id

    );

});


/*=========================================
        Initialize
=========================================*/

updateWishlistCounter();

updateWishlistIcons();


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Add / Remove Ready");
/*==================================================
    WISHLIST.JS
    Part 3 - Wishlist Rendering
==================================================*/


/*=========================================
        Wishlist Container
=========================================*/

const wishlistContainer = document.querySelector(".wishlist-items");


/*=========================================
        Empty Wishlist
=========================================*/

function renderEmptyWishlist(){

    if(!wishlistContainer) return;

    wishlistContainer.innerHTML = `

        <div class="empty-wishlist text-center py-5">

            <i class="fas fa-heart-broken fa-3x mb-3"></i>

            <h3>Your Wishlist is Empty</h3>

            <p>Add your favorite products to see them here.</p>

        </div>

    `;

}


/*=========================================
        Wishlist Card
=========================================*/

function createWishlistCard(item){

    return `

    <div class="wishlist-item" data-id="${item.id}">

        <div class="wishlist-image">

            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy">

        </div>

        <div class="wishlist-details">

            <h5>${item.name}</h5>

            <p class="wishlist-category">

                ${item.category}

            </p>

            <div class="wishlist-price">

                ${formatCurrency(item.price)}

            </div>

        </div>

        <div class="wishlist-actions">

            <button
                class="btn btn-primary move-to-cart"
                data-id="${item.id}">

                <i class="fas fa-shopping-cart"></i>

                Add To Cart

            </button>

            <button
                class="btn btn-danger remove-wishlist-item"
                data-id="${item.id}">

                <i class="fas fa-trash"></i>

            </button>

        </div>

    </div>

    `;

}


/*=========================================
        Render Wishlist
=========================================*/

function renderWishlist(){

    if(!wishlistContainer) return;

    if(wishlist.length===0){

        renderEmptyWishlist();

        return;

    }

    wishlistContainer.innerHTML = wishlist

        .map(item=>createWishlistCard(item))

        .join("");

}


/*=========================================
        Refresh Wishlist
=========================================*/

function refreshWishlist(){

    renderWishlist();

    updateWishlistCounter();

    updateWishlistIcons();

}


/*=========================================
        Remove Events
=========================================*/

document.addEventListener("click",(event)=>{

    const button = event.target.closest(

        ".remove-wishlist-item"

    );

    if(!button) return;

    removeFromWishlist(

        button.dataset.id

    );

    refreshWishlist();

});


/*=========================================
        Initial Render
=========================================*/

refreshWishlist();


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Rendering Ready");
/*==================================================
    WISHLIST.JS
    Part 4 - Wishlist Counter
==================================================*/


/*=========================================
        Wishlist Counter Elements
=========================================*/

const wishlistCounters =

document.querySelectorAll(".wishlist-count");

const wishlistBadges =

document.querySelectorAll(".wishlist-badge");


/*=========================================
        Total Wishlist Items
=========================================*/

function getTotalWishlistItems(){

    return wishlist.length;

}


/*=========================================
        Update Wishlist Counter
=========================================*/

function updateWishlistCounter(){

    const totalItems =

    getTotalWishlistItems();

    wishlistCounters.forEach(counter=>{

        counter.textContent = totalItems;

        counter.style.display =

        totalItems > 0

        ? "flex"

        : "none";

    });

}


/*=========================================
        Update Wishlist Badge
=========================================*/

function updateWishlistBadge(){

    const totalItems =

    getTotalWishlistItems();

    wishlistBadges.forEach(badge=>{

        badge.textContent = totalItems;

        if(totalItems===0){

            badge.classList.add("empty");

        }

        else{

            badge.classList.remove("empty");

        }

    });

}


/*=========================================
        Refresh Wishlist UI
=========================================*/

function refreshWishlistUI(){

    updateWishlistCounter();

    updateWishlistBadge();

    updateWishlistIcons();

}


/*=========================================
        Sync Wishlist
=========================================*/

function syncWishlist(){

    saveWishlist();

    refreshWishlistUI();

}


/*=========================================
        Wishlist Summary
=========================================*/

function getWishlistSummary(){

    return{

        totalItems:getTotalWishlistItems(),

        totalProducts:wishlist.length

    };

}


/*=========================================
        Initialize Counter
=========================================*/

refreshWishlistUI();


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Counter Ready");
/*==================================================
    WISHLIST.JS
    Part 5 - Move To Cart
==================================================*/


/*=========================================
        Move Single Product
=========================================*/

function moveToCart(productId){

    productId = Number(productId);

    const item = findWishlistItem(productId);

    if(!item){

        showError("Product not found.");

        return;

    }

    addToCart(productId);

    removeFromWishlist(productId);

    refreshWishlist();

    if(typeof refreshCart === "function"){

        refreshCart();

    }

    showSuccess("Product moved to cart.");

}


/*=========================================
        Move All Products
=========================================*/

function moveAllToCart(){

    if(wishlist.length === 0){

        showInfo("Wishlist is empty.");

        return;

    }

    wishlist.forEach(item=>{

        addToCart(item.id);

    });

    clearWishlist();

    refreshWishlist();

    if(typeof refreshCart === "function"){

        refreshCart();

    }

    showSuccess("All products moved to cart.");

}


/*=========================================
        Move Button Events
=========================================*/

document.addEventListener("click",(event)=>{

    const button = event.target.closest(

        ".move-to-cart"

    );

    if(!button) return;

    moveToCart(

        button.dataset.id

    );

});


/*=========================================
        Move All Button
=========================================*/

const moveAllButton =

document.querySelector(

    ".move-all-to-cart"

);

if(moveAllButton){

    moveAllButton.addEventListener(

        "click",

        moveAllToCart

    );

}


/*=========================================
        Wishlist & Cart Sync
=========================================*/

function syncWishlistAndCart(){

    saveWishlist();

    updateWishlistCounter();

    updateWishlistBadge();

    refreshWishlist();

    if(typeof refreshCart==="function"){

        refreshCart();

    }

}


/*=========================================
        Console
=========================================*/

console.log("✅ Move To Cart Ready");
/*==================================================
    WISHLIST.JS
    Part 6 - Search & Filter
==================================================*/


/*=========================================
        Search Elements
=========================================*/

const wishlistSearchInput =

document.querySelector(".wishlist-search");

const wishlistSort =

document.querySelector(".wishlist-sort");

const wishlistCategory =

document.querySelector(".wishlist-category-filter");


/*=========================================
        Filter Wishlist
=========================================*/

function filterWishlist(){

    let filtered = [...wishlist];


    /* Search */

    const keyword =

    wishlistSearchInput?.value

    .trim()

    .toLowerCase();

    if(keyword){

        filtered = filtered.filter(item=>

            item.name.toLowerCase()

            .includes(keyword)

        );

    }


    /* Category */

    const category =

    wishlistCategory?.value;

    if(category && category!=="All"){

        filtered = filtered.filter(item=>

            item.category===category

        );

    }


    /* Sorting */

    const sort =

    wishlistSort?.value;

    switch(sort){

        case "price-low":

            filtered.sort(

                (a,b)=>a.price-b.price

            );

            break;

        case "price-high":

            filtered.sort(

                (a,b)=>b.price-a.price

            );

            break;

        case "name":

            filtered.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

    }

    renderFilteredWishlist(filtered);

}


/*=========================================
        Render Filtered Wishlist
=========================================*/

function renderFilteredWishlist(items){

    if(!wishlistContainer) return;

    if(items.length===0){

        wishlistContainer.innerHTML=`

        <div class="empty-wishlist text-center py-5">

            <i class="fas fa-search fa-3x mb-3"></i>

            <h3>No Products Found</h3>

            <p>

                Try another keyword or filter.

            </p>

        </div>

        `;

        return;

    }

    wishlistContainer.innerHTML =

    items

    .map(createWishlistCard)

    .join("");

}


/*=========================================
        Debounced Search
=========================================*/

const wishlistSearch = debounce(

    filterWishlist,

    300

);


/*=========================================
        Events
=========================================*/

wishlistSearchInput?.addEventListener(

    "input",

    wishlistSearch

);

wishlistSort?.addEventListener(

    "change",

    filterWishlist

);

wishlistCategory?.addEventListener(

    "change",

    filterWishlist

);


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Search & Filter Ready");
/*==================================================
    WISHLIST.JS
    Part 7 - Share & Export
==================================================*/


/*=========================================
        Share Wishlist
=========================================*/

async function shareWishlist(){

    if(wishlist.length===0){

        showInfo("Wishlist is empty.");

        return;

    }

    const data={

        title:"My Wishlist",

        text:"Check out my wishlist.",

        url:window.location.href

    };

    try{

        if(navigator.share){

            await navigator.share(data);

            showSuccess("Wishlist shared.");

        }

        else{

            copyWishlistLink();

        }

    }

    catch(error){

        console.error(error);

    }

}


/*=========================================
        Copy Wishlist Link
=========================================*/

function copyWishlistLink(){

    copyToClipboard(window.location.href);

}


/*=========================================
        Export Wishlist
=========================================*/

function exportWishlist(){

    if(wishlist.length===0){

        showInfo("Wishlist is empty.");

        return;

    }

    const blob=new Blob(

        [

            JSON.stringify(

                wishlist,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    const url=

    URL.createObjectURL(blob);

    const link=

    document.createElement("a");

    link.href=url;

    link.download="wishlist.json";

    link.click();

    URL.revokeObjectURL(url);

    showSuccess("Wishlist exported.");

}


/*=========================================
        Import Wishlist
=========================================*/

function importWishlist(file){

    if(!file) return;

    const reader=new FileReader();

    reader.onload=(event)=>{

        try{

            const data=

            JSON.parse(

                event.target.result

            );

            if(Array.isArray(data)){

                wishlist=data;

                saveWishlist();

                refreshWishlist();

                showSuccess(

                    "Wishlist imported."

                );

            }

        }

        catch{

            showError(

                "Invalid wishlist file."

            );

        }

    };

    reader.readAsText(file);

}


/*=========================================
        Print Wishlist
=========================================*/

function printWishlist(){

    window.print();

}


/*=========================================
        Backup Wishlist
=========================================*/

function backupWishlist(){

    exportWishlist();

}


/*=========================================
        Restore Wishlist
=========================================*/

const wishlistImportInput=

document.querySelector(

".wishlist-import"

);

wishlistImportInput?.addEventListener(

"change",

event=>{

importWishlist(

event.target.files[0]

);

}

);


/*=========================================
        Events
=========================================*/

document

.querySelector(".share-wishlist")

?.addEventListener(

"click",

shareWishlist

);

document

.querySelector(".export-wishlist")

?.addEventListener(

"click",

exportWishlist

);

document

.querySelector(".print-wishlist")

?.addEventListener(

"click",

printWishlist

);


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Share & Export Ready");
/*==================================================
    WISHLIST.JS
    Part 8 - Final Optimization
==================================================*/


/*=========================================
        Safe Refresh
=========================================*/

function safeRefreshWishlist(){

    try{

        refreshWishlist();

        refreshWishlistUI();

    }

    catch(error){

        console.error(

            "Wishlist Refresh Error:",

            error

        );

    }

}


/*=========================================
        Wishlist Analytics
=========================================*/

function getWishlistAnalytics(){

    const totalItems = wishlist.length;

    const totalValue = wishlist.reduce(

        (total,item)=>

        total + item.price,

        0

    );

    return{

        totalItems,

        totalValue,

        averagePrice:

        totalItems

        ? totalValue/totalItems

        : 0

    };

}


/*=========================================
        Validate Storage
=========================================*/

function validateWishlistStorage(){

    try{

        JSON.parse(

            localStorage.getItem(

                WISHLIST_STORAGE_KEY

            )

        );

    }

    catch{

        localStorage.removeItem(

            WISHLIST_STORAGE_KEY

        );

        wishlist=[];

    }

}


/*=========================================
        Synchronize Wishlist
=========================================*/

function synchronizeWishlist(){

    validateWishlistStorage();

    loadWishlist();

    safeRefreshWishlist();

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    synchronizeWishlist

);


/*=========================================
        Storage Sync
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key===

            WISHLIST_STORAGE_KEY

        ){

            synchronizeWishlist();

        }

    }

);


/*=========================================
        Performance Report
=========================================*/

function wishlistPerformance(){

    console.table(

        getWishlistAnalytics()

    );

}


/*=========================================
        Global Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        synchronizeWishlist();

        wishlistPerformance();

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

"Wishlist Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
