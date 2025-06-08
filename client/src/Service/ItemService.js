import axios from "axios";


export const addItem = async (item) => { 
   return await axios.post("http://localhost:8080/api/v1.0/owner/items", item, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}) 
}

export const deleteItem = async (itemId) => { 
   return await axios.delete(`http://localhost:8080/api/v1.0/owner/items/${itemId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}) 
}


export const fetchItems = async () => { 
   return await axios.get(`http://localhost:8080/api/v1.0/items`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}) 
}

export const updateItem = async (item) => { 
   return await axios.put(`http://localhost:8080/api/v1.0/owner/update/item`, item, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}) 
}




