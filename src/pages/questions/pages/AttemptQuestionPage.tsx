import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AttemptQuestionsPage.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchQuestionsByTopic } from "../slices/questionAPI";

const AttemptQuestionPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.questions);
  const loading = useAppSelector((state) => state.questions.loading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [timerDuration, setTimerDuration] = useState<number | null>(null); // seconds
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  useEffect(() => {
    if (topicId) {
      dispatch(fetchQuestionsByTopic(topicId));
    }
  }, [dispatch, topicId]);

  const current = questions[currentIndex];
  const isCorrect =
    selectedOption !== null && current?.correctOption?.includes(selectedOption);

  // Timer countdown logic
  useEffect(() => {
    let interval = 0;

    if (timerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      clearInterval(interval);
      setTimerActive(false);
      setShowTimeUpModal(true);
    }

    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  // Restart timer on each new question
  useEffect(() => {
    if (timerDuration !== null && questions.length > 0) {
      setTimeLeft(timerDuration);
      setTimerActive(true);
    }
  }, [currentIndex, timerDuration]);

  const handleTimerStart = (seconds: number) => {
    setTimerDuration(seconds);
    setTimeLeft(seconds);
    setTimerActive(true);
    setShowTimeUpModal(false);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setTimerActive(false);
    setTimeLeft(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setTimerActive(false);
    setTimeLeft(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (!loading && questions.length === 0) {
    return <div className="loading">No questions available</div>;
  }

  return (
    <div className="attempt-page">
      <div className="question-box">
        <div className="question-count">
          Question {currentIndex + 1} / {questions.length}
        </div>

        <div className="timer-buttons">
          <button onClick={() => handleTimerStart(10)}>⏱ 10 sec</button>
          <button onClick={() => handleTimerStart(20)}>⏱ 20 sec</button>
          <button onClick={() => handleTimerStart(30)}>⏱ 30 sec</button>
          <button onClick={() => handleTimerStart(60)}>⏱ 1 Min</button>
          <button onClick={() => handleTimerStart(180)}>⏱ 3 Min</button>
          <button onClick={() => handleTimerStart(300)}>⏱ 5 Min</button>
        </div>

        {timerActive && timeLeft !== null && (
          <div className="countdown-timer">
            ⏳ Time Left: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        )}

        {current?.statements?.length > 0 && (
          <div className="statement-section">
            {current.statements.map((s, i) => (
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
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
              >
                <strong>{opt.order}.</strong> {opt.statement}
              </button>
            ))}
          </div>
        )}

        <button
          className="toggle-answer"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        {showAnswer && (
          <div className="answer-box">
            {current?.correctOption?.length > 0 && (
              <>
                <strong>Correct Option(s):</strong>{" "}
                {current.correctOption
                  .map((i) => current.options[i]?.order)
                  .join(", ")}
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
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next ➡️
          </button>
        </div>
      </div>

      {showTimeUpModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>⏰ Time's Up!</h3>
            <p>Your time for this question has ended.</p>
            <button
              onClick={() => {
                setShowTimeUpModal(false);
                handleNext();
              }}
            >
              Next Question ➡️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptQuestionPage;
