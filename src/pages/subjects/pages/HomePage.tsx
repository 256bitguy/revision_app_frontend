import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSubjectModal from '../components/AddSubjectModal';
import './HomePage.css';

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    
      navigate('/subjects');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Subject Manager</h1>
      <ul>
        <li>if you start a course, you can add ClASSES</li>
        <li>if you start a BOOK, you can add your book NAME</li>
        <li>if you start a Class, you can add Subjects</li>
        <li>if you start a Batch , you can add lectures</li>
        <li>Anything which you want to make notes for custom practice</li>
      </ul>
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
