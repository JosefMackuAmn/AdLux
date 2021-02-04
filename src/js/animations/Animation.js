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

        // If element is already visible, run callback immediately
        // Otherwise, register it to run later
        if (Animation.isVisible(element)) {
            cb(null);
        } else {
            animationRegistry.push({ el: element, cb });
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
            window.addEventListener(event, Animation.initListener);
        });
        isInit = true;
    }

    // Callback function to addEventListener
    // listening for animEvents on window object
    static initListener(e) {
        // Return, if there is nothing to animate
        if (animationRegistry.length <= 0 && infiniteAnimationRegistry.length <= 0) return;

        // Loop through elements and try to find visible element
        for (let i = 0; i < animationRegistry.length; i++) {
            const el = animationRegistry[i].el;

            if (Animation.isVisible(el)) {
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

    // Return whether an element is visible
    static isVisible(el) {
        return el.getBoundingClientRect().top - window.innerHeight < 0;
    }
}

export default Animation;