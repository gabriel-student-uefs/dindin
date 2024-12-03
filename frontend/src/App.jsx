import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import TransactionList from './pages/TransactionList';
import Ranking from './pages/Ranking';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <MainLayout>
                <TransactionList />
              </MainLayout>
            }
          />
          <Route
            path="/ranking"
            element={
              <MainLayout>
                <Ranking />
              </MainLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;