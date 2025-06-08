import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AttemptQuestionsPage.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchQuestionsByTopic } from '../slices/questionAPI';
  
const AttemptQuestionPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.questions);
  const loading = useAppSelector((state) => state.questions.loading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
console.log(questions,"asdlfhld")
  useEffect(() => {
    if (topicId) {
      dispatch(fetchQuestionsByTopic(topicId));
    }
  }, [dispatch, topicId]);

  const current = questions[currentIndex];
  const isCorrect = selectedOption !== null && current?.correctOption?.includes(selectedOption);

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  if (loading || questions.length === 0) return <div className="loading">Loading questions...</div>;

  return (
    <div className="attempt-page">
       <div className="question-box">
        <div className="question-count">
          Question {currentIndex + 1} / {questions.length}
        </div>

        {current?.statements?.length > 0 && (
          <div className="statement-section">
            {current.statements?.map((s, i) => (
              <p key={i}>
                <strong>{s.order}.</strong> {s.statement}
              </p>
            ))}
          </div>
        )}

        {current?.question && (
          <div className="question-text">
            <strong>Q:</strong> {current.question}
          </div>
        )}

        {current?.options?.length > 0 && (
          <div className="option-list">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`option-button ${
                  selectedOption === idx
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
              >
                <strong>{opt.order}.</strong> {opt.statement}
              </button>
            ))}
          </div>
        )}

        <button className="toggle-answer" onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>

        {showAnswer && (
          <div className="answer-box">
            {current?.correctOption?.length > 0 && (
              <>
                <strong>Correct Option(s):</strong>{' '}
                {current.correctOption.map((i) => current.options[i]?.order).join(', ')}
                <br />
              </>
            )}
            {current?.answer && (
              <>
                <strong>Explanation:</strong> {current.answer}
              </>
            )}
          </div>
        )}

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            ⬅️ Previous
          </button>
          <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
            Next ➡️
          </button>
        </div>
       </div> 
    </div>
  );
};

export default AttemptQuestionPage;
