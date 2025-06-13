import { useState } from "react";
import "./AddQuestionModal.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addQuestion } from "../slices/questionAPI";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const AddQuestionModal = ({ isOpen, onClose }: AddQuestionModalProps) => {
  const { topicId } = useParams();
   const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [type, setType] = useState<
    "single" | "multiple" | "assertion-reason" | "statement-based"
  >("single");
  const [statements, setStatements] = useState([{ order: "1", statement: "" }]);
  const [options, setOptions] = useState([{ order: "1", statement: "" }]);
  const [correctOption, setCorrectOption] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(2);
  const [currentOptionOrder, setCurrentOptionOrder] = useState(2);
  const rankingNumber = useAppSelector((state)=> state.questions.questions).length
  const addOption = () => {
    setOptions((prev) => [
      ...prev,
      { order: String(currentOptionOrder), statement: "" },
    ]);
    setCurrentOptionOrder((prev) => prev + 1);
  };

  const addStatement = () => {
    setStatements((prev) => [
      ...prev,
      { order: String(currentOrder), statement: "" },
    ]);
    setCurrentOrder((prev) => prev + 1);
  };
  const dispatch = useAppDispatch();
  if (!isOpen) return null;
  const getFilteredStatements = () => {
    return statements.filter((item) => item.statement.trim() !== "");
  };
  const statement = getFilteredStatements();

  const handleSubmit =   () => {
    const questionF = {
      ranking: rankingNumber,
      question: question,
      topicId: topicId as string,
      statements: statement,
      options: options,
      correctOption: correctOption-1,
      answer: answer,
      type: type,
    };
      dispatch(addQuestion(questionF));
    onClose();

    setQuestion("");
    setAnswer("");
    setType("single");
    setCurrentOrder(2);
    setCurrentOptionOrder(2);
    setStatements([{ order: "1", statement: "" }]);
    setOptions([{ order: "1", statement: "" }]);
    setCorrectOption(0)
  };

  const updateList = (
    list: any[],
    setList: any,
    i: number,
    value: string,
    key: string
  ) => {
    const newList = [...list];
    newList[i][key] = value;
    setList(newList);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add Question</h2>

        

        <textarea
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value as
                | "single"
                | "multiple"
                | "assertion-reason"
                | "statement-based"
            )
          }
        >
          <option value="single">Single</option>
          <option value="multiple">Multiple</option>
          <option value="assertion-reason">Assertion-Reason</option>
          <option value="statement-based">Statement-Based</option>
        </select>

        <h4>Statements</h4>
        {statements.map((s, i) => (
          <div className="statement-group" key={i}>
            <input
              placeholder="Order"
              value={s.order}
              onChange={(e) =>
                updateList(
                  statements,
                  setStatements,
                  i,
                  e.target.value,
                  "order"
                )
              }
            />
            <input
              placeholder="Statement"
              value={s.statement}
              onChange={(e) =>
                updateList(
                  statements,
                  setStatements,
                  i,
                  e.target.value,
                  "statement"
                )
              }
            />
          </div>
        ))}
        <button onClick={addStatement}>+ Add Statement</button>

        <h4>Options</h4>
        {options.map((o, i) => (
          <div className="option-group" key={i}>
            <input
              placeholder="Order"
              value={o.order}
              onChange={(e) =>
                updateList(options, setOptions, i, e.target.value, "order")
              }
            />
            <input
              placeholder="Statement"
              value={o.statement}
              onChange={(e) =>
                updateList(options, setOptions, i, e.target.value, "statement")
              }
            />
          </div>
        ))}
        <button onClick={addOption}>+ Add Option</button>

        <input
          placeholder="Correct Option(s) comma-separated (e.g., 1,2)"
          value={correctOption}
          onChange={(e) => setCorrectOption(Number(e.target.value))}
        />

        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddQuestionModal;
