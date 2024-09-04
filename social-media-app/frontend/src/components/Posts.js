import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [device, setDevice] = useState('PC');

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', { title, body, device }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTitle('');
      setBody('');
      setDevice('PC');
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <select value={device} onChange={(e) => setDevice(e.target.value)}>
          <option value="PC">PC</option>
          <option value="TABLET">TABLET</option>
          <option value="MOBILE">MOBILE</option>
        </select>
        <button type="submit">Create Post</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>Device: {post.device}</p>
            <button>Update</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
