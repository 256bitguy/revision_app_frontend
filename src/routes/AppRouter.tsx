import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import UserProfilePage from '../features/auth/pages/UserProfilePage';
import HomePage from '../pages/subjects/pages/HomePage';
import SubjectsPage from '../pages/subjects/pages/SubjectsPage';
import ChaptersPage from '../pages/chapters/pages/ChapterPage';
import TopicsPage from '../pages/topics/pages/TopicsPage';
import QuestionListPage from '../pages/questions/pages/QuestionListPage';
import AttemptQuestionPage from '../pages/questions/pages/AttemptQuestionPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
     <Route path="/profile" element={<UserProfilePage />} /> 
<Route path="/home" element={<HomePage />} />
<Route path="/subjects" element={<SubjectsPage />} />
<Route path="/subjects/:subjectName" element={<ChaptersPage />} />
<Route path="/subjects/:subjectName/chapters/:chapterName" element={<TopicsPage />} />
<Route path="/subjects/:subjectName/:chapterName/topics/:topicName" element={<QuestionListPage />} />
<Route
  path="/subjects/:subjectName/:chapterName/topics/:topicName/attempt"
  element={<AttemptQuestionPage />}
/>

  </Routes>
);

export default AppRouter;
