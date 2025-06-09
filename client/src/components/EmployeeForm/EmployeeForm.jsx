import { toast } from "react-toastify";
import { useState  } from "react";
import { addEmployee } from "../../Service/EmployeeService";

const EmployeeForm = ({setEmployees}) => { 

   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: ""
   });

   const onChangeHandler = (e) => { 
      const value = e.target.value;
      const name = e.target.name;
      setData((data) =>  ({...data , [name]: value}));

   }

   const onSubmitHandler = async (e) => {
      e.preventDefault()
      setLoading(true); 
      try {
         const response = await addEmployee(data);
         setEmployees((prevEmployees) => [...prevEmployees, response.data]);
         if (data.role === "ROLE_EMPLOYEE") {
            toast.success("Staff successfully added.");
         } else {
            toast.success("Owner successfully added.");
         } 
         setData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: ""
         });
      } catch (error) {
         console.error(error);
         toast.error("Failed to add employee. Please try again.");
      } finally {
         setLoading(false);
      }  
   }

   return (
         <div className="mx-2 mt-2">
         <div className="row">
            <div className="card col-md-12 form-container no-shadow">
               <div className="card-body">
                  <form onSubmit={onSubmitHandler}>
                     <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" 
                           name="firstName"
                           id="firstName"
                           className="form-control"
                           placeholder="Enter your first name"
                           onChange={onChangeHandler}
                           value={data.firstName}
                           required/>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" 
                           name="lastName"
                           id="lastName"
                           className="form-control"
                           placeholder="Enter your last name"
                            onChange={onChangeHandler}
                           value={data.lastName}
                           required/>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" 
                           name="email"
                           id="email"
                           className="form-control"
                           placeholder="name@example.com"
                           onChange={onChangeHandler}
                           value={data.email}
                           required/>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" 
                           name="password"
                           id="password"
                           className="form-control"
                           placeholder="Enter a secure password"
                           onChange={onChangeHandler}
                           value={data.password}
                           required/>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select name="role" id="role" className="form-control" onChange={onChangeHandler} value={data.role}>
                           <option value="">Select account type</option>
                           <option value="ROLE_EMPLOYEE">STAFF</option>
                           <option value="ROLE_OWNER">OWNER</option>
                        </select>
                     </div>
                     <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                        {loading ? "Loading..." : "Save"}
                     </button>
                  </form>
               </div>
            </div>
         </div>
         </div>
   )
}

export default EmployeeForm;