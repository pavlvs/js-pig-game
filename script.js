'use strict'

// Selecting elements
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const scores = [0, 0]
let gameOn, currentScore, activePlayer

const init = function () {
    // Starting conditions
    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    scores[0] = 0
    scores[1] = 0
    currentScore = 0
    gameOn = true
    activePlayer = 0

    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.remove('player--active')
    player1El.classList.remove('player--active')
    player0El.classList.add('player--active')
}

const switchPlayers = function () {
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

init()

// Rolling dice functionality
btnRoll.addEventListener('click', ev => {
    if (gameOn) {
        // 1. Generate random die roll between 1 and 6
        const diceRoll = Math.trunc(Math.random() * 6) + 1

        // 2. Display die
        diceEl.src = `images/dice-${diceRoll}.png`
        diceEl.classList.remove('hidden')

        // 3. Check for a 1. If true switch player
        if (diceRoll === 1) {
            document.getElementById(`current--${activePlayer}`).textContent = 0
            switchPlayers()
        } else {
            // Add diceRoll to current score
            currentScore += diceRoll
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore
        }
    }
})

// Holding functionality
btnHold.addEventListener('click', ev => {
    if (gameOn) {
        // 1. Add current score to active player's total score and display it
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer]
        // 2. Reset current score
        document.getElementById(`current--${activePlayer}`).textContent = 0
        // 3. If total score below 100 Switch players
        if (scores[activePlayer] < 100) {
            switchPlayers()
        } else {
            // finish the game
            gameOn = false
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner')
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active')
            diceEl.classList.add('hidden')
        }
    }
})

// Reset game
btnNew.addEventListener('click', ev => {
    init()
})
