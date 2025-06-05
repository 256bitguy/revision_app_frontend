import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddChapterModal from '../components/AddChapterModal';
import './ChapterPage.css';

const ChaptersPage = () => {
  const { subjectName } = useParams<{ subjectName: string }>();
  const [chapters, setChapters] = useState<{ name: string; ranking: number }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`chapters_${subjectName}`) || '[]');
    setChapters(saved);
  }, [modalOpen, subjectName]);

  const handleAdd = (chapter: { name: string; ranking: number }) => {
    const updated = [...chapters, chapter];
    setChapters(updated);
    localStorage.setItem(`chapters_${subjectName}`, JSON.stringify(updated));
  };

  return (
    <div className="chapters-page">
      <h2 className="heading">Chapters for "<span>{subjectName}</span>"</h2>

      {chapters.length === 0 ? (
        <p className="no-chapters">No chapters added yet.</p>
      ) : (
        <ul className="chapter-list">
          {chapters
            .sort((a, b) => a.ranking - b.ranking)
            .map((chap, i) => (
              <li key={i} className="chapter-item">
                <Link
        to={`/subjects/${subjectName}/chapters/${chap.name}`}
        style={{ textDecoration: 'none', color: 'teal', fontWeight: '500' }}
      >
                <strong>{chap.name}</strong> <span className="rank">(Rank {chap.ranking})</span>
              </Link></li>
            ))}
        </ul>
      )}

      <button className="add-btn" onClick={() => setModalOpen(true)}>
        + ADD
      </button>

      <AddChapterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default ChaptersPage;
