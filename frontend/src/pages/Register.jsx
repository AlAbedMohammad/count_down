import React, { useState } from 'react';
import { register } from '../utils/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-100">
    <div className="w-full p-6 mx-auto bg-white rounded-md shadow-xl lg:max-w-xl">
      <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase">
        Register
      </h1>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 text-lg font-semibold text-white transition duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-8 text-sm text-center text-gray-700">
        Already have an account?{' '}
        <a href="/login" className="font-medium text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
);
};

export default Register;
