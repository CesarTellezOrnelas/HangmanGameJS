// Hangman CLass

class Hangman {

    // Constructor sets up the initial fields/ instance variables for the instances
    constructor(word, remainingGuesses = 0){
    this.word = word.toLowerCase().split('') 
    this.remainingGuesses = remainingGuesses 
    this.guessedLetters = [] 
    this.status = "playing" 
    }

    // Checks for Win or Loss and changes status. Called after every key down/guess in makeGuess function
    calculateStatus(){
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ' )
        
        if (this.remainingGuesses == 0) {
            this.status = "failed"
        } else if (finished) {
            this.status = "finished"
        } else {
            this.status = "playing"
        }
    }

    // returns the string that is displayed on the game status UI element, depending on the current game status
    get statusMessage(){
        if (this.status == "playing"){
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status == 'failed'){
            return `Nice try! The word was "${this.word.join('')}"`
        } else {
            return 'Great work. You guessed the word'
        }
    }

    // Returns the puzzle, by converting the word array into a puzzle array which is passed to the UI letter Elements/spans to be rendered
    // First, the previous round puzzle is cleared out, then the word array is looped through.
    // Since the word array is already in order, we modify the letter and add it to the puzzle array as we loop. 
    // The letter gets modified based on the guessedLetters array. Good guesses exist in both the word array(which is being looped through) and the guessedLetters array.
    get puzzle(){
        let puzzle = '' 

        this.word.forEach((letter) => { 
            if(this.guessedLetters.includes(letter) || letter === ' ') { 
                puzzle += letter 
            } else {
                puzzle += '*' 
            }
        })
        return puzzle 
    }
    // Guess Handling: processes each new guessed letter and adds to guessedLetters array or subtracts one from remainingGuesses array based on
    // the letter's existence in the puzzle/word array and the guessedLetters array. 
    makeGuess(newGuessedLetter){
        newGuessedLetter = newGuessedLetter.toLowerCase() 
        const isUnique = !this.guessedLetters.includes(newGuessedLetter) 
        const isBadGuess = !this.word.includes(newGuessedLetter) 

        // Do nothing if user makes guesses while game status is failed or finished.
        if (this.status !== "playing") {
            return
        }
    
        // Execute these if the game.status = playing (game is not over)
        // if guess is unique and game is not finished, add the guessed letter to the guessedLetters array
        if (isUnique) {
            this.guessedLetters.push(newGuessedLetter) 
        } 
        // if guess is unique and is a bad guess, subtract one from remaining guesses
        if (isUnique && isBadGuess) {  
            this.remainingGuesses -- 
        } 
        this.calculateStatus()
    }
}