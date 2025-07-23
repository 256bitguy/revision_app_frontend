import React, { useState } from 'react';
import './Alphabet.css';

type QuizType = 'month-order' | 'month-even-odd' | 'alphabet-order';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Alphabet: React.FC = () => {
  const [quizType, setQuizType] = useState<QuizType>('month-order');
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correct, setCorrect] = useState('');
  const [selected, setSelected] = useState('');
  const [showResult, setShowResult] = useState(false);

  const generateQuestion = () => {
    setSelected('');
    setShowResult(false);

    if (quizType === 'month-order') {
      const idx = Math.floor(Math.random() * 12);
      setQuestion(`What is the order of ${months[idx]}?`);
      setCorrect((idx + 1).toString());
      setOptions(
        shuffle([
          (idx + 1).toString(),
          ((idx + 2) % 12 + 1).toString(),
          ((idx + 4) % 12 + 1).toString(),
          ((idx + 7) % 12 + 1).toString()
        ])
      );
    } else if (quizType === 'month-even-odd') {
      const idx = Math.floor(Math.random() * 12);
      const evenOdd = (idx + 1) % 2 === 0 ? 'Even' : 'Odd';
      setQuestion(`Is ${months[idx]} an Even or Odd month?`);
      setCorrect(evenOdd);
      setOptions(shuffle(['Even', 'Odd']));
    } else if (quizType === 'alphabet-order') {
      const idx = Math.floor(Math.random() * 26);
      setQuestion(`What is the position of letter "${alphabets[idx]}"?`);
      setCorrect((idx + 1).toString());
      setOptions(
        shuffle([
          (idx + 1).toString(),
          ((idx + 2) % 26 + 1).toString(),
          ((idx + 4) % 26 + 1).toString(),
          ((idx + 7) % 26 + 1).toString()
        ])
      );
    }
  };

  const handleAnswer = (option: string) => {
    setSelected(option);
    setShowResult(true);
    if (option === correct) {
      setScore(score + 1);
    }
  };

  const shuffle = (arr: string[]) => arr.sort(() => 0.5 - Math.random());

  return (
    <div className="quiz-container">
      <h1>🧠 Matching Quiz</h1>

      <div className="selector">
        <label>Choose Quiz Type: </label>
        <select value={quizType} onChange={(e) => setQuizType(e.target.value as QuizType)}>
          <option value="month-order">Month to Order</option>
          <option value="month-even-odd">Even/Odd Month</option>
          <option value="alphabet-order">Alphabet to Order</option>
        </select>
        <button onClick={generateQuestion}>Generate Question</button>
      </div>

      {question && (
        <div className="question-block">
          <h2>{question}</h2>
          <div className="options">
            {options.map((opt) => (
              <button
                key={opt}
                className={`option ${selected === opt ? 'selected' : ''}`}
                onClick={() => handleAnswer(opt)}
                disabled={showResult}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {showResult && (
        <div className={`result ${selected === correct ? 'correct' : 'wrong'}`}>
          {selected === correct ? '✅ Correct!' : `❌ Wrong! Correct Answer: ${correct}`}
        </div>
      )}

      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Alphabet;
