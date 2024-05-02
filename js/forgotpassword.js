const domain = "http://localhost:8080"

// Data submition

const emailFeild = document.getElementById("email-feild")
const submit = document.getElementById("submit")

function forgotpassword() {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", `${domain}/v1/account/sendresetlink`)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                submit.innerText = "Resend"

                document.getElementById("title").style.margin = "0px"

                document.getElementById("info").innerText = JSON.parse(xhr.responseText).message
                document.getElementById("info").style.display = "block"

                emailFeild.style.display = "none"
            } else {
                error(JSON.parse(xhr.responseText).error)
            }
        }
    }

    xhr.send(`{
        "email": "${emailFeild.value}"
    }`)
}

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        forgotpassword()
    }
})

submit.addEventListener("click", forgotpassword)
