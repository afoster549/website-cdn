const domain = "http://localhost:8080"

// Data submition

const passwordFeild = document.getElementById("password-feild")
const confirmPasswordFeild = document.getElementById("confirm-password-feild")
const submit = document.getElementById("submit")

submit.addEventListener("click", () => {
    passwordFeild.style.borderColor = "#ffffff"
    confirmPasswordFeild.style.borderColor = "#ffffff"

    if (passwordFeild.value === confirmPasswordFeild.value && passwordFeild.value != "") {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", `${domain}/v1/account/resetpassword`)
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader("Content-Type", "application/json")

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    window.location = "https://afoster.uk/login"
                } else {
                    error(JSON.parse(xhr.responseText).error)
                }
            }
        }

        const query = new URLSearchParams(window.location.search)

        xhr.send(`{
            "resetid": "${query.get("r")}",
            "newpassword": "${passwordFeild.value}"
        }`)
    } else {
        confirmPasswordFeild.style.borderColor = "#c20000"

        confirmPasswordFeild.parentNode.children[0].innerText = "Passwords don't match."
    }
})