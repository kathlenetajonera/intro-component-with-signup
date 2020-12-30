const inputFields = document.querySelectorAll("input");
const submitBtn = document.querySelector("#submit");

inputFields.forEach(inputField => {
    inputField.addEventListener("input", () => {
        inputField.classList.remove("error")
        hideErrorIndicators(inputField)
    })
})

submitBtn.addEventListener("click", e => {
    e.preventDefault();

    inputFields.forEach(inputField => {
        if (!inputField.value) {
            showErrorMessage(inputField)
        } else {
            checkInputFormat(inputField)
        }
    })
})

function showErrorMessage(field) {
    const inputContainer = field.parentElement;
    const inputLabel = field.dataset.label;

    if (!inputContainer.nextElementSibling.classList.contains("error-message")) {
        inputContainer.insertAdjacentHTML("afterend", `
        <div class="error-message">
            <p>${inputLabel} cannot be empty</p>
        </div>      
        `)
    } else return;

    field.placeholder = "";
    showErrorIndicators(field)
}

function checkInputFormat(field) {
    const inputPatterns = {
        firstName: /^([a-z]+)$/i,
        lastName: /^([a-z]+)$/i,
        email: /^([\w\.\-]+)@([a-z\-]{3,10})(\.[a-z]{2,3})(\.[a-z]{2,3})?$/i,
        password: /^([\w\@\-\.]+)$/
    }

    const inputContainer = field.parentElement
    const inputLabel = field.dataset.label
    const inputValue = field.value

    switch (inputLabel) {
        case "First Name":
            if (!inputValue.match(inputPatterns.firstName)) {
                showErrorIndicators(field)
                field.setAttribute("data-validated", false)
            } else {
                hideErrorIndicators(field)
                field.setAttribute("data-validated", true)
            }
            break;
        case "Last Name":
            if (!inputValue.match(inputPatterns.lastName)) {
                showErrorIndicators(field)
                field.setAttribute("data-validated", false)
            } else {
                hideErrorIndicators(field)
                field.setAttribute("data-validated", true)
            }
            break;
        case "Email Address":
            if (!inputValue.match(inputPatterns.email)) {
                showErrorIndicators(field)
                field.setAttribute("data-validated", false)

                if (inputContainer.nextElementSibling.classList.contains("error-message")) {
                    inputContainer.nextElementSibling.remove();

                    inputContainer.insertAdjacentHTML("afterend", `
                    <div class="error-message">
                        <p>Looks like this is not an email</p>
                    </div>      
                    `)                    
                } else {
                    inputContainer.insertAdjacentHTML("afterend", `
                    <div class="error-message">
                        <p>Looks like this is not an email</p>
                    </div>      
                    `)
                }
            } else {
                hideErrorIndicators(field)
                field.setAttribute("data-validated", true)
            }
            break;
        case "Password":
            if (!inputValue.match(inputPatterns.password)) {
                showErrorIndicators(field)
                field.setAttribute("data-validated", false)
            } else {
                hideErrorIndicators(field)
                field.setAttribute("data-validated", true)
            }
            break;
    }
}

const showErrorIndicators = elem => {
    const errorIcon = elem.nextElementSibling
    const errorMessage = elem.parentElement.nextElementSibling

    elem.classList.remove("valid")
    elem.classList.add("error")
    errorIcon.classList.remove("hide")

    // if (elem.value) {
    //     if (errorMessage.classList.contains("error-message")) {
    //         errorMessage.remove()
    //     }
    // }
}

const hideErrorIndicators = elem => {
    const errorIcon = elem.nextElementSibling;
    const errorMessage = elem.parentElement.nextElementSibling

    elem.classList.remove("error")
    elem.classList.add("valid")

    errorIcon.classList.add("hide")

    if (errorMessage.classList.contains("error-message")) {
        errorMessage.remove()
    }
}
