
import Home from '../pages/Home';
import FrontPage from '../pages/signup-login/FrontPage';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';



const ProtectedHome = () =>{
    let {user} = useContext(AuthContext)
    
    return ! user ? <FrontPage /> : <Home />
}
export default ProtectedHome ; 

