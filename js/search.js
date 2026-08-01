/*==================================================
    SEARCH.JS
    Part 1 - Search Foundation
==================================================*/

"use strict";


/*=========================================
        Search Storage
=========================================*/

const SEARCH_STORAGE_KEY =

"yaseen-ecommerce-search";


/*=========================================
        Search Elements
=========================================*/

const searchInput =

document.querySelector("#searchInput");

const searchResults =

document.querySelector(".search-results");

const searchSuggestions =

document.querySelector(".search-suggestions");


/*=========================================
        Search Data
=========================================*/

let searchData = {

    keyword:"",

    category:"",

    results:[],

    history:[],

    filters:{}

};


/*=========================================
        Load Search
=========================================*/

function loadSearch(){

    try{

        const savedSearch =

        localStorage.getItem(

            SEARCH_STORAGE_KEY

        );

        if(savedSearch){

            searchData =

            JSON.parse(savedSearch);

        }

    }

    catch(error){

        console.error(

            "Search Load Error:",

            error

        );

    }

}


/*=========================================
        Save Search
=========================================*/

function saveSearch(){

    try{

        localStorage.setItem(

            SEARCH_STORAGE_KEY,

            JSON.stringify(searchData)

        );

    }

    catch(error){

        console.error(

            "Search Save Error:",

            error

        );

    }

}


/*=========================================
        Reset Search
=========================================*/

function resetSearch(){

    searchData={

        keyword:"",

        category:"",

        results:[],

        history:[],

        filters:{}

    };

    saveSearch();

}


/*=========================================
        Get Search Data
=========================================*/

function getSearchData(){

    return{

        ...searchData

    };

}


/*=========================================
        Update Search Data
=========================================*/

function updateSearchData(data={}){

    searchData={

        ...searchData,

        ...data

    };

    saveSearch();

}


/*=========================================
        Initialize Search
=========================================*/

function initializeSearch(){

    loadSearch();

    console.log(

        "🔍 Search Initialized"

    );

}


/*=========================================
        Start Search
=========================================*/

initializeSearch();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Search Foundation Ready"

);
/*==================================================
    SEARCH.JS
    Part 2 - Live Search
==================================================*/


/*=========================================
        Search Products
=========================================*/

function searchProducts(keyword){

    keyword =

    keyword

    .trim()

    .toLowerCase();

    if(!keyword){

        searchData.results=[];

        renderSearchResults([]);

        return;

    }

    const results =

    products.filter(product=>{

        return(

            product.name

            .toLowerCase()

            .includes(keyword)

            ||

            product.category

            .toLowerCase()

            .includes(keyword)

        );

    });

    updateSearchData({

        keyword,

        results

    });

    renderSearchResults(results);

}


/*=========================================
        Render Results
=========================================*/

function renderSearchResults(results){

    if(!searchResults)

        return;

    if(results.length===0){

        searchResults.innerHTML=`

        <div class="empty-search">

            <i class="fas fa-search"></i>

            <h3>No Products Found</h3>

            <p>

                Try another keyword.

            </p>

        </div>

        `;

        return;

    }

    searchResults.innerHTML=

    results.map(product=>`

        <div class="search-item">

            <img

                src="${product.image}"

                alt="${product.name}"

                loading="lazy">

            <div class="search-content">

                <h5>

                    ${product.name}

                </h5>

                <p>

                    ${product.category}

                </p>

                <strong>

                    ${formatCurrency(

                        product.price

                    )}

                </strong>

            </div>

        </div>

    `).join("");

}


/*=========================================
        Live Search
=========================================*/

const liveSearch =

debounce(

searchProducts,

300

);


/*=========================================
        Search Input
=========================================*/

searchInput

?.addEventListener(

"input",

event=>{

liveSearch(

event.target.value

);

});


/*=========================================
        Clear Search
=========================================*/

function clearSearch(){

    if(searchInput){

        searchInput.value="";

    }

    updateSearchData({

        keyword:"",

        results:[]

    });

    renderSearchResults([]);

}


/*=========================================
        Search Focus
=========================================*/

searchInput

?.addEventListener(

"focus",

()=>{

if(

searchData.keyword

){

renderSearchResults(

searchData.results

);

}

});


/*=========================================
        Console
=========================================*/

console.log(

"✅ Live Search Ready"

);
/*==================================================
    SEARCH.JS
    Part 3 - Search Suggestions
==================================================*/


/*=========================================
        Popular Searches
=========================================*/

const POPULAR_SEARCHES=[

    "Laptop",

    "Smartphone",

    "Headphones",

    "Shoes",

    "Watch"

];


/*=========================================
        Save Search History
=========================================*/

function saveSearchHistory(keyword){

    keyword=keyword.trim();

    if(!keyword) return;

    searchData.history=

    searchData.history.filter(item=>

        item.toLowerCase()!==

        keyword.toLowerCase()

    );

    searchData.history.unshift(keyword);

    searchData.history=

    searchData.history.slice(0,10);

    saveSearch();

}


/*=========================================
        Get Suggestions
=========================================*/

function getSearchSuggestions(keyword){

    keyword=

    keyword.toLowerCase();

    if(!keyword){

        return [

            ...searchData.history,

            ...POPULAR_SEARCHES

        ].slice(0,8);

    }

    return [

        ...new Set([

            ...searchData.history,

            ...POPULAR_SEARCHES

        ])

    ]

    .filter(item=>

        item.toLowerCase()

        .includes(keyword)

    )

    .slice(0,8);

}


/*=========================================
        Render Suggestions
=========================================*/

function renderSuggestions(keyword=""){

    if(!searchSuggestions)

        return;

    const suggestions=

    getSearchSuggestions(keyword);

    if(suggestions.length===0){

        searchSuggestions.innerHTML="";

        return;

    }

    searchSuggestions.innerHTML=

    suggestions.map(item=>`

        <div

        class="search-suggestion"

        data-keyword="${item}">

            <i class="fas fa-search"></i>

            ${item}

        </div>

    `).join("");

}


/*=========================================
        Suggestion Click
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const suggestion=

        event.target.closest(

            ".search-suggestion"

        );

        if(!suggestion)

            return;

        const keyword=

        suggestion.dataset.keyword;

        searchInput.value=

        keyword;

        saveSearchHistory(keyword);

        searchProducts(keyword);

        renderSuggestions();

    }

);


/*=========================================
        Keyboard Navigation
=========================================*/

let selectedSuggestion=-1;

searchInput?.addEventListener(

    "keydown",

    event=>{

        const items=[

            ...document.querySelectorAll(

                ".search-suggestion"

            )

        ];

        if(!items.length)

            return;

        if(event.key==="ArrowDown"){

            event.preventDefault();

            selectedSuggestion=

            Math.min(

                selectedSuggestion+1,

                items.length-1

            );

        }

        if(event.key==="ArrowUp"){

            event.preventDefault();

            selectedSuggestion=

            Math.max(

                selectedSuggestion-1,

                0

            );

        }

        items.forEach(item=>

            item.classList.remove(

                "active"

            )

        );

        if(items[selectedSuggestion]){

            items[selectedSuggestion]

            .classList.add(

                "active"

            );

        }

        if(

            event.key==="Enter" &&

            items[selectedSuggestion]

        ){

            event.preventDefault();

            items[selectedSuggestion]

            .click();

        }

    }

);


/*=========================================
        Clear History
=========================================*/

function clearSearchHistory(){

    searchData.history=[];

    saveSearch();

    renderSuggestions();

    showSuccess(

        "Search history cleared."

    );

}


/*=========================================
        Search Events
=========================================*/

searchInput?.addEventListener(

    "input",

    event=>{

        renderSuggestions(

            event.target.value

        );

    }

);


/*=========================================
        Console
=========================================*/

console.log(

"✅ Search Suggestions Ready"

);
/*==================================================
    SEARCH.JS
    Part 4 - Advanced Filters
==================================================*/


/*=========================================
        Filter Elements
=========================================*/

const categoryFilter =

document.querySelector("#categoryFilter");

const brandFilter =

document.querySelector("#brandFilter");

const minPriceFilter =

document.querySelector("#minPrice");

const maxPriceFilter =

document.querySelector("#maxPrice");

const ratingFilter =

document.querySelector("#ratingFilter");

const stockFilter =

document.querySelector("#stockFilter");

const resetFiltersButton =

document.querySelector(".reset-filters");


/*=========================================
        Apply Filters
=========================================*/

function applyFilters(){

    let filtered=[...products];

    if(searchData.keyword){

        filtered=filtered.filter(product=>

            product.name

            .toLowerCase()

            .includes(

                searchData.keyword

            )

        );

    }

    if(

        categoryFilter?.value &&

        categoryFilter.value!=="all"

    ){

        filtered=filtered.filter(product=>

            product.category===

            categoryFilter.value

        );

    }

    if(

        brandFilter?.value &&

        brandFilter.value!=="all"

    ){

        filtered=filtered.filter(product=>

            product.brand===

            brandFilter.value

        );

    }

    if(minPriceFilter?.value){

        filtered=filtered.filter(product=>

            product.price>=

            Number(

                minPriceFilter.value

            )

        );

    }

    if(maxPriceFilter?.value){

        filtered=filtered.filter(product=>

            product.price<=

            Number(

                maxPriceFilter.value

            )

        );

    }

    if(ratingFilter?.value){

        filtered=filtered.filter(product=>

            product.rating>=

            Number(

                ratingFilter.value

            )

        );

    }

    if(stockFilter?.checked){

        filtered=filtered.filter(product=>

            product.stock>0

        );

    }

    updateSearchData({

        results:filtered

    });

    renderSearchResults(filtered);

}


/*=========================================
        Reset Filters
=========================================*/

function resetFilters(){

    if(categoryFilter)

        categoryFilter.value="all";

    if(brandFilter)

        brandFilter.value="all";

    if(minPriceFilter)

        minPriceFilter.value="";

    if(maxPriceFilter)

        maxPriceFilter.value="";

    if(ratingFilter)

        ratingFilter.value="";

    if(stockFilter)

        stockFilter.checked=false;

    applyFilters();

}


/*=========================================
        Filter Events
=========================================*/

[
    categoryFilter,
    brandFilter,
    minPriceFilter,
    maxPriceFilter,
    ratingFilter,
    stockFilter

].forEach(filter=>{

    filter?.addEventListener(

        "input",

        applyFilters

    );

    filter?.addEventListener(

        "change",

        applyFilters

    );

});


resetFiltersButton

?.addEventListener(

    "click",

    resetFilters

);


/*=========================================
        Console
=========================================*/

console.log(

"✅ Advanced Filters Ready"

);
/*==================================================
    SEARCH.JS
    Part 5 - Search Sorting
==================================================*/


/*=========================================
        Sort Element
=========================================*/

const sortFilter =

document.querySelector("#sortFilter");


/*=========================================
        Sort Products
=========================================*/

function sortSearchResults(results){

    const sorted = [...results];

    switch(sortFilter?.value){

        case "name-asc":

            sorted.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

        case "name-desc":

            sorted.sort((a,b)=>

                b.name.localeCompare(a.name)

            );

            break;

        case "price-low":

            sorted.sort((a,b)=>

                a.price-b.price

            );

            break;

        case "price-high":

            sorted.sort((a,b)=>

                b.price-a.price

            );

            break;

        case "rating":

            sorted.sort((a,b)=>

                b.rating-a.rating

            );

            break;

        case "newest":

            sorted.sort((a,b)=>

                (b.id||0)-(a.id||0)

            );

            break;

        case "best-selling":

            sorted.sort((a,b)=>

                (b.sales||0)-(a.sales||0)

            );

            break;

        default:

            break;

    }

    return sorted;

}


/*=========================================
        Refresh Search Results
=========================================*/

function refreshSearchResults(){

    const sorted =

    sortSearchResults(

        searchData.results

    );

    renderSearchResults(

        sorted

    );

}


/*=========================================
        Sort Event
=========================================*/

sortFilter?.addEventListener(

    "change",

    ()=>{

        refreshSearchResults();

    }

);


/*=========================================
        Apply Filters + Sort
=========================================*/

const originalApplyFilters =

applyFilters;

applyFilters = function(){

    originalApplyFilters();

    refreshSearchResults();

};


/*=========================================
        Initialize Sorting
=========================================*/

refreshSearchResults();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Search Sorting Ready"

);
/*==================================================
    SEARCH.JS
    Part 6 - Search History
==================================================*/


/*=========================================
        History Configuration
=========================================*/

const MAX_SEARCH_HISTORY = 10;

const historyContainer =

document.querySelector(".search-history");


/*=========================================
        Add Search History
=========================================*/

function addSearchHistory(keyword){

    keyword =

    keyword.trim();

    if(!keyword) return;

    searchData.history =

    searchData.history.filter(item=>

        item.toLowerCase() !==

        keyword.toLowerCase()

    );

    searchData.history.unshift(keyword);

    if(

        searchData.history.length >

        MAX_SEARCH_HISTORY

    ){

        searchData.history =

        searchData.history.slice(

            0,

            MAX_SEARCH_HISTORY

        );

    }

    saveSearch();

    renderSearchHistory();

}


/*=========================================
        Render History
=========================================*/

function renderSearchHistory(){

    if(!historyContainer)

        return;

    if(

        searchData.history.length===0

    ){

        historyContainer.innerHTML=`

        <div class="empty-history">

            No recent searches.

        </div>

        `;

        return;

    }

    historyContainer.innerHTML=

    searchData.history.map(item=>`

        <div class="history-item">

            <span

            class="history-keyword"

            data-keyword="${item}">

                ${item}

            </span>

            <button

            class="delete-history"

            data-keyword="${item}">

                <i class="fas fa-times"></i>

            </button>

        </div>

    `).join("");

}


/*=========================================
        Delete History Item
=========================================*/

function deleteHistoryItem(keyword){

    searchData.history =

    searchData.history.filter(item=>

        item!==keyword

    );

    saveSearch();

    renderSearchHistory();

}


/*=========================================
        Clear History
=========================================*/

function clearAllHistory(){

    searchData.history=[];

    saveSearch();

    renderSearchHistory();

    showSuccess(

        "Search history cleared."

    );

}


/*=========================================
        History Events
=========================================*/

document.addEventListener(

    "click",

    event=>{

        const keyword=

        event.target.closest(

            ".history-keyword"

        );

        if(keyword){

            searchInput.value=

            keyword.dataset.keyword;

            searchProducts(

                keyword.dataset.keyword

            );

        }

        const remove=

        event.target.closest(

            ".delete-history"

        );

        if(remove){

            deleteHistoryItem(

                remove.dataset.keyword

            );

        }

    }

);


document

.querySelector(

    ".clear-history"

)

?.addEventListener(

    "click",

    clearAllHistory

);


/*=========================================
        Save Search Automatically
=========================================*/

searchInput?.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Enter"){

            addSearchHistory(

                event.target.value

            );

        }

    }

);


/*=========================================
        Initialize History
=========================================*/

renderSearchHistory();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Search History Ready"

);
/*==================================================
    SEARCH.JS
    Part 7 - Search Analytics
==================================================*/


/*=========================================
        Analytics Storage
=========================================*/

const SEARCH_ANALYTICS_KEY =

"yaseen-ecommerce-search-analytics";


let searchAnalytics={

    totalSearches:0,

    keywords:{},

    dailySearches:{},

    lastSearch:null

};


/*=========================================
        Load Analytics
=========================================*/

function loadSearchAnalytics(){

    try{

        const saved=

        localStorage.getItem(

            SEARCH_ANALYTICS_KEY

        );

        if(saved){

            searchAnalytics=

            JSON.parse(saved);

        }

    }

    catch(error){

        console.error(

            "Analytics Load Error:",

            error

        );

    }

}


/*=========================================
        Save Analytics
=========================================*/

function saveSearchAnalytics(){

    localStorage.setItem(

        SEARCH_ANALYTICS_KEY,

        JSON.stringify(

            searchAnalytics

        )

    );

}


/*=========================================
        Track Search
=========================================*/

function trackSearch(keyword){

    keyword=

    keyword.trim().toLowerCase();

    if(!keyword) return;

    searchAnalytics.totalSearches++;

    searchAnalytics.lastSearch=

    keyword;

    searchAnalytics.keywords[keyword]=

    (searchAnalytics.keywords[keyword]||0)+1;

    const today=

    new Date()

    .toISOString()

    .split("T")[0];

    searchAnalytics.dailySearches[today]=

    (

        searchAnalytics.dailySearches[today]

        ||0

    )+1;

    saveSearchAnalytics();

}


/*=========================================
        Most Searched
=========================================*/

function getMostSearched(limit=5){

    return Object.entries(

        searchAnalytics.keywords

    )

    .sort(

        (a,b)=>b[1]-a[1]

    )

    .slice(0,limit);

}


/*=========================================
        Analytics Report
=========================================*/

function getSearchAnalytics(){

    return{

        totalSearches:

        searchAnalytics.totalSearches,

        mostSearched:

        getMostSearched(),

        lastSearch:

        searchAnalytics.lastSearch,

        dailySearches:

        searchAnalytics.dailySearches

    };

}


/*=========================================
        Analytics Dashboard
=========================================*/

function showSearchAnalytics(){

    console.table(

        getSearchAnalytics()

    );

}


/*=========================================
        Integrate Search Tracking
=========================================*/

const originalSearchProducts=

searchProducts;

searchProducts=function(keyword){

    trackSearch(keyword);

    originalSearchProducts(keyword);

};


/*=========================================
        Initialize Analytics
=========================================*/

loadSearchAnalytics();

showSearchAnalytics();


/*=========================================
        Console
=========================================*/

console.log(

"✅ Search Analytics Ready"

);
/*==================================================
    SEARCH.JS
    Part 8 - Final Optimization
==================================================*/


/*=========================================
        Safe Search Refresh
=========================================*/

function safeRefreshSearch(){

    try{

        loadSearch();

        loadSearchAnalytics();

        renderSearchHistory();

        renderSuggestions(

            searchData.keyword

        );

        renderSearchResults(

            searchData.results

        );

    }

    catch(error){

        console.error(

            "Search Refresh Error:",

            error

        );

    }

}


/*=========================================
        Auto Save Search
=========================================*/

function autoSaveSearch(){

    saveSearch();

    saveSearchAnalytics();

}


/*=========================================
        Storage Synchronization
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key===SEARCH_STORAGE_KEY ||

            event.key===SEARCH_ANALYTICS_KEY

        ){

            safeRefreshSearch();

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

            "You are offline."

        );

    }

);


/*=========================================
        Search Performance
=========================================*/

function searchPerformance(){

    console.table({

        totalSearches:

        searchAnalytics.totalSearches,

        recentHistory:

        searchData.history.length,

        currentResults:

        searchData.results.length,

        lastSearch:

        searchAnalytics.lastSearch ||

        "None"

    });

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    safeRefreshSearch

);


/*=========================================
        Auto Save Timer
=========================================*/

setInterval(

    autoSaveSearch,

    30000

);


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        safeRefreshSearch();

        searchPerformance();

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

"Search Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
