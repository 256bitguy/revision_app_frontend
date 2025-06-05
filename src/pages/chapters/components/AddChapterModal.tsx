import { useState } from 'react';
import './AddChapterModal.css';

interface AddChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (chapter: { name: string; ranking: number }) => void;
}

const AddChapterModal = ({ isOpen, onClose, onSubmit }: AddChapterModalProps) => {
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !ranking) return alert('Please fill both fields');
    onSubmit({ name, ranking: Number(ranking) });
    setName('');
    setRanking('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Chapter</h2>
        <input
          type="text"
          placeholder="Chapter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ranking"
          value={ranking}
          onChange={(e) => setRanking(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddChapterModal;
