import React, { StrictMode, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store.js';
import Login from './pages/login-page.jsx';
import Signup from './pages/signup-page.jsx';
import Callback from './components/Callback.jsx';
import Search from './pages/search-page.jsx';
import EditProfile from './pages/profile-page.jsx';
import SavedJobs from './pages/saved-jobs.jsx';
import './styles/styles.css';
import LandingPage from './pages/LandingPage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [showName, setShowName] = useState('');
  
  return (
    <Provider store={store}>
    <div>
      <GoogleOAuthProvider clientId="158691301488-8vvlfocfvkhl587aa4fdkf9cvrstev1s.apps.googleusercontent.com">
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route
            path="/login"
            element={
              <Login
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                showName={showName}
                setShowName={setShowName}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                showName={showName}
                setShowName={setShowName}
              />
            }
          ></Route>
          <Route
            path="/callback"
            element={
              <Callback
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                showName={showName}
                setShowName={setShowName}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Search
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                showName={showName}
                setShowName={setShowName}
              />
            }
          ></Route>
          <Route
            path="/editprofile"
            element={
              <EditProfile
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                showName={showName}
                setShowName={setShowName}
              />
            }
          ></Route>
          <Route
            path="/savedjobs"
            element={
              <SavedJobs
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                showName={showName}
                setShowName={setShowName}
                // savedJobs={savedJobs}
                // setSavedJobs={setSavedJobs}
              />
            }
          ></Route>
        </Routes>
      </GoogleOAuthProvider>
    </div>
    </Provider>
  );
}

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
