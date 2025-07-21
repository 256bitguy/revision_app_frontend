import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchNotesByTopic } from "../slices/noteApi";
import type { Note } from "../slices/noteSlice";
import "./NotesDetailsPage.css";

const NotesDetailPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useAppDispatch();
  const { notes, loading } = useAppSelector(
    (state): { notes: Note[]; loading: boolean } => state.notes
  );

  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [readStatus, setReadStatus] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  useEffect(() => {
    if (topicId) {
      dispatch(fetchNotesByTopic(topicId));
    }
  }, [dispatch, topicId]);

  useEffect(() => {
    setReadStatus(new Array(notes.length).fill(false));
  }, [notes]);

  useEffect(() => {
    let interval=0;
    if (timerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    }

    if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      setShowTimerModal(true);
    }

    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  const startTimer = (duration: number) => {
    setTimeLeft(duration);
    setTimerActive(true);
    setShowTimerModal(false);
  };

  const closeModal = () => {
    setShowTimerModal(false);
  };

  const markAsRead = (index: number) => {
    const updatedStatus = [...readStatus];
    updatedStatus[index] = !updatedStatus[index];
    setReadStatus(updatedStatus);
  };

  const nextNote = () => {
    if (currentNoteIndex < notes.length - 1) {
      setCurrentNoteIndex(currentNoteIndex + 1);
      setTimerActive(false);
      setTimeLeft(null);
    }
  };

  const prevNote = () => {
    if (currentNoteIndex > 0) {
      setCurrentNoteIndex(currentNoteIndex - 1);
      setTimerActive(false);
      setTimeLeft(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  if (!loading && notes.length === 0) {
    return <div className="loading">No notes available</div>;
  }

  const note = notes[currentNoteIndex];

  return (
    <div className="notes-detail-page">
      <h1 className="notes-title">Notes Viewer</h1>

      <div className="note-card">
        <h2 className="note-heading">{note.heading}</h2>

        {note.subheadings.map((sub, i) => (
          <div key={i} className="subheading-block">
            <h3>{i + 1}. {sub.title}</h3>

            {sub.points.map((pt, j) => (
              <div key={j} className="point-row hover-grow">
                <strong>{pt.label}:</strong> {pt.explanation}
                {pt.example && (
                  <div className="example">📌 Example: {pt.example}</div>
                )}
              </div>
            ))}

            {sub.example && (
              <div className="sub-example">
                <strong>Overall Example:</strong> {sub.example}
              </div>
            )}

            {sub.linkingNote && (
              <div className="linking-note">
                🔗 <strong>Linking Note:</strong> {sub.linkingNote}
              </div>
            )}

            {sub.personalQuery && (
              <div className="query">
                ❓ <strong>Query:</strong> {sub.personalQuery}
              </div>
            )}

            {sub.queryExplanation && (
              <div className="query-explained">
                ✅ <strong>Explained:</strong> {sub.queryExplanation}
              </div>
            )}
          </div>
        ))}

        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={readStatus[currentNoteIndex]}
              onChange={() => markAsRead(currentNoteIndex)}
            />
            Mark as Read
          </label>

          <button onClick={() => startTimer(30)} className="timer-button">⏱ Start 30s Timer</button>
          {timerActive && timeLeft !== null && (
            <div className="timer-display">⏳ Time Left: {timeLeft}s</div>
          )}
        </div>
      </div>

      {showTimerModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>⏰ Timer Ended</h2>
            <p>Your time for this section is up.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <div className="navigation-controls">
        <button onClick={prevNote} disabled={currentNoteIndex === 0} className="nbutton">
          ◀ Previous
        </button>
        <span>
          {currentNoteIndex + 1} / {notes.length}
        </span>
        <button
          onClick={nextNote}
          disabled={currentNoteIndex === notes.length - 1} className="nbutton"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default NotesDetailPage;
