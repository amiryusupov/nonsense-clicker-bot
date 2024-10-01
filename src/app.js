const tap = document.querySelector(".tap")
const scoreText = document.querySelector(".score")
const restart = document.querySelector(".restart button")

function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem("score", score)
    scoreText.textContent = score
}

function addOne() {
    setScore(getScore() + 1)
    setImage()
}

function setImage() {
    if(getScore() >= 50) {
        tap.setAttribute("src", "./assets/classmate.png")
    } else {
        tap.setAttribute("src", "./assets/mars.svg")
    }
}

function getScore() {
    return Number(localStorage.getItem("score")) ?? 0
}

function restartScore() {
    setScore(0)
    setImage()
}

tap.addEventListener("click", (event) => {
    const rect = tap.getBoundingClientRect() // size of the element `tap`
    
    const coordinationY = event.clientY - rect.top - rect.height / 2 // getting the exact coordination where I'm clicking
    const coordinationX = event.clientX - rect.left - rect.width / 2 // getting the exact coordination where I'm clicking
    
    const times_folding = 40
    
    const clickX = (coordinationY / rect.height) * times_folding // transforming X coordination into degrees
    const clickY = (coordinationX / rect.width) * -times_folding // transforming Y coordination into degrees
    
    console.log(clickX)
    tap.style.setProperty("--clickY", `${clickX}deg`)
    tap.style.setProperty("--clickX", `${clickY}deg`)
    
    setTimeout(() => {
        tap.style.setProperty('--clickY', "0deg")
        tap.style.setProperty('--clickX', "0deg")
    }, 300)
    
    const plusOne = document.createElement("span")
    plusOne.classList.add("plusOne")
    plusOne.textContent = "+1"
    plusOne.style.left = `${event.clientX - rect.left}px`
    plusOne.style.top = `${event.clientY - rect.top}px`
    
    
    tap.parentElement.appendChild(plusOne)
    
    addOne()
    
    setTimeout(() => {
        plusOne.remove()
    }, 2000);
})


restart.addEventListener("click", (event) => {
    restartScore()
})

start()