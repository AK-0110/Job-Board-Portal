import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import JobCard from '../components/shared/JobCard';
import './Home.css';

const CATEGORIES = [
  { icon: '💻', label: 'Engineering', value: 'Engineering' },
  { icon: '🎨', label: 'Design',      value: 'Design' },
  { icon: '📊', label: 'Marketing',   value: 'Marketing' },
  { icon: '💰', label: 'Finance',     value: 'Finance' },
  { icon: '🤝', label: 'Sales',       value: 'Sales' },
  { icon: '📱', label: 'Product',     value: 'Product' },
  { icon: '🔬', label: 'Data & AI',   value: 'Data & AI' },
  { icon: '⚕️', label: 'Healthcare',  value: 'Healthcare' },
];

const STATS = [
  { value: '12,400+', label: 'Active Jobs' },
  { value: '4,200+',  label: 'Companies' },
  { value: '98,000+', label: 'Candidates' },
  { value: '87%',     label: 'Placement Rate' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jobs?limit=6&sort=-createdAt')
      .then(r => setFeaturedJobs(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    navigate(`/jobs?${params}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Over 12,000 jobs updated daily
          </div>
          <h1 className="hero-title">
            Find Your Next<br />
            <span className="hero-highlight">Dream Role</span>
          </h1>
          <p className="hero-sub">
            Connect with world-class companies actively hiring.<br />
            Your career breakthrough is one click away.
          </p>
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-field">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Job title, company, or keyword..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input type="text" placeholder="City, state, or remote..." value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary search-btn">Search Jobs</button>
          </form>
          <div className="hero-tags">
            <span>Popular:</span>
            {['React Developer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps'].map(t => (
              <button key={t} onClick={() => { setSearch(t); navigate(`/jobs?search=${t}`); }} className="hero-tag">{t}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Explore opportunities across industries</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <button key={cat.value} className="category-card" onClick={() => navigate(`/jobs?category=${cat.value}`)}>
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="latest-jobs">
        <div className="container">
          <div className="section-header">
            <h2>Latest Opportunities</h2>
            <a href="/jobs" className="btn btn-outline btn-sm">View All →</a>
          </div>
          {loading ? (
            <div className="grid-3">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 240, borderRadius: 20 }} />)}
            </div>
          ) : (
            <div className="grid-3">
              {featuredJobs.map(job => <JobCard key={job._id} job={job} />)}
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-orb" />
            <div className="cta-content">
              <h2>Hiring Great Talent?</h2>
              <p>Post your job and reach thousands of qualified candidates instantly.</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="/register?role=employer" className="btn btn-primary btn-lg">Post a Job Free</a>
                <a href="/jobs" className="btn btn-ghost btn-lg">Browse Candidates</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}