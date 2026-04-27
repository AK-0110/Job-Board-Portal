import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="#3B82F6" opacity="0.15"/>
                <path d="M7 20L14 8L21 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.5 16H18.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              JobBoard
            </Link>
            <p>Connecting exceptional talent with forward-thinking companies.</p>
          </div>
          <div className="footer-links">
            <h4>For Candidates</h4>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/register?role=candidate">Create Account</Link>
            <Link to="/dashboard/candidate">My Applications</Link>
          </div>
          <div className="footer-links">
            <h4>For Employers</h4>
            <Link to="/post-job">Post a Job</Link>
            <Link to="/register?role=employer">Create Account</Link>
            <Link to="/dashboard/employer">Manage Listings</Link>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} JobBoard Portal. All rights reserved.</span>
          <span>Built with React & Node.js</span>
        </div>
      </div>
    </footer>
  );
}