import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <>
    <main>
     <h1>Welcome, {user.username}</h1>
      <div className="dashboard">
        <h1>Dashboard</h1>
        {users.map((user) => (
          <div key={user._id} className="dashboard-card">
            <h3>{user.username}</h3>
            <p>Email: {user.username}</p>
            {/* <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p> */}
            <p>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleString() : "Date not available"}</p>
          </div>
        ))}
      </div>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
    </main>
    </>
  );
};

export default Dashboard;
