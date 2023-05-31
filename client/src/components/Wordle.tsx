import { useEffect, useState } from "react";

import Guess from "./Guess";
import NavBar from "./NavBar";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const ENTER_URL = "/api/handle_enter";
const START_URL = "/wordle";

function Wordle() {
  const axiosPrivate = useAxiosPrivate();
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const [guesses, setGuesses] = useState<string[]>(new Array(6).fill(""));
  const [colorsArray, setColorsArray] = useState<string[]>(
    new Array(6).fill("")
  );
  const [word, setWord] = useState("");
  const [row, setRow] = useState(0);

  async function startGame() {
    setStart(true);
    const response = await axiosPrivate.get(START_URL);
    console.log(response.data.message);
  }
  async function startNewGame() {
    setStart(true);
    setEnd(false);
    setGuesses(new Array(6).fill(""));
    setColorsArray(new Array(6).fill(""));
    setRow(0);
    const response = await axiosPrivate.get(START_URL);
    console.log(response.data.message);
  }

  async function handleKeyup(e: any) {
    if (e.key === "Enter") {
      if (word.length === 5) {
        try {
          const response = await axiosPrivate.post(ENTER_URL, { word, row });
          const { isWord, won, lost, colors, originalWord } =
            response.data.body;

          if (isWord) {
            setGuesses((prevGuesses) => {
              const newGuesses = [...prevGuesses];
              newGuesses[row] = word;
              return newGuesses;
            });
            setColorsArray((prevColors) => {
              const newColors = [...prevColors];
              newColors[row] = colors;
              return newColors;
            });
            setRow(row + 1);
            setWord("");
            if (won) {
              alert("YOU WON!");
              setStart(false);
              setEnd(true);
            } else if (lost) {
              alert(`YOU LOST THE WORD WAS: ${originalWord}`);
              setStart(false);
              setEnd(true);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (e.key === "Backspace") {
      setWord((word) => word.substring(0, word.length - 1));
    } else if (e.key.match(/[A-z]/) && word.length < 5) {
      setWord((word) => word + e.key);
    }
  }

  useEffect(() => {
    if (start) {
      window.addEventListener("keydown", handleKeyup);

      return () => {
        window.removeEventListener("keydown", handleKeyup);
      };
    }
  }, [handleKeyup]);

  return (
    <>
      <NavBar />
      <div className="wordleBody">
        <div>
          {new Array(6).fill("").map((_, i) => (
            <Guess
              word={i === row && word}
              color={colorsArray[i]}
              guesses={guesses[i]}
              key={i}
            />
          ))}
        </div>
        {start === false && end === false ? (
          <button className="submitButton" onClick={startGame}>
            Start
          </button>
        ) : end === true ? (
          <button className="submitButton" onClick={startNewGame}>
            New Game
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Wordle;
