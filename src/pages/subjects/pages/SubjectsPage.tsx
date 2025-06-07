import { useEffect, useState } from 'react';
import AddSubjectModal from '../components/AddSubjectModal';
import './SubjectPage.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchSubjectsByUser } from '../slices/subjectAPI';
import { Link } from 'react-router-dom';

  
const SubjectsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?._id);
  const subject = useAppSelector(state => state.subjects.subjects);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSubjectsByUser(userId));
    }
   }, [dispatch, userId, modalOpen]); // Re-fetch subjects when modal closes (subject might be added)

  // const handleAdd = () => {
  
  // };

  return (
    <div className="subjects-container">
      <h2 className="subjects-title">Your Subjects</h2>

    
{subject.length === 0 ? (
        <p className="subjects-empty">No subjects added yet.</p>
      ) : (
        <ul className="subjects-list">
          {subject.map((subj, i) => (
            <Link to={`/subjects/${encodeURIComponent(subj.name)}`}
             style={{ textDecoration: 'none', color: 'teal', fontWeight: '500' }}>
            <li key={i} className="subject-item">
                       

               <strong>{subj.name}</strong> 
              <span className=" subject-rank">Rank: {subj.rank}</span>
            </li>
            </Link>
          ))}
        </ul>
      )}

      <button className="add-subject-button" onClick={() => setModalOpen(true)}>
        + ADD
      </button>

      <AddSubjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
       />
    </div>
  );
};

export default SubjectsPage;

