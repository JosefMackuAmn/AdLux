// Init animations
import './animations/initAnimations';

// Contact form handling
import './contact';

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
  
    let opacity = 0;
  
    p.draw = () => {
      p.clear();
      p.noFill();
      p.stroke(255, opacity);
      p.beginShape();
  
  
      
      p.endShape();
      randomCirc.render();
      
      opacity = opacity * 0.955;
    }
  
   textWrap.addEventListener('mouseenter', () => {
      randomCirc.setup();
      opacity = 150;
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

const productFeaturesA = document.getElementById('product-features-a');
const productFeaturesB = document.getElementById('product-features-b');

const productHeading = document.getElementById('product-heading');

const comingSoon = document.getElementById('coming-soon');

//State of product when inactive
const inActiveProductConf = {
  filter: 'blur(15px)',
  scale: '0.6',
  y: '0rem',
  duration: '.5',
  opacity: 0.5
}

//State of products when active
const activeProductAConf = {
  filter: 'none',
  scale: '1',
  y: '0',
  duration: '.5',
  opacity: 1
}

const activeProductBConf = {
  filter: 'blur(6px)',
  scale: '1',
  y: '0',
  duration: '.5',
  opacity: .5
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
  if ([...productButtonA.classList].includes('toggled')) {

    //Adding toggled class to product B and product B button
    //Removing toggled class from product A and product A button
    productButtonA.classList.remove('toggled');
    productButtonB.classList.add('toggled');
    productImageA.classList.remove('toggled');
    productImageB.classList.add('toggled');
    productFeaturesA.classList.remove('toggled');
    productFeaturesB.classList.add('toggled');
    comingSoon.classList.add('toggled');

    productHeading.textContent = 'Holografický stojan';
  

    //Animating smoothly product A to inActive config
    //Animating smoothly product B to active config
    gsap.to(productImageA,inActiveProductConf);
    gsap.to(productImageB, activeProductBConf);

  } else {

     //Adding toggled class to product A and product A button
    //Removing toggled class from product B and product B button
    productButtonB.classList.remove('toggled');
    productButtonA.classList.add('toggled');
    productImageB.classList.remove('toggled');
    productImageA.classList.add('toggled');
    productFeaturesB.classList.remove('toggled');
    productFeaturesA.classList.add('toggled');
    comingSoon.classList.remove('toggled');

    //Adjusting text
    productHeading.textContent = 'Holografická visací platforma';

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
        this.element.classList.remove(this.classStyle);
      }
    }
}

function blurWeb(method){
  const bodyObject = new Element(body, method, 'blur-body');
  const header = document.getElementById('header').children;
  for(const div of header){
    if(div.id === 'upper-part'){
      for(const child of div.children){
        if(child.id !== 'cancelButton'){
          const childObject = new Element(child, method, 'blur');
        }
      }
    } else if(div.id !== 'menu'){
      const divObject = new Element(div, method, 'blur');
    }
  }
}

function cancelMenu(){
  blurWeb(REMOVE);
  menu.classList.remove('visible');
  cancelButton.classList.remove('visible');
  openButton.classList.add('visible');
}


function openMenu(){
  blurWeb(ADD);
  menu.classList.add('visible');
  cancelButton.classList.add('visible');
  openButton.classList.remove('visible');
}

openButton.addEventListener('click', openMenu);
cancelButton.addEventListener('click', cancelMenu);
for(const a of link){
  a.addEventListener('click', cancelMenu);
}