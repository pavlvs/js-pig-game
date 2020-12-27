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

// Starting conditions
score0El.textContent = 0
score1El.textContent = 0

const scores = [0, 0]
let currentScore = 0
let activePlayer = 0

diceEl.classList.add('hidden')

// Rolling dice functionality
btnRoll.addEventListener('click', ev => {
    // 1. Generate random die roll between 1 and 6
    const diceRoll = Math.trunc(Math.random() * 6) + 1

    // 2. Display die
    diceEl.src = `images/dice-${diceRoll}.png`
    diceEl.classList.remove('hidden')

    // 3. Check for a 1. If true switch player
    if (diceRoll === 1) {
        currentScore = 0
        document.getElementById(
            `current--${activePlayer}`
        ).textContent = currentScore
        activePlayer = activePlayer === 0 ? 1 : 0
        player0El.classList.toggle('player-active')
        player1El.classList.toggle('player-active')
    } else {
        // Add diceRoll to current score
        currentScore += diceRoll
        document.getElementById(
            `current--${activePlayer}`
        ).textContent = currentScore
    }
})
