import { useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import "./AttemptVocabularyPage.css"; // you can reuse existing styles

const AttemptVocabularyPage = () => {
  const vocabList = useAppSelector((state) => state.vocabulary.vocabulary);
  const loading = useAppSelector((state) => state.vocabulary.loading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSynonym, setSelectedSynonym] = useState<string | null>(null);
  const [selectedBlankWord, setSelectedBlankWord] = useState<string | null>(
    null
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const current = vocabList[currentIndex];

  const shuffledOptions = [
    ...(current?.synonyms || []),
    ...(current?.antonyms || []),
  ].sort();

  const handleNext = () => {
    setSelectedSynonym(null);
    setSelectedBlankWord(null);
    setShowAnswer(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setSelectedSynonym(null);
    setSelectedBlankWord(null);
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
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
    </div>
  );
};

export default AttemptVocabularyPage;
