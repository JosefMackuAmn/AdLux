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

        const pageYOffset = window.pageYOffset;

        const elAnimObj = {
            el: element,
            pos: element.getBoundingClientRect().top + pageYOffset,
            cb
        }

        // If element is already visible, run callback immediately
        // Otherwise, register it to run later
        if (Animation.isVisible(elAnimObj.pos, pageYOffset)) {
            cb(null);
        } else {
            animationRegistry.push(elAnimObj);
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
            if (event === 'resize') {
                window.addEventListener(event, () => {
                    Animation.recalcElementPositions();
                    Animation.initListener();
                });
            } else {
                window.addEventListener(event, Animation.initListener);
            }
        });
        isInit = true;
    }

    // Callback function to addEventListener
    // listening for animEvents on window object
    static initListener(e) {
        // Return, if there is nothing to animate
        if (animationRegistry.length <= 0 && infiniteAnimationRegistry.length <= 0) return;

        // Get current pageYOffset
        const pageYOffset = window.pageYOffset;

        // Loop through elements and try to find visible element
        for (let i = 0; i < animationRegistry.length; i++) {
            const el = animationRegistry[i];

            if (Animation.isVisible(el.pos, pageYOffset)) {
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

    static recalcElementPositions() {
        // Get current pageYOffset
        const pageYOffset = window.pageYOffset;

        // Change relative positions of elements
        animationRegistry.forEach(elAnimObj => {
            elAnimObj.pos = elAnimObj.el.getBoundingClientRect().top + pageYOffset;
        })
    }

    // Return whether an element is visible
    static isVisible(pos, pageYOffset) {
        return pos - pageYOffset - window.innerHeight < -100;
    }
}

export default Animation;