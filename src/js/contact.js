///////////////
///// CONTACT

const sendBtn = document.getElementById('send-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', sendAMessage);
}

function backToNormal(img) {
    img.className = 'loading-efect__img';  
}

function cleanInput() {
    for(let i = 1; i <= 3; i++){
        let input = document.getElementById(`contact-input-${i}`);
        if (input) {
            input.value = '';
        }
    }
}

function validateData(data) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const errors = [];

    if (!data.name || !(data.name.length > 4)) {
        errors.push('name');
    }
    if (!data.email || !regex.test(data.email.toLowerCase())) {
        errors.push('email');
    }
    if (!data.message || !(data.message.length > 19)) {
        errors.push('message');
    }

    return errors;
}

function createPayloadObject(form) {
    return {
        name: form[0].value.trim(),
        email: form[1].value.trim(),
        message: form[2].value.trim()
    }
}

function showSentFeedback(success) {
    let message, color;
    if (success) {
        message = "Odesláno";
        color = "lightgreen";
    } else {
        message = "Odesílání se nezdařilo";
        color = "red";
    }

    // Store initial values
    sendBtnPrevText = "Odeslat";
    sendBtnPrevColor = sendBtn.style.color;
    sendBtnPrevTransition = sendBtn.style.transition;

    // Update success message
    sendBtn.innerText = message;
    sendBtn.style.color = color;
    sendBtn.style.transition = "none";
    sendBtn.style.opacity = "0";

    // Show message
    setTimeout(() => {
        sendBtn.style.opacity = "1";
        sendBtn.style.transition = sendBtnPrevTransition;
    }, 20);

    setTimeout(() => {
        // Restore initial values
        sendBtn.innerText = sendBtnPrevText;
        sendBtn.style.color = sendBtnPrevColor;
    }, 2000);

}


// Get error message elements
const errMsgs = document.querySelectorAll('.contact-content__err-msg');

// Functions for handling change of input
// and recheck their validity
const checkInputAgain = (e, input, i) => {
    const errs = validateData({ [input]: e.target.value });
    if (!errs.includes(input)) {
        e.target.style.backgroundColor = 'white';
        errMsgs[i].style.display = 'none';
    }
}
const checkNameAgain = e => {
    return checkInputAgain(e, 'name', 0)
}
const checkMailAgain = e => {
    return checkInputAgain(e, 'email', 1)
}
const checkMessageAgain = e => {
    return checkInputAgain(e, 'message', 2)
}

function sendAMessage(e) {
    e.preventDefault();
    const sendImg = document.getElementById('send-img');
    sendImg.className = 'loading-efect__img-send';

    // Create payload object
    const form = e.target.form;
    const data = createPayloadObject(form);

    // Reset validation errors
    [form[0], form[1], form[2]].forEach((input, i) => {
        input.style.backgroundColor = 'white';
        errMsgs[i].style.display = 'none';
    });

    // Validate form data
    const errors = validateData(data);
    
    // Handle validation errors
    if (errors.length > 0) {

        // Get error message elements

        if (errors.includes('name')) {
            form[0].style.backgroundColor = '#EF8585';
            errMsgs[0].style.display = 'inline-block';

            form[0].removeEventListener('input', checkNameAgain);
            form[0].addEventListener('input', checkNameAgain);
        }
        if (errors.includes('email')) {
            form[1].style.backgroundColor = '#EF8585';
            errMsgs[1].style.display = 'inline-block';

            form[1].removeEventListener('input', checkMailAgain);
            form[1].addEventListener('input', checkMailAgain);
        }
        if (errors.includes('message')) {
            form[2].style.backgroundColor = '#EF8585';
            errMsgs[2].style.display = 'inline-block';

            form[2].removeEventListener('input', checkMessageAgain);
            form[2].addEventListener('input', checkMessageAgain);
        }

        // Back to normal & return early
        backToNormal(sendImg);
        return;
    }

    // Set timeout for handling animation
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

        // Show successful action feedback
        showSentFeedback("Odesláno");

    }).catch(err => {
        // Handle error
        // console.log(err);

        // Show unsuccessful action feedback
        showSentFeedback(false);

    }).finally(() => {
        response = true;
        if (timeout) {
            // Restore animation
            backToNormal(sendImg);
        }
    });

}
