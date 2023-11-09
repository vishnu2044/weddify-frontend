import './App.css';
import FrontPage from './pages/signup-login/FrontPage';

import ProtectedHome from './Utils/PrivateRoute';
import AuthContext, { AuthProvider } from './context/AuthContext';

import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Signup from './components/frontPage/Signup'
import Login from './components/frontPage/Login';
import UserProfile from './pages/userProflile/UserProfile';
import HomeField from './components/homePage/HomeField';
import EditProfile from './components/userProfile/EditProfile';
import AllMatches from './pages/matches/AllMatches';
import MatchProfile from './components/matches/MatchProfile';

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

            <Route Component={HomeField} path='homefield' />
            <Route Component={AllMatches} path='matches' />
            <Route Component={MatchProfile} path='matchprofile' />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
