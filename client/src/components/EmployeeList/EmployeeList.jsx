import { useState } from "react";
import { deleteEmployee } from "../../Service/EmployeeService";
import { toast } from "react-toastify";

const EmployeeList = ({employees, setEmployees}) => { 
   
   const [searchTerm, setSearchTerm] = useState("");

   const filteredEmployees = employees.filter(employee => 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const deleteByEmployeeId = async (id) => {
      try {
         const employeeToDelete = employees.find(emp => emp.employeeId === id);

         if (!employeeToDelete) {
            toast.error("Employee not found.");
            return;
         }

         await deleteEmployee(id);

         setEmployees(prevEmployees => 
            prevEmployees.filter(employee => employee.employeeId !== id)
         );

         if (employeeToDelete.role === "ROLE_EMPLOYEE") {
            toast.success("Staff successfully deleted.");
         } else {
            toast.success("Owner successfully deleted.");
         } 
         
      } catch (error) {
         console.error(error);
         toast.error("Failed to delete the employee.");
      }
   };
      
   return (
      <div className="category-list-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
         <div className="row pe-2">
            <div className="input-group mb-3">
               <span className="input-group-text bg-light">
                  <i className="bi bi-search">
                  </i>
               </span>
               <input type="text" name="keyword" id="keyword" placeholder="Search by keyword" className="form-control"
                     onChange={(e) => setSearchTerm(e.target.value)}
                     value={searchTerm}/>

            </div>
         </div>
         <div className="row g-3 pe-2">
            {
               filteredEmployees.map((employee) => (
                        <div className="card p-3 bg-white mx-2 rounded no-shadow" style={{ width: '97%' }}>
                           <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                 <h5 className="mb-1 fnt-clr">{employee.firstName} {employee.lastName} </h5>
                                   <p className="mb-0 fnt-clr">Email: {employee.email}</p>
                                 <p className="mb-0 fnt-clr">Role: {employee.role == "ROLE_EMPLOYEE" ? "Staff" : "Owner"}</p>
                              </div>
                              <div>
                                    <button className="btn btn-dark btn-sm" onClick={() => deleteByEmployeeId(employee.employeeId)}>
                                    <i className="bi bi-trash"></i> 
                                    </button>
                              </div>
                           </div>
                        </div>
                  ))}
          </div>   
      </div>
   );
}

export default EmployeeList;