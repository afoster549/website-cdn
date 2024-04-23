const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)]
}

let textWall = ""

for (let i = 0; i < 12000; i++) {
    textWall += randomChar()
}

document.getElementById("textwall").innerText = textWall

document.addEventListener("mousemove", (event) => {
    const x = event.clientX
    const y = event.clientY

    const root = document.querySelector(":root")
    
    root.style.setProperty("--x", `calc(${x}px - 25vh)`)
    root.style.setProperty("--y", `calc(${y}px - 25vh)`)
})