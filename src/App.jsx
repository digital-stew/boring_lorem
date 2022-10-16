import { useState, useRef } from "react";
import { words } from "./words";
import { rudeWords } from "./rude";
import "./App.css";

function App() {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * (max - 1 + 1) + 1);
  };
  const time = useRef(0);
  const [count, setCount] = useState(1);
  const [rudeMode, setRudeMode] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [error, setError] = useState(false);

  const getWordList = (count) => {
    let wordsList = [];
    let numberList = [];
    if (rudeMode) {
      for (let index = 0; index < count; index++) {
        let unique = false;
        while (!unique) {
          let randomInt = getRandomInt(rudeWords.length);
          if (!numberList.includes(randomInt)) {
            numberList.push(randomInt);
            unique = true;
          }
        }
        wordsList.push(rudeWords[getRandomInt(rudeWords.length)]);
      }
    } else {
      for (let index = 0; index < count; index++) {
        let unique = false;
        while (!unique) {
          let randomInt = getRandomInt(words.length);
          if (!numberList.includes(randomInt)) {
            numberList.push(randomInt);
            unique = true;
          }
        }
        wordsList.push(words[getRandomInt(words.length)]);
      }
    }

    return wordsList;
  };

  const toClipBoard = () => {
    const ele = document.querySelector("#words");
    navigator.clipboard.writeText(ele.innerHTML);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rudeMode && count > words.length) {
      setError(`max words ${words.length}`);
      return;
    }
    if (rudeMode && count > rudeWords.length) {
      setError(`max rude words ${rudeWords.length}`);
      return;
    }

    setError(false);
    var t0 = window.performance.now();
    setWordList(getWordList(count));
    var t1 = window.performance.now();
    time.current = t1 - t0;
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Tired of boring old lorem ipsum?</h1>
      {wordList.length > 0 && (
        <p style={{ textAlign: "center" }}>
          {wordList.length} unique words generated in {time.current} ms <br />
          <button onClick={toClipBoard}>copy to clipboard</button>
        </p>
      )}
      {error && <p style={{ textAlign: "center" }}>{error}</p>}

      <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <input
          className="number"
          type="number"
          name="amount"
          id="amount"
          min="1"
          size="5"
          style={{ WebkitAppearance: "textInput" }}
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <label style={{ paddingLeft: "1rem" }} htmlFor="rude">
          Rude words:
        </label>
        <input
          type="radio"
          id="rude"
          name="select"
          value="rude"
          checked={rudeMode}
          onChange={() => {
            setRudeMode(true);
            alert("caution these words may cause offense!!");
          }}
        />
        <label style={{ paddingLeft: "1rem" }} htmlFor="word">
          words:
        </label>
        <input
          type="radio"
          id="word"
          name="select"
          value="word"
          checked={!rudeMode}
          onChange={() => setRudeMode(false)}
        />
        <button type="submit">generate</button>
      </form>

      <p
        id="words"
        style={{ maxWidth: "70vw", textAlign: "center", margin: "2rem auto" }}
      >
        {wordList.map((word) => {
          return `${word} `;
        })}
      </p>
    </>
  );
}

export default App;
