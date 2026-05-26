import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DiagnosisPage from './pages/DiagnosisPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
