///////////////
///// Animation class with helper methods for animating


// Can't declare these inside the class because of webpack
const animationCbs = [];
let isInit = false;

class Animation {

    // Fcn to register an element and the associated callback,
    // which will be executed when the element will appear on the screen
    static onScrollToTarget(element, cb) {
        if (!isInit) {
            this.init();
            isInit = true;
        }

        // If element is already visible, run callback immediately
        // Otherwise, register it to run later
        if (Animation.isVisible(element)) {
            cb();
        } else {
            animationCbs.push({ el: element, cb });
        }
    }

    // Init looking for visible elements
    static init() {
        const initListener = e => {
            // Return, if there is nothing to animate
            if (animationCbs.length <= 0) {
                return;
            }

            // Loop through elements and try to find visible element
            for (let i = 0; i < animationCbs.length; i++) {
                const el = animationCbs[i].el;

                if (Animation.isVisible(el)) {
                    // Call callback
                    animationCbs[i].cb();

                    // Remove element from array
                    animationCbs.splice(i, 1);
                }
            }
        }

        ['scroll', 'resize'].forEach(action => {
            window.addEventListener(action, initListener);
        });
    }

    static isVisible(el) {
        return el.getBoundingClientRect().top - window.innerHeight < 0;
    }

}

export default Animation;