import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profilePhoto from './image.png';
import '../style/profile1.css'

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [homeAirport, setHomeAirport] = useState('');
  const [travellers, setTravellers] = useState([]);
  const [newTraveller, setNewTraveller] = useState('');
  const [cardDetails, setCardDetails] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cvv, setCvv] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        if (!storedEmail) {
          alert('No user email found. Please log in.');
          navigate('/login');
          return;
        }

        const response = await api.get(`/api/auth/user/${storedEmail}`, {
          headers: { Authorization: `Bearer ${storedEmail}` },
        });

        if (response.data.status === 'success') {
          const userData = response.data;
          setUser(userData);
          setUsername(userData.username || '');
          setEmail(userData.email || '');
          setPhonenumber(userData.phonenumber || '');
          setHomeAirport(userData.homeAirport || '');
          setTravellers(userData.travellers || []);
          setCardDetails(userData.cardDetails || []);
          setNotificationsEnabled(userData.notificationsEnabled || false);
          setProfilePicture(userData.profilePicture ? `data:image/jpeg;base64,${userData.profilePicture}` : profilePhoto);
        } else {
          alert('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        alert(`Failed to fetch user data: ${err.response?.data?.message || err.message || 'Network error'}`);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        username,
        email,
        phonenumber,
        password: password.trim() ? password : undefined,
        homeAirport,
        travellers,
        cardDetails,
        notificationsEnabled,
        profilePicture: user?.profilePicture || null,
      };

      const response = await api.put('/api/auth/update', updatedUser, {
        headers: { Authorization: `Bearer ${email}` },
      });

      if (response.data.status === 'success') {
        alert('Profile updated successfully');
        setUser(response.data);
        setPassword('');
      } else {
        alert('Profile update failed');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(`Failed to update profile: ${err.response?.data?.message || err.message || 'Network error'}`);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(`/api/auth/update-profile-picture?email=${email}`, formData, {
        headers: {
          Authorization: `Bearer ${email}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        const updatedUser = response.data;
        setProfilePicture(`data:image/jpeg;base64,${updatedUser.profilePicture}`);
        setUser(updatedUser);
        alert('Profile picture updated successfully');
      } else {
        alert('Profile picture update failed');
      }
    } catch (err) {
      console.error('Error updating profile picture:', err);
      alert(`Failed to update profile picture: ${err.response?.data?.message || err.message || 'Network error'}`);
    }
  };

  const handleAddTraveller = () => {
    if (newTraveller.trim()) {
      setTravellers([...travellers, newTraveller.trim()]);
      setNewTraveller('');
    }
  };

  const handleRemoveTraveller = (traveller) => {
    setTravellers(travellers.filter((t) => t !== traveller));
  };

  const handleAddCardDetail = async (e) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardholderName.trim() || !cvv.trim()) {
      alert('Please fill in all card details');
      return;
    }

    try {
      const storedEmail = localStorage.getItem('email');
      const cardData = { cardNumber, cardholderName, cvv };
      const response = await api.post(
        '/api/auth/add-card',
        cardData,
        {
          params: { email: storedEmail },
          headers: {
            Authorization: `Bearer ${storedEmail}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        setCardDetails([...cardDetails, cardData]);
        setCardNumber('');
        setCardholderName('');
        setCvv('');
        alert('Card detail added successfully');
        const userResponse = await api.get(`/api/auth/user/${storedEmail}`, {
          headers: { Authorization: `Bearer ${storedEmail}` },
        });
        if (userResponse.data.status === 'success') {
          setUser(userResponse.data);
          setCardDetails(userResponse.data.cardDetails || []);
        }
      } else {
        alert(`Card detail update failed: ${response.data.message}`);
      }
    } catch (err) {
      console.error('Error adding card detail:', err);
      alert(`Failed to add card detail: ${err.response?.data?.message || err.message || 'Network error'}`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="profile-content">
            <h2 className="profile-welcome">Welcome, {username || 'User'}!</h2>
            <div className="profile-info-box">
              <div className="profile-info-item">
                <span className="profile-info-label">Account email</span>
                <span className="profile-info-value">{email}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Home airport</span>
                <span className="profile-info-value">{homeAirport}</span>
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="profile-content">
            <h2 className="profile-section-title">Account Details</h2>
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="profile-form-row">
                <div className="profile-form-group">
                  <label className="profile-form-label">Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="profile-form-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Email:</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="profile-form-input profile-form-input-disabled"
                  />
                </div>
              </div>
              <div className="profile-form-row">
                <div className="profile-form-group">
                  <label className="profile-form-label">Phone Number:</label>
                  <input
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    className="profile-form-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Password (leave blank to keep current):</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="profile-form-input"
                  />
                </div>
              </div>
              <div className="profile-form-row profile-form-row-align-center">
                <div className="profile-form-group">
                  <label className="profile-form-label">Profile Picture:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="profile-form-file-input"
                  />
                </div>
                {profilePicture && (
                  <div className="profile-picture-container">
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="profile-picture"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="profile-primary-button"
              >
                Update Profile
              </button>
            </form>
          </div>
        );
      case 'preferences':
        return (
          <div className="profile-content">
            <h2 className="profile-section-title">Preferences</h2>
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="profile-form-group">
                <label className="profile-form-label">Home Airport:</label>
                <input
                  type="text"
                  value={homeAirport}
                  onChange={(e) => setHomeAirport(e.target.value)}
                  placeholder="e.g., JFK"
                  className="profile-form-input"
                />
              </div>
              <button
                type="submit"
                className="profile-primary-button"
              >
                Save Preferences
              </button>
            </form>
          </div>
        );
      case 'travellers':
        return (
          <div className="profile-content">
            <h2 className="profile-section-title">Travellers</h2>
            <div className="profile-traveller-add">
              <input
                type="text"
                value={newTraveller}
                onChange={(e) => setNewTraveller(e.target.value)}
                placeholder="Add a traveller"
                className="profile-traveller-input"
              />
              <button
                onClick={handleAddTraveller}
                className="profile-primary-button"
              >
                Add Traveller
              </button>
            </div>
            <ul className="profile-traveller-list">
              {travellers.map((traveller, index) => (
                <li
                  key={index}
                  className="profile-traveller-item"
                >
                  <span>{traveller}</span>
                  <button
                    onClick={() => handleRemoveTraveller(traveller)}
                    className="profile-danger-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpdateProfile}
              className="profile-primary-button"
            >
              Save Travellers
            </button>
          </div>
        );
      case 'payment':
        return (
          <div className="profile-content">
            <h2 className="profile-section-title">Payment Methods</h2>
            <form onSubmit={handleAddCardDetail} className="profile-form">
              <div className="profile-form-group">
                <label className="profile-form-label">Card Number:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="profile-form-input"
                />
              </div>
              <div className="profile-form-group">
                <label className="profile-form-label">Cardholder Name:</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  className="profile-form-input"
                />
              </div>
              <div className="profile-form-group">
                <label className="profile-form-label">CVV:</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="profile-form-input"
                />
              </div>
              <button
                type="submit"
                className="profile-primary-button"
              >
                Add Card
              </button>
            </form>
            <div className="profile-saved-cards">
              <h3 className="profile-subsection-title">Saved Cards</h3>
              {cardDetails.length > 0 ? (
                <ul className="profile-card-list">
                  {cardDetails.map((card, index) => (
                    <li
                      key={index}
                      className="profile-card-item"
                    >
                      <span>
                        {card.cardholderName} - **** **** **** {card.cardNumber.slice(-4)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="profile-no-cards">No cards added yet.</p>
              )}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="profile-content">
            <h2 className="profile-section-title">Notifications</h2>
            <div className="profile-notification-toggle">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                id="notifications"
                className="profile-checkbox"
              />
              <label htmlFor="notifications" className="profile-checkbox-label">
                Enable Notifications
              </label>
            </div>
            <button
              onClick={handleUpdateProfile}
              className="profile-primary-button"
            >
              Save Notification Settings
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <div className="profile-nav-container">
          <h1 className="profile-nav-title">Profile</h1>
          <div className="profile-tabs">
            {[
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'account', name: 'Account' },
              { id: 'preferences', name: 'Preferences' },
              { id: 'travellers', name: 'Travellers' },
              { id: 'payment', name: 'Payment methods' },
              { id: 'notifications', name: 'Notifications' },
              { id: 'history', name: 'History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'history') {
                    navigate('/history');
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`profile-tab ${activeTab === tab.id ? 'profile-tab-active' : ''}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="profile-main">
        <div className="profile-content-container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;