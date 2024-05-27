// Request 

// This function fetches the puzzle from the URL
// The fetch API is used to make an HTTP GET request to the URL. The request is awaited before running any response analysis. The fetch() method returns a "promise" that resolves to a response
// Then, response.status, the response code, is checked. 200 signifies that the request was successful.
// Then, response.json() translates the response from json format to an object that is readable and accessible by javascript
// Then, the puzzle property is accessed and returned upon a successful URL request.
// Note: JSON = JavaScript Object Notation
const getPuzzle = async(wordCount) => {

    const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`)

        if (response.status === 200){
            const data = await response.json()

            return data.puzzle
        }
        else{
            throw new Error('unable to get puzzle')
        }
}
