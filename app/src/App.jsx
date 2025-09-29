import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu, FiX, FiLogOut, FiHome, FiUser, FiBookOpen, FiUpload, FiBarChart2 } from "react-icons/fi";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Quiz from "./pages/Quiz.jsx";
import Topics from './pages/Topics';
import CreateOrEditTopic from './pages/CreateOrEditTopic';
import TopicView from './pages/TopicView';
import Dashboard from "./pages/Dashboard.jsx";
import QuizUpload from "./pages/QuizUpload.jsx";
import Subjects from './pages/Subjects';
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <Router>
      <Navbar>
        <Logo>
          <FiBookOpen size={24} /> Quiz
        </Logo>

        <Hamburger onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </Hamburger>

        <NavLinks isOpen={menuOpen}>
          <StyledLink to="/" onClick={() => setMenuOpen(false)}><FiHome /> Home</StyledLink>

          {user ? (
            <>
              <StyledLink to="/quiz" onClick={() => setMenuOpen(false)}><FiBookOpen /> Quiz</StyledLink>
              <StyledLink to="/subjects" onClick={() => setMenuOpen(false)}><FiBookOpen /> Subjects</StyledLink>
              <StyledLink to="/dashboard" onClick={() => setMenuOpen(false)}><FiBarChart2 /> Dashboard</StyledLink>
              <StyledLink to="/upload" onClick={() => setMenuOpen(false)}><FiUpload /> Upload</StyledLink>
              <LogoutButton onClick={handleLogout}><FiLogOut /> Logout</LogoutButton>
            </>
          ) : (
            <>
              <StyledLink to="/login" onClick={() => setMenuOpen(false)}><FiUser /> Login</StyledLink>
              <StyledLink to="/register" onClick={() => setMenuOpen(false)}><FiUser /> Register</StyledLink>
            </>
          )}
        </NavLinks>
      </Navbar>

      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/topics/:subjectId/create" element={<ProtectedRoute><CreateOrEditTopic /></ProtectedRoute>} />
          <Route path="/topics/:subjectId/edit/:id" element={<ProtectedRoute><CreateOrEditTopic /></ProtectedRoute>} />
          <Route path="/topic/:id" element={<ProtectedRoute><TopicView /></ProtectedRoute>} />
          <Route path="/topics/:subjectId" element={<ProtectedRoute><Topics /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><QuizUpload /></ProtectedRoute>} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;

/* ------------------ Styled Components ------------------ */

const Navbar = styled.nav`
  background: #1f2937;
  color: white;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f9fafb;
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    background: #111827;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 15px;
    display: ${props => (props.isOpen ? "flex" : "none")};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #f3f4f6;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  transition: background 0.3s ease;

  &:hover {
    background: #374151;
    border-radius: 8px;
  }
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.3s ease;

  &:hover {
    background: #dc2626;
  }
`;

const MainContent = styled.main`
  padding: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
