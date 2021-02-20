
// Init animations
import './animations/initAnimations';

// Contact form handling
import './contact';

////////////////
////////GLOBAL
////////////////

//Prevents the user from accidentaly dragging elements (for example images) 
window.ondragstart = function() { return false; } 

////////////////
////////INFO
////////////////

//Random circle animation on info with p5.js

//Selecting all text wraps ( elements around those the circle will appear)
const infoTextWraps = document.querySelectorAll('.info__meaning__text-wrap');

//This function returns p5 code for each textWrap
const createCode = (textWrap) => {
  return p => {

    //Perimeter of the resulting circle
    const defaultDistance = 150;

    const RandomCircle = function () {

      this.history = [];
  
      this.render = () => {

        p.beginShape();

        for (let j = 0; j < this.history.length; j += 1) {

          //Calculating coords for each point stored in history
          const coords = this.calculateCoordsForI(this.history[j].i, this.history[j].distance);

          //Selecting point given by calculated coords
          p.vertex(coords.x, coords.y);

          //Altering the point distance slightly and randomly
          this.history[j].distance += p.random(-1, 1)*p.sin(10*this.history[j].i);
        }

        p.endShape();
      }

      //Returns coords (x, y) for given point (determined by angle [i] and distance [distance])
      this.calculateCoordsForI = (i, distance) => {
        return p.createVector(p.width/2 + distance*p.cos(i),p.height/2 + distance*p.sin(i))
      } 

      this.setup = () => {

        //Clears all stored points
        this.history = [];

        //Creates a representation of circle in this history
        for (let i = 0; i <= 2*Math.PI; i+= 1/100) {

          this.history.push({distance: defaultDistance,i: i});
          //(i is the angle)

        }

      }

    }

    //Creating new randomCircle instance
    const randomCirc = new RandomCircle();

    //Resets the randomCirc object
    randomCirc.setup();
    
    //Initiates canvas
    p.setup = () => {
      const canvas = p.createCanvas(400, 400);
      canvas.canvas.className="p5";

      //Removing fill from all shapes
      p.noFill();
    }
  
    let opacity = 0;
  
    //Draws one frame of the animation
    p.draw = () => {
      p.clear();
      p.stroke(255, opacity);
     
      randomCirc.render();
      
      //Opacity goes exponentially down each frame
      opacity = opacity * 0.955;
    }
  
    //Reset circle on hover
    textWrap.addEventListener('mouseenter', () => {
      randomCirc.setup();
      opacity = 150;
    }) 
  
  }
  
}

//Initiates a p5 sketch for each text wrap
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

const productFeaturesA = document.getElementById('product-features-a');
const productFeaturesB = document.getElementById('product-features-b');

const productHeadingA = document.getElementById('product-heading-a');
const productHeadingB = document.getElementById('product-heading-b');

const comingSoon = document.getElementById('coming-soon');

//State of product when inactive
const inActiveProductConf = {
  filter: 'blur(15px)',
  scale: '0.6',
  duration: '.5',
  opacity: 0.5
}

//State of products when active
const activeProductAConf = {
  filter: 'none',
  scale: '1',
  duration: '.5',
  opacity: 1
}

const activeProductBConf = {
  filter: 'blur(6px)',
  scale: '1',
  duration: '.5',
  opacity: .5,
}

//Initiaizing product B to inactive config, product A to active config
gsap.to(productImageA, activeProductAConf);
gsap.to(productImageB, inActiveProductConf);

//Function switches active product
const switchProduct = (event) => {

  //If active element or active element button is clicked, nothing happens
  if ([...event.target.classList].includes('toggled')) {
    return;
  }

  //If product A is active
  if ([...productButtonA.classList].includes('toggled')) /* [Animating from A to B] */{

    //Adding toggled class to product B and product B button
    //Removing toggled class from product A and product A button
    productButtonA.classList.remove('toggled');
    productButtonB.classList.add('toggled');
    productImageA.classList.remove('toggled');
    productImageB.classList.add('toggled');

    //Blurring out product features A
    gsap.to(productFeaturesA, {
      opacity: 0,
      filter: 'blur(2px)',
      duration: 1,
      display: 'none'
    });

    //Blurring in product features B
    gsap.to(productFeaturesB, {
      opacity: 1,
      duration: 1,
      display: 'block',
      filter: 'blur(6px)'
    });

    //Blurring in "coming soon" text
    gsap.to(comingSoon, {
      opacity: 1,
      filter: 'none',
      duration: 1,
      display: 'block'
    });

    //Blurring out product A heading
    gsap.to(productHeadingA, {
      opacity: 0,
      duration: 1,
      filter: 'blur(4px)',
    });

    //Blurring in product B heading
    gsap.to(productHeadingB, {
      opacity: 1,
      duration: 1,
      filter: 'blur(6px)',
    });

  
    //Animating smoothly product A to inActive config
    //Animating smoothly product B to active config
    gsap.to(productImageA,inActiveProductConf);
    gsap.to(productImageB, activeProductBConf);

  } else /* [Animating from B to A] */ {

     //Adding toggled class to product A and product A button
    //Removing toggled class from product B and product B button
    productButtonB.classList.remove('toggled');
    productButtonA.classList.add('toggled');
    productImageB.classList.remove('toggled');
    productImageA.classList.add('toggled');

    //Blurring out "coming soon" text
    gsap.to(comingSoon, {
      opacity: 0,
      duration: 1,
      display: 'none'
    });

    //Blurring in product features A
    gsap.to(productFeaturesA, {
      opacity: 1,
      duration: 1,
      filter: 'none',
      display: 'block'
    });

    //Blurring out product features B
    gsap.to(productFeaturesB, {
      opacity: 0,
      filter: 'blur(2px)',
      duration: 1,
      display: 'none'
    });

    //Blurring in product heading A
    gsap.to(productHeadingA, {
      opacity: 1,
      duration: 1,
      filter: 'none',
    });

    //Blurring out product heading B
    gsap.to(productHeadingB, {
      opacity: 0,
      duration: 1,
      filter: 'blur(4px)',
    });

    //Animating smoothly product B to inActive config
    //Animating smoothly product A to active config
    gsap.to(productImageB,inActiveProductConf);
    gsap.to(productImageA, activeProductAConf);
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

