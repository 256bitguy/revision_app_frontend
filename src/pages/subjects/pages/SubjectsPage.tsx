import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddSubjectModal from '../components/AddSubjectModal';
import './SubjectPage.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchSubjectsByUser } from '../slices/subjectAPI';

const SubjectsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?._id);
  const subjects = useAppSelector(state => state.subjects.subjects);
  const loading = useAppSelector(state => state.subjects.loading); // Optional: if available

  useEffect(() => {
    if (userId) {
      dispatch(fetchSubjectsByUser(userId));
    }
  }, [dispatch, userId, modalOpen]);

  return (
    <div className="subjects-container">
      <h2 className="subjects-title">Your Subjects</h2>

      {loading ? (
        <p className="subjects-loading">Loading...</p>
      ) : subjects.length === 0 ? (
        <p className="subjects-empty">No subjects added yet.</p>
      ) : (
        <ul className="subjects-list fade-in">
          {subjects.map((subj) => (
            <li key={subj._id} className="subject-item">
              <Link
                to={`/subjects/${encodeURIComponent(subj._id)}/${subj.name}`}
                style={{ textDecoration: 'none', color: 'teal', fontWeight: '500' }}
              >
                <strong>{subj.name}</strong>
                <span className="subject-rank">Rank: {subj.rank}</span>
              </Link>
            </li>
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
