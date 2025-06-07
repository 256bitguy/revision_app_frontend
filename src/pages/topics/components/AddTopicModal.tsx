import { useState } from 'react';
import './AddTopicsModal.css';
import { useAppDispatch } from '../../../hooks/hooks';
import { addChapter } from '../../chapters/slice/chapterAPI';
import { useParams } from 'react-router-dom';
import { addTopic } from '../slice/topicAPI';

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (topic: { name: string; ranking: number }) => void;
}

interface TopicInput {
  name: string;
  ranking: number;
  chapter: string;
}

const AddTopicModal = ({ isOpen, onClose }: AddTopicModalProps) => {
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState<number>();
  const dispatch = useAppDispatch();

const {chapterId} = useParams(); 
// console.log(params);/

 
  // const decodedId = chapterId ? decodeURIComponent(chapterId) : '';
  const handleSubmit = async () => {
    if (!name.trim() || !ranking) {
      alert("Please fill in both fields.");
      return;
    }
       const Topic :TopicInput = {
         name : name,
         ranking : ranking,
         chapter :String(chapterId)   
       };
       await dispatch(addTopic(Topic));
    setName('');
 
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
          onChange={(e) => setRanking(Number(e.target.value))}
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
