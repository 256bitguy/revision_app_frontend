import { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import "./AttemptVocabularyPage.css";

const AttemptVocabularyPage = () => {
  const vocabList = useAppSelector((state) => state.vocabulary.vocabulary);
  const loading = useAppSelector((state) => state.vocabulary.loading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSynonym, setSelectedSynonym] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Timer states
  const [customTime, setCustomTime] = useState(30); // default
  const [timeLeft, setTimeLeft] = useState(customTime);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  const current = vocabList[currentIndex];

  const shuffledOptions = [
    ...(current?.synonyms || []),
    ...(current?.antonyms || []),
  ].sort();

  // Timer effect
  useEffect(() => {
    let timer =0
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setShowTimeUpModal(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const startTimer = (seconds: number) => {
    setCustomTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
    setShowTimeUpModal(false);
  };

  const handleNext = () => {
    setSelectedSynonym(null);
    setShowAnswer(false);
    setShowTimeUpModal(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      startTimer(customTime);
    }
  };

  const handlePrevious = () => {
    setSelectedSynonym(null);
    setShowAnswer(false);
    setShowTimeUpModal(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      startTimer(customTime);
    }
  };

  if (loading) return <div className="loading">Loading vocabulary...</div>;
  if (!loading && vocabList.length === 0)
    return <div className="loading">No vocabulary available</div>;

  return (
    <div className="attempt-page">
      <div className="question-boxing">
        <div className="question-counting">
          Vocabulary {currentIndex + 1} / {vocabList.length}
        </div>

        {/* Timer UI */}
        <div className="timer-sections">
          <span>Set Time:</span>
          <div className="timer-buttons">
            <button onClick={() => startTimer(10)}>10s</button>
            <button onClick={() => startTimer(20)}>20s</button>
            <button onClick={() => startTimer(30)}>30s</button>
            <button onClick={() => startTimer(60)}>1 min</button>
          </div>
          <div
            className={`timer-displays ${
              timeLeft <= 10 ? "timer-warnings" : ""
            }`}
          >
            ⏳ {timeLeft}s
          </div>
        </div>

        <h2>{current?.word}</h2>
        <p>
          <strong>Explanation:</strong> {current?.explanation}
        </p>

        <div className="practice-section">
          <h3>🔍 Choose the correct synonym:</h3>
          <div className="option-list">
            {shuffledOptions.map((opt, idx) => {
              const isCorrect = current.synonyms.includes(opt);
              const isSelected = selectedSynonym === opt;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSynonym(opt)}
                  className={`option-button ${
                    isSelected ? (isCorrect ? "correct" : "incorrect") : ""
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="practice-section">
          <h3>✍️ Fill in the blank:</h3>
          {current?.fillingBlanks?.map((blank, idx) => (
            <div key={idx} className="blank-group">
              <p>
                <strong>Q:</strong> {blank.question}
              </p>

              {showAnswer && (
                <div className="answer-boxing">
                  <strong>Correct Word:</strong> {blank.word}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="toggle-answer"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            ⬅️ Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === vocabList.length - 1}
          >
            Next ➡️
          </button>
        </div>
      </div>

      {/* Time Up Modal */}
      {showTimeUpModal && (
        <div className="modal-overlays">
          <div className="modals">
            <h2>⏰ Time’s Up!</h2>
            <button onClick={handleNext}>Go to Next Question ➡️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptVocabularyPage;
