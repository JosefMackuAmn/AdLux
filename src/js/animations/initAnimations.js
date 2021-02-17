import Animation from './Animation';
import state from '../state';

const { elsToAnim } = state;

// Simple documentation:
// Animation.onScrollToTarget(el: HTMLElement, cb(e: Event): fn)

// Callback funciton (cb) will be invoked, once the element (el) is visible

// Also, callback gets passed 'scroll' or 'resize' event, in case it is needed
// If no event needed to be fired for the callback to be called,
// passed value will equal to null


//HEADER
//

gsap.from('.header__text p span', {
    color: '#515151',
    duration: .25,
    delay: 0.25,
    stagger: .25,
});

//Text highlight


// BENEFITS
//
elsToAnim.benefitsStripe = document.querySelector('.benefits__stripe');
Animation.onScrollToTarget(elsToAnim.benefitsStripe, () => {
    if (!elsToAnim.benefitsStripe) return;

    elsToAnim.benefitsStripe.style.animation = 'showBenefitsStripe .7s forwards ease-out';

    const subheading = elsToAnim.benefitsStripe.querySelector('.benefits__stripe__subheading');
    const text = elsToAnim.benefitsStripe.querySelector('.benefits__stripe__text');

    [subheading, text].forEach(el => {
        if (!el) return;

        el.style.animation = 'turnUpOpacity 1s .5s forwards ease-out';
    });

});


elsToAnim.benefitsImg = document.getElementById('benefits-img');
Animation.infiniteAnimation(() => {
    if (!Animation.isVisible(elsToAnim.benefitsImg)) return;

    const imgHeight = elsToAnim.benefitsImg.offsetHeight;

    const scrolled = imgHeight - elsToAnim.benefitsImg.getBoundingClientRect().top;
    const scrollable = window.innerHeight + imgHeight;
    const percentageOnPage = scrolled / scrollable;

    let imgPositionX = percentageOnPage * 100;
    let imgPositionY = percentageOnPage * 100;

    if (imgPositionX < 0) imgPositionX = 0;
    if (imgPositionY < 0) imgPositionY = 0;
    if (imgPositionX > 100) imgPositionX = 100;
    if (imgPositionY > 100) imgPositionY = 100;

    elsToAnim.benefitsImg.style.objectPosition = `${imgPositionX}% ${imgPositionY}%`;

});

//Text highlight
Animation.onScrollToTarget(elsToAnim.benefitsStripe, () => {
    const benefitsPSpan = document.querySelectorAll('.benefits__stripe p span');
    gsap.from(benefitsPSpan, {
        color: '#515151',
        duration: .25,
        delay: .9,
        stagger: .25,
    })
});

//PRODUCTS
//

//Text highlight
elsToAnim.productsText = document.getElementById('products-text');
Animation.onScrollToTarget(elsToAnim.productsText, () => {
    gsap.from(".products__text p span", {
        fontWeight: 300,
        duration: .2,
        stagger: .1,
        fontSize: '1rem'
    })
    ;
});

//REVOLUTION
//
elsToAnim.revolutionContent = document.getElementById('revolution-content');

Animation.onScrollToTarget(elsToAnim.revolutionContent, () => {
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

//Text highlight

Animation.onScrollToTarget(elsToAnim.revolutionContent, () => {
    gsap.from('.info__revolution p span', {
        color: '#515151',
        duration: .25,
        delay: 1.5,
        stagger: .25,
    });
});

elsToAnim.info = document.getElementById('info');
Animation.onScrollToTarget(elsToAnim.info, () => {
    gsap.from('.info__meaning__text-wrap p span', {
        color: '#515151',
        duration: .25,
        delay: 0.5,
        stagger: .25,
    });
});