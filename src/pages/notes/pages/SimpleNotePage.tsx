import { useState } from "react";
import AddNoteModal from "../component/AddNoteModal"; // adjust path as needed
import "./SimpleNotePage.css";

const SimpleNotePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="simple-note-page">
      <h1>📝 My Notes</h1>
      <p>Click the button below to add a new note.</p>

      <button
        className="open-modal-button"
        onClick={() => setModalOpen(true)}
      >
        ➕ Add Note
      </button>

      {/* The Modal */}
      <AddNoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default SimpleNotePage;
