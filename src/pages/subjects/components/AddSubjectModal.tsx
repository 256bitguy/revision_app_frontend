import { useState } from 'react';
import './AddSubjectModal.css';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subject: { name: string; ranking: number }) => void;
}

const AddSubjectModal = ({ isOpen, onClose, onSubmit }: AddSubjectModalProps) => {
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !ranking) return alert("Please fill both fields");
    onSubmit({ name, ranking: Number(ranking) });
    setName('');
    setRanking('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Subject</h2>
        <input
          type="text"
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal-input"
        />
        <input
          type="number"
          placeholder="Ranking"
          value={ranking}
          onChange={(e) => setRanking(e.target.value)}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button className="btn-primary" onClick={handleSubmit}>Submit</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;
