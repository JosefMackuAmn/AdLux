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

    //if (!Animation.isVisible(benefitsImg)) return;

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
// Solutions
let solutionsAnimated = false;
elsToAnim.solCards = document.querySelectorAll('.solution__card');
elsToAnim.solCardsCont = document.querySelector('.solution__cards');
Animation.onScrollToTarget(elsToAnim.solCards[0], () => {
    const [card1, card2, card3] = elsToAnim.solCards;

    if (window.innerWidth < 1300) {
        elsToAnim.solCards.forEach(card => {
            card.style.opacity = "1";
            card.style.transition = "all .3s";
        })
        return;
    }

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

    // Finish animation
    setTimeout(() => {
        card1.style.transform = ``;
        card2.style.transform = "";
        card3.style.transform = ``;
        elsToAnim.solCards.forEach(card => {
            card.style.transition = "all .3s";
        })
        solutionsAnimated = true;
    }, 2000);
});

// Solutions mouseover
const raiseCard = card => {
    if (!solutionsAnimated) return;

    if (window.innerWidth < 1300) return;

    elsToAnim.solCards.forEach(cardEl => {
        cardEl.style.transform = 'scale(.95)';
    });
    card.style.transform = 'scale(1.05)';
}
const lowerCards = () => {
    if (!solutionsAnimated) return;

    if (window.innerWidth < 1300) return;

    elsToAnim.solCards.forEach(cardEl => {
        cardEl.style.transform = '';
    });
}
elsToAnim.solCards.forEach(card => {
    card.addEventListener('mouseenter', raiseCard.bind(this, card));
    card.addEventListener('mouseleave', lowerCards);
})


// Revolution
elsToAnim.revolutionContent = document.getElementById('revolution-content');

Animation.onScrollToTarget(elsToAnim.revolutionContent, () => {
    gsap.to(elsToAnim.revolutionContent.querySelector('.border-left'), {
        transform: 'scaleY(1)',
        duration: .1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.border-top'), {
        transform: 'translateX(0)',
        duration: .1,
        delay: .2
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.border-bottom'), {
        transform: 'translateX(0)',
        duration: .2,
        delay: .1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.heading-2'), {
        transform: 'translateX(0)',
        duration: .4,
        delay: .2,
        opacity: 1
    });
    gsap.to(elsToAnim.revolutionContent.querySelector('.paragraph-big'), {
        transform: 'translateX(0)',
        duration: .4,
        delay: .2,
        opacity: 1
    });
});

//Text highlight

Animation.onScrollToTarget(elsToAnim.revolutionContent, () => {
    gsap.from('.info__revolution p span', {
        color: '#515151',
        duration: .1,
        delay: 0,
        stagger: .15,
    });
});

elsToAnim.info = document.getElementById('info');
Animation.onScrollToTarget(elsToAnim.info, () => {
    gsap.from('.info__meaning__text-wrap p span', {
        color: '#515151',
        duration: .1,
        delay: 0,
        stagger: .15,
    });
});