import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddTopicModal from '../components/AddTopicModal';
import './TopicsPage.css';

const TopicsPage = () => {
  const { subjectName, chapterName } = useParams();
  const [topics, setTopics] = useState<{ name: string; ranking: number }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const storageKey = `topics_${subjectName}_${chapterName}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setTopics(saved);
  }, [modalOpen, storageKey]);

  const handleAdd = (topic: { name: string; ranking: number }) => {
    const updated = [...topics, topic];
    setTopics(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div className="topics-page">
      <h2>Topics for "{chapterName}" in "{subjectName}"</h2>
      <ul>
        {topics.map((t, i) => (
          <li key={i}>{t.name}</li>
        ))}
      </ul>

      <button
        className="add-topic-button"
        onClick={() => setModalOpen(true)}
      >
        + ADD
      </button>

      <AddTopicModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
};

export default TopicsPage;
