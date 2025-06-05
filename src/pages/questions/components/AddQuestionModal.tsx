import { useState } from 'react';
import './AddQuestionModal.css';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddQuestionModal = ({ isOpen, onClose, onSubmit }: AddQuestionModalProps) => {
  const [ranking, setRanking] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState('single');
  const [statements, setStatements] = useState([{ order: '1', statement: '' }]);
  const [options, setOptions] = useState([{ order: '1', statement: '' }]);
  const [correctOption, setCorrectOption] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const correct = correctOption.split(',').map((x) => parseInt(x.trim()));
    onSubmit({
      ranking: parseInt(ranking),
      question,
      answer,
      type,
      statements,
      options,
      correctOption: correct,
    });
    onClose();
    // Reset
    setRanking('');
    setQuestion('');
    setAnswer('');
    setType('single');
    setStatements([{ order: '1', statement: '' }]);
    setOptions([{ order: '1', statement: '' }]);
    setCorrectOption('');
  };

  const updateList = (list: any[], setList: any, i: number, value: string, key: string) => {
    const newList = [...list];
    newList[i][key] = value;
    setList(newList);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add Question</h2>

        <input
          placeholder="Ranking"
          value={ranking}
          onChange={(e) => setRanking(e.target.value)}
        />

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

        <select value={type} onChange={(e) => setType(e.target.value)}>
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
              onChange={(e) => updateList(statements, setStatements, i, e.target.value, 'order')}
            />
            <input
              placeholder="Statement"
              value={s.statement}
              onChange={(e) => updateList(statements, setStatements, i, e.target.value, 'statement')}
            />
          </div>
        ))}
        <button onClick={() => setStatements([...statements, { order: '', statement: '' }])}>
          + Add Statement
        </button>

        <h4>Options</h4>
        {options.map((o, i) => (
          <div className="option-group" key={i}>
            <input
              placeholder="Order"
              value={o.order}
              onChange={(e) => updateList(options, setOptions, i, e.target.value, 'order')}
            />
            <input
              placeholder="Statement"
              value={o.statement}
              onChange={(e) => updateList(options, setOptions, i, e.target.value, 'statement')}
            />
          </div>
        ))}
        <button onClick={() => setOptions([...options, { order: '', statement: '' }])}>
          + Add Option
        </button>

        <input
          placeholder="Correct Option(s) comma-separated (e.g., 1,2)"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        />

        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddQuestionModal;
