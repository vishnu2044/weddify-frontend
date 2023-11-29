import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'

const AdminNavBar = () => {
    let [menuOpen, setMenuOpen] = useState(false);
    let {logoutUser} = useContext(AuthContext)
    

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <nav className="fixed top-0 w-full flex flex-wrap items-center justify-between py-0 px-3 bg-[#85315c] z-10">
        <p className='text-white text-4xl font-bold'>Weddify</p>
        <div className="flex md:hidden">
            <p id="hamburger" onClick={toggleMenu}>
            <img
                className={`toggle ${menuOpen ? 'hidden' : 'block'}`}
                src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
                width="40"
                height="40"
                alt="Menu"
            />
            <img
                className={`toggle ${menuOpen ? 'block' : 'hidden'}`}
                src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
                width="40"
                height="40"
                alt="Close"
            />
            </p>
        </div>
        <div
            className={`toggle ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}
        >
            <Link to="/adminpanel/admindashboard" 
                className="block md:inline-block text-white hover:text-[#772750] px-3 mb-3 py-1 border-b-2  md:border-none"
                style={{ textDecoration: 'none' }}>
                Admin panel
            </Link>
            <Link to="/adminpanel/adminuserlist" 
                className="block md:inline-block text-white hover:text-[#772750] px-3 py-1 mb-3 border-b-2  md:border-none"
                style={{ textDecoration: 'none' }}>
                Users
            </Link>
            <Link to="/adminpanel/premiumpage" 
                className="block md:inline-block text-white hover:text-[#772750] px-3 py-1 mb-3 border-b-2  md:border-none"
                style={{ textDecoration: 'none' }}>
                Premium
            </Link>
            <Link to="/adminpanel/adminchatbox" 
                className="block md:inline-block text-white hover:text-[#772750] px-3 py-1 mb-3 border-b-2  md:border-none"
                style={{ textDecoration: 'none' }}>
                Chat
            </Link>
        </div>
        <p 
            onClick={logoutUser} 
            className={`toggle hidden md:flex w-full md:w-auto px-4 py-2 shadow-sm cursor-pointer text-right bg-[#5f1d3f] hover:bg-[#963d6b] text-white md:rounded`}
        >
            Logout
        </p>
    </nav>
  )
}

export default AdminNavBar