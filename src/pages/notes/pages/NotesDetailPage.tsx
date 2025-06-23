import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchNotesByTopic } from "../slices/noteApi";
import "./NotesDetailsPage.css";
import type { Note } from "../slices/noteSlice"; // Adjust path as needed


const NotesDetailPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useAppDispatch();

const { notes, loading } = useAppSelector(
  (state): { notes: Note[]; loading: boolean } => state.notes
);

  useEffect(() => {
    if (topicId) {
      dispatch(fetchNotesByTopic(topicId));
    }
  }, [dispatch, topicId]);

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  if (!loading && notes.length === 0) {
    return <div className="loading">No notes available</div>;
  }

  return (
    <div className="notes-detail-page">
      <h1>Notes</h1>
      

      {notes.map((note, noteIndex) => (
        <div className="note-block" key={noteIndex}>
          <h2 className="note-heading">{note.heading}</h2>

          {note.subheadings.map((sub, i) => (
            <div key={i} className="subheading-block">
              <h3>{i + 1}. {sub.title}</h3>

              {sub.points.map((pt , j) => (
                <div key={j} className="point-row">
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
        </div>
      ))}

 

    </div>
  );
};

export default NotesDetailPage;
