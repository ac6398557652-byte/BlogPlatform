import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const fetchPosts = () => {
    fetch('http://localhost:5075/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoginSuccess = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    // Agar image select ki hai, pehle use upload karo
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('http://localhost:5075/api/posts/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      imageUrl = uploadData.imageUrl;
    }

    // Ab post banao, image URL ke saath (agar hai)
    fetch('http://localhost:5075/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, userId: 1, imageUrl }),
    }).then(() => {
      setTitle('');
      setContent('');
      setSelectedFile(null);
      fetchPosts();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5075/api/posts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      fetchPosts();
    });
  };

  return (
    <div className="container">
      <h1>📝 Mera Blog</h1>

      {!token ? (
        <div>
          <div className="auth-toggle">
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowLogin(false)}>Signup</button>
          </div>

          {showLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Signup onSignupSuccess={() => setShowLogin(true)} />
          )}
        </div>
      ) : (
        <div className="welcome-bar">
          <p>Welcome, {username}! 👋</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {token && (
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            placeholder="Post ka title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Kuch likho..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button type="submit">Post Karo</button>
        </form>
      )}

      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="empty-msg">Koi post nahi hai abhi</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              {post.imageUrl && (
                <img
                  src={`http://localhost:5075${post.imageUrl}`}
                  alt={post.title}
                  className="post-image"
                />
              )}
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {token && (
                <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;