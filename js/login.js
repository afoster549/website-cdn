const domain = "http://localhost:8080"

// Data submition

const usernameFeild = document.getElementById("username-feild")
const passwordFeild = document.getElementById("password-feild")
const submit = document.getElementById("submit")


let os = "Unknown OS";

if (navigator.userAgent.indexOf("Win") != -1) os = "Windows";
if (/android/i.test(navigator.userAgent)) os = "Android";
if (navigator.userAgent.indexOf("Mac") != -1) os = "MacOS";
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) os = "iOS";
if (navigator.userAgent.indexOf("Linux") != -1) os = "Linux";
if (navigator.userAgent.indexOf("X11") != -1) os = "UNIX";

let platform = "Unknown Platform";

if (navigator.userAgent.indexOf("Edg") != -1) platform = "Edge";
if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv:") != -1) platform = "Internet Explorer";
if (navigator.userAgent.indexOf("Firefox") != -1) platform = "Firefox";
if (navigator.userAgent.indexOf("Safari") != -1) platform = "Safari";
if (navigator.userAgent.indexOf("Chrome") != -1) platform = "Chrome";

submit.addEventListener("click", () => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", `${domain}/v1/account/login`)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            passwordFeild.parentNode.children[0].innerText = ""

            usernameFeild.style.borderColor = "#ffffff"
            passwordFeild.style.borderColor = "#ffffff"

            if (xhr.status === 200) {
                let now = new Date()
                now.setMonth(now.getMonth() + 6)

                document.cookie = `_TOKEN=${JSON.parse(xhr.responseText).token}; expires=${now.toUTCString()}; path=/;`
                document.cookie = `_SESSION=${JSON.parse(xhr.responseText).session}; expires=${now.toUTCString()}; path=/;`

                window.location = "https://afoster.uk"
            } else if (xhr.status === 401) {
                passwordFeild.parentNode.children[0].innerText = JSON.parse(xhr.responseText).error

                usernameFeild.style.borderColor = "#c20000"
                passwordFeild.style.borderColor = "#c20000"
            } else {
                error(JSON.parse(xhr.responseText).error)
            }
        }
    }

    xhr.send(`{
        "username": "${usernameFeild.value}",
        "password": "${passwordFeild.value}",
        "os": "${os}",
        "platform": "${platform}"
    }`)
})