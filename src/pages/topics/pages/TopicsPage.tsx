import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddTopicModal from '../components/AddTopicModal';
import './TopicsPage.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchTopicsByChapter } from '../slice/topicAPI';

const TopicsPage = () => {
  const { chapterName, chapterId } = useParams<{ chapterId: string; chapterName: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const topics = useAppSelector((state) => state.topics.topics);
  const loading = useAppSelector((state) => state.topics.loading);

  useEffect(() => {
    if (chapterId) {
      dispatch(fetchTopicsByChapter(chapterId));
    }
  }, [modalOpen, chapterName, dispatch]);

  return (
    <div className="topics-page">
      <h2 className="heading">{chapterName}</h2>

      {loading ? (
        <div className="loader">Loading topics...</div>
      ) : topics.length === 0 ? (
        <p className="no-topics">No topics added yet.</p>
      ) : (
        <div className="topic-card-container fade-in">
          {topics.map((t) => (
            <div key={t._id} className="topic-card">
              <h3>{t.name}</h3>
              <p>Ranking: {t.ranking}</p>
              <div className="chapter-date">
                Started on: {new Date(t.createdAt).toLocaleDateString()}
              </div>

              <div className="topic-actions">
                <Link to={`/topics/${t._id}/${t.name}`}>
                  <button className="topic-btn">📝 Create Questions</button>
                </Link>

                <Link to={`/topics/${t._id}/vocabulary/${t.name}`}>
                  <button className="topic-btn secondary">📖 Create Vocabulary</button>
                </Link>
                 <Link to={`/test-note/${t._id}`}>
                  <button className="topic-btn secondary">📖 Create Notes</button>
                </Link>
                 <Link to={`/notes/${t._id}`}>
                  <button className="topic-btn secondary">📖 See Notes</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="add-topic-button" onClick={() => setModalOpen(true)}>
        + ADD
      </button>

      <AddTopicModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TopicsPage;
