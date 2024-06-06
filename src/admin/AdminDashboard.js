import React from 'react';
import { useAuth } from '../api/AuthContext';

function AdminDashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {currentUser.email}</p>
      <button onClick={logout}>Log Out</button>
      {/* Add functionalities here */}
    </div>
  );
}

export default AdminDashboard;
