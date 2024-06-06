import React from 'react';
import { useAuth } from '../api/AuthContext';

function DealerDashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h2>Dealer Dashboard</h2>
      <p>Welcome, {currentUser.email}</p>
      <button onClick={logout}>Log Out</button>
      {/* Add functionalities here */}
    </div>
  );
}

export default DealerDashboard;
