'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('blog');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('trp_admin');
    if (auth !== 'true') { router.push('/login'); }
    else { setIsAuthorized(true); }
  }, [router]);

  const handleLogout = () => { localStorage.removeItem('trp_admin'); router.push('/'); };

  if (!isAuthorized) return null;

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo"><strong>TRP</strong> Admin</div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => setActiveTab('blog')}><span className="icon">📝</span> Blog Posts</button>
          <button className={`admin-nav-item ${activeTab === 'newsletter' ? 'active' : ''}`} onClick={() => setActiveTab('newsletter')}><span className="icon">📧</span> Newsletter</button>
          <button className={`admin-nav-item ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}><span className="icon">💼</span> Job Listings</button>
        </nav>
        <div className="admin-sidebar-bottom">
          <button className="btn-text logout-btn" onClick={handleLogout}>Logout <span className="arrow">→</span></button>
        </div>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h2 className="heading">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <strong>Management</strong></h2>
          <button className="btn-primary">Add New {activeTab === 'jobs' ? 'Job' : activeTab === 'blog' ? 'Post' : 'Entry'}</button>
        </header>

        <div className="admin-content rv go">
          {activeTab === 'blog' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr><td>The Future of Oracle RMC in 2025</td><td>Aditi Sharma</td><td>Mar 24, 2026</td><td><span className="status-pill published">Published</span></td><td><button className="btn-text">Edit</button></td></tr>
                  <tr><td>Navigating SAP S/4HANA Migrations</td><td>Michael Chen</td><td>Mar 18, 2026</td><td><span className="status-pill draft">Draft</span></td><td><button className="btn-text">Edit</button></td></tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'newsletter' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Email</th><th>Subscription Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr><td>john.doe@enterprise.com</td><td>Mar 27, 2026</td><td><span className="status-pill active">Active</span></td><td><button className="btn-text">Remove</button></td></tr>
                  <tr><td>sarah.smith@consulting.org</td><td>Mar 25, 2026</td><td><span className="status-pill active">Active</span></td><td><button className="btn-text">Remove</button></td></tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'jobs' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Position</th><th>Location</th><th>Team</th><th>Applications</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr><td>Senior Oracle Security Consultant</td><td>London / Remote</td><td>Security</td><td>14</td><td><button className="btn-text">View</button></td></tr>
                  <tr><td>SAP GRC Specialist</td><td>New York</td><td>Risk</td><td>8</td><td><button className="btn-text">View</button></td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
