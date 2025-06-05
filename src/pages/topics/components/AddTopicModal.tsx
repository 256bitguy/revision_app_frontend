import { useState } from 'react';
import './AddTopicsModal.css';

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (topic: { name: string; ranking: number }) => void;
}

const AddTopicModal = ({ isOpen, onClose, onSubmit }: AddTopicModalProps) => {
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !ranking) {
      alert("Please fill in both fields.");
      return;
    }
    onSubmit({ name: name.trim(), ranking: Number(ranking) });
    setName('');
    setRanking('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Add Topic</h2>
        <input
          type="text"
          placeholder="Topic name"
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
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddTopicModal;
