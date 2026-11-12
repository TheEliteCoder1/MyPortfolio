import { useState } from 'react';
import api from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contacts', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Contact Us</h2>
      {status === 'success' && <p style={{ color: 'green' }}>Message saved to database!</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Something went wrong.</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
        <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}