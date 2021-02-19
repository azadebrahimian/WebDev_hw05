// import "./App.css";
import React, { useState, useEffect } from 'react';
import { ch_join, ch_begin, ch_enter, ch_push, ch_reset } from './socket';

function Bulls() {
  const [state, setState] = useState({
    // gameStarted: false,
    // guess: "",
    history: [],
    guesses: 0,
    invalidGuess: false,
    won: false
  });
  const [guess, setGuess] = useState("");

  let { gameStarted, secretCode, history, guesses, invalidGuess, won } = state;

  useEffect(() => {
    ch_join(setState);
  });

  function checkIfNumber(e) {
    // ch_enter({ letter: e });
    if (isNaN(e)) {
      return
    } else {
      setGuess(e);
      // setState({
      //   ...state,
      //   guess: e
      // });
    }
  }

  // function checkForBullsAndCows() {
  //   let b = 0;
  //   let c = 0;
  //   let secretDigit;
  //   let index;
  //   for (let i = 0; i < 4; i++) {
  //     secretDigit = secretCode[i];
  //     index = guess.indexOf(secretDigit);
  //     if (secretDigit === parseInt(guess[i])) {
  //       b++;
  //     }
  //     if (index >= 0 && index !== i) {
  //       c++;
  //     }
  //   }

  //   return [b, c];
  // }

  function guessCode() {
    ch_push({ letter: guess });
    setGuess("");
    // let state1;
    // if (guess.length !== 4 || !checkIfUnique(guess)) {
    //   setState({
    //     ...state,
    //     invalidGuess: true
    //   });
    //   return
    // } else {
    //   state1 = false;
    // }

    // let state2;
    // var bullsAndCows = checkForBullsAndCows();
    // if (bullsAndCows[0] === 4) {
    //   state2 = true;
    // } else {
    //   state2 = false;
    // }

    // var currHistory = history;
    // currHistory.push({ guess: guess, bulls: bullsAndCows[0], cows: bullsAndCows[1] });
    // var currGuesses = guesses;
    // currGuesses++;
    // setState({
    //   ...state,
    //   invalidGuess: state1,
    //   won: state2,
    //   guess: "",
    //   history: currHistory,
    //   guesses: currGuesses
    // });
  }

  function printHistory() {
    const items = []

    let c = 1;
    for (const h of history) {
      items.push(
        <tr key={c}>
          <td>{c}</td>
          <td>{h["guess"]}</td>
          <td className="Bull-col">{h["bulls"]}</td>
          <td className="Cow-col">{h["cows"]}</td>
        </tr>
      )
      c++;
    }

    return items
  }

  function clickOnEnter(e) {
    if (e.key === "Enter") {
      guessCode();
    }
  }

  function startNewGame() {
    ch_reset();
    setGuess("");
    // setState({
    //   ...state,
    //   secretCode: createSecretCode(),
    //   history: [],
    //   guesses: 0,
    //   won: false
    // });
  }

  function begin() {
    ch_begin();
    // setState({
    //   ...state,
    //   gameStarted: true
    // });
  }

  // if (!gameStarted) {
  //   return (
  //     <div className="Start-menu">
  //       <h2 id="Start-title">Bulls and Cows</h2>
  //       <button id="Start-button" onClick={begin}>
  //         Start Game!
  //       </button>
  //     </div>
  //   );
  // }

  if (won) {
    return (
      <div className="Ending-screen">
        <div>You won!</div>
        <button className="Ending-button" onClick={startNewGame}>Play again?</button>
      </div>
    );
  }

  if (guesses >= 8) {
    return (
      <div className="Ending-screen">
        <div>You lost.</div>
        <button className="Ending-button" onClick={startNewGame}>Play again?</button>
      </div>
    );
  }

  return (
    <div className="Game">
      <div>{secretCode}</div>
      <div id="History">
        <table id="History-table">
          <thead>
            <tr>
              <th>Attempt</th>
              <th>Guess</th>
              <th className="Bull-col">Bulls</th>
              <th className="Cow-col">Cows</th>
            </tr>
          </thead>
          <tbody>
            {printHistory()}
          </tbody>
        </table>
      </div>
      <div id="Base">
        <button className="Base-button" onClick={startNewGame}>
          Restart!
        </button>
        <input
          value={guess}
          id="Guess"
          maxLength="4"
          onChange={(e) => checkIfNumber(e.target.value)}
          onKeyPress={clickOnEnter}
        ></input>
        <button className="Base-button" onClick={guessCode}>
          Go!
        </button>
      </div>
      {invalidGuess &&
        <div id="Invalid">
          Invalid Entry
      </div>}
    </div>
  );
}

export default Bulls;
