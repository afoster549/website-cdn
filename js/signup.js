const domain = "http://localhost:8080"

// Data submition

const usernameFeild = document.getElementById("username-feild")
const emailFeild = document.getElementById("email-feild")
const passwordFeild = document.getElementById("password-feild")
const submit = document.getElementById("submit")

function signup() {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", `${domain}/v1/account/register`)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                window.location = "https://afoster.uk/login"
            } else {
                const resError = JSON.parse(xhr.responseText).error

                if (typeof(resError) === "string") {
                    error(resError)
                } else {
                    usernameFeild.parentNode.children[0].innerText = ""
                    emailFeild.parentNode.children[0].innerText = ""
                    passwordFeild.parentNode.children[0].innerText = ""

                    usernameFeild.style.borderColor = "#ffffff"
                    emailFeild.style.borderColor = "#ffffff"
                    passwordFeild.style.borderColor = "#ffffff"

                    if (typeof(resError.username) === "string") {
                        usernameFeild.parentNode.children[0].innerText = resError.username

                        usernameFeild.style.borderColor = "#c20000"
                    }

                    if (typeof(resError.email) === "string") {
                        emailFeild.parentNode.children[0].innerText = resError.email

                        emailFeild.style.borderColor = "#c20000"
                    }

                    if (typeof(resError.password) === "string") {
                        passwordFeild.parentNode.children[0].innerText = resError.password

                        passwordFeild.style.borderColor = "#c20000"
                    }
                }
            }
        }
    }

    xhr.send(`{
        "username": "${usernameFeild.value}",
        "email": "${emailFeild.value}",
        "password": "${passwordFeild.value}"
    }`)
}

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        signup()
    }
})

submit.addEventListener("click", signup)
