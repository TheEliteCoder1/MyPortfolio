import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  // Read
  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // Create
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', formData);
      setFormData({ title: '', description: '' });
      fetchProjects(); // Refresh list
    } catch (err) {
      alert('Error creating project');
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects(); // Refresh list
    } catch (err) {
      alert('Error deleting project');
    }
  };

  if (loading) return <p>Loading Admin Data...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h3>Add New Project</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <input type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <button type="submit">Create</button>
        </form>
      </div>

      <h3>Manage Projects</h3>
      <ul>
        {projects.map(p => (
          <li key={p._id} style={{ marginBottom: '10px' }}>
            <strong>{p.title}</strong> - {p.description}
            <button onClick={() => handleDelete(p._id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}