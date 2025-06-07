import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddChapterModal from "../components/AddChapterModal";
import "./ChapterPage.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchChaptersBySubjectId } from "../slice/chapterAPI";

const ChaptersPage = () => {
  const { subjectName, subjectId } = useParams<{ subjectName: string, subjectId:string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const chapters = useAppSelector((state) => state.chapters.chapters);
  const loading = useAppSelector((state) => state.chapters.loading);

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchChaptersBySubjectId(subjectId));
    }
  }, [modalOpen, subjectName]);

  return (
    <div className="chapters-page">
      <h2 className="heading">
         
         <span>{decodeURIComponent(subjectName || "")}</span>
      </h2>

      {loading ? (
        <div className="loader">Loading chapters...</div>
      ) : chapters.length === 0 ? (
        <p className="no-chapters">No chapters added yet.</p>
      ) : (
        <ul className="chapter-list fade-in">
          {chapters.map((chap) => (
            <li key={chap._id} className="chapter-item">
              <Link
                to={`/chapters/${chap._id}/${chap.name}`}
                style={{
                  textDecoration: "none",
                  color: "teal",
                  fontWeight: "500",
                }}
              >
                <strong>{chap.name}</strong>{" "}
                <span className="rank">(Rank {chap.ranking})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button className="add-btn" onClick={() => setModalOpen(true)}>
        + ADD
      </button>

      <AddChapterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ChaptersPage;
