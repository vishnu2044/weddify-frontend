import './App.css';
import FrontPage from './pages/signup-login/FrontPage';

import ProtectedHome from './Utils/PrivateRoute';
import AuthContext, { AuthProvider } from './context/AuthContext';

import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Signup from './components/frontPage/Signup'
import Login from './components/frontPage/Login';
import UserProfile from './pages/userProflile/UserProfile';
import HomeField from './pages/userProflile/HomeField';
import EditProfile from './components/userProfile/EditProfile';

function App() {
  
  return (
    <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route Component={FrontPage} path='/' exact/>
          {/* <Route Component={Login} path='/login'/>
          <Route Component={Signup} path='/signup'/> */}
          <Route Component={ProtectedHome} path='/home'>
            <Route Component={UserProfile} path='userprofile'>
              <Route Component={EditProfile} path='editProfile'/>
            </Route>

            <Route Component={HomeField} path='homefield'/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
