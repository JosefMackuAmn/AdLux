// Init animations
import './animations/initAnimations';


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


const code = (p) => {


  p.setup = function() {
    const cv = p.createCanvas(1920, 500);
    cv.canvas.style.width = "";
    cv.canvas.style.height= "";
  }

  let lastPoint = {
    x: 0,
    y: 0
  }

  p.draw = function() {
    let X = p.cos(p.frameCount)*p.frameCount/2;
    let Y = p.sin(p.frameCount)*p.frameCount/2;

    p.background(0, 0, 0, 0);
    p.fill(255, 10);
    p.stroke(255, 50);
   
    p.point(X + 900, Y + 300);
  
  }

}

const myp5 = new p5(code, productsSection);

////////////////
//////SOLUTION
////////////////

const contactSection = document.getElementById('contact');
const toContactBtn = document.getElementById('to-contact-btn');

//Scrolling to contact when "CONTACT" button is pressed
toContactBtn.addEventListener('click', () => {
  contactSection.scrollIntoView({behavior: 'smooth'});
});

//VIDEO

const video = document.getElementById('wave');

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

////////////////
//////CONTACT
////////////////

function backToNormal(img){
  img.className = 'loading-efect__img';  
}
function cleanInput() {
  for(let i = 1; i <= 3; i++){
    let input = document.getElementById(`contact-input-${i}`);
    console.log(input);
    input.value = '';
  }
}

function sendAMessage(e){
  e.preventDefault();
  const sendImg = document.getElementById('send-img');
  sendImg.className = 'loading-efect__img-send';

  const form = e.target.form;

  const data = {
    name: form[0].value,
    email: form[1].value,
    message: form[2].value
  }

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

  }).catch(err => {
    // Handle error
    console.log(err);

  }).finally(() => {
    response = true;
    if (timeout) {
      // Restore animation
      backToNormal(sendImg);
    }
  });

  

}

const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendAMessage);

