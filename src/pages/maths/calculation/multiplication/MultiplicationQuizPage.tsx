import React, { useState, useEffect } from 'react';
import './MultiplicationQuizPage.css';

type Mode = 'square' | 'cube' | 'custom' | 'squareroot';

const MultiplicationQuizPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('square');
  const [num1, setNum1] = useState(2);
  const [num2, setNum2] = useState(2);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

   const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const countdown = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    }
    if (timeLeft === 0) {
      setShowResult(true);
      setIsCorrect(false);
    }
  }, [timeLeft, started]);

  const getQuestion = () => {
    switch (mode) {
      case 'square':
        return `${num1}²`;
      case 'cube':
        return `${num1}³`;
      case 'custom':
        return `${num1} × ${num2}`;
      case 'squareroot':
        return `√${num1 * num1}`;
    }
  };

  const getAnswer = () => {
    switch (mode) {
      case 'square':
        return num1 * num1;
      case 'cube':
        return num1 * num1 * num1;
      case 'custom':
        return num1 * num2;
      case 'squareroot':
        return num1;
    }
  };

  const handleSubmit = () => {
    const correct = parseInt(userAnswer) === getAnswer();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore((prev) => prev + 1);
    setStarted(false);
  };

  const handleNext = () => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setTimeLeft(11);
    if (mode === 'custom') {
      setNum1(Math.floor(Math.random() * 99) + 2);
      setNum2(Math.floor(Math.random() * 99) + 2);
    } else {
      setNum1(Math.floor(Math.random() * 99) + 2);
    }
  };

  const handleStartTimer = () => {
    setTimeLeft(11);
    setStarted(true);
    setShowResult(false);
  };

  const increase = () => setNum1((prev) => prev + 1);
  const decrease = () => setNum1((prev) => Math.max(1, prev - 1));

  return (
    <div className="multi-container">
      <h1>Multiplication Quiz</h1>

      <div className="mode-buttons">
        <button className={mode === 'square' ? 'active' : ''} onClick={() => setMode('square')}>
          Square
        </button>
        <button className={mode === 'cube' ? 'active' : ''} onClick={() => setMode('cube')}>
          Cube
        </button>
        <button className={mode === 'custom' ? 'active' : ''} onClick={() => setMode('custom')}>
          Custom
        </button>
        <button className={mode === 'squareroot' ? 'active' : ''} onClick={() => setMode('squareroot')}>
          Square Root
        </button>
      </div>

      {(mode === 'custom' || mode === 'square' || mode === 'cube' || mode === 'squareroot') && (
        <div className="custom-controls">
          <div className="num-control">
            <label>Number 1:</label>
            <button onClick={decrease}>-</button>
            <span>{num1}</span>
            <button onClick={increase}>+</button>
          </div>

          {mode === 'custom' && (
            <div className="num-control">
              <label>Number 2:</label>
              <button onClick={() => setNum2((prev) => Math.max(1, prev - 1))}>-</button>
              <span>{num2}</span>
              <button onClick={() => setNum2((prev) => prev + 1)}>+</button>
            </div>
          )}
        </div>
      )}

      <div className="quiz-box">
        <p className="question">{getQuestion()}</p>

        <input
          type="number"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit} disabled={showResult}>
          Submit
        </button>

        <button className="next-btn" onClick={handleNext}>
          Next Question
        </button>

        <div className="timer-section">
          <button className="timer-btn" onClick={handleStartTimer}>
            Start Timer
          </button>
          {started && <span className="timer">Time Left: {timeLeft}s</span>}
        </div>

        {showResult && (
          <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? '✅ Correct!' : `❌ Wrong! Correct: ${getAnswer()}`}
          </div>
        )}

        <div className="score">Score: {score}</div>
      </div>
    </div>
  );
};

export default MultiplicationQuizPage;
