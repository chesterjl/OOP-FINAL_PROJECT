import './Login.css';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Login = () => { 

   const {setAuthData} =   useContext(AppContext);

   const navigate = useNavigate(); 

   const  [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      email: '',
      password: '',
   });


   const onChangeHandler = (e) => { 
      const name = e.target.name;
      const value = e.target.value;
      setData((data) => ({...data, [name]: value}));
   }

   const onSubmitHandler = async (e) => { 
      e.preventDefault();
      setLoading(true);
      try {
         const response = await login(data);
         if (response.status === 200) {
            toast.success('Login successful');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            setAuthData(response.data.token, response.data.role);
            navigate("/dashboard");
         }
      } catch (error) {
         console.error(error);
         toast.error('Login failed: invalid credentials.');
      } finally {
         setLoading(false);
      }
   }

   return (
<div className="login-background d-flex align-items-center justify-content-center">
  <div className="card modern-login-card shadow-sm">
    <div className="card-body">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">Manila Coffee</h2>
        <p className="text-muted small">Access your account by signing in below.</p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-muted">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="you@example.com"
            className="form-control modern-input"
            onChange={onChangeHandler}
            value={data.email}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label text-muted">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="form-control modern-input"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-dark modern-btn" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

   )
}

export default Login;