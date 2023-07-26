import React, { useCallback, useContext, useRef, useState } from 'react';
import {BrowserRouter, Link, Navigate, Route, Router, Routes} from 'react-router-dom';
import axios from 'axios';
import AuthContext from 'auth/auth-context';
import Layout from 'components/layout/Layout';
import HomePage from 'pages/HomePage';
import CreateAccountPage from 'pages/CreateAccountPage';
import AuthPage from 'pages/AuthPage';
import ProfilePage from 'pages/ProfilePage';


const App = () => {
  const authCtx = useContext(AuthContext);
  axios.get('/api/test')
  .then(response => console.log(response.data))
  .catch(error => console.log(error))

  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />} />
          <Route path="/login/*" 
            element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage />}
          />
          <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        </Routes>
      </Layout>
  );
};

export default App;