import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import HomePage from "../pages/subjects/pages/HomePage";
import SubjectsPage from "../pages/subjects/pages/SubjectsPage";
import ChaptersPage from "../pages/chapters/pages/ChapterPage";
import TopicsPage from "../pages/topics/pages/TopicsPage";
import QuestionListPage from "../pages/questions/pages/QuestionListPage";
import AttemptQuestionPage from "../pages/questions/pages/AttemptQuestionPage";
import AllUsers from "../pages/users/AllUsers";
import AttemptVocabularyPage from "../pages/vocabulary/pages/AttemptVocabularyPage";
import VocabularyListPage from "../pages/vocabulary/pages/VocabularyListPage";
import NotesDetailPage from "../pages/notes/pages/NotesDetailPage";
import SimpleNotePage from "../pages/notes/pages/SimpleNotePage";
import AdditionQuiz from "../pages/maths/calculation/addition/AdditionQuiz";
import SubtractionQuizPage from "../pages/maths/calculation/subtraction/SubtractionQuizPage";
import MultiplicationQuizPage from "../pages/maths/calculation/multiplication/MultiplicationQuizPage";
import PercentageFractionConverterApp from "../pages/maths/calculation/fractionSum/converter/PercentageFractionConverterApp";
import Alphabet from "../pages/maths/alphabet/Alphabet";
import NumberPattern from "../pages/maths/numberseries/type1/NumberPattern";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profile/:userId" element={<UserProfilePage />} />
    <Route path="/users" element={<AllUsers />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/subjects" element={<SubjectsPage />} />
    <Route
      path="/subjects/:subjectId/:subjectName"
      element={<ChaptersPage />}
    />
    <Route path="/chapters/:chapterId/:chapterName" element={<TopicsPage />} />
    <Route path="/topics/:topicId/:topicName" element={<QuestionListPage />} />
    <Route path="/topics/:topicId/attempt" element={<AttemptQuestionPage />} />
    <Route
      path="/topics/:topicId/vocabulary/:topicName"
      element={<VocabularyListPage />}
    />

    <Route
      path="/topics/vocabulary/practice"
      element={<AttemptVocabularyPage />}
    />
     <Route
        path="/notes/:topicId"
        element={<NotesDetailPage />}
      />
      <Route path="/test-note/:topicId" element={<SimpleNotePage />} />
      <Route path="/additionquiz" element={<AdditionQuiz />} />
      <Route path="/subtractionquiz" element={<SubtractionQuizPage />} />
      <Route path="/multiplicationquiz" element={<MultiplicationQuizPage />} />
      <Route path="/fractionquizconverter" element={<PercentageFractionConverterApp />} />
      <Route path="/alphabet" element={<Alphabet />} />
      <Route path="/pattern" element={<NumberPattern />} />


  </Routes>
);

export default AppRouter;
