import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './pages/NotFound';
import './index.css';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={
            <ProtectedRoute requiredRole="WRITER">
              <CreatePost />
            </ProtectedRoute>
          } />
          <Route path="/my-posts" element={
            <ProtectedRoute requiredRole="WRITER">
              <MyPosts />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

// TODO: Students - Complete the routing setup by:
// 1. Implementing the MyPosts page (/my-posts) to show the logged-in user's posts
// 2. Adding protected route logic to restrict access to certain routes based on user role
// 3. Adding a 404 page for invalid routes
