import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/api';
import { Post } from '../types';
import '../pages/styles/Home.css';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            {post.comments.length > 0 && (
              <p className="first-comment">
                First Comment: {post.comments[0].content} by {post.comments[0].userName || post.comments[0].authorId}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// TODO: Students - Enhance the landing page with the following:
// 1. Add pagination for posts using the API's pagination support
// 2. Add search/filter functionality to filter posts by title or author
// 3. Improve error handling with retry mechanisms
// 4. Add loading skeletons for better UX
