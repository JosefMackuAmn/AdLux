import Animation from './Animation';
import state from '../state';

const { elsToAnim } = state;
elsToAnim.benefitsStripe = document.querySelector('.benefits__stripe');

// Simple documentation:
// Animation.onScrollToTarget(el: HTMLElement, cb(e: Event): fn)

// Callback funciton (cb) will be invoked, once the element (el) is visible

// Also, callback gets passed 'scroll' or 'resize' event, in case it is needed
// If no event needed to be fired for the callback to be called,
// passed value will equal to null

// Animate benefits section
Animation.onScrollToTarget(elsToAnim.benefitsStripe, (e) => {
    if (!elsToAnim.benefitsStripe) return;

    elsToAnim.benefitsStripe.style.animation = 'showBenefitsStripe .7s forwards ease-out';

    const subheading = elsToAnim.benefitsStripe.querySelector('.benefits__stripe__subheading');
    const text = elsToAnim.benefitsStripe.querySelector('.benefits__stripe__text');

    [subheading, text].forEach(el => {
        if (!el) return;

        el.style.animation = 'turnUpOpacity 1s .5s forwards ease-out';
    });

});