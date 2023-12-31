import './App.css';
import FrontPage from './pages/signup-login/FrontPage';

import ProtectedHome from './Utils/PrivateRoute';
import AuthContext, { AuthProvider } from './context/AuthContext';

import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import UserProfile from './pages/userProflile/UserProfile';
import HomeField from './components/homePage/HomeField';
import EditProfile from './components/userProfile/EditProfile';
import AllMatches from './pages/matches/AllMatches';
import MatchProfile from './components/matches/MatchProfile';
import AdminPanel from './pages/adminPanel/AdminPanel';
import AdminLogin from './pages/adminPanel/AdminLogin';
import AdminDashBoard from './components/admin/AdminDashBoard';
import AdminUserList from './components/admin/users/AdminUserList';
import AdminUserProfile from './components/admin/users/AdminUserProfile';
import PremiumPage from './pages/adminPanel/PremiumPage';
import ChatPage from './pages/chatApp/ChatPage';
import AdminChatBox from './components/admin/AdminChatBox'
import PremiumPlans from './pages/premium/PremiumPlans';
import PaymentPage from './components/premiumUserSide/PaymentPage';
import PaymentConfirmationPage from './components/premiumUserSide/paymentResult/PaymentConfirmationPage';
import Notification from './pages/notification/Notification';
import { MatchProvider } from './context/MatchContext';

function App() {
  
  return (
    <>
    <Router>
      <AuthProvider>
        <MatchProvider>
        <Routes>
          <Route Component={FrontPage} path='/' exact/>
          {/* <Route Component={Login} path='/login'/>
          <Route Component={Signup} path='/signup'/> */}
          <Route Component={AdminPanel} path='/adminpanel' >
            <Route Component={AdminDashBoard} path='admindashboard' />
            <Route Component={AdminUserList} path='adminuserlist' />
            <Route Component={AdminUserProfile} path='adminuserprofile' />
            <Route Component={PremiumPage} path='premiumpage' />
            <Route Component={AdminChatBox} path='adminchatbox' >
              <Route Component={ChatPage} path='chatpage' />
              <Route Component={ChatPage} path='chatpage/:username' />
            </Route>

          
          </Route>
          <Route Component={AdminLogin} path='/adminlogin' />
          <Route Component={ProtectedHome} path='/home'>
            <Route Component={UserProfile} path='userprofile'>
              <Route Component={EditProfile} path='editProfile'/>
            </Route>

            <Route Component={HomeField} path='homefield' />
            <Route Component={AllMatches} path='matches' />
            <Route Component={MatchProfile} path='matchprofile' />
            <Route Component={PremiumPlans} path='premiumplans' />
            <Route Component={ChatPage} path='chatpage' />
            <Route Component={ChatPage} path='chatpage/:username' />
            <Route Component={PaymentPage} path='payment-page' />
            <Route Component={PaymentConfirmationPage} path='payment-confirmation-page' />
            <Route Component={Notification} path='notification' />
            
          </Route>
        </Routes>

        </MatchProvider>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
