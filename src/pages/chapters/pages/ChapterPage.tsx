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
      <Link to={`/chapters/${chap._id}/${chap.name}`} className="chapter-link">
        <div className="chapter-content">
          <strong className="chapter-name">{chap.name}</strong>
          <span className="chapter-rank">Rank: {chap.ranking}</span>
        </div>
        <div className="chapter-date">
          Started on: {new Date(chap.createdAt).toLocaleDateString()}
        </div>
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
