import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddQuestionModal from "../components/AddQuestionModal";
import "./QuestionListPage.css";

const QuestionListPage = () => {
  const { subjectName, chapterName, topicName } = useParams();
  const storageKey = `questions_${subjectName}_${chapterName}_${topicName}`;

  const [questions, setQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"notes" | "practice">("practice");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setQuestions(saved);
  }, [modalOpen, storageKey]);

  const handleAdd = (data: any) => {
    const updated = [...questions, data];
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setQuestions(updated);
  };

  return (
    <div className="question-page">
      <h2>Questions for "{topicName}"</h2>

      <div className="tab-toggle">
        <button
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
        >
          Notes / Story
        </button>
        <Link
          to={`/subjects/${subjectName}/${chapterName}/topics/${topicName}/attempt`}
        >
          <button
            className={activeTab === "practice" ? "active" : ""}
            onClick={() => setActiveTab("practice")}
          >
            Practice
          </button>
        </Link>
      </div>

      {activeTab === "notes" ? (
        <div className="notes-placeholder">📝 Notes feature coming soon...</div>
      ) : (
        <ul className="question-list">
          {questions.map((q, i) => (
            <li key={i} className="question-item">
              {q.question}
            </li>
          ))}
        </ul>
      )}

      <button
        className="add-question-button"
        onClick={() => setModalOpen(true)}
      >
        + ADD
      </button>

      <AddQuestionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default QuestionListPage;
