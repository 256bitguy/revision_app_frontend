import { useState } from "react";
import "./AddNoteModal.css";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/hooks";
import { addNote } from "../slices/noteApi";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Point {
  label: string;
  explanation: string;
  example: string;
}

interface Subheading {
  title: string;
  points: Point[];
  example: string;
  linkingNote: string;
  personalQuery: string;
  queryExplanation: string;
}

type SubheadingStringFields = {
  [K in keyof Subheading]: Subheading[K] extends string ? K : never;
}[keyof Subheading];


const AddNoteModal = ({ isOpen, onClose }: AddNoteModalProps) => {
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useAppDispatch();

  const [heading, setHeading] = useState("");
  const [subheadings, setSubheadings] = useState<Subheading[]>([
    {
      title: "",
      points: [{ label: "", explanation: "", example: "" }],
      example: "",
      linkingNote: "",
      personalQuery: "",
      queryExplanation: "",
    },
  ]);

 const updateSubheading = (
  index: number,
  field: SubheadingStringFields,
  value: string
) => {
  const updated = [...subheadings];
  updated[index][field] = value;
  setSubheadings(updated);
};


  const updatePoint = (
    subIndex: number,
    pointIndex: number,
    field: keyof Point,
    value: string
  ) => {
    const updated = [...subheadings];
    updated[subIndex].points[pointIndex][field] = value;
    setSubheadings(updated);
  };

  const addSubheading = () => {
    setSubheadings([
      ...subheadings,
      {
        title: "",
        points: [{ label: "", explanation: "", example: "" }],
        example: "",
        linkingNote: "",
        personalQuery: "",
        queryExplanation: "",
      },
    ]);
  };

  const addPoint = (subIndex: number) => {
    const updated = [...subheadings];
    updated[subIndex].points.push({ label: "", explanation: "", example: "" });
    setSubheadings(updated);
  };

  const handleSubmit = () => {
    const payload = {
      heading,
      topicId,
      subheadings,
    };
    dispatch(addNote(payload));
    onClose();

    // reset fields
    setHeading("");
    setSubheadings([
      {
        title: "",
        points: [{ label: "", explanation: "", example: "" }],
        example: "",
        linkingNote: "",
        personalQuery: "",
        queryExplanation: "",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box note">
        <h2>Add Structured Note</h2>

        <input
          type="text"
          placeholder="Main Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />

        {subheadings.map((sub, i) => (
          <div className="subheading-group" key={i}>
            <input
              type="text"
              placeholder={`Subheading ${i + 1}`}
              value={sub.title}
              onChange={(e) => updateSubheading(i, "title", e.target.value)}
            />

            <h4>Points</h4>
            {sub.points.map((pt, j) => (
              <div className="point-row" key={j}>
                <input
                  type="text"
                  placeholder="Bold Label"
                  value={pt.label}
                  onChange={(e) => updatePoint(i, j, "label", e.target.value)}
                />
                <textarea
                  placeholder="Explanation"
                  value={pt.explanation}
                  onChange={(e) =>
                    updatePoint(i, j, "explanation", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Example (optional)"
                  value={pt.example}
                  onChange={(e) => updatePoint(i, j, "example", e.target.value)}
                />
              </div>
            ))}
            <button onClick={() => addPoint(i)}>+ Add Point</button>

            <textarea
              placeholder="Subheading-level Example"
              value={sub.example}
              onChange={(e) => updateSubheading(i, "example", e.target.value)}
            />
            <input
              type="text"
              placeholder="Linking Note"
              value={sub.linkingNote}
              onChange={(e) =>
                updateSubheading(i, "linkingNote", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Personal Query"
              value={sub.personalQuery}
              onChange={(e) =>
                updateSubheading(i, "personalQuery", e.target.value)
              }
            />
            <textarea
              placeholder="Query Explanation (later)"
              value={sub.queryExplanation}
              onChange={(e) =>
                updateSubheading(i, "queryExplanation", e.target.value)
              }
            />
          </div>
        ))}

        <button onClick={addSubheading}>+ Add Subheading</button>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddNoteModal;
