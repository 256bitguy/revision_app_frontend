import React, { useState, useEffect, useRef } from 'react';
import './PercentageFractionConverterApp.css';

const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateFraction = () => {
  const numerator = getRandom(1, 9);
  const denominator = getRandom(numerator + 1, 15);
  return { numerator, denominator };
};

const calculatePercentage = (numerator: number, denominator: number): number =>
  parseFloat(((numerator / denominator) * 100).toFixed(2));

const generateOptions = (correct: number) => {
  const options = new Set<number>();
  options.add(correct);
  while (options.size < 4) {
    const randomOffset = getRandom(-20, 20);
    const val = parseFloat((correct + randomOffset).toFixed(2));
    if (val > 0 && val < 100) options.add(val);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};

const FractionQuiz: React.FC = () => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(2);
  const [useCustom, setUseCustom] = useState(true);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateQuestion = () => {
    let n = numerator;
    let d = denominator;

    if (!useCustom) {
      const fraction = generateFraction();
      n = fraction.numerator;
      d = fraction.denominator;
      setNumerator(n);
      setDenominator(d);
    }

    const correct = calculatePercentage(n, d);
    setCorrectAnswer(correct);
    setQuestion(`${n}/${d}`);
    setOptions(generateOptions(correct));
    setSelected(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const handleOptionClick = (val: number) => {
    if (timeLeft === 0) return;
    setSelected(val);
    setShowResult(true);
    clearInterval(timerRef.current!);
  };

  const startQuiz = () => {
    setStarted(true);
    generateQuestion();
  };

  useEffect(() => {
    if (started && !showResult && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [started, showResult]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current!);
      setShowResult(true);
    }
  }, [timeLeft]);

  return (
    <div className="fraction-quiz-container">
      <div className="left-panel">
        <h2>Customize Fraction</h2>

        <div className="input-group">
          <label>Numerator:</label>
          <div className="controls">
            <button onClick={() => setNumerator((prev) => Math.max(1, prev - 1))}>-</button>
            <input
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(Number(e.target.value))}
              min={1}
            />
            <button onClick={() => setNumerator((prev) => prev + 1)}>+</button>
          </div>
        </div>

        <div className="input-group">
          <label>Denominator:</label>
          <div className="controls">
            <button onClick={() => setDenominator((prev) => Math.max(numerator + 1, prev - 1))}>-</button>
            <input
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(Number(e.target.value))}
              min={numerator + 1}
            />
            <button onClick={() => setDenominator((prev) => prev + 1)}>+</button>
          </div>
        </div>

        <div className="input-group toggle-mode">
          <label>
            <input
              type="checkbox"
              checked={useCustom}
              onChange={() => setUseCustom(!useCustom)}
            />
            Use Custom Fraction
          </label>
        </div>

        <button className="start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>

      <div className="right-panel">
        {started && (
          <>
            <div className="quiz-header">
              <h2>What is {question} as a percentage?</h2>
              <div className={`timer ${timeLeft <= 5 ? 'urgent' : ''}`}>Time Left: {timeLeft}s</div>
            </div>

            <div className="options">
              {options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${
                    showResult && opt === correctAnswer
                      ? 'correct'
                      : showResult && opt === selected
                      ? 'wrong'
                      : ''
                  }`}
                  onClick={() => handleOptionClick(opt)}
                  disabled={showResult}
                >
                  {opt}%
                </button>
              ))}
            </div>

            {showResult && (
              <button className="next-btn" onClick={generateQuestion}>
                Next Question
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FractionQuiz;
