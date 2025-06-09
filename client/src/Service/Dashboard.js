import axios from "axios";


export const fetchDashboardData = async () => {
   return await axios.get("http://localhost:8080/api/v1.0/dashboard", {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
} 


export const fetchTotalItem = async () => {
   return await axios.get("http://localhost:8080/api/v1.0/total-items", {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
} 

export const fetchTotalCategory = async () => {
   return await axios.get("http://localhost:8080/api/v1.0/total-categories", {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
} 