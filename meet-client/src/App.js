import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user);

  return (
    <div className="app">
      {
        user === null ? (
          <Login />
        ) : <Home />
      }
    </div>
  );
}

export default App;