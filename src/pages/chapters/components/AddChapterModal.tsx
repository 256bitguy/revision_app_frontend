import { useState } from 'react';
import './AddChapterModal.css';
import { addChapter } from '../slice/chapterAPI';
import { useAppDispatch } from '../../../hooks/hooks';
import { useParams } from 'react-router-dom';

interface AddChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (chapter: { name: string; ranking: number }) => void;
}
interface ChapterInput {
  name: string;
  ranking: number;
  subject: string;
}

const AddChapterModal = ({ isOpen, onClose }: AddChapterModalProps) => {
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState<number>();
  const dispatch = useAppDispatch();

const {subjectId} = useParams(); 
console.log(subjectId)
 
  
  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name || !ranking) return alert('Please fill both fields');
       const chapter :ChapterInput = {
         name : name,
         ranking : ranking,
         subject :String(subjectId)   
       };
       await dispatch(addChapter(chapter));
    setName('');
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
          onChange={(e) => setRanking(Number(e.target.value))}
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
