import Animation from './Animation';
import state from '../state';

const { elsToAnim } = state;

// Simple documentation:
// Animation.onScrollToTarget(el: HTMLElement, cb(e: Event): fn)

// Callback funciton (cb) will be invoked, once the element (el) is visible

// Also, callback gets passed 'scroll' or 'resize' event, in case it is needed
// If no event needed to be fired for the callback to be called,
// passed value will equal to null


// Info revolution
elsToAnim.infoContent = document.getElementById('info-revolution-content');
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
    
});

// Animate benefits section
elsToAnim.benefitsStripe = document.querySelector('.benefits__stripe');
Animation.onScrollToTarget(elsToAnim.benefitsStripe, () => {
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
Animation.infiniteAnimation(() => {
    const { benefitsImg } = elsToAnim;

    if (!Animation.isVisible(benefitsImg)) return;

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
Animation.onScrollToTarget(elsToAnim.productsText, () => {
    gsap.from(".products__text p span", {
        fontWeight: 300,
        duration: .1,
        stagger: .1
    });
});

// Solutions
elsToAnim.solCards = document.querySelectorAll('.solution__card');
elsToAnim.solCardsCont = document.querySelector('.solution__cards');
Animation.onScrollToTarget(elsToAnim.solCards[1], () => {
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