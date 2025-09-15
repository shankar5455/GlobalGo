import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ManageUsers.css'

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/auth/user')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8080/api/auth/user/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
        alert('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      });
  };

  return (
    <div className="mu-container">
      <div className="mu-content">
        <div className="mu-header">
          <h2 className="mu-title">User Management</h2>
          <p className="mu-subtitle">View and manage all registered users</p>
        </div>

        <div className="mu-user-grid">
          {users.map((user) => (
            <div key={user.id} className="mu-user-card">
              <div className="mu-user-info">
                <div className="mu-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="mu-username">{user.username}</div>
                  <div className="mu-email">{user.email}</div>
                </div>
              </div>

              <div className="mu-details">
                <div><span className="mu-label">User ID:</span> {user.id}</div>
                <div><span className="mu-label">Contact:</span> {user.phonenumber || 'N/A'}</div>
                <div>
                  <span className="mu-label">Role:</span>
                  <span className={user.role === 'admin' ? 'mu-role-admin' : 'mu-role-user'}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <div><span className="mu-label">City:</span> {user.homeAirport || 'N/A'}</div>
                <div><span className="mu-label">Traveller Name:</span> {user.travellers?.join(', ') || 'None'}</div>
                <div>
                  <span className="mu-label">Notifications:</span>{' '}
                  <span className={user.notificationsEnabled ? 'mu-notify-on' : 'mu-notify-off'}>
                    {user.notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="mu-actions">
                <button onClick={() => handleDelete(user.id)} className="mu-delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
