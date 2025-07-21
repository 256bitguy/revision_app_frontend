import React, { useState, useEffect } from 'react';
import './AdditionQuiz.css';

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateQuestion = () => {
  const numCount = getRandomInt(2, 5);
  const digits = getRandomInt(2, 3);
  const min = digits === 2 ? 10 : 100;
  const max = digits === 2 ? 99 : 999;

  const numbers = Array.from({ length: numCount }, () => getRandomInt(min, max));
  const answer = numbers.reduce((acc, val) => acc + val, 0);
  return { numbers, answer };
};

const AdditionQuiz: React.FC = () => {
  const [question, setQuestion] = useState<{ numbers: number[]; answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const startQuiz = () => {
    setQuestion(generateQuestion());
    setUserAnswer('');
    setResult('');
    setTimeLeft(30);
    setTimerActive(true);
    setScore(0);
    setAttempts(0);
  };

  const nextQuestion = () => {
    setQuestion(generateQuestion());
    setUserAnswer('');
    setResult('');
    setTimeLeft(30);
    setTimerActive(true);
  };

  const handleSubmit = () => {
    if (!question) return;
    const isCorrect = parseInt(userAnswer) === question.answer;
    setResult(isCorrect ? '✅ Correct!' : `❌ Wrong! Correct answer: ${question.answer}`);
    if (isCorrect) setScore((prev) => prev + 1);
    setAttempts((prev) => prev + 1);
    setTimerActive(false);
  };

  useEffect(() => {
    if (!timerActive || timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 1) {
      handleSubmit();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Addition Quiz</h1>

      {!timerActive && !question ? (
        <button className="quiz-button" onClick={startQuiz}>Start Quiz</button>
      ) : (
        <>
          <div className="quiz-score">Score: {score} / {attempts}</div>
          <div className="quiz-timer">Time Left: {timeLeft}s</div>

          <div className="quiz-question">
            {question?.numbers.map((num, i) => (
              <span key={i}>
                {num}
                {i < question.numbers.length - 1 ? ' + ' : ' = '}
              </span>
            ))}
          </div>

          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="quiz-input"
            placeholder="Enter your answer"
            disabled={!timerActive}
          />

          {!result && (
            <button className="quiz-button" onClick={handleSubmit} disabled={!userAnswer}>
              Submit
            </button>
          )}

          {result && (
            <>
              <div className="quiz-result">{result}</div>
              <button className="quiz-button" onClick={nextQuestion}>Next Question</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdditionQuiz;
