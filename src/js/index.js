// Init animations
import './animations/initAnimations';

// Contact form handling
import './contact';

//Reponsive video
import ResponsiveVideo from './responsiveVideo/responsiveVideo';

// Define :root --vh variable
let vh;
const setVhCSSVar = () => {
  vh = window.innerHeight / 100;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhCSSVar();
window.addEventListener('resize', () => {
  // Recalc vh on significant resize (more than 20%)
  const newVh = window.innerHeight / 100;
  const vhChange = Math.abs(vh - newVh) / vh;
  if (vhChange > 0.2) {
    setVhCSSVar();
  }
});



////////////////
////////GLOBAL
////////////////

//Prevents the user from accidentaly dragging elements (for example images)
window.ondragstart = function() { return false; }

////////////////
////////HEADER
////////////////

const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;

//Adjusting styles
if (isSafari) {
  const headerGradient = document.getElementById('gradient');
  headerGradient.style.display = 'none';

  document.documentElement.style.backgroundImage = 'none';
  document.documentElement.style.backgroundColor = '#040e0f';
}

//Adlux animation video source config

const sources = [  

  // {extension: 'webm', type: 'video/webm', filePath: '/img/newanimation/',
  //   sizes: [
  //     {maxWidth: Number.POSITIVE_INFINITY, name: '480p_transp'},
  //     {maxWidth: 1200, name: '480p_transp'},
  //     {maxWidth: 800, name: '480p_transp'},
  //     {maxWidth: 500, name: '480p_transp'}
  //   ],
  // },

  {extension: 'mp4', type: 'video/mp4', filePath: '/img/animation-safari/',
    sizes: [
      {maxWidth: Number.POSITIVE_INFINITY, name: '400'},
      {maxWidth: 1200, name: '300'},
      {maxWidth: 800, name: '200'},
      {maxWidth: 500, name: '150'}
    ],
  },

  // {extension: 'mov', type: 'video/quicktime', filePath: '/img/',
  //   sizes: [
  //     {maxWidth: Number.POSITIVE_INFINITY, name: 'out'},
  //   ],
      
  // }
]

if (!isSafari) {

  sources.unshift({extension: 'webm', type: 'video/webm', filePath: '/img/newanimation/',
    sizes: [
      {maxWidth: Number.POSITIVE_INFINITY, name: '480p_transp'},
      {maxWidth: 1200, name: '480p_transp'},
      {maxWidth: 800, name: '480p_transp'},
      {maxWidth: 500, name: '480p_transp'}
    ],
  })

}




//Making adlux animation video responsive
new ResponsiveVideo('adluxvideo', sources);

////////////////
////////INFO
////////////////

//Random circle animation on info with p5.js

//Selecting all text wraps ( elements around those the circle will appear)
const infoTextWraps = document.querySelectorAll('.info__meaning__text-wrap');

//This function returns p5 code for each textWrap
const createCode = (textWrap) => {
  return p => {

    let isActive = true;

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

      if (!isActive) {
        return;
      }

      p.clear();
      p.stroke(255, opacity);
     
      randomCirc.render();
      
      //Opacity goes exponentially down each frame
      opacity = opacity * 0.955;

      if (opacity < 1) {
        isActive = false;
        p.frameRate(0);
      }
    }
  
    //Reset circle on hover
    textWrap.addEventListener('mouseenter', () => {
      randomCirc.setup();
      isActive = true;
      p.frameRate(60);
      opacity = 150;
    }) 
  
  }
  
}

//Initiates a p5 sketch for each text wrap
for (const textWrap of [...infoTextWraps]) {

  new p5(createCode(textWrap), textWrap);

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
const backDrop = document.getElementById('back-drop');
const body = document.body;
let isMenuOpen = false;

function openMenuHandler(){
  isMenuOpen = true;
  body.classList.add('blur-body');
  menu.classList.remove('unvisible');
  openButton.classList.add('unvisibleOpenButton');
}

function closeMenuHandler(){
  isMenuOpen = false;
  body.classList.add('unblur-body');
  setInterval(()=>{
    if(isMenuOpen){
      body.classList.remove('unblur-body');
    }
  }, 480);
  setTimeout(()=>{
    body.classList.remove('unblur-body');
    if(!isMenuOpen){
      body.classList.remove('blur-body');
    }
  }, 480);
  menu.classList.add('unvisible');
  openButton.classList.remove('unvisibleOpenButton');
}

openButton.addEventListener('click', openMenuHandler);
cancelButton.addEventListener('click', closeMenuHandler);
for(const a of link){
  a.addEventListener('click', closeMenuHandler);
}
backDrop.addEventListener('click', closeMenuHandler);