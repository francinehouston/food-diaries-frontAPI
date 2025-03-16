import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/food-diary'>Food Diary</Link></li> {/* Add Food Diary link for logged-in users */}
         <li><Link to='/weight-tracking'>Weight Tracking</Link></li>
         <li><Link to='/nutrition-goals'>Nutrition Goals</Link></li>
          <li><Link to='/reminders'>Reminders</Link></li>
          {/* Add other links for logged-in users */}

          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/food-diary'>Food Diary</Link></li> {/* Add Food Diary link for logged-in users */}
          <li><Link to='/weight-tracking'>Weight Tracking</Link></li>
          <li><Link to='/nutrition-goals'>Nutrition Goals</Link></li>
          <li><Link to='/reminders'>Reminders</Link></li>
          {/* Add other links for logged-in users */}
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
