/*==================================================
    PRODUCTS.JS
    Part 1 - Product Data Structure
==================================================*/

"use strict";

/*=========================================
        Product Database
=========================================*/

const products = [

{
id:1,

name:"Premium Wireless Headphones",

category:"Electronics",

price:14999,

oldPrice:17999,

discount:17,

rating:4.9,

reviews:245,

stock:18,

badge:"Best Seller",

image:"assets/images/products/headphones.webp",

description:"Premium wireless headphones with active noise cancellation and immersive sound."

},

{
id:2,

name:"Gaming Mechanical Keyboard",

category:"Gaming",

price:8999,

oldPrice:10999,

discount:18,

rating:4.8,

reviews:180,

stock:25,

badge:"Hot",

image:"assets/images/products/keyboard.webp",

description:"RGB mechanical keyboard with blue switches for professional gaming."

},

{
id:3,

name:"Smart Watch Pro",

category:"Wearables",

price:12999,

oldPrice:14999,

discount:13,

rating:4.7,

reviews:150,

stock:12,

badge:"New",

image:"assets/images/products/smartwatch.webp",

description:"Fitness tracking, heart rate monitoring and premium AMOLED display."

},

{
id:4,

name:"Ultra HD Monitor",

category:"Electronics",

price:42999,

oldPrice:47999,

discount:10,

rating:4.9,

reviews:95,

stock:8,

badge:"Featured",

image:"assets/images/products/monitor.webp",

description:"27-inch Ultra HD IPS monitor with ultra-thin bezels."

},

{
id:5,

name:"Premium Office Chair",

category:"Furniture",

price:24999,

oldPrice:28999,

discount:14,

rating:4.8,

reviews:132,

stock:10,

badge:"Trending",

image:"assets/images/products/chair.webp",

description:"Ergonomic office chair designed for maximum comfort."

},

{
id:6,

name:"Wireless Gaming Mouse",

category:"Gaming",

price:4999,

oldPrice:6499,

discount:23,

rating:4.7,

reviews:215,

stock:35,

badge:"Sale",

image:"assets/images/products/mouse.webp",

description:"Lightweight wireless gaming mouse with RGB lighting."

}

];


/*=========================================
        Categories
=========================================*/

const categories=[

"All",

"Electronics",

"Gaming",

"Wearables",

"Furniture"

];


/*=========================================
        Currency Formatter
=========================================*/

function formatPrice(price){

return new Intl.NumberFormat("en-PK",{

style:"currency",

currency:"PKR",

maximumFractionDigits:0

}).format(price);

}


/*=========================================
        Product Helpers
=========================================*/

function getProductById(id){

return products.find(product=>product.id===id);

}

function getFeaturedProducts(){

return products.filter(product=>

product.badge==="Best Seller" ||

product.badge==="Featured" ||

product.badge==="Trending"

);

}

function getInStockProducts(){

return products.filter(product=>product.stock>0);

}


/*=========================================
        Development
=========================================*/

console.log("✅ Product Database Loaded");

console.log(`Products : ${products.length}`);

console.log(`Categories : ${categories.length}`);
/*==================================================
    PRODUCTS.JS
    Part 2 - Dynamic Product Rendering
==================================================*/


/*=========================================
        Product Container
=========================================*/

const productContainer = document.querySelector(".products-grid");


/*=========================================
        Generate Rating Stars
=========================================*/

function generateStars(rating){

let stars="";

const fullStars=Math.floor(rating);

const hasHalf=rating%1>=0.5;

for(let i=1;i<=5;i++){

if(i<=fullStars){

stars+='<i class="fas fa-star"></i>';

}

else if(i===fullStars+1 && hasHalf){

stars+='<i class="fas fa-star-half-alt"></i>';

}

else{

stars+='<i class="far fa-star"></i>';

}

}

return stars;

}


/*=========================================
        Product Card
=========================================*/

function createProductCard(product){

return `

<div class="col-lg-4 col-md-6 mb-4">

<div class="product-card reveal-up">

<div class="product-badge">

${product.badge}

</div>

<div class="product-image">

<img src="${product.image}"

alt="${product.name}"

loading="lazy">

<button class="product-wishlist"

data-id="${product.id}">

<i class="far fa-heart"></i>

</button>

</div>

<div class="product-content">

<h3 class="product-title">

${product.name}

</h3>

<p class="product-category">

${product.category}

</p>

<div class="product-rating">

${generateStars(product.rating)}

<span>

(${product.reviews})

</span>

</div>

<div class="product-price">

<span class="current-price">

${formatPrice(product.price)}

</span>

<span class="old-price">

${formatPrice(product.oldPrice)}

</span>

</div>

<div class="product-buttons">

<button

class="btn btn-primary cart-btn"

data-id="${product.id}">

<i class="fas fa-shopping-cart"></i>

Add To Cart

</button>

</div>

</div>

</div>

</div>

`;

}


/*=========================================
        Empty State
=========================================*/

function renderEmptyState(){

if(!productContainer) return;

productContainer.innerHTML=`

<div class="col-12 text-center py-5">

<h3>No Products Found</h3>

<p>Please try another category.</p>

</div>

`;

}


/*=========================================
        Render Products
=========================================*/

function renderProducts(productList=products){

if(!productContainer) return;

if(productList.length===0){

renderEmptyState();

return;

}

productContainer.innerHTML=

productList

.map(product=>createProductCard(product))

.join("");

}


/*=========================================
        Initial Render
=========================================*/

renderProducts();


/*=========================================
        Console
=========================================*/

console.log("✅ Products Rendered Successfully");
/*==================================================
    PRODUCTS.JS
    Part 3 - Product Search
==================================================*/


/*=========================================
        Search Elements
=========================================*/

const searchInput = document.querySelector(".search-input");


/*=========================================
        Debounce Function
=========================================*/

function debounce(callback,delay=300){

let timer;

return(...args)=>{

clearTimeout(timer);

timer=setTimeout(()=>{

callback(...args);

},delay);

};

}


/*=========================================
        Highlight Search Text
=========================================*/

function highlightText(text,keyword){

if(!keyword) return text;

const pattern=new RegExp(`(${keyword})`,"gi");

return text.replace(pattern,"<mark>$1</mark>");

}


/*=========================================
        Product Search
=========================================*/

function searchProducts(keyword){

const value=keyword.trim().toLowerCase();

if(value===""){

renderProducts(products);

return;

}

const filteredProducts=products.filter(product=>{

return(

product.name.toLowerCase().includes(value)||

product.category.toLowerCase().includes(value)||

product.description.toLowerCase().includes(value)

);

});

renderSearchResults(filteredProducts,value);

}


/*=========================================
        Render Search Results
=========================================*/

function renderSearchResults(productList,keyword){

if(!productContainer) return;

if(productList.length===0){

renderEmptyState();

return;

}

productContainer.innerHTML=productList.map(product=>{

return`

<div class="col-lg-4 col-md-6 mb-4">

<div class="product-card reveal-up">

<div class="product-badge">

${product.badge}

</div>

<div class="product-image">

<img

src="${product.image}"

alt="${product.name}"

loading="lazy">

</div>

<div class="product-content">

<h3 class="product-title">

${highlightText(product.name,keyword)}

</h3>

<p class="product-category">

${highlightText(product.category,keyword)}

</p>

<div class="product-rating">

${generateStars(product.rating)}

<span>(${product.reviews})</span>

</div>

<div class="product-price">

<span class="current-price">

${formatPrice(product.price)}

</span>

<span class="old-price">

${formatPrice(product.oldPrice)}

</span>

</div>

<button

class="btn btn-primary cart-btn"

data-id="${product.id}">

<i class="fas fa-shopping-cart"></i>

Add To Cart

</button>

</div>

</div>

</div>

`;

}).join("");

}


/*=========================================
        Live Search
=========================================*/

if(searchInput){

searchInput.addEventListener(

"input",

debounce((event)=>{

searchProducts(event.target.value);

})

);

}


/*=========================================
        Search Ready
=========================================*/

console.log("✅ Product Search Ready");
/*==================================================
    PRODUCTS.JS
    Part 4 - Category Filter
==================================================*/


/*=========================================
        Category Elements
=========================================*/

const categoryButtons =
document.querySelectorAll(".category-btn");

let currentCategory = "All";


/*=========================================
        Filter Products
=========================================*/

function filterProducts(category){

    currentCategory = category;

    if(category === "All"){

        renderProducts(products);

        return;

    }

    const filteredProducts = products.filter(product =>

        product.category === category

    );

    renderProducts(filteredProducts);

}


/*=========================================
        Active Category
=========================================*/

function updateActiveCategory(button){

    categoryButtons.forEach(btn=>{

        btn.classList.remove("active");

    });

    button.classList.add("active");

}


/*=========================================
        Category Events
=========================================*/

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const category =

        button.dataset.category;

        updateActiveCategory(button);

        filterProducts(category);

    });

});


/*=========================================
        Reset Category
=========================================*/

function resetCategory(){

    currentCategory = "All";

    categoryButtons.forEach(button=>{

        button.classList.remove("active");

        if(button.dataset.category==="All"){

            button.classList.add("active");

        }

    });

    renderProducts(products);

}


/*=========================================
        Category Counter
=========================================*/

function getCategoryCount(category){

    if(category==="All"){

        return products.length;

    }

    return products.filter(product=>

        product.category===category

    ).length;

}


/*=========================================
        Update Category Counts
=========================================*/

categoryButtons.forEach(button=>{

    const category =

    button.dataset.category;

    button.setAttribute(

        "data-count",

        getCategoryCount(category)

    );

});


/*=========================================
        Console
=========================================*/

console.log("✅ Category Filter Ready");
/*==================================================
    PRODUCTS.JS
    Part 5 - Price Filter
==================================================*/


/*=========================================
        Price Elements
=========================================*/

const minPriceInput = document.querySelector(".min-price");

const maxPriceInput = document.querySelector(".max-price");

const priceRange = document.querySelector(".price-range");

const priceValue = document.querySelector(".price-value");


/*=========================================
        Filter By Price
=========================================*/

function filterByPrice(){

    const minPrice = Number(minPriceInput?.value || 0);

    const maxPrice = Number(maxPriceInput?.value || 1000000);

    const filteredProducts = products.filter(product=>{

        return product.price >= minPrice &&

               product.price <= maxPrice;

    });

    renderProducts(filteredProducts);

}


/*=========================================
        Range Slider
=========================================*/

if(priceRange){

    priceRange.addEventListener("input",()=>{

        const value = Number(priceRange.value);

        if(priceValue){

            priceValue.textContent = formatPrice(value);

        }

        if(maxPriceInput){

            maxPriceInput.value = value;

        }

        filterByPrice();

    });

}


/*=========================================
        Manual Inputs
=========================================*/

[minPriceInput,maxPriceInput].forEach(input=>{

    if(!input) return;

    input.addEventListener("input",()=>{

        filterByPrice();

    });

});


/*=========================================
        Reset Price Filter
=========================================*/

function resetPriceFilter(){

    if(minPriceInput){

        minPriceInput.value = 0;

    }

    if(maxPriceInput){

        maxPriceInput.value = 1000000;

    }

    if(priceRange){

        priceRange.value = 1000000;

    }

    if(priceValue){

        priceValue.textContent = formatPrice(1000000);

    }

    renderProducts(products);

}


/*=========================================
        Initial Price
=========================================*/

if(priceValue && priceRange){

    priceValue.textContent = formatPrice(priceRange.value);

}


/*=========================================
        Console
=========================================*/

console.log("✅ Price Filter Ready");
/*==================================================
    PRODUCTS.JS
    Part 6 - Product Sorting
==================================================*/


/*=========================================
        Sort Elements
=========================================*/

const sortSelect = document.querySelector(".sort-select");


/*=========================================
        Sort Products
=========================================*/

function sortProducts(sortType){

    let sortedProducts = [...products];

    switch(sortType){

        case "latest":

            sortedProducts.sort((a,b)=>b.id-a.id);

            break;

        case "popular":

            sortedProducts.sort((a,b)=>b.reviews-a.reviews);

            break;

        case "rating":

            sortedProducts.sort((a,b)=>b.rating-a.rating);

            break;

        case "price-low":

            sortedProducts.sort((a,b)=>a.price-b.price);

            break;

        case "price-high":

            sortedProducts.sort((a,b)=>b.price-a.price);

            break;

        case "discount":

            sortedProducts.sort((a,b)=>b.discount-a.discount);

            break;

        case "name":

            sortedProducts.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

        default:

            sortedProducts = [...products];

    }

    renderProducts(sortedProducts);

}


/*=========================================
        Sort Change Event
=========================================*/

if(sortSelect){

    sortSelect.addEventListener("change",(event)=>{

        sortProducts(event.target.value);

    });

}


/*=========================================
        Reset Sorting
=========================================*/

function resetSorting(){

    if(sortSelect){

        sortSelect.value="latest";

    }

    renderProducts(products);

}


/*=========================================
        Default Sort
=========================================*/

if(sortSelect){

    sortProducts(sortSelect.value);

}


/*=========================================
        Console
=========================================*/

console.log("✅ Product Sorting Ready");
/*==================================================
    PRODUCTS.JS
    Part 7 - Wishlist
==================================================*/


/*=========================================
        Wishlist Storage
=========================================*/

const WISHLIST_KEY = "yaseen-ecommerce-wishlist";

let wishlist = JSON.parse(

localStorage.getItem(WISHLIST_KEY)

) || [];


/*=========================================
        Save Wishlist
=========================================*/

function saveWishlist(){

localStorage.setItem(

WISHLIST_KEY,

JSON.stringify(wishlist)

);

updateWishlistCounter();

}


/*=========================================
        Wishlist Counter
=========================================*/

function updateWishlistCounter(){

const counter = document.querySelector(".wishlist-count");

if(counter){

counter.textContent = wishlist.length;

}

}


/*=========================================
        Toggle Wishlist
=========================================*/

function toggleWishlist(productId){

productId = Number(productId);

const index = wishlist.indexOf(productId);

if(index === -1){

wishlist.push(productId);

showWishlistMessage("Added to Wishlist ❤️");

}else{

wishlist.splice(index,1);

showWishlistMessage("Removed from Wishlist 💔");

}

saveWishlist();

renderWishlistIcons();

}


/*=========================================
        Wishlist Message
=========================================*/

function showWishlistMessage(message){

const toast = document.createElement("div");

toast.className = "wishlist-toast";

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
        Render Wishlist Icons
=========================================*/

function renderWishlistIcons(){

document

.querySelectorAll(".product-wishlist")

.forEach(button=>{

const id = Number(button.dataset.id);

const icon = button.querySelector("i");

if(!icon) return;

if(wishlist.includes(id)){

button.classList.add("active");

icon.classList.remove("far");

icon.classList.add("fas");

}else{

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

const button = event.target.closest(".product-wishlist");

if(!button) return;

toggleWishlist(button.dataset.id);

});


/*=========================================
        Initialize Wishlist
=========================================*/

updateWishlistCounter();

renderWishlistIcons();


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Ready");
/*==================================================
    PRODUCTS.JS
    Part 7 - Wishlist
==================================================*/


/*=========================================
        Wishlist Storage
=========================================*/

let wishlist = JSON.parse(

localStorage.getItem(WISHLIST_KEY)

) || [];


/*=========================================
        Save Wishlist
=========================================*/

function saveWishlist(){

localStorage.setItem(

WISHLIST_KEY,

JSON.stringify(wishlist)

);

updateWishlistCounter();

}


/*=========================================
        Wishlist Counter
=========================================*/

function updateWishlistCounter(){

const counter = document.querySelector(".wishlist-count");

if(counter){

counter.textContent = wishlist.length;

}

}


/*=========================================
        Toggle Wishlist
=========================================*/

function toggleWishlist(productId){

productId = Number(productId);

const index = wishlist.indexOf(productId);

if(index === -1){

wishlist.push(productId);

showWishlistMessage("Added to Wishlist ❤️");

}else{

wishlist.splice(index,1);

showWishlistMessage("Removed from Wishlist 💔");

}

saveWishlist();

renderWishlistIcons();

}


/*=========================================
        Wishlist Message
=========================================*/

function showWishlistMessage(message){

const toast = document.createElement("div");

toast.className = "wishlist-toast";

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
        Render Wishlist Icons
=========================================*/

function renderWishlistIcons(){

document

.querySelectorAll(".product-wishlist")

.forEach(button=>{

const id = Number(button.dataset.id);

const icon = button.querySelector("i");

if(!icon) return;

if(wishlist.includes(id)){

button.classList.add("active");

icon.classList.remove("far");

icon.classList.add("fas");

}else{

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

const button = event.target.closest(".product-wishlist");

if(!button) return;

toggleWishlist(button.dataset.id);

});


/*=========================================
        Initialize Wishlist
=========================================*/

updateWishlistCounter();

renderWishlistIcons();


/*=========================================
        Console
=========================================*/

console.log("✅ Wishlist Ready");
/*==================================================
    PRODUCTS.JS
    Part 8 - Quick View Modal
==================================================*/


/*=========================================
        Quick View Elements
=========================================*/

const quickViewModal = document.querySelector(".quick-view-modal");

const quickViewContent = document.querySelector(".quick-view-content");

const quickViewClose = document.querySelector(".quick-view-close");


/*=========================================
        Open Quick View
=========================================*/

function openQuickView(productId){

    const product = getProductById(Number(productId));

    if(!product || !quickViewModal || !quickViewContent) return;

    quickViewContent.innerHTML = `

        <div class="row align-items-center">

            <div class="col-lg-6">

                <img
                src="${product.image}"
                alt="${product.name}"
                class="img-fluid rounded">

            </div>

            <div class="col-lg-6">

                <span class="badge bg-primary mb-3">

                    ${product.badge}

                </span>

                <h2 class="mb-3">

                    ${product.name}

                </h2>

                <p class="text-muted">

                    ${product.category}

                </p>

                <div class="product-rating mb-3">

                    ${generateStars(product.rating)}

                    <span>

                        (${product.reviews} Reviews)

                    </span>

                </div>

                <h3 class="mb-3 text-primary">

                    ${formatPrice(product.price)}

                </h3>

                <p>

                    ${product.description}

                </p>

                <p>

                    <strong>Stock:</strong>

                    ${product.stock}

                </p>

                <button
                class="btn btn-primary cart-btn"
                data-id="${product.id}">

                    <i class="fas fa-shopping-cart"></i>

                    Add To Cart

                </button>

            </div>

        </div>

    `;

    quickViewModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/*=========================================
        Close Quick View
=========================================*/

function closeQuickView(){

    if(!quickViewModal) return;

    quickViewModal.classList.remove("show");

    document.body.style.overflow = "";

}


/*=========================================
        Quick View Events
=========================================*/

document.addEventListener("click",(event)=>{

    const button = event.target.closest(".quick-view-btn");

    if(button){

        openQuickView(button.dataset.id);

    }

});


/*=========================================
        Close Button
=========================================*/

if(quickViewClose){

    quickViewClose.addEventListener("click",closeQuickView);

}


/*=========================================
        Close On Outside Click
=========================================*/

if(quickViewModal){

    quickViewModal.addEventListener("click",(event)=>{

        if(event.target === quickViewModal){

            closeQuickView();

        }

    });

}


/*=========================================
        ESC Key Close
=========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key === "Escape"){

        closeQuickView();

    }

});


/*=========================================
        Console
=========================================*/

console.log("✅ Quick View Ready");
/*==================================================
    PRODUCTS.JS
    Part 9 - Pagination
==================================================*/


/*=========================================
        Pagination Settings
=========================================*/

const productsPerPage = 6;

let currentPage = 1;

let filteredProducts = [...products];

const paginationContainer =
document.querySelector(".pagination");


/*=========================================
        Display Products
=========================================*/

function displayProducts(page){

currentPage = page;

const start = (page - 1) * productsPerPage;

const end = start + productsPerPage;

const pageProducts = filteredProducts.slice(start,end);

renderProducts(pageProducts);

renderPagination();

}


/*=========================================
        Render Pagination
=========================================*/

function renderPagination(){

if(!paginationContainer) return;

const totalPages = Math.ceil(

filteredProducts.length /

productsPerPage

);

let html = "";


/* Previous */

html += `

<button

class="page-btn"

${currentPage===1?"disabled":""}

data-page="prev">

<i class="fas fa-angle-left"></i>

</button>

`;


/* Numbers */

for(let i=1;i<=totalPages;i++){

html += `

<button

class="page-btn ${i===currentPage?"active":""}"

data-page="${i}">

${i}

</button>

`;

}


/* Next */

html += `

<button

class="page-btn"

${currentPage===totalPages?"disabled":""}

data-page="next">

<i class="fas fa-angle-right"></i>

</button>

`;

paginationContainer.innerHTML = html;

}


/*=========================================
        Pagination Events
=========================================*/

document.addEventListener("click",(event)=>{

const button = event.target.closest(".page-btn");

if(!button) return;

const action = button.dataset.page;

const totalPages = Math.ceil(

filteredProducts.length /

productsPerPage

);

if(action==="prev" && currentPage>1){

displayProducts(currentPage-1);

return;

}

if(action==="next" && currentPage<totalPages){

displayProducts(currentPage+1);

return;

}

const page = Number(action);

if(page){

displayProducts(page);

}

});


/*=========================================
        Refresh Pagination
=========================================*/

function updatePagination(productsArray){

filteredProducts = [...productsArray];

displayProducts(1);

}


/*=========================================
        Initialize
=========================================*/

updatePagination(products);


/*=========================================
        Console
=========================================*/

console.log("✅ Pagination Ready");
/*==================================================
    PRODUCTS.JS
    Part 10 - Final Product Optimization
==================================================*/


/*=========================================
        Product Image Lazy Loading
=========================================*/

function initializeLazyImages(){

    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    if("IntersectionObserver" in window){

        const observer = new IntersectionObserver((entries, imageObserver)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const image = entry.target;

                image.classList.add("image-loaded");

                imageObserver.unobserve(image);

            });

        },{

            threshold:0.1

        });

        lazyImages.forEach(image=>observer.observe(image));

    }

}


/*=========================================
        Image Error Handler
=========================================*/

function initializeImageFallback(){

    document.querySelectorAll(".product-image img").forEach(image=>{

        image.addEventListener("error",()=>{

            image.src="assets/images/products/placeholder.webp";

        });

    });

}


/*=========================================
        Skeleton Loading
=========================================*/

function showSkeleton(){

    if(!productContainer) return;

    let skeleton="";

    for(let i=0;i<6;i++){

        skeleton+=`

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="product-card skeleton-card">

                <div class="skeleton skeleton-image"></div>

                <div class="skeleton skeleton-title"></div>

                <div class="skeleton skeleton-text"></div>

                <div class="skeleton skeleton-price"></div>

                <div class="skeleton skeleton-button"></div>

            </div>

        </div>

        `;

    }

    productContainer.innerHTML=skeleton;

}


/*=========================================
        Refresh Products
=========================================*/

function refreshProducts(){

    showSkeleton();

    setTimeout(()=>{

        updatePagination(products);

        initializeLazyImages();

        initializeImageFallback();

        renderWishlistIcons();

    },500);

}


/*=========================================
        Performance Monitor
=========================================*/

function performanceReport(){

    if(window.performance){

        console.log(

            "Page Load:",

            Math.round(performance.now()),

            "ms"

        );

    }

}


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeLazyImages();

    initializeImageFallback();

    performanceReport();

});


/*=========================================
        Production Ready
=========================================*/

console.log("====================================");

console.log("Yaseen E-Commerce Store");

console.log("Products Module Version : 1.0.0");

console.log("Status : Production Ready");

console.log("====================================");
