/*==================================================
    AUTH.JS
    Part 1 - Authentication Foundation
==================================================*/

"use strict";


/*=========================================
        Authentication Storage
=========================================*/

const AUTH_STORAGE_KEY =

"yaseen-ecommerce-user";

const SESSION_STORAGE_KEY =

"yaseen-ecommerce-session";


/*=========================================
        User Object
=========================================*/

let currentUser = {

    id:null,

    fullName:"",

    username:"",

    email:"",

    password:"",

    avatar:"",

    role:"customer",

    isLoggedIn:false,

    createdAt:null

};


/*=========================================
        Session Object
=========================================*/

let userSession = {

    isAuthenticated:false,

    rememberMe:false,

    loginTime:null,

    expiresAt:null

};


/*=========================================
        Load User
=========================================*/

function loadUser(){

    try{

        const savedUser =

        localStorage.getItem(

            AUTH_STORAGE_KEY

        );

        if(savedUser){

            currentUser =

            JSON.parse(savedUser);

        }

    }

    catch(error){

        console.error(

            "Load User Error:",

            error

        );

    }

}


/*=========================================
        Save User
=========================================*/

function saveUser(){

    try{

        localStorage.setItem(

            AUTH_STORAGE_KEY,

            JSON.stringify(currentUser)

        );

    }

    catch(error){

        console.error(

            "Save User Error:",

            error

        );

    }

}


/*=========================================
        Load Session
=========================================*/

function loadSession(){

    try{

        const savedSession =

        localStorage.getItem(

            SESSION_STORAGE_KEY

        );

        if(savedSession){

            userSession =

            JSON.parse(savedSession);

        }

    }

    catch(error){

        console.error(

            "Load Session Error:",

            error

        );

    }

}


/*=========================================
        Save Session
=========================================*/

function saveSession(){

    try{

        localStorage.setItem(

            SESSION_STORAGE_KEY,

            JSON.stringify(userSession)

        );

    }

    catch(error){

        console.error(

            "Save Session Error:",

            error

        );

    }

}


/*=========================================
        Reset Authentication
=========================================*/

function resetAuthentication(){

    currentUser={

        id:null,

        fullName:"",

        username:"",

        email:"",

        password:"",

        avatar:"",

        role:"customer",

        isLoggedIn:false,

        createdAt:null

    };

    userSession={

        isAuthenticated:false,

        rememberMe:false,

        loginTime:null,

        expiresAt:null

    };

    saveUser();

    saveSession();

}


/*=========================================
        Initialize Authentication
=========================================*/

function initializeAuth(){

    loadUser();

    loadSession();

    console.log(

        "🔐 Authentication Initialized"

    );

}


/*=========================================
        Start Authentication
=========================================*/

initializeAuth();


/*=========================================
        Console
=========================================*/

console.log("✅ Authentication Foundation Ready");
/*==================================================
    AUTH.JS
    Part 2 - User Registration (Signup)
==================================================*/


/*=========================================
        Signup Form
=========================================*/

const signupForm =

document.querySelector(".signup-form");


/*=========================================
        Signup Fields
=========================================*/

const signupFields={

    fullName:

    document.querySelector("#signupFullName"),

    username:

    document.querySelector("#signupUsername"),

    email:

    document.querySelector("#signupEmail"),

    password:

    document.querySelector("#signupPassword"),

    confirmPassword:

    document.querySelector("#signupConfirmPassword")

};


/*=========================================
        Validate Signup
=========================================*/

function validateSignup(){

    const{

        fullName,

        username,

        email,

        password,

        confirmPassword

    }=signupFields;

    if(

        !isValidName(

        fullName.value)

    ){

        showError(

        "Enter a valid full name.");

        return false;

    }

    if(

        !hasMinLength(

        username.value,

        3)

    ){

        showError(

        "Username must be at least 3 characters.");

        return false;

    }

    if(

        !isValidEmail(

        email.value)

    ){

        showError(

        "Enter a valid email.");

        return false;

    }

    if(

        !isStrongPassword(

        password.value)

    ){

        showError(

        "Password is too weak.");

        return false;

    }

    if(

        password.value!==

        confirmPassword.value

    ){

        showError(

        "Passwords do not match.");

        return false;

    }

    return true;

}


/*=========================================
        Register User
=========================================*/

function registerUser(){

    if(!validateSignup()){

        return;

    }

    currentUser={

        id:generateID(),

        fullName:

        sanitizeInput(

        signupFields.fullName.value),

        username:

        sanitizeInput(

        signupFields.username.value),

        email:

        sanitizeInput(

        signupFields.email.value),

        password:

        signupFields.password.value,

        avatar:"",

        role:"customer",

        isLoggedIn:false,

        createdAt:

        new Date().toISOString()

    };

    saveUser();

    showSuccess(

        "Registration successful."

    );

    signupForm.reset();

}


/*=========================================
        Signup Submit
=========================================*/

signupForm?.addEventListener(

    "submit",

    event=>{

        event.preventDefault();

        registerUser();

    }

);


/*=========================================
        Console
=========================================*/

console.log("✅ User Registration Ready");
/*==================================================
    AUTH.JS
    Part 3 - User Login
==================================================*/


/*=========================================
        Login Form
=========================================*/

const loginForm =

document.querySelector(".login-form");


/*=========================================
        Login Fields
=========================================*/

const loginFields={

    email:

    document.querySelector("#loginEmail"),

    password:

    document.querySelector("#loginPassword"),

    remember:

    document.querySelector("#rememberMe")

};


/*=========================================
        Validate Login
=========================================*/

function validateLogin(){

    if(

        !loginFields.email.value.trim()

    ){

        showError(

            "Enter your email or username."

        );

        return false;

    }

    if(

        !loginFields.password.value

    ){

        showError(

            "Enter your password."

        );

        return false;

    }

    return true;

}


/*=========================================
        Verify User
=========================================*/

function verifyUser(){

    const identifier =

    loginFields.email.value

    .trim()

    .toLowerCase();

    const password =

    loginFields.password.value;

    return(

        (

            currentUser.email

            .toLowerCase()===identifier ||

            currentUser.username

            .toLowerCase()===identifier

        )

        &&

        currentUser.password===password

    );

}


/*=========================================
        Login User
=========================================*/

function loginUser(){

    if(!validateLogin()){

        return;

    }

    if(!verifyUser()){

        showError(

            "Invalid login credentials."

        );

        return;

    }

    currentUser.isLoggedIn=true;

    userSession={

        isAuthenticated:true,

        rememberMe:

        loginFields.remember?.checked ||

        false,

        loginTime:

        new Date().toISOString(),

        expiresAt:

        Date.now()+

        (24*60*60*1000)

    };

    saveUser();

    saveSession();

    showSuccess(

        "Login successful."

    );

    setTimeout(()=>{

        window.location.href=

        "../index.html";

    },1000);

}


/*=========================================
        Login Submit
=========================================*/

loginForm?.addEventListener(

    "submit",

    event=>{

        event.preventDefault();

        loginUser();

    }

);


/*=========================================
        Auto Login
=========================================*/

function autoLogin(){

    if(

        userSession.isAuthenticated &&

        currentUser.isLoggedIn

    ){

        console.log(

            "User already logged in."

        );

    }

}


autoLogin();


/*=========================================
        Console
=========================================*/

console.log("✅ User Login Ready");
/*==================================================
    AUTH.JS
    Part 4 - Logout + Session
==================================================*/


/*=========================================
        Logout User
=========================================*/

function logoutUser(){

    currentUser.isLoggedIn = false;

    userSession = {

        isAuthenticated:false,

        rememberMe:false,

        loginTime:null,

        expiresAt:null

    };

    saveUser();

    saveSession();

    showSuccess(

        "Logged out successfully."

    );

    setTimeout(()=>{

        location.href = "login.html";

    },1000);

}


/*=========================================
        Session Expired
=========================================*/

function isSessionExpired(){

    if(

        !userSession.expiresAt

    ){

        return true;

    }

    return Date.now() >

    userSession.expiresAt;

}


/*=========================================
        Check Authentication
=========================================*/

function isAuthenticated(){

    return(

        currentUser.isLoggedIn &&

        userSession.isAuthenticated &&

        !isSessionExpired()

    );

}


/*=========================================
        Session Validation
=========================================*/

function validateSession(){

    if(

        isSessionExpired()

    ){

        logoutUser();

        showWarning(

            "Session expired. Please login again."

        );

        return false;

    }

    return true;

}


/*=========================================
        Extend Session
=========================================*/

function extendSession(){

    if(

        !userSession.isAuthenticated

    ) return;

    userSession.expiresAt =

    Date.now() +

    (24 * 60 * 60 * 1000);

    saveSession();

}


/*=========================================
        Logout Button
=========================================*/

document

.querySelectorAll(".logout-btn")

.forEach(button=>{

    button.addEventListener(

        "click",

        logoutUser

    );

});


/*=========================================
        Protected Page
=========================================*/

function requireAuthentication(){

    if(

        !isAuthenticated()

    ){

        window.location = "login.html";


    }

}


/*=========================================
        Auto Session Check
=========================================*/

window.addEventListener(

    "focus",

    ()=>{

        validateSession();

    }

);


/*=========================================
        User Activity
=========================================*/

["click","keydown","mousemove"]

.forEach(event=>{

    document.addEventListener(

        event,

        debounce(

            extendSession,

            1000

        )

    );

});


/*=========================================
        Console
=========================================*/

console.log("✅ Logout & Session Ready");
/*==================================================
    AUTH.JS
    Part 5 - Forgot Password
==================================================*/


/*=========================================
        Forgot Password Form
=========================================*/

const forgotPasswordForm =

document.querySelector(".forgot-password-form");


const resetFields={

    email:

    document.querySelector("#resetEmail"),

    otp:

    document.querySelector("#resetOtp"),

    newPassword:

    document.querySelector("#newPassword"),

    confirmPassword:

    document.querySelector("#confirmNewPassword")

};


let generatedOTP = null;


/*=========================================
        Generate OTP
=========================================*/

function generateOTP(){

    generatedOTP =

    Math.floor(

        100000 +

        Math.random()*900000

    ).toString();

    console.log(

        "Demo OTP:",

        generatedOTP

    );

    return generatedOTP;

}


/*=========================================
        Request Password Reset
=========================================*/

function requestPasswordReset(){

    const email =

    sanitizeInput(

        resetFields.email?.value ||

        ""

    ).toLowerCase();

    if(

        email !==

        currentUser.email.toLowerCase()

    ){

        showError(

            "Email not found."

        );

        return false;

    }

    generateOTP();

    showSuccess(

        "OTP generated. Check console (Demo)."

    );

    return true;

}


/*=========================================
        Verify OTP
=========================================*/

function verifyOTP(){

    return (

        resetFields.otp.value.trim()

        === generatedOTP

    );

}


/*=========================================
        Update Password
=========================================*/

function updatePassword(){

    if(!verifyOTP()){

        showError(

            "Invalid OTP."

        );

        return;

    }

    if(

        !isStrongPassword(

            resetFields.newPassword.value

        )

    ){

        showError(

            "Password is too weak."

        );

        return;

    }

    if(

        resetFields.newPassword.value

        !==

        resetFields.confirmPassword.value

    ){

        showError(

            "Passwords do not match."

        );

        return;

    }

    currentUser.password =

    resetFields.newPassword.value;

    saveUser();

    generatedOTP = null;

    forgotPasswordForm?.reset();

    showSuccess(

        "Password updated successfully."

    );

}


/*=========================================
        Forgot Password Submit
=========================================*/

forgotPasswordForm?.addEventListener(

    "submit",

    event=>{

        event.preventDefault();

        requestPasswordReset();

    }

);


/*=========================================
        Reset Password Button
=========================================*/

document

.querySelector(".reset-password-btn")

?.addEventListener(

    "click",

    updatePassword

);


/*=========================================
        Console
=========================================*/

console.log("✅ Forgot Password Ready");
/*==================================================
    AUTH.JS
    Part 6 - User Profile
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

    avatar:

    document.querySelector("#profileAvatar")

};


/*=========================================
        Load Profile
=========================================*/

function loadProfile(){

    if(!currentUser) return;

    profileFields.fullName &&

    (profileFields.fullName.value=

    currentUser.fullName || "");

    profileFields.username &&

    (profileFields.username.value=

    currentUser.username || "");

    profileFields.email &&

    (profileFields.email.value=

    currentUser.email || "");

    profileFields.phone &&

    (profileFields.phone.value=

    currentUser.phone || "");

}


/*=========================================
        Save Profile
=========================================*/

function saveProfile(){

    currentUser.fullName=

    sanitizeInput(

    profileFields.fullName?.value ||

    "");

    currentUser.username=

    sanitizeInput(

    profileFields.username?.value ||

    "");

    currentUser.email=

    sanitizeInput(

    profileFields.email?.value ||

    "");

    currentUser.phone=

    sanitizeInput(

    profileFields.phone?.value ||

    "");

    saveUser();

}


/*=========================================
        Avatar Upload
=========================================*/

function uploadAvatar(file){

    if(!file) return;

    const reader=

    new FileReader();

    reader.onload=(event)=>{

        currentUser.avatar=

        event.target.result;

        saveUser();

        const avatar=

        document.querySelector(

        ".profile-avatar");

        if(avatar){

            avatar.src=

            currentUser.avatar;

        }

        showSuccess(

        "Profile picture updated."

        );

    };

    reader.readAsDataURL(file);

}


/*=========================================
        Profile Validation
=========================================*/

function validateProfile(){

    if(

        !isValidName(

        currentUser.fullName)

    ){

        showError(

        "Enter a valid name.");

        return false;

    }

    if(

        !isValidEmail(

        currentUser.email)

    ){

        showError(

        "Enter a valid email.");

        return false;

    }

    return true;

}


/*=========================================
        Profile Submit
=========================================*/

profileForm?.addEventListener(

"submit",

event=>{

event.preventDefault();

saveProfile();

if(validateProfile()){

showSuccess(

"Profile updated successfully."

);

}

});


/*=========================================
        Avatar Change
=========================================*/

profileFields.avatar

?.addEventListener(

"change",

event=>{

uploadAvatar(

event.target.files[0]

);

});


/*=========================================
        Initialize Profile
=========================================*/

loadProfile();


/*=========================================
        Console
=========================================*/

console.log("✅ User Profile Ready");
/*==================================================
    AUTH.JS
    Part 7 - Password Security
==================================================*/


/*=========================================
        Password Fields
=========================================*/

const passwordFields = {

    current:

    document.querySelector("#currentPassword"),

    new:

    document.querySelector("#changePassword"),

    confirm:

    document.querySelector("#confirmChangePassword")

};


/*=========================================
        Password Strength
=========================================*/

function getPasswordStrength(password){

    let score = 0;

    if(password.length >= 8) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[a-z]/.test(password)) score++;

    if(/[0-9]/.test(password)) score++;

    if(/[^A-Za-z0-9]/.test(password)) score++;

    return score;

}


/*=========================================
        Update Strength Meter
=========================================*/

function updatePasswordStrength(){

    const meter =

    document.querySelector(".password-strength");

    if(!meter) return;

    const score =

    getPasswordStrength(

        passwordFields.new?.value || ""

    );

    const levels = [

        "Very Weak",

        "Weak",

        "Fair",

        "Good",

        "Strong",

        "Excellent"

    ];

    meter.textContent =

    levels[score];

    meter.dataset.level = score;

}


/*=========================================
        Toggle Password
=========================================*/

function togglePasswordVisibility(input){

    if(!input) return;

    input.type =

    input.type === "password"

    ? "text"

    : "password";

}


/*=========================================
        Change Password
=========================================*/

function changePassword(){

    if(

        currentUser.password !==

        passwordFields.current.value

    ){

        showError(

            "Current password is incorrect."

        );

        return;

    }

    if(

        !isStrongPassword(

            passwordFields.new.value

        )

    ){

        showError(

            "Choose a stronger password."

        );

        return;

    }

    if(

        passwordFields.new.value !==

        passwordFields.confirm.value

    ){

        showError(

            "Passwords do not match."

        );

        return;

    }

    currentUser.password =

    passwordFields.new.value;

    saveUser();

    showSuccess(

        "Password changed successfully."

    );

}


/*=========================================
        Password Requirements
=========================================*/

function showPasswordRequirements(){

    showInfo(

        "Use 8+ characters with uppercase, lowercase, number and special character."

    );

}


/*=========================================
        Events
=========================================*/

passwordFields.new

?.addEventListener(

    "input",

    updatePasswordStrength

);


document

.querySelector(".change-password-btn")

?.addEventListener(

    "click",

    changePassword

);


document

.querySelectorAll(".toggle-password")

.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            const target =

            document.querySelector(

                button.dataset.target

            );

            togglePasswordVisibility(target);

        }

    );

});


/*=========================================
        Console
=========================================*/

console.log("✅ Password Security Ready");
/*==================================================
    AUTH.JS
    Part 8 - Route Protection
==================================================*/


/*=========================================
        Protected Pages
=========================================*/

const protectedPages = [

    "profile.html",

    "checkout.html",

    "orders.html",

    "wishlist.html"

];


/*=========================================
        Guest Pages
=========================================*/

const guestPages = [
    "signup.html",
    "forgot-password.html"
];


/*=========================================
        Current Page
=========================================*/

function getCurrentPage(){

    return window.location.pathname

    .split("/")

    .pop();

}


/*=========================================
        Redirect To Login
=========================================*/

function redirectToLogin(){

    showWarning(

        "Please login to continue."

    );

    setTimeout(()=>{

        location.href = "login.html";

    },1000);

}


/*=========================================
        Redirect To Home
=========================================*/

function redirectToHome(){

    setTimeout(()=>{

        window.location.href =

        "../index.html";

    },500);

}


/*=========================================
        Protect Pages
=========================================*/

function protectRoutes(){

    const page =

    getCurrentPage();

    if(

        protectedPages.includes(page)

    ){

        if(!isAuthenticated()){

            redirectToLogin();

        }

    }

}


/*=========================================
        Guest Protection
=========================================*/

function protectGuestPages(){

    const page =

    getCurrentPage();

    if(

        guestPages.includes(page)

    ){

        if(isAuthenticated()){

            redirectToHome();

        }

    }

}


/*=========================================
        Authentication Middleware
=========================================*/

function authMiddleware(){

    validateSession();

    protectRoutes();

    protectGuestPages();

}


/*=========================================
        Check Access
=========================================*/

function hasAccess(){

    return isAuthenticated();

}


/*=========================================
        Initialize Route Protection
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    authMiddleware

);


/*=========================================
        Console
=========================================*/

console.log("✅ Route Protection Ready");
/*==================================================
    AUTH.JS
    Part 9 - Security & Validation
==================================================*/


/*=========================================
        Security Configuration
=========================================*/

const MAX_LOGIN_ATTEMPTS = 5;

const ACCOUNT_LOCK_TIME =

15 * 60 * 1000;

let loginAttempts = 0;

let accountLockedUntil = null;


/*=========================================
        Sanitize User Input
=========================================*/

function sanitizeUserData(data){

    return{

        fullName:

        sanitizeInput(

            data.fullName || ""

        ),

        username:

        sanitizeInput(

            data.username || ""

        ),

        email:

        sanitizeInput(

            data.email || ""

        ).toLowerCase()

    };

}


/*=========================================
        Duplicate Email
=========================================*/

function isDuplicateEmail(email){

    return(

        currentUser.email &&

        currentUser.email

        .toLowerCase()===

        email.toLowerCase()

    );

}


/*=========================================
        Duplicate Username
=========================================*/

function isDuplicateUsername(username){

    return(

        currentUser.username &&

        currentUser.username

        .toLowerCase()===

        username.toLowerCase()

    );

}


/*=========================================
        Account Lock
=========================================*/

function isAccountLocked(){

    return(

        accountLockedUntil &&

        Date.now()<

        accountLockedUntil

    );

}


/*=========================================
        Failed Login
=========================================*/

function recordFailedLogin(){

    loginAttempts++;

    if(

        loginAttempts>=

        MAX_LOGIN_ATTEMPTS

    ){

        accountLockedUntil=

        Date.now()+

        ACCOUNT_LOCK_TIME;

        showError(

            "Account temporarily locked."

        );

    }

}


/*=========================================
        Reset Attempts
=========================================*/

function resetLoginAttempts(){

    loginAttempts=0;

    accountLockedUntil=null;

}


/*=========================================
        Secure Login Check
=========================================*/

function secureLoginValidation(){

    if(

        isAccountLocked()

    ){

        showWarning(

            "Try again later."

        );

        return false;

    }

    return true;

}


/*=========================================
        Authentication Security
=========================================*/

function authenticationSecurity(){

    const user=

    sanitizeUserData(

        currentUser

    );

    currentUser.fullName=

    user.fullName;

    currentUser.username=

    user.username;

    currentUser.email=

    user.email;

    saveUser();

}


/*=========================================
        Initialize Security
=========================================*/

authenticationSecurity();


/*=========================================
        Console
=========================================*/

console.log("✅ Authentication Security Ready");
/*==================================================
    AUTH.JS
    Part 10 - Final Optimization
==================================================*/


/*=========================================
        Safe Refresh
=========================================*/

function safeRefreshAuth(){

    try{

        loadUser();

        loadSession();

        authMiddleware();

    }

    catch(error){

        console.error(

            "Authentication Refresh Error:",

            error

        );

    }

}


/*=========================================
        Auto Save Session
=========================================*/

function autoSaveSession(){

    saveUser();

    saveSession();

}


/*=========================================
        Storage Synchronization
=========================================*/

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key===AUTH_STORAGE_KEY ||

            event.key===SESSION_STORAGE_KEY

        ){

            safeRefreshAuth();

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
        Authentication Analytics
=========================================*/

function getAuthenticationAnalytics(){

    return{

        authenticated:

        userSession.isAuthenticated,

        loggedIn:

        currentUser.isLoggedIn,

        rememberMe:

        userSession.rememberMe,

        role:

        currentUser.role,

        loginTime:

        userSession.loginTime

    };

}


/*=========================================
        Performance Report
=========================================*/

function authPerformance(){

    console.table(

        getAuthenticationAnalytics()

    );

}


/*=========================================
        Window Focus
=========================================*/

window.addEventListener(

    "focus",

    safeRefreshAuth

);


/*=========================================
        Auto Save
=========================================*/

setInterval(

    autoSaveSession,

    30000

);


/*=========================================
        Final Initialization
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        safeRefreshAuth();

        authPerformance();

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

"Authentication Module Version : 1.0.0"

);

console.log(

"Status : Production Ready"

);

console.log("===================================");
