import { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentEmployee, setCurrentEmployee] = useState({})

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/layout" replace /> : <Login onLogin={setToken} setCurrentEmployee={setCurrentEmployee}/>
            }
          />
          <Route
            path="/layout"
            element={
              token ? <Layout token={token} setToken={setToken} currentEmployee={currentEmployee} /> : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to={token ? "/layout" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
