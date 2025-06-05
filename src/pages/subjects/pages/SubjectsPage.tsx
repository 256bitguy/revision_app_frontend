import { useEffect, useState } from 'react';
import AddSubjectModal from '../components/AddSubjectModal';
import './SubjectPage.css';
import { Link } from 'react-router-dom';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<{ name: string; ranking: number }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('subjects') || '[]');
    setSubjects(saved);
  }, [modalOpen]);

  const handleAdd = (subject: { name: string; ranking: number }) => {
    const updated = [...subjects, subject];
    setSubjects(updated);
    localStorage.setItem('subjects', JSON.stringify(updated));
  };

  return (
    <div className="subjects-container">
      <h2 className="subjects-title">Your Subjects</h2>
      {subjects.length === 0 ? (
        <p className="subjects-empty">No subjects added yet.</p>
      ) : (
        <ul className="subjects-list">
          {subjects.map((subj, i) => (
            <Link to={`/subjects/${encodeURIComponent(subj.name)}`}
             style={{ textDecoration: 'none', color: 'teal', fontWeight: '500' }}>
            <li key={i} className="subject-item">
                       

               <strong>{subj.name}</strong> 
              <span className=" subject-rank">Rank: {subj.ranking}</span>
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
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default SubjectsPage;
