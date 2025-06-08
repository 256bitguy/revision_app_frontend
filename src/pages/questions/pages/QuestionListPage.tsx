import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddQuestionModal from "../components/AddQuestionModal";
import "./QuestionListPage.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchQuestionsByTopic } from "../slices/questionAPI";

const QuestionListPage = () => {
  const { topicName,topicId } = useParams();
  const dispatch = useAppDispatch(); 
  // const [questions, setQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"notes" | "practice">("practice");
  const [modalOpen, setModalOpen] = useState(false);
  const questions = useAppSelector((state)=>state.questions.questions);
  useEffect(() => {
const callFun = async()=>{
      if(topicId){
       await dispatch(fetchQuestionsByTopic(topicId));
     }
}
callFun();
   }, [modalOpen, topicId]);

 
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
          to={`/topics/${topicId}/attempt`}
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
       />
    </div>
  );
};

export default QuestionListPage;
