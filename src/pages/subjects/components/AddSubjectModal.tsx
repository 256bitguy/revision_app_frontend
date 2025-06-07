import { useState } from 'react';
import './AddSubjectModal.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { addSubject } from '../slices/subjectAPI';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}
interface SubjectInput {
  name: string;
  rank: number;
  author: string;
}

const AddSubjectModal = ({ isOpen, onClose,   }: AddSubjectModalProps) => {
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState<number>();
  const dispatch = useAppDispatch();
const userId = useAppSelector((state)=>state.auth.user._id);
// console.log(userId);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name || !ranking) return alert("Please fill both fields");
    const subject :SubjectInput = {
      name : name,
      rank : ranking,
      author :userId    
    };
    await dispatch(addSubject(subject));
 
    setName('');
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
          onChange={(e) => setRanking(Number(e.target.value))}
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
