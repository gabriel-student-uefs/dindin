import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";
import TransactionList from "./pages/TransactionList";
import Ranking from "./pages/Ranking";
import Start from "./pages/Start";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Start />} />
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
              <PrivateRoute>
                <MainLayout>
                  <TransactionList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Ranking />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
