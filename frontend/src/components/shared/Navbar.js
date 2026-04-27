import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const dashboardLink = user?.role === 'employer' ? '/dashboard/employer' : '/dashboard/candidate';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#3B82F6" opacity="0.15"/>
            <path d="M7 20L14 8L21 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 16H18.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>JobBoard</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Browse Jobs</Link>
          {user && <Link to={dashboardLink} className={location.pathname.includes('/dashboard') ? 'active' : ''}>Dashboard</Link>}
          {user?.role === 'employer' && (
            <Link to="/post-job" className={location.pathname === '/post-job' ? 'active' : ''}>Post a Job</Link>
          )}
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-avatar">
                <div className="avatar-circle">{user.name[0].toUpperCase()}</div>
                <span className="user-name">{user.name.split(' ')[0]}</span>
                <span className={`role-pill role-${user.role}`}>{user.role}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm logout-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}