import React, { useEffect, useState } from "react";
import "./NumberPattern.css";
import { allFunctions } from "./types";
const NumberPattern: React.FC = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [missingIndex, setMissingIndex] = useState<number>(0);
  const [options, setOptions] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(20);
const [showExplanation, setShowExplanation] = useState<boolean>(false);
const [type,setType] = useState<string>();
 
const handleGenerate = () => {
  // Get all function values into an array
  const functionList = Object.values(allFunctions);

  // Pick a random function
  const randomFunction = functionList[Math.floor(Math.random() * functionList.length)];

  // Call the chosen function
  const {
    pattern,
    missingIndex,
    correctAnswer,
    type,
    options,
    timer,
  } = randomFunction();
setType(type)
  setShowExplanation(false);
  setPattern(pattern);
  setMissingIndex(missingIndex);
  setCorrectAnswer(correctAnswer);
  setOptions(options);
  setSelected(null);
  setTimer(timer);
};

// useEffect to call on first render
useEffect(() => {
  handleGenerate();
}, []);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);


 
  const handleOptionClick = (opt: number) => {
    if (selected === null) setSelected(opt);
  };

  return (
    <div className="pattern-container">
      <h2>Guess the Missing Number</h2>
      <div className="pattern-display">
        {pattern.map((num, idx) => (
          <span
            key={idx}
            className={`pattern-number ${
              idx === missingIndex ? "missing" : ""
            }`}
          >
            {idx === missingIndex ? "?" : num}
          </span>
        ))}
      </div>

      <div className="timer">Time Left: {timer}s</div>

      <div className="options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`option-btn ${
              selected !== null
                ? opt === correctAnswer
                  ? "correct"
                  : opt === selected
                  ? "wrong"
                  : ""
                : ""
            }`}
            onClick={() => handleOptionClick(opt)}
            disabled={selected !== null || timer === 0}
          >
            {opt}
          </button>
        ))}
      </div>

     {(selected !== null || timer === 0) && (
  <>
    <div className="result-msg">
      {selected === correctAnswer ? "✅ Correct!" : "❌ Wrong!"} Correct Answer: {correctAnswer}
    </div>

    {!showExplanation && (
      <button className="reveal-btn" onClick={() => setShowExplanation(true)}>
        Reveal Explanation
      </button>
    )}

    {showExplanation && pattern.length === 6 && correctAnswer !== null && (
      <div className="pattern-explanation">
        <h4>Pattern Explanation:</h4>
        <h3> dfs {type}</h3>
        <ul>
          {pattern.map((num, idx) => {
            if (idx === 0) {
              return <li key={idx}>arr[0] = {num} (initial value)</li>;
            } else {
              const prev = pattern[idx - 1];
              const diff = num - prev;
              return (
                <li key={idx}>
                  arr[{idx}] = arr[{idx - 1}] + {diff} = {prev} + {diff} = {num}
                </li>
              );
            }
          })}
        </ul>
      </div>
    )}
  </>
)}


      <button className="next-btn" onClick={handleGenerate}>
        Next
      </button>
    </div>
  );
};

export default NumberPattern;
