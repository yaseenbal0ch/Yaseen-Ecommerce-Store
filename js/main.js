/*==================================================
    MAIN.JS
    Part 1 - DOM Ready + Loader
==================================================*/

"use strict";

/*=========================================
        DOM Ready
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ DOM Loaded Successfully");

    initializeWebsite();

});


/*=========================================
        Window Load
=========================================*/

window.addEventListener("load", () => {

    hideLoader();

});


/*=========================================
        Initial Setup
=========================================*/

function initializeWebsite(){

    console.log("🚀 Initializing Website...");

    disableEmptyLinks();

    preloadImages();

}


/*=========================================
        Premium Loader
=========================================*/

function hideLoader(){

    const loader = document.querySelector(".loader-wrapper");

    if(!loader) return;

    loader.classList.add("hidden");

    setTimeout(()=>{

        loader.remove();

    },600);

}


/*=========================================
        Disable Empty Links
=========================================*/

function disableEmptyLinks(){

    document.querySelectorAll('a[href="#"]').forEach(link=>{

        link.addEventListener("click",(event)=>{

            event.preventDefault();

        });

    });

}


/*=========================================
        Image Preloader
=========================================*/

function preloadImages(){

    document.querySelectorAll("img").forEach(image=>{

        const preload = new Image();

        preload.src = image.src;

    });

}


/*=========================================
        Utility Helpers
=========================================*/

const $ = (selector)=>document.querySelector(selector);

const $$ = (selector)=>document.querySelectorAll(selector);


/*=========================================
        Development Mode
=========================================*/

console.log("%cYaseen E-Commerce Store",
"color:#2563eb;font-size:18px;font-weight:bold;");

console.log("%cWebsite Initialized Successfully",
"color:#16a34a;font-size:14px;");
/*==================================================
    MAIN.JS
    Part 2 - Sticky Navbar + Mobile Menu
==================================================*/


/*=========================================
        Navbar Elements
=========================================*/

const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".navbar-toggler");
const navCollapse = document.querySelector(".navbar-collapse");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");


/*=========================================
        Sticky Navbar
=========================================*/

function handleNavbar(){

    if(!navbar) return;

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleNavbar);


/*=========================================
        Mobile Menu Toggle
=========================================*/

if(navToggle && navCollapse){

    navToggle.addEventListener("click",()=>{

        navCollapse.classList.toggle("show");

        navToggle.classList.toggle("active");

    });

}


/*=========================================
        Close Menu After Click
=========================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        if(navCollapse){

            navCollapse.classList.remove("show");

        }

        if(navToggle){

            navToggle.classList.remove("active");

        }

    });

});


/*=========================================
        Navbar Shadow
=========================================*/

function navbarShadow(){

    if(!navbar) return;

    if(window.scrollY > 10){

        navbar.style.boxShadow="0 12px 30px rgba(0,0,0,.08)";

    }else{

        navbar.style.boxShadow="none";

    }

}

window.addEventListener("scroll", navbarShadow);


/*=========================================
        Toggle Button Animation
=========================================*/

if(navToggle){

    navToggle.addEventListener("click",()=>{

        navToggle.classList.toggle("open");

    });

}


/*=========================================
        Initial Call
=========================================*/

handleNavbar();

navbarShadow();
/*==================================================
    MAIN.JS
    Part 3 - Smooth Scroll + Active Navigation
==================================================*/


/*=========================================
        Smooth Scroll
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(event){

        const target=document.querySelector(this.getAttribute("href"));

        if(!target) return;

        event.preventDefault();

        const offset=90;

        const position=target.offsetTop-offset;

        window.scrollTo({

            top:position,

            behavior:"smooth"

        });

    });

});


/*=========================================
        Navigation Sections
=========================================*/

const sections=document.querySelectorAll("section");

const navigationLinks=document.querySelectorAll(".navbar-nav .nav-link");


/*=========================================
        Active Navigation
=========================================*/

function updateActiveNavigation(){

    let currentSection="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.offsetHeight;

        if(window.scrollY>=sectionTop){

            currentSection=section.getAttribute("id");

        }

    });

    navigationLinks.forEach(link=>{

        link.classList.remove("active");

        const href=link.getAttribute("href");

        if(href==="#" + currentSection){

            link.classList.add("active");

        }

    });

}


/*=========================================
        Scroll Spy
=========================================*/

window.addEventListener("scroll",()=>{

    updateActiveNavigation();

});


/*=========================================
        Offset Navigation
=========================================*/

function scrollToSection(id){

    const section=document.getElementById(id);

    if(!section) return;

    window.scrollTo({

        top:section.offsetTop-90,

        behavior:"smooth"

    });

}


/*=========================================
        Initial Active Link
=========================================*/

updateActiveNavigation();
/*==================================================
    MAIN.JS
    Part 4 - Scroll To Top + Progress Bar
==================================================*/


/*=========================================
        Elements
=========================================*/

const scrollTopButton = document.querySelector(".scroll-top");

const progressBar = document.querySelector(".progress-bar");


/*=========================================
        Scroll Progress Bar
=========================================*/

function updateProgressBar(){

    if(!progressBar) return;

    const scrollTop = window.pageYOffset;

    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";

}


/*=========================================
        Scroll To Top Visibility
=========================================*/

function toggleScrollButton(){

    if(!scrollTopButton) return;

    if(window.scrollY > 400){

        scrollTopButton.classList.add("show");

    }else{

        scrollTopButton.classList.remove("show");

    }

}


/*=========================================
        Smooth Scroll To Top
=========================================*/

if(scrollTopButton){

    scrollTopButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*=========================================
        Scroll Events
=========================================*/

window.addEventListener("scroll",()=>{

    updateProgressBar();

    toggleScrollButton();

});


/*=========================================
        Initial Load
=========================================*/

updateProgressBar();

toggleScrollButton();
/*==================================================
    MAIN.JS
    Part 5 - Scroll Reveal Animations
==================================================*/


/*=========================================
        Reveal Elements
=========================================*/

const revealElements = document.querySelectorAll(

".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .reveal-blur, .stagger"

);


/*=========================================
        Intersection Observer
=========================================*/

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

revealObserver.unobserve(entry.target);

}

});

},

{

threshold:0.15,

root:null,

rootMargin:"0px 0px -60px 0px"

}

);


/*=========================================
        Observe All Elements
=========================================*/

revealElements.forEach(element=>{

revealObserver.observe(element);

});


/*=========================================
        Hero Animation Delay
=========================================*/

const heroItems = document.querySelectorAll(".hero [data-delay]");

heroItems.forEach(item=>{

item.style.animationDelay = item.dataset.delay + "ms";

});


/*=========================================
        Product Card Stagger
=========================================*/

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card,index)=>{

card.style.transitionDelay = `${index * 100}ms`;

});


/*=========================================
        Category Card Stagger
=========================================*/

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach((card,index)=>{

card.style.transitionDelay = `${index * 80}ms`;

});


/*=========================================
        Feature Card Stagger
=========================================*/

const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach((card,index)=>{

card.style.transitionDelay = `${index * 120}ms`;

});


/*=========================================
        Observer Debug
=========================================*/

console.log("✅ Scroll Reveal Initialized");
/*==================================================
    MAIN.JS
    Part 6 - Counter Animation + Statistics
==================================================*/


/*=========================================
        Counter Elements
=========================================*/

const counters = document.querySelectorAll(".counter");


/*=========================================
        Counter Animation
=========================================*/

function animateCounter(counter){

    const target = Number(counter.dataset.target);

    const duration = 2000;

    const step = target / (duration / 16);

    let current = 0;

    function update(){

        current += step;

        if(current >= target){

            counter.textContent = target.toLocaleString();

            return;

        }

        counter.textContent = Math.floor(current).toLocaleString();

        requestAnimationFrame(update);

    }

    update();

}


/*=========================================
        Counter Observer
=========================================*/

const counterObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:0.5

}

);


/*=========================================
        Observe Counters
=========================================*/

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


/*=========================================
        Hero Statistics Effect
=========================================*/

const statisticCards = document.querySelectorAll(".hero-stat");

statisticCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform = "translateY(-8px) scale(1.03)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = "";

    });

});


/*=========================================
        Statistics Debug
=========================================*/

console.log("✅ Counter Animation Initialized");
/*==================================================
    MAIN.JS
    Part 7 - Newsletter + Forms Validation
==================================================*/


/*=========================================
        Form Elements
=========================================*/

const newsletterForm = document.querySelector(".newsletter-form");

const contactForm = document.querySelector(".contact-form");


/*=========================================
        Email Validation
=========================================*/

function isValidEmail(email){

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/*=========================================
        Show Message
=========================================*/

function showMessage(message,type="success"){

    const notification = document.createElement("div");

    notification.className = `form-message ${type}`;

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(()=>{

        notification.classList.add("show");

    },100);

    setTimeout(()=>{

        notification.classList.remove("show");

        setTimeout(()=>{

            notification.remove();

        },300);

    },3000);

}


/*=========================================
        Newsletter Validation
=========================================*/

if(newsletterForm){

    newsletterForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const emailInput =
        newsletterForm.querySelector("input[type='email']");

        const button =
        newsletterForm.querySelector("button");

        const email =
        emailInput.value.trim();

        if(!isValidEmail(email)){

            showMessage("Please enter a valid email address.","error");

            emailInput.focus();

            return;

        }

        button.disabled = true;

        button.textContent = "Subscribing...";

        setTimeout(()=>{

            button.disabled = false;

            button.textContent = "Subscribe";

            newsletterForm.reset();

            showMessage("Newsletter subscription successful!");

        },1500);

    });

}


/*=========================================
        Contact Form Validation
=========================================*/

if(contactForm){

    contactForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const name =
        contactForm.querySelector("[name='name']");

        const email =
        contactForm.querySelector("[name='email']");

        const message =
        contactForm.querySelector("[name='message']");

        const submitButton =
        contactForm.querySelector("button");

        if(name.value.trim().length < 3){

            showMessage("Please enter your full name.","error");

            name.focus();

            return;

        }

        if(!isValidEmail(email.value.trim())){

            showMessage("Please enter a valid email.","error");

            email.focus();

            return;

        }

        if(message.value.trim().length < 10){

            showMessage("Message must contain at least 10 characters.","error");

            message.focus();

            return;

        }

        submitButton.disabled = true;

        submitButton.textContent = "Sending...";

        setTimeout(()=>{

            submitButton.disabled = false;

            submitButton.textContent = "Send Message";

            contactForm.reset();

            showMessage("Message sent successfully!");

        },1800);

    });

}


/*=========================================
        Console Log
=========================================*/

console.log("✅ Form Validation Ready");
/*==================================================
    MAIN.JS
    Part 8 - Theme Effects
==================================================*/


/*=========================================
        Theme Elements
=========================================*/

const themeToggle = document.querySelector(".theme-toggle");

const body = document.body;

const STORAGE_KEY = "yaseen-theme";


/*=========================================
        Apply Theme
=========================================*/

function applyTheme(theme){

    body.classList.remove("light-theme","dark-theme");

    body.classList.add(theme);

    localStorage.setItem(STORAGE_KEY,theme);

    updateThemeIcon(theme);

}


/*=========================================
        Theme Icon
=========================================*/

function updateThemeIcon(theme){

    if(!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if(!icon) return;

    if(theme === "dark-theme"){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}


/*=========================================
        Detect System Theme
=========================================*/

function getSystemTheme(){

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark-theme"
        : "light-theme";

}


/*=========================================
        Load Saved Theme
=========================================*/

function initializeTheme(){

    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if(savedTheme){

        applyTheme(savedTheme);

    }else{

        applyTheme(getSystemTheme());

    }

}


/*=========================================
        Theme Toggle
=========================================*/

if(themeToggle){

    themeToggle.addEventListener("click",()=>{

        const isDark = body.classList.contains("dark-theme");

        applyTheme(isDark ? "light-theme" : "dark-theme");

    });

}


/*=========================================
        System Theme Change
=========================================*/

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change",(event)=>{

    if(localStorage.getItem(STORAGE_KEY)) return;

    applyTheme(event.matches ? "dark-theme" : "light-theme");

});


/*=========================================
        Initialize Theme
=========================================*/

initializeTheme();


/*=========================================
        Console
=========================================*/

console.log("✅ Theme Manager Initialized");
/*==================================================
    MAIN.JS
    Part 9 - AOS + Performance
==================================================*/


/*=========================================
        Initialize AOS
=========================================*/

if(typeof AOS !== "undefined"){

    AOS.init({

        duration:800,

        once:true,

        offset:100,

        easing:"ease-in-out",

        mirror:false

    });

}


/*=========================================
        Lazy Loading Images
=========================================*/

const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries,observer)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const image = entry.target;

        image.src = image.dataset.src;

        image.removeAttribute("data-src");

        image.classList.add("loaded");

        observer.unobserve(image);

    });

});

lazyImages.forEach(image=>{

    imageObserver.observe(image);

});


/*=========================================
        Debounce Function
=========================================*/

function debounce(callback,delay=200){

    let timeout;

    return (...args)=>{

        clearTimeout(timeout);

        timeout = setTimeout(()=>{

            callback(...args);

        },delay);

    };

}


/*=========================================
        Throttle Function
=========================================*/

function throttle(callback,limit=150){

    let waiting = false;

    return (...args)=>{

        if(waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(()=>{

            waiting = false;

        },limit);

    };

}


/*=========================================
        Optimized Scroll
=========================================*/

window.addEventListener(

"scroll",

throttle(()=>{

    handleNavbar();

    navbarShadow();

    updateProgressBar();

    toggleScrollButton();

    updateActiveNavigation();

},16)

);


/*=========================================
        Optimized Resize
=========================================*/

window.addEventListener(

"resize",

debounce(()=>{

    console.log("Layout Updated");

},300)

);


/*=========================================
        Performance
=========================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


/*=========================================
        Error Handling
=========================================*/

window.addEventListener("error",(event)=>{

    console.error("Website Error:",event.message);

});


/*=========================================
        Final Initialization
=========================================*/

console.log("🚀 Performance Optimization Enabled");

console.log("✅ Main.js Loaded Successfully");
/*==================================================
    MAIN.JS
    Part 10 - Final Production Polish
==================================================*/


/*=========================================
        Global Error Handler
=========================================*/

window.onerror = function(message, source, line, column, error){

    console.error("Application Error:",{

        message,

        source,

        line,

        column,

        error

    });

    return false;

};


/*=========================================
        Safe Query Selector
=========================================*/

function safeQuery(selector){

    return document.querySelector(selector);

}

function safeQueryAll(selector){

    return document.querySelectorAll(selector);

}


/*=========================================
        Keyboard Accessibility
=========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key === "Escape"){

        const menu = safeQuery(".navbar-collapse");

        const toggle = safeQuery(".navbar-toggler");

        if(menu){

            menu.classList.remove("show");

        }

        if(toggle){

            toggle.classList.remove("active");

        }

    }

});


/*=========================================
        Page Visibility API
=========================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        console.log("Page Hidden");

    }else{

        console.log("Page Active");

    }

});


/*=========================================
        Online / Offline Status
=========================================*/

window.addEventListener("online",()=>{

    console.log("Internet Connected");

});

window.addEventListener("offline",()=>{

    console.log("Internet Disconnected");

});


/*=========================================
        Prevent Multiple Clicks
=========================================*/

document.querySelectorAll(".btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.style.pointerEvents="none";

        setTimeout(()=>{

            button.style.pointerEvents="auto";

        },400);

    });

});


/*=========================================
        Image Error Fallback
=========================================*/

document.querySelectorAll("img").forEach(image=>{

    image.addEventListener("error",()=>{

        image.src="assets/images/placeholder.webp";

    });

});


/*=========================================
        Development Information
=========================================*/

console.group("Yaseen E-Commerce Store");

console.log("Version : 1.0.0");

console.log("Frontend : HTML + CSS + JavaScript");

console.log("Developer : Yaseen Baloch");

console.log("Status : Production Ready");

console.groupEnd();


/*=========================================
        Final Initialization
=========================================*/

(function(){

    console.log("🚀 Website Successfully Initialized");

})();
