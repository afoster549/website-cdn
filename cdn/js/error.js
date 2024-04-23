const error = function(err) {
    const node = document.createElement("div")
    const text = document.createElement("p")

    node.className = "error-message"
    text.innerText = err

    node.appendChild(text)
    document.body.appendChild(node)

    setTimeout(() => {
        node.style.bottom = "100px"
    }, 1)

    setTimeout(() => {
        node.style.bottom = "-200px"

        setTimeout(() => {
            node.remove()
        }, 1000)
    }, 5 * 1000)
}