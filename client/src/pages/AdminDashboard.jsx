import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    link: '', 
    completionDate: '' 
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, contactsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/contacts')
      ]);
      setProjects(projectsRes.data);
      setContacts(contactsRes.data);
    } catch (err) {
      setError('Failed to fetch data. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/projects', formData);
      setProjects([data, ...projects]);
      setFormData({ title: '', description: '', link: '', completionDate: '' }); 
    } catch (err) {

      console.error("Backend Error Details:", err.response?.data);
      alert(err.response?.data?.message || 'Error creating project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert('Error deleting project');
    }
  };

  if (loading) return <h2>Loading Admin Dashboard...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Manage Projects</h2>
        
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Project Title" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            required 
            style={{ flex: '1', padding: '0.5rem' }}
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            required 
            style={{ flex: '2', padding: '0.5rem' }}
          />
          {}
          <input 
            type="date" 
            value={formData.completionDate} 
            onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })} 
            required 
            style={{ padding: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
            Create
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.map((project) => (
            <li key={project._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9f9f9', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <div>
                <strong>{project.title}</strong>
                <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#555' }}>{project.description}</p>
                {}
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  Completed: {project.completionDate || 'N/A'}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(project._id)}
                style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}