import axios from "axios";

export const addEmployee = async (employee) => { 
   return await axios.post("http://localhost:8080/api/v1.0/owner/register", employee, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};

export const deleteEmployee = async (id) => { 
   return await axios.delete(`http://localhost:8080/api/v1.0/owner/employees/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};

export const fetchEmployee = async () => { 
   return await axios.get(`http://localhost:8080/api/v1.0/owner/employees`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};


