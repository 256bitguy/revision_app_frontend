import React, { useState } from 'react';
import './SubtractionQuizPage.css';

const generateQuestion = () => {
  const numCount =  2;  
  const numbers = Array.from({ length: numCount }, () =>
    Math.floor(Math.random() * 900) + 100  
  );
  const questionStr = numbers.join(' - ');
  const answer = numbers.reduce((acc, curr, idx) =>
    idx === 0 ? curr : acc - curr
  );
  return { numbers, questionStr, answer };
};

const SubtractionQuizPage: React.FC = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, setTime] = useState(0);

  let timer =0;

  const startTimer = () => {
    setTimerStarted(true);
    setTime(0);
    timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimerStarted(false);
  };

  const handleSubmit = () => {
    stopTimer();
    const correct = parseInt(userAnswer) === question.answer;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    setQuestion(generateQuestion());
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setTime(0);
  };

  return (
    <div className="quiz-container">
      <h1>Subtraction Quiz</h1>

      <div className="quiz-box">
        <p className="question-text">{question.questionStr}</p>

        {!timerStarted ? (
          <button onClick={startTimer} className="btn start-btn">Start</button>
        ) : (
          <p className="timer">Time: {time}s</p>
        )}

        <input
          type="number"
          placeholder="Enter your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="input-box"
        />

        <button className="btn submit-btn" onClick={handleSubmit} disabled={showResult}>
          Submit
        </button>

        {showResult && (
          <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? 'Correct!' : `Wrong! Answer is ${question.answer}`}
          </div>
        )}

        <button className="btn next-btn" onClick={handleNext}>
          Next Question
        </button>

        <div className="score-box">Score: {score}</div>
      </div>
    </div>
  );
};

export default SubtractionQuizPage;
