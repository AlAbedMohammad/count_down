import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateCountdown } from '../utils/api';
import { formatTime } from '../utils/formatTime';
import { useNavigate } from 'react-router-dom';

const Countdown = () => {
    const { user ,logout} = useContext(AuthContext);
  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = localStorage.getItem('countdown');
    return savedCountdown ? parseInt(savedCountdown, 10) : user?.countdown || 86400;
});
const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('countdown', countdown);
  }, [countdown]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev > 0 ? prev - 1 : 0;
        localStorage.setItem('countdown', newCountdown);
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAction = async (action) => {
    try {
      let newCountdown;
      if (action === 'increase') {
        newCountdown = countdown + 3600; 
      } else if (action === 'decrease') {
        newCountdown = countdown - 3600; 
        if (newCountdown < 0) newCountdown = 0; 
      } else if (action === 'reset') {
        newCountdown = 86400; 
      }
      setCountdown(newCountdown);
      localStorage.setItem('countdown', newCountdown);
      const token = localStorage.getItem('token');
      await updateCountdown(token, action);
    } catch (error) {
      console.error('Error updating countdown:', error);
    }
  };
  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('token');
  navigate("/login")

  };
  return (
    <div className="grid grid-cols-1 gap-4 mx-auto max-w-lg mt-8">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-4">Username: {user?.name}</h1>

        <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-4">Countdown: {formatTime(countdown)}</h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleAction('reset')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
          >
            Reset
          </button>
          <button
            onClick={() => handleAction('increase')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500"
          >
            Increase by 1 hour
          </button>
          <button
            onClick={() => handleAction('decrease')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
          >
            Decrease by 1 hour
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};;

export default Countdown;
