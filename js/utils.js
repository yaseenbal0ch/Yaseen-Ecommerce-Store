/*==================================================
    UTILS.JS
    Part 1 - Utility Foundation
==================================================*/

"use strict";


/*=========================================
        Application Constants
=========================================*/

const APP_NAME = "Yaseen E-Commerce Store";

const APP_VERSION = "1.0.0";

const CURRENCY = "PKR";

const LOCALE = "en-PK";


/*=========================================
        Configuration
=========================================*/

const CONFIG = {

    animationDuration:300,

    toastDuration:3000,

    debounceDelay:300,

    throttleDelay:150,

    freeShippingLimit:50000,

    shippingCost:500,

    taxRate:0.05

};


/*=========================================
        Global Variables
=========================================*/

const body = document.body;

const html = document.documentElement;


/*=========================================
        Common Selectors
=========================================*/

const $ = (selector) =>

document.querySelector(selector);


const $$ = (selector) =>

document.querySelectorAll(selector);


/*=========================================
        Helper Functions
=========================================*/

function isNull(value){

    return value === null ||

           value === undefined;

}


function isEmpty(value){

    return value === "" ||

           value === null ||

           value === undefined;

}


function isNumber(value){

    return !isNaN(value);

}


function isObject(value){

    return value !== null &&

           typeof value === "object";

}


function generateID(){

    return Date.now().toString(36) +

    Math.random().toString(36).slice(2,8);

}


function sleep(milliseconds){

    return new Promise(resolve=>{

        setTimeout(resolve,milliseconds);

    });

}


function randomNumber(min,max){

    return Math.floor(

        Math.random() *

        (max-min+1)

    ) + min;

}


function clamp(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

}


/*=========================================
        Console Information
=========================================*/

console.log("===================================");

console.log(APP_NAME);

console.log("Utils Module Loaded");

console.log("Version:",APP_VERSION);

console.log("===================================");
/*==================================================
    UTILS.JS
    Part 2 - LocalStorage Helpers
==================================================*/


/*=========================================
        Save Data
=========================================*/

function saveToStorage(key,value){

    try{

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }catch(error){

        console.error("Storage Save Error:",error);

        return false;

    }

}


/*=========================================
        Load Data
=========================================*/

function loadFromStorage(key,defaultValue=null){

    try{

        const data = localStorage.getItem(key);

        if(data===null){

            return defaultValue;

        }

        return JSON.parse(data);

    }catch(error){

        console.error("Storage Load Error:",error);

        return defaultValue;

    }

}


/*=========================================
        Remove Data
=========================================*/

function removeFromStorage(key){

    try{

        localStorage.removeItem(key);

        return true;

    }catch(error){

        console.error("Storage Remove Error:",error);

        return false;

    }

}


/*=========================================
        Clear Storage
=========================================*/

function clearStorage(){

    try{

        localStorage.clear();

        return true;

    }catch(error){

        console.error("Storage Clear Error:",error);

        return false;

    }

}


/*=========================================
        Check Key
=========================================*/

function storageExists(key){

    return localStorage.getItem(key)!==null;

}


/*=========================================
        JSON Validation
=========================================*/

function isValidJSON(value){

    try{

        JSON.parse(value);

        return true;

    }catch{

        return false;

    }

}


/*=========================================
        Storage Information
=========================================*/

function getStorageSize(){

    let total=0;

    for(let key in localStorage){

        if(localStorage.hasOwnProperty(key)){

            total+=localStorage[key].length;

        }

    }

    return total;

}


/*=========================================
        Storage Availability
=========================================*/

function isStorageAvailable(){

    try{

        const testKey="storage_test";

        localStorage.setItem(testKey,"1");

        localStorage.removeItem(testKey);

        return true;

    }catch{

        return false;

    }

}


/*=========================================
        Console
=========================================*/

console.log("✅ LocalStorage Helpers Ready");
/*==================================================
    UTILS.JS
    Part 3 - Toast Notifications
==================================================*/


/*=========================================
        Toast Container
=========================================*/

function getToastContainer(){

    let container = document.querySelector(".toast-container");

    if(!container){

        container = document.createElement("div");

        container.className = "toast-container";

        document.body.appendChild(container);

    }

    return container;

}


/*=========================================
        Create Toast
=========================================*/

function createToast(message,type="success"){

    const icons={

        success:"fa-circle-check",

        error:"fa-circle-xmark",

        warning:"fa-triangle-exclamation",

        info:"fa-circle-info"

    };

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=`

        <div class="toast-icon">

            <i class="fas ${icons[type] || icons.info}"></i>

        </div>

        <div class="toast-content">

            <p>${message}</p>

        </div>

        <button class="toast-close">

            <i class="fas fa-times"></i>

        </button>

    `;

    return toast;

}


/*=========================================
        Show Toast
=========================================*/

function showToast(message,type="success"){

    const container=getToastContainer();

    const toast=createToast(message,type);

    container.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    const timer=setTimeout(()=>{

        removeToast(toast);

    },CONFIG.toastDuration);

    const closeButton=

    toast.querySelector(".toast-close");

    closeButton.addEventListener("click",()=>{

        clearTimeout(timer);

        removeToast(toast);

    });

}


/*=========================================
        Remove Toast
=========================================*/

function removeToast(toast){

    toast.classList.remove("show");

    setTimeout(()=>{

        toast.remove();

    },300);

}


/*=========================================
        Shortcut Functions
=========================================*/

function showSuccess(message){

    showToast(message,"success");

}

function showError(message){

    showToast(message,"error");

}

function showWarning(message){

    showToast(message,"warning");

}

function showInfo(message){

    showToast(message,"info");

}


/*=========================================
        Console
=========================================*/

console.log("✅ Toast Notification System Ready");
/*==================================================
    UTILS.JS
    Part 4 - Formatters
==================================================*/


/*=========================================
        Currency Formatter
=========================================*/

function formatCurrency(amount){

    return new Intl.NumberFormat(LOCALE,{

        style:"currency",

        currency:CURRENCY,

        maximumFractionDigits:0

    }).format(amount);

}


/*=========================================
        Number Formatter
=========================================*/

function formatNumber(number){

    return new Intl.NumberFormat(LOCALE).format(number);

}


/*=========================================
        Percentage Formatter
=========================================*/

function formatPercentage(value){

    return `${Number(value).toFixed(2)}%`;

}


/*=========================================
        Date Formatter
=========================================*/

function formatDate(date){

    return new Intl.DateTimeFormat(LOCALE,{

        day:"2-digit",

        month:"short",

        year:"numeric"

    }).format(new Date(date));

}


/*=========================================
        Time Formatter
=========================================*/

function formatTime(date){

    return new Intl.DateTimeFormat(LOCALE,{

        hour:"2-digit",

        minute:"2-digit",

        hour12:true

    }).format(new Date(date));

}


/*=========================================
        Date & Time Formatter
=========================================*/

function formatDateTime(date){

    return new Intl.DateTimeFormat(LOCALE,{

        dateStyle:"medium",

        timeStyle:"short"

    }).format(new Date(date));

}


/*=========================================
        File Size Formatter
=========================================*/

function formatFileSize(bytes){

    if(bytes===0) return "0 Bytes";

    const units=[

        "Bytes",

        "KB",

        "MB",

        "GB",

        "TB"

    ];

    const index=Math.floor(

        Math.log(bytes)/Math.log(1024)

    );

    return (

        bytes/

        Math.pow(1024,index)

    ).toFixed(2)

    +" "+units[index];

}


/*=========================================
        Compact Number
=========================================*/

function formatCompactNumber(number){

    return new Intl.NumberFormat(LOCALE,{

        notation:"compact",

        maximumFractionDigits:1

    }).format(number);

}


/*=========================================
        Console
=========================================*/

console.log("✅ Formatter Utilities Ready");
/*==================================================
    UTILS.JS
    Part 5 - Validation Helpers
==================================================*/


/*=========================================
        Required Validation
=========================================*/

function isRequired(value){

    return String(value).trim().length > 0;

}


/*=========================================
        Email Validation
=========================================*/

function isValidEmail(email){

    const pattern =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(

        String(email).trim()

    );

}


/*=========================================
        Phone Validation
=========================================*/

function isValidPhone(phone){

    const pattern =

    /^[0-9+\-\s()]{10,15}$/;

    return pattern.test(

        String(phone).trim()

    );

}


/*=========================================
        Password Validation
=========================================*/

function isValidPassword(password){

    return String(password).length >= 8;

}


/*=========================================
        Strong Password
=========================================*/

function isStrongPassword(password){

    const pattern =

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return pattern.test(password);

}


/*=========================================
        Name Validation
=========================================*/

function isValidName(name){

    return String(name)

    .trim()

    .length >= 3;

}


/*=========================================
        Number Validation
=========================================*/

function isValidNumber(value){

    return !isNaN(value) &&

    value !== "";

}


/*=========================================
        Min Length
=========================================*/

function hasMinLength(value,length){

    return String(value)

    .trim()

    .length >= length;

}


/*=========================================
        Max Length
=========================================*/

function hasMaxLength(value,length){

    return String(value)

    .trim()

    .length <= length;

}


/*=========================================
        Input Sanitization
=========================================*/

function sanitizeInput(value){

    return String(value)

    .trim()

    .replace(/[<>]/g,"");

}


/*=========================================
        Validation Message
=========================================*/

function getValidationMessage(type){

    const messages={

        required:"This field is required.",

        email:"Please enter a valid email.",

        password:"Password must be at least 8 characters.",

        strongPassword:"Use uppercase, lowercase, number and special character.",

        phone:"Please enter a valid phone number.",

        name:"Please enter a valid name.",

        number:"Please enter a valid number."

    };

    return messages[type] ||

    "Invalid input.";

}


/*=========================================
        Console
=========================================*/

console.log("✅ Validation Helpers Ready");
/*==================================================
    UTILS.JS
    Part 6 - UI Helpers
==================================================*/


/*=========================================
        Show Loader
=========================================*/

function showLoader(){

    const loader = $(".loader");

    if(loader){

        loader.classList.add("active");

    }

}


/*=========================================
        Hide Loader
=========================================*/

function hideLoader(){

    const loader = $(".loader");

    if(loader){

        loader.classList.remove("active");

    }

}


/*=========================================
        Open Modal
=========================================*/

function openModal(selector){

    const modal = $(selector);

    if(!modal) return;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/*=========================================
        Close Modal
=========================================*/

function closeModal(selector){

    const modal = $(selector);

    if(!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/*=========================================
        Toggle Modal
=========================================*/

function toggleModal(selector){

    const modal = $(selector);

    if(!modal) return;

    modal.classList.toggle("show");

}


/*=========================================
        Smooth Scroll
=========================================*/

function smoothScroll(target){

    const element =

    typeof target==="string"

    ? $(target)

    : target;

    if(!element) return;

    element.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}


/*=========================================
        Scroll To Top
=========================================*/

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/*=========================================
        Copy To Clipboard
=========================================*/

async function copyToClipboard(text){

    try{

        await navigator.clipboard.writeText(text);

        showSuccess("Copied to clipboard.");

    }

    catch{

        showError("Copy failed.");

    }

}


/*=========================================
        Button State
=========================================*/

function disableButton(button,text="Loading..."){

    if(!button) return;

    button.dataset.originalText =

    button.innerHTML;

    button.disabled = true;

    button.innerHTML = text;

}


function enableButton(button){

    if(!button) return;

    button.disabled = false;

    button.innerHTML =

    button.dataset.originalText ||

    button.innerHTML;

}


/*=========================================
        Focus Element
=========================================*/

function focusElement(selector){

    const element =

    typeof selector==="string"

    ? $(selector)

    : selector;

    if(element){

        element.focus();

    }

}


/*=========================================
        Console
=========================================*/

console.log("✅ UI Helpers Ready");
/*==================================================
    UTILS.JS
    Part 7 - Performance Helpers
==================================================*/


/*=========================================
        Debounce
=========================================*/

function debounce(callback, delay = CONFIG.debounceDelay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(()=>{

            callback.apply(this, args);

        }, delay);

    };

}


/*=========================================
        Throttle
=========================================*/

function throttle(callback, delay = CONFIG.throttleDelay){

    let waiting = false;

    return function(...args){

        if(waiting) return;

        callback.apply(this, args);

        waiting = true;

        setTimeout(()=>{

            waiting = false;

        }, delay);

    };

}


/*=========================================
        Event Delegation
=========================================*/

function delegate(parent, eventType, selector, callback){

    if(!parent) return;

    parent.addEventListener(eventType, event=>{

        const target = event.target.closest(selector);

        if(target){

            callback(event, target);

        }

    });

}


/*=========================================
        Lazy Loading
=========================================*/

function createLazyObserver(callback){

    if(!("IntersectionObserver" in window)){

        return null;

    }

    return new IntersectionObserver(callback,{

        root:null,

        threshold:0.1,

        rootMargin:"100px"

    });

}


/*=========================================
        Performance Timer
=========================================*/

function startPerformance(label){

    console.time(label);

}


function endPerformance(label){

    console.timeEnd(label);

}


/*=========================================
        Error Logger
=========================================*/

function logError(error, context="Application"){

    console.error(

        `[${context}]`,

        error

    );

}


/*=========================================
        Safe Execution
=========================================*/

function safeExecute(callback, context="Function"){

    try{

        callback();

    }

    catch(error){

        logError(error, context);

    }

}


/*=========================================
        Request Animation Frame
=========================================*/

function nextFrame(callback){

    requestAnimationFrame(callback);

}


/*=========================================
        Idle Callback
=========================================*/

function runWhenIdle(callback){

    if("requestIdleCallback" in window){

        requestIdleCallback(callback);

    }else{

        setTimeout(callback,1);

    }

}


/*=========================================
        Console
=========================================*/

console.log("✅ Performance Helpers Ready");
/*==================================================
    UTILS.JS
    Part 8 - Final Optimization
==================================================*/


/*=========================================
        Browser Detection
=========================================*/

const Browser = {

    userAgent:navigator.userAgent,

    isChrome:/Chrome/.test(navigator.userAgent),

    isFirefox:/Firefox/.test(navigator.userAgent),

    isSafari:/Safari/.test(navigator.userAgent) &&

             !/Chrome/.test(navigator.userAgent),

    isEdge:/Edg/.test(navigator.userAgent)

};


/*=========================================
        Device Detection
=========================================*/

const Device = {

    isMobile:window.innerWidth < 768,

    isTablet:window.innerWidth >= 768 &&

             window.innerWidth < 992,

    isDesktop:window.innerWidth >= 992,

    isTouch:

    "ontouchstart" in window ||

    navigator.maxTouchPoints > 0

};


/*=========================================
        Online / Offline Status
=========================================*/

function isOnline(){

    return navigator.onLine;

}


window.addEventListener("online",()=>{

    showSuccess("Internet Connected");

});


window.addEventListener("offline",()=>{

    showWarning("Internet Disconnected");

});


/*=========================================
        Memory Information
=========================================*/

function getMemoryInfo(){

    if(performance.memory){

        return{

            used:performance.memory.usedJSHeapSize,

            total:performance.memory.totalJSHeapSize,

            limit:performance.memory.jsHeapSizeLimit

        };

    }

    return null;

}


/*=========================================
        Performance Report
=========================================*/

function performanceReport(){

    console.group("Performance Report");

    console.log("Browser:",Browser);

    console.log("Device:",Device);

    console.log("Online:",isOnline());

    console.log("Memory:",getMemoryInfo());

    console.groupEnd();

}


/*=========================================
        Global Initialization
=========================================*/

function initializeUtilities(){

    performanceReport();

    console.log(

        "Utility System Initialized"

    );

}


/*=========================================
        Freeze Configuration
=========================================*/

Object.freeze(CONFIG);

Object.freeze(Browser);

Object.freeze(Device);


/*=========================================
        DOM Ready
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeUtilities

);


/*=========================================
        Production Ready
=========================================*/

console.log("===================================");

console.log(APP_NAME);

console.log("Utils Module Version : 1.0.0");

console.log("Status : Production Ready");

console.log("===================================");
