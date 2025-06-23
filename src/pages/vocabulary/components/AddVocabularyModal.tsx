import { useState } from "react";
import "./AddVocabularyModal.css";  
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/hooks";
import { addVocabulary } from "../slices/vocabAPI";

interface AddVocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddVocabularyModal = ({ isOpen, onClose }: AddVocabularyModalProps) => {
  const { topicId } = useParams();
  const dispatch = useAppDispatch();

  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([""]);
  const [antonyms, setAntonyms] = useState<string[]>([""]);
  const [fillingBlanks, setFillingBlanks] = useState([{ question: "", word: "" }]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!topicId) return;

    const cleanedBlanks = fillingBlanks.filter((fb) => fb.question.trim() && fb.word.trim());

    const newVocabulary = {
      word,
      topicId,
      explanation,
      synonyms: synonyms.filter((s) => s.trim()),
      antonyms: antonyms.filter((a) => a.trim()),
      fillingBlanks: cleanedBlanks,
    };

    dispatch(addVocabulary(newVocabulary));
    onClose();

    // Reset fields
    setWord("");
    setExplanation("");
    setSynonyms([""]);
    setAntonyms([""]);
    setFillingBlanks([{ question: "", word: "" }]);
  };

  const updateList = (list: string[], setList: (value: string[]) => void, index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const updateBlanks = (index: number, key: "question" | "word", value: string) => {
    const newBlanks = [...fillingBlanks];
    newBlanks[index][key] = value;
    setFillingBlanks(newBlanks);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add Vocabulary</h2>

        <input
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />

        <textarea
          placeholder="Explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />

        <h4>Synonyms</h4>
        {synonyms.map((s, i) => (
          <input
            key={i}
            placeholder={`Synonym ${i + 1}`}
            value={s}
            onChange={(e) => updateList(synonyms, setSynonyms, i, e.target.value)}
          />
        ))}
        <button onClick={() => setSynonyms([...synonyms, ""])}>+ Add Synonym</button>

        <h4>Antonyms</h4>
        {antonyms.map((a, i) => (
          <input
            key={i}
            placeholder={`Antonym ${i + 1}`}
            value={a}
            onChange={(e) => updateList(antonyms, setAntonyms, i, e.target.value)}
          />
        ))}
        <button onClick={() => setAntonyms([...antonyms, ""])}>+ Add Antonym</button>

        <h4>Fill-in-the-Blank Questions</h4>
        {fillingBlanks.map((fb, i) => (
          <div key={i} className="fill-blank-group">
            <input
              placeholder="Question"
              value={fb.question}
              onChange={(e) => updateBlanks(i, "question", e.target.value)}
            />
            <input
              placeholder="Answer Word"
              value={fb.word}
              onChange={(e) => updateBlanks(i, "word", e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => setFillingBlanks([...fillingBlanks, { question: "", word: "" }])}>
          + Add Blank
        </button>

        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddVocabularyModal;
