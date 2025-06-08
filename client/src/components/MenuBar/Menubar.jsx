import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Menubar.css';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext.jsx";

const Menubar = () => { 
   const navigate = useNavigate();
   const location = useLocation();
   const {setAuthData, auth} = useContext(AppContext);

   const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setAuthData(null, null);
      navigate('/login');
   };

   const isActive = (path) => {
      return location.pathname === path;
   }

   const isOwner = auth.role === 'ROLE_OWNER';


   return (
      <div>
         <nav className="navbar navbar-expand-lg px-2">
            <Link className="navbar-brand" to="/">
               <img src={assets.logo} alt="Logo" height="40" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-warning' : ''}`} to="/dashboard">Dashboard</Link>
                     </li>
                     <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explore') ? 'fw-bold text-warning' : ''}`} to="/explore">COFFEE</Link>
                     </li>
                     {
                        isOwner && (
                           <>
                              <li className="nav-item">
                                 <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-warning' : ''}`} to="/items">Items</Link>
                              </li>
                              <li className="nav-item">
                                 <Link className={`nav-link ${isActive('/category') ? 'fw-bold text-warning' : ''}`} to="/category">Category</Link>
                              </li>
                              <li className="nav-item">
                                 <Link className={`nav-link ${isActive('/employee') ? 'fw-bold text-warning' : ''}`} to="/employee">Staff</Link>
                              </li>
                              <li className="nav-item">
                                 <Link className={`nav-link ${isActive('/updateItem') ? 'fw-bold text-warning' : ''}`} to="/updateItem">Update Item</Link>
                              </li>
                              <li className="nav-item">
                                 <Link className={`nav-link ${isActive('/updateCategory') ? 'fw-bold text-warning' : ''}`} to="/updateCategory">Update Category</Link>
                              </li>
                           </>
                        )
                     }
                     <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'fw-bold text-warning' : ''}`} to="/orders">History</Link>
                     </li>
               </ul>
               <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
               <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle d-flex align-items-center btn btn-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                     style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'none', padding: 0, fontSize: '0.85rem', }}>
                     <img src={assets.profile} alt="" width="32" height="32" className="rounded-circle" />
                     <span className="ms-2 me-1" style={{ fontSize: '0.75rem' }}> 
                        {auth.role === 'ROLE_EMPLOYEE' && 'Staff'}
                        {auth.role === 'ROLE_OWNER' && 'Owner'}
                     </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                     <li>
                     <button 
                        className="dropdown-item" 
                        onClick={logout}
                        type="button"
                     >
                        Logout
                     </button>
                     </li>
                  </ul>
               </li>
               </ul>

            </div>
         </nav>
      </div>
   );

}

export default Menubar;