function setUpEventListener() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            input.setCustomValidity("");

            showError(input);
        })
    })
}

function showError(target) {
    const name = target.id;

    if (target.validity.badInput) {
        target.setCustomValidity(`Pages are numbers!`)
    } else if (target.validity.valueMissing) {
        target.setCustomValidity(`Please enter the book's ${name}`)
    }  else if (target.validity.tooShort) {
        target.setCustomValidity(`The author's name must be longer than ${target.minLength} characters; Currently you've entered ${target.value.length} character.`)
    }
}