import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSubjectModal from '../components/AddSubjectModal';
import './HomePage.css';

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (subject: { name: string; ranking: number }) => {
    const existing = JSON.parse(localStorage.getItem('subjects') || '[]');
    localStorage.setItem('subjects', JSON.stringify([...existing, subject]));
    navigate('/subjects');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Subject Manager</h1>
      <button className="home-button" onClick={() => setModalOpen(true)}>
        Let's start by adding a subject
      </button>
      <AddSubjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
