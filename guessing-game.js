function guessingGame() {
  const randNum = Math.floor(Math.random() * 100);
  let gameOver = false;
  let count = 0;

  function makeAGuess(num) {
    if (gameOver) {
      return "The game is over, you already won!";
    }
    count += 1;
    let response = "";
    if (num > randNum) {
      response = `${num} is too high!`;
    } else if (num < randNum) {
      response = `${num} is too low!`;
    } else if (num === randNum && gameOver === false) {
      response = `You win! You found ${randNum} in ${count} guesses.`;
      gameOver = true;
    } 
    return response;
  }
  return makeAGuess;
}

module.exports = { guessingGame };
