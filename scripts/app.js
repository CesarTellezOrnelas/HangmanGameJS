// Code-Behind
// Operation summary: To start off the game, the gameObject is defined, but not initialized. This will be later initialized as a Hangman instance.
// The frontend elements are also assigned to variables in the backend, for later rendering to them. 
// Then, the startGame() function is called, which awaits the getPuzzle() function with the argument of how many words in the puzzle. 
// Then, the awaited puzzle string is used as one of the Hangman constructor arguments. This Hangman instance is assigned to the above defined gameObject variable.
// Then, the render function is called to pass all of the backend data to the front end. 
// Finally, the keydown event is handled using the makeGuess function and render functions. makeGuess handles the backend changes, modifying the arrays, 
// and render updates the UI with the changes. 


let gameObject 
const puzzleEl = document.querySelector('#puzzle')  
const gameStatus = document.querySelector('#guesses') 
window.addEventListener('keydown', (e) => { 
    gameObject.makeGuess(e.key)
    render()
})

// This function is defined as an async function that awaits the getPuzzle method return (in requests.js). The getPuzzle method takes a number argument for word count of the requested puzzle.
// Then, an instance of the Hangman class is assigned to the previousy defined gameObject variable.
// Finally, the new Hangman instance is rendered.

const startGame = async () => {
    const puzzle = await getPuzzle('1')
    gameObject = new Hangman(puzzle,5)
    render()
}

startGame()
document.querySelector('#reset').addEventListener('click', startGame)

// First the puzzle is cleared out from the last "round"
// Then the status message is fetched from the live Hangman object instance
// Then the puzzle is split into an array of letters, and the array is looped through. 
// For each letter in the puzzle array, a span element is made, the textContent is assigned as the current letter in the loop.
// Finally, the new span/letter element is appended to the puzzleElement (div) on the UI.
const render = () => {
    puzzleEl.innerHTML = ''
    gameStatus.textContent = gameObject.statusMessage

    gameObject.puzzle.split('').forEach((letter) => {
       const letterEl = document.createElement('span')
       letterEl.textContent = letter
       puzzleEl.appendChild(letterEl)
    })
}