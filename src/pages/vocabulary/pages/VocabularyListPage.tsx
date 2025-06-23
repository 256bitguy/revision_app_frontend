import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchVocabularyByTopic } from "../slices/vocabAPI";
import AddVocabularyModal from "../components/AddVocabularyModal";
import "./VocabularyListPage.css";

const VocabularyListPage = () => {
  const { topicId, topicName } = useParams();
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const vocabulary = useAppSelector((state) => state.vocabulary.vocabulary);

  useEffect(() => {
    if (topicId) {
      dispatch(fetchVocabularyByTopic(topicId));
    }
  }, [dispatch, topicId, modalOpen]);

  return (
    <div className="vocabulary-page">
      <h2>Vocabulary for "{topicName}"</h2>
      <Link to={`/topics/vocabulary/practice`}>
        <button className="add-vocabulary-button">Practice</button>
      </Link>
      <button
        className="add-vocabulary-button"
        onClick={() => setModalOpen(true)}
      >
        + ADD
      </button>
      <ul className="vocabulary-list">
        {vocabulary.map((vocab) => (
          <li key={vocab._id} className="vocabulary-item">
            <h3>{vocab.word}</h3>
            <p>
              <strong>Explanation:</strong> {vocab.explanation}
            </p>
            <p>
              <strong>Synonyms:</strong> {vocab.synonyms.join(", ")}
            </p>
            <p>
              <strong>Antonyms:</strong> {vocab.antonyms.join(", ")}
            </p>
            <div className="fill-blanks">
              <strong>Fill in the Blanks:</strong>
              <ul>
                {vocab.fillingBlanks.map((fb, idx) => (
                  <li key={idx}>{fb.question}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="add-vocabulary-button"
        onClick={() => setModalOpen(true)}
      >
        + ADD
      </button>

      <AddVocabularyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default VocabularyListPage;
