/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
////////////////
//////PRODUCTS
////////////////





const productsSection = document.getElementById('products');

const productButtonA = document.getElementById('product-btn-a');
const productButtonB = document.getElementById('product-btn-b');

const productImageA = document.getElementById('product-image-a');
const productImageB = document.getElementById('product-image-b');

const productFeatures = document.getElementById('product-features');
const productHeading = document.getElementById('product-heading');

const inActiveProductConf = {
  filter: 'blur(15px)',
  cursor: 'pointer',
  scale: '0.6',
  y: '0rem',
  duration: '.5',
  opacity: 0.5
}

const activeProductConf = {
  filter: 'none',
  cursor: 'clicker',
  scale: '1',
  y: '0',
  duration: '.5',
  opacity: 1
}

gsap.to(productImageA, activeProductConf);
gsap.to(productImageB, inActiveProductConf);

const switchProduct = (event) => {

  if ([...event.target.classList].includes('toggled')) {
    return;
  }

  if ([...productButtonA.classList].includes('toggled')) {

    productButtonA.classList.remove('toggled');
    productButtonB.classList.add('toggled');
    productImageA.classList.remove('toggled');
    productImageB.classList.add('toggled');

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

  } else {

    productButtonB.classList.remove('toggled');
    productButtonA.classList.add('toggled');
    productImageB.classList.remove('toggled');
    productImageA.classList.add('toggled');

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

  }

  if ([...productImageA.classList].includes('toggled')) {

    console.log('Activating prod B')

    gsap.to(productImageA,inActiveProductConf);
    gsap.to(productImageB, activeProductConf);
    productImageA.classList.remove('toggled');
    productImageB.classList.add('toggled');

  } else {

    console.log('Activating prod A')

    gsap.to(productImageB,inActiveProductConf);
    gsap.to(productImageA, activeProductConf);

    productImageB.classList.remove('toggled');
    productImageA.classList.add('toggled');

  }

};

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
    /* let randomX = p.random(p.width);
    let randomY = p.random(p.height); */
    let X = p.cos(p.frameCount)*p.frameCount/2;
    let Y = p.sin(p.frameCount)*p.frameCount/2;

    p.background(0, 0, 0, 0);
    p.fill(255, 10);
    p.stroke(255, 50);
    //p.noStroke();
    //p.circle(randomX, randomY, 5);

    //p.line(900, 300, 900 + X, 300 + Y);
    p.point(X + 900, Y + 300);
   /*  lastPoint.x = randomX;
    lastPoint.y = randomY; */
    //p.line(p.frameCount*10 - 20, p.height, p.frameCount*10, 0);
  }

}

const myp5 = new p5(code, productsSection);

////////////////
//////SOLUTION
////////////////

const contactSection = document.getElementById('contact');
const toContactBtn = document.getElementById('to-contact-btn');

toContactBtn.addEventListener('click', () => {
  contactSection.scrollIntoView({behavior: 'smooth'});
});


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


/******/ })()
;
//# sourceMappingURL=index.js.map