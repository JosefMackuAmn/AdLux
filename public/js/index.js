/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/animations/Animation.js":
/*!****************************************!*\
  !*** ./src/js/animations/Animation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
///////////////
///// Animation class with helper methods for animating


// Can't declare these inside the class because of webpack
const infiniteAnimationRegistry = [];
const animationRegistry = [];
let isInit = false;
const animEvents = ['scroll', 'resize'];

class Animation {

    // Fcn to register an element and the associated callback,
    // which will be executed when the element will appear on the screen
    static onScrollToTarget(element, cb) {
        if (!isInit) Animation.init();

        // If element is already visible, run callback immediately
        // Otherwise, register it to run later
        if (Animation.isVisible(element)) {
            cb(null);
        } else {
            animationRegistry.push({ el: element, cb });
        }
    }

    // Register animation invoked on every event
    static infiniteAnimation(cb) {
        if (!isInit) Animation.init();

        infiniteAnimationRegistry.push(cb);
    }

    // Init looking for visible elements
    static init() {
        // Start listening for animEvents
        animEvents.forEach(event => {
            window.addEventListener(event, Animation.initListener);
        });
        isInit = true;
    }

    // Callback function to addEventListener
    // listening for animEvents on window object
    static initListener(e) {
        // Return, if there is nothing to animate
        if (animationRegistry.length <= 0 && infiniteAnimationRegistry.length <= 0) return;

        // Loop through elements and try to find visible element
        for (let i = 0; i < animationRegistry.length; i++) {
            const el = animationRegistry[i].el;

            if (Animation.isVisible(el)) {
                // Call callback
                animationRegistry[i].cb(e);

                // Remove element from array
                animationRegistry.splice(i, 1);
            }
        }

        // Execute all infinitely invoked animations
        infiniteAnimationRegistry.forEach(cb => cb(e));

        // Stop listening for animEvents
        // if there are no more animations left
        // and reset isInit variable
        if (
            animationRegistry.length <= 0
            && infiniteAnimationRegistry.length <= 0
        ) {
            animEvents.forEach(event => {
                window.removeEventListener(event, Animation.initListener);
            });
            isInit = false;
        }

    }

    // Return whether an element is visible
    static isVisible(el) {
        return el.getBoundingClientRect().top - window.innerHeight < 0;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animation);

/***/ }),

/***/ "./src/js/animations/initAnimations.js":
/*!*********************************************!*\
  !*** ./src/js/animations/initAnimations.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Animation */ "./src/js/animations/Animation.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state */ "./src/js/state.js");



const { elsToAnim } = _state__WEBPACK_IMPORTED_MODULE_1__.default;

// Simple documentation:
// Animation.onScrollToTarget(el: HTMLElement, cb(e: Event): fn)

// Callback funciton (cb) will be invoked, once the element (el) is visible

// Also, callback gets passed 'scroll' or 'resize' event, in case it is needed
// If no event needed to be fired for the callback to be called,
// passed value will equal to null


// Info revolution
/* elsToAnim.infoContent = document.getElementById('info-revolution-content');
elsToAnim.infoBorders = document.querySelectorAll('.info__revolution__content__border');
elsToAnim.infoHeading = document.getElementById('info-revolution-heading');
elsToAnim.infoText = document.getElementById('info-revolution-text');
Animation.onScrollToTarget(elsToAnim.infoContent, () => {
    const { infoBorders, infoHeading, infoText, infoContent } = elsToAnim;

    // Store previous values
    const prev = {};

    // Initial setup
    infoHeading.style.display = "none";
    infoHeading.style.opacity = "0";

    //infoText.style.display = "none";
    infoText.style.opacity = "0";
    infoText.style.transform = "translateX(-2rem)";

    prev.infoBordersWidth = infoBorders[0].style.width;
    infoBorders[0].style.width = "0"; 
    infoBorders[1].style.width = "0"; 

    prev.infoContentPadding = infoContent.style.padding;
    infoContent.style.padding = "0";
    infoContent.style.height = "0";
    

    // Show cards
    setTimeout(() => {
        infoContent.style.transition = "all .2s";
        infoContent.style.padding = prev.infoContentPadding;
        infoHeading.style.display = "block";
        infoContent.style.height = "auto";

        setTimeout(() => {
            infoBorders.forEach(border => {
                border.style.transition = "all .2s ease-out";
                border.style.width = prev.infoBordersWidth;
            });

            setTimeout(() => {
                infoHeading.style.transition = "all .2s";
                infoHeading.style.display = "flex";
                infoHeading.style.opacity = "1";

                setTimeout(() => {
                    infoText.style.transition = "all .5s cubic-bezier(.28,.83,.43,.92)";
                    infoText.style.display = "block";
                    infoText.style.opacity = "1";
                    infoText.style.transform = "translateX(0)";
                }, 150);

            }, 100);

        }, 200);

    }, 100);

    // Animate cards
    
}); */

// Animate benefits section
elsToAnim.benefitsStripe = document.querySelector('.benefits__stripe');
_Animation__WEBPACK_IMPORTED_MODULE_0__.default.onScrollToTarget(elsToAnim.benefitsStripe, () => {
    const { benefitsStripe } = elsToAnim;

    if (!benefitsStripe) return;

    benefitsStripe.style.animation = 'showBenefitsStripe .7s forwards ease-out';

    const subheading = benefitsStripe.querySelector('.benefits__stripe__subheading');
    const text = benefitsStripe.querySelector('.benefits__stripe__text');

    [subheading, text].forEach(el => {
        if (!el) return;

        el.style.animation = 'turnUpOpacity 1s .5s forwards ease-out';
    });

});

elsToAnim.benefitsImg = document.getElementById('benefits-img');
_Animation__WEBPACK_IMPORTED_MODULE_0__.default.infiniteAnimation(() => {
    const { benefitsImg } = elsToAnim;

    if (!_Animation__WEBPACK_IMPORTED_MODULE_0__.default.isVisible(benefitsImg)) return;

    const imgHeight = benefitsImg.offsetHeight;

    const scrolled = imgHeight - benefitsImg.getBoundingClientRect().top;
    const scrollable = window.innerHeight + imgHeight;
    const percentageOnPage = scrolled / scrollable;

    let imgPositionX = percentageOnPage * 100;
    let imgPositionY = percentageOnPage * 100;

    if (imgPositionX < 0) imgPositionX = 0;
    if (imgPositionY < 0) imgPositionY = 0;
    if (imgPositionX > 100) imgPositionX = 100;
    if (imgPositionY > 100) imgPositionY = 100;

    benefitsImg.style.objectPosition = `${imgPositionX}% ${imgPositionY}%`;

});

// Products
elsToAnim.productsText = document.getElementById('products-text');
_Animation__WEBPACK_IMPORTED_MODULE_0__.default.onScrollToTarget(elsToAnim.productsText, () => {
    gsap.from(".products__text p span", {
        fontWeight: 300,
        duration: .1,
        stagger: .1
    });
});

// Solutions
elsToAnim.solCards = document.querySelectorAll('.solution__card');
elsToAnim.solCardsCont = document.querySelector('.solution__cards');
_Animation__WEBPACK_IMPORTED_MODULE_0__.default.onScrollToTarget(elsToAnim.solCards[1], () => {
    const [card1, card2, card3] = elsToAnim.solCards;

    // Csf = Center from side
    const containerCfs = elsToAnim.solCardsCont.clientWidth / 2;

    // Get coordinates of cards
    const card1Cfs = card1.getBoundingClientRect().left + (card1.clientWidth / 2);
    const card3Cfs = card3.getBoundingClientRect().left + (card3.clientWidth / 2);

    // Set initial positions
    card1.style.transform = `translateX(${containerCfs - card1Cfs}px) scale(1.1)`;
    card2.style.transform = "scale(1.05)";
    card3.style.transform = `translateX(${containerCfs - card3Cfs}px) scale(1.1)`;

    // Show cards
    setTimeout(() => {
        elsToAnim.solCards.forEach(card => {
            card.style.opacity = "1";
            card.style.transition = "2s cubic-bezier(.24,.84,0,1)";
        });
    }, 100);

    // Animate cards
    setTimeout(() => {
        card1.style.transform = `translateX(0) scale(1)`;
        card2.style.transform = "scale(1)";
        card3.style.transform = `translateX(0) scale(1)`;
    }, 150);
});


//Revolution
elsToAnim.revolutionContent = document.getElementById('revolution-content');

_Animation__WEBPACK_IMPORTED_MODULE_0__.default.onScrollToTarget(elsToAnim.revolutionContent, () => {
    gsap.to(elsToAnim.revolutionContent.querySelector('.border-left'), {
        transform: 'scaleY(1)',
        duration: 1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.border-top'), {
        transform: 'translateX(0)',
        duration: 1,
        delay: 1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.border-bottom'), {
        transform: 'translateX(0)',
        duration: 1,
        delay: 1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.heading-2'), {
        transform: 'translateX(0)',
        duration: 1.5,
        delay: 1,
        opacity: 1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.paragraph-big'), {
        transform: 'translateX(0)',
        duration: 1.5,
        delay: 1,
        opacity: 1
    });
});

/***/ }),

/***/ "./src/js/contact.js":
/*!***************************!*\
  !*** ./src/js/contact.js ***!
  \***************************/
/***/ (() => {

///////////////
///// CONTACT

const sendBtn = document.getElementById('send-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', sendAMessage);
}

function backToNormal(img) {
    img.className = 'loading-efect__img';  
}

function cleanInput() {
    for(let i = 1; i <= 3; i++){
        let input = document.getElementById(`contact-input-${i}`);
        if (input) {
            input.value = '';
        }
    }
}

function validateData(data) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const errors = [];

    if (!data.name || !(data.name.length > 4)) {
        errors.push('name');
    }
    if (!data.email || !regex.test(data.email.toLowerCase())) {
        errors.push('email');
    }
    if (!data.message || !(data.message.length > 19)) {
        errors.push('message');
    }

    return errors;
}

function createPayloadObject(form) {
    return {
        name: form[0].value.trim(),
        email: form[1].value.trim(),
        message: form[2].value.trim()
    }
}

function showSentFeedback(success) {
    let message, color;
    if (success) {
        message = "Odesláno";
        color = "lightgreen";
    } else {
        message = "Odesílání se nezdařilo";
        color = "red";
    }

    // Store initial values
    sendBtnPrevText = "Odeslat";
    sendBtnPrevColor = sendBtn.style.color;
    sendBtnPrevTransition = sendBtn.style.transition;

    // Update success message
    sendBtn.innerText = message;
    sendBtn.style.color = color;
    sendBtn.style.transition = "none";
    sendBtn.style.opacity = "0";

    // Show message
    setTimeout(() => {
        sendBtn.style.opacity = "1";
        sendBtn.style.transition = sendBtnPrevTransition;
    }, 20);

    setTimeout(() => {
        // Restore initial values
        sendBtn.innerText = sendBtnPrevText;
        sendBtn.style.color = sendBtnPrevColor;
    }, 2000);

}

function sendAMessage(e) {
    e.preventDefault();
    const sendImg = document.getElementById('send-img');
    sendImg.className = 'loading-efect__img-send';


    // Create payload object
    const form = e.target.form;
    const data = createPayloadObject(form);

    // Reset validation errors
    [form[0], form[1], form[2]].forEach(input => {
        input.style.border = 'none';
    });

    // Validate form data
    const errors = validateData(data);
    
    // Handle validation errors
    if (errors.length > 0) {
        if (errors.includes('name')) {
            form[0].style.border = '3px solid red';
        }
        if (errors.includes('email')) {
            form[1].style.border = '3px solid red';
        }
        if (errors.includes('message')) {
            form[2].style.border = '3px solid red';
        }

        // Back to normal & return early
        backToNormal(sendImg);
        return;
    }

    // Set timeout for handling animation
    let response, timeout = false;
    setTimeout(() => {
        if (response) {
            // Restore animation
            backToNormal(sendImg);
        } else {
            timeout = true;
        }
    }, 1300);

    fetch('/email', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Not ok response');
        }

        return res.json();

    }).then((json) => {
        if (!json.success) {
            throw new Error('Unsuccessfull send email action');
        }

        // Handle success case
        cleanInput();

        // Show successful action feedback
        showSentFeedback("Odesláno");

    }).catch(err => {
        // Handle error
        console.log(err);

        // Show unsuccessful action feedback
        showSentFeedback(false);

    }).finally(() => {
        response = true;
        if (timeout) {
            // Restore animation
            backToNormal(sendImg);
        }
    });

}


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animations_initAnimations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations/initAnimations */ "./src/js/animations/initAnimations.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact */ "./src/js/contact.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_contact__WEBPACK_IMPORTED_MODULE_1__);
// Init animations


// Contact form handling


////////////////
////////INFO
////////////////

const infoTextWraps = document.querySelectorAll('.info__meaning__text-wrap');

const createCode = (textWrap) => {
  return p => {

    const defaultDistance = 150;

    const RandomCircle = function () {
      this.history = [];
  
      this.render = () => {
        p.beginShape();
        for (let j = 0; j < this.history.length; j += 1) {
          const coords = this.calculateCoordsForI(this.history[j].i, this.history[j].distance);
          p.vertex(coords.x, coords.y);
          this.history[j].distance += p.random(-1, 1)*p.sin(10*this.history[j].i);
        }
        p.endShape();
      }
      this.calculateCoordsForI = (i, distance) => {
        return p.createVector(p.width/2 + distance*p.cos(i),p.height/2 + distance*p.sin(i))
      } 
      this.setup = () => {
        this.history = [];
        for(let i = 0; i <= 2*Math.PI; i+= 1/100) {
          this.history.push({distance: defaultDistance,i: i});
        }
      }
    }
    const randomCirc = new RandomCircle();
    randomCirc.setup();
    
  
    p.setup = () => {
      const canvas = p.createCanvas(400, 400);
      canvas.canvas.className="p5";
    }
  
    let opacity = 100;
  
    p.draw = () => {
      p.clear();
      p.noFill();
      p.stroke(255, opacity);
      p.beginShape();
  
  
      
      p.endShape();
      randomCirc.render();
      
      opacity = opacity * 0.98;
    }
  
   textWrap.addEventListener('mouseenter', () => {
      randomCirc.setup();
      opacity = 100;
    }) 
  
  
  }
  
}

for (const textWrap of [...infoTextWraps]) {
  const infoP5 = new p5(createCode(textWrap), textWrap);
}

////////////////
//////PRODUCTS
////////////////

//Getting all needed elements
const productsSection = document.getElementById('products');

const productButtonA = document.getElementById('product-btn-a');
const productButtonB = document.getElementById('product-btn-b');

const productImageA = document.getElementById('product-image-a');
const productImageB = document.getElementById('product-image-b');

const productFeatures = document.getElementById('product-features');
const productHeading = document.getElementById('product-heading');

//State of product when inactive
const inActiveProductConf = {
  filter: 'blur(15px)',
  cursor: 'pointer',
  scale: '0.6',
  y: '0rem',
  duration: '.5',
  opacity: 0.5
}

//State of product when active
const activeProductConf = {
  filter: 'none',
  cursor: 'clicker',
  scale: '1',
  y: '0',
  duration: '.5',
  opacity: 1
}

//Initiaizing product B to inactive config, product A to active config
gsap.to(productImageB, activeProductConf);
gsap.to(productImageA, inActiveProductConf);

//Function switches active product
const switchProduct = (event) => {

  //If active element or active element button is clicked, nothing happens
  if ([...event.target.classList].includes('toggled')) {
    return;
  }

  //If product A is active
  if ([...productButtonA.classList].includes('toggled')) {

    //Adding toggled class to product B and product B button
    //Removing toggled class from product A and product A button
    productButtonA.classList.remove('toggled');
    productButtonB.classList.add('toggled');
    productImageA.classList.remove('toggled');
    productImageB.classList.add('toggled');

    //Adjusting text
    productHeading.textContent = 'Stropní visací hologram';
    productFeatures.innerHTML = `
        <li class="products__feature"><p class="paragraph-small">Svítivost: <span>1600cd</span></p></li>
        <li class="products__feature"><p class="paragraph-small">Rozměr zobrazení: <span>1165x1165 mm</span></p></li>
        <li class="products__feature"><p class="paragraph-small"><span>Kovový rám</span></p></li>
        <li class="products__feature"><p class="paragraph-small">Premiový vzhled</p></li>
        <li class="products__feature"><p class="paragraph-small">Úhel zobrazení <span>176°</span></p></li>
        <li class="products__feature"><p class="paragraph-small"><span>Dvě zobrazovací plochy</span>, jeden produkt</p></li>
        <li class="products__feature"><p class="paragraph-small"><span>XXX HULK</span></p></li>
    `;

    //Animating smoothly product A to inActive config
    //Animating smoothly product B to active config
    gsap.to(productImageA,inActiveProductConf);
    gsap.to(productImageB, activeProductConf);

  } else {

     //Adding toggled class to product A and product A button
    //Removing toggled class from product B and product B button
    productButtonB.classList.remove('toggled');
    productButtonA.classList.add('toggled');
    productImageB.classList.remove('toggled');
    productImageA.classList.add('toggled');

    //Adjusting text
    productHeading.textContent = 'Moucha';
    productFeatures.innerHTML = `
        <li class="products__feature"><p class="paragraph-small">Svítivost: <span>1600cd</span></p></li>
        <li class="products__feature"><p class="paragraph-small">Rozměr zobrazení: <span>1165x1165 mm</span></p></li>
        <li class="products__feature"><p class="paragraph-small"><span>Kovový rám</span></p></li>
        <li class="products__feature"><p class="paragraph-small">Premiový vzhled</p></li>
        <li class="products__feature"><p class="paragraph-small">Úhel zobrazení <span>176°</span></p></li>
        <li class="products__feature"><p class="paragraph-small"><span>Dvě zobrazovací plochy</span>, jeden produkt</p></li>
        <li class="products__feature"><p class="paragraph-small"><span>XXX HULK</span></p></li>
    `;

    //Animating smoothly product B to inActive config
    //Animating smoothly product A to active config
    gsap.to(productImageB,inActiveProductConf);
    gsap.to(productImageA, activeProductConf);
  }
};

//Adding event listener to both product buttons and both product images
productButtonA.addEventListener('click', (event) => {
  switchProduct(event);
});

productButtonB.addEventListener('click', (event) => {
  switchProduct(event);
});

productImageA.addEventListener('click', (event) => {
  switchProduct(event);
});

productImageB.addEventListener('click', (event) => {
  switchProduct(event);
});

////////////////
//////SOLUTION
////////////////

const contactSection = document.getElementById('contact');
const toContactBtn = document.getElementById('to-contact-btn');

//Scrolling to contact when "CONTACT" button is pressed
toContactBtn.addEventListener('click', () => {
  contactSection.scrollIntoView({behavior: 'smooth'});
});

//WAVE

const video = document.getElementById('wave');
video.playbackRate = 0.5;

//Whenever the window gets resized
window.addEventListener('resize', () => {
  updateWave();
});

const updateWave = () => {

  //Getting viewport width
  const width = document.documentElement.getBoundingClientRect().width;

  //If viewport width is over 900px, displaying wave animation, else displaying nothing
  if (width >= 900) {

    video.innerHTML = ` <source src="img/wave.webm">`;
    video.style.display = 'block';

  } else {

    video.innerHTML = ``;
    video.style.display = 'none';
  }

}

//Initializing wave animation
updateWave();

///////////////
//////MENU
///////////

const menu = document.getElementById('menu');
const openButton = document.getElementById('openButton');
const cancelButton = document.getElementById('cancelButton');
const link = document.querySelectorAll('#menu a');
const body = document.body;
const ADD = 'add';
const REMOVE = 'remove';

class Element{
    constructor(element, methodVar, classStyle){
      this.classStyle = classStyle;
      this.methodVar = methodVar;
      this.element = element;
      this.method();
    }
    method(){
      if(this.methodVar === ADD){
        this.element.classList.add(this.classStyle);
      } else {
        if(this.element === cancelButton || this.element === openButton){
          this.element.classList.remove(this.classStyle);
          return;
        }
        this.element.classList.add(`un${this.classStyle}`);
        setTimeout(()=>{
          this.element.classList.remove(`un${this.classStyle}`);
          this.element.classList.remove(this.classStyle);
        }, 
        400);
      }
    }
    includesClass(style){
      for(const classStyle of this.element.classList){
        if(classStyle == style){
          return true;
        }
      }
      return false;
    }
}

function menuHandler(method){
  const oppositeMethod = method === ADD ? REMOVE : ADD;
  let menuObject, cancelButtonObject;
  //body
  new Element(body, method, 'blur-body');
  const header = document.getElementById('header').children;
  for(const div of header){
    if(div.id === 'upper-part'){
      for(const child of div.children){
        if(child.id !== 'cancelButton' && child.id !== 'openButton'){
          //some element in the upper part of header
          new Element(child, method, 'blur');
        }else if(child.id === 'openButton'){
          //open button
          new Element(child, oppositeMethod, 'visible');
        } else {
          //cancel button
          cancelButtonObject = new Element(child, method, 'visible');
        }
      }
    } else if(div.id !== 'menu'){
      //some div element in the header
      new Element(div, method, 'blur');
    } else {
      menuObject = new Element(div, method, 'visible');//menu
    }
  }
  setTimeout(()=>{
    if(!menuObject.includesClass('visible') && cancelButtonObject.includesClass('visible')){
      new Element(cancelButton, REMOVE, 'visible');
      new Element(openButton, ADD, 'visible');
      menuHandler(ADD);
    }
  }, 
  400);
}


openButton.addEventListener('click', menuHandler.bind(null, ADD));
cancelButton.addEventListener('click', menuHandler.bind(null, REMOVE));
for(const a of link){
  a.addEventListener('click', menuHandler.bind(null, REMOVE));
}

/***/ }),

/***/ "./src/js/state.js":
/*!*************************!*\
  !*** ./src/js/state.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const state = {
    // Elements to be animated
    elsToAnim: {}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map