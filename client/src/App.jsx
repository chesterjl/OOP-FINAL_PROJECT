import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Menubar from "./components/MenuBar/Menubar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageEmployee from "./pages/ManageEmployee/ManageEmployee";
import UpdateItem from "./pages/UpdateItem/UpdateItem";
import UpdateCategory from "./pages/UpdateCategory/UpdateCategory.jsx";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login/Login";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";


const App = () => {
    const location = useLocation();
    const {auth} = useContext(AppContext);
    
    const LoginRoute = ({element}) => {
        if (auth.token) {
            return <Navigate to="/dashboard" replace/>;
        }
        return element;
    }

    const ProtectedRoute = ({element, allowedRoles}) => {
        if (!auth.token) {
            return <Navigate to="/login" replace/>;
        }
        
        if (allowedRoles && !allowedRoles.includes(auth.role)) {
            return <Navigate to="/dashboard" replace/>;
        }

        return element;
    }

    return (
        <div>
            {location.pathname !== '/login' && <Menubar />} 
            <ToastContainer /> 

            <Routes>
                <Route path="/login" element={<LoginRoute element={<Login />} />} />   
                 
                <Route path="/" element={<Dashboard/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/explore" element={<Explore/>} />
                <Route path="/orders" element={<OrderHistory/>} />  

                <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ROLE_OWNER']}/>} />
                <Route path="/category" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ROLE_OWNER']}/>} />
                <Route path="/employee" element={<ProtectedRoute element={<ManageEmployee />} allowedRoles={['ROLE_OWNER']}/>} />
                <Route path="/updateItem" element={<ProtectedRoute element={<UpdateItem />} allowedRoles={['ROLE_OWNER']}/>} />
                <Route path="/updateCategory" element={<ProtectedRoute element={<UpdateCategory />} allowedRoles={['ROLE_OWNER']}/>} />
                    
                <Route path="*" element={<NotFound/>} />

            </Routes>
        </div>
    );
}

export default App ;