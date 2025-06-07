import { toast } from 'react-toastify';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import './ManageEmployee.css';
import { useState, useEffect } from 'react';
import { fetchEmployee } from '../../Service/EmployeeService'

const ManageEmployee = () => { 

   const [employees, setEmployees] = useState([]); 
   const [loading, setLoading] = useState(true);
   
    useEffect(() => {
      async function loadEmployees() { 
         try {
            setLoading(true);
            const response = await fetchEmployee();
            setEmployees(response.data );
         } catch (error) {
            console.error(error);
            toast.error("Unable to fetch employees.");
         } finally {
            setLoading(false);
         }
      }
      loadEmployees ();
   }, []); 

   return (
      <div className="employee-container text-light">
         <div className="left-column">
            <EmployeeForm setEmployees={setEmployees} />

         </div>
         <div className="right-column">
            <EmployeeList employees={employees} setEmployees={setEmployees}   />
         </div>
      </div>
   );
}

export default ManageEmployee;