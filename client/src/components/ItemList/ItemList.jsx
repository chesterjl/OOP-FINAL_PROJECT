import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../Service/ItemService";
import { toast } from "react-toastify";
import './ItemList.css'; 

const ItemList = () => { 

   const {itemsData, setItemsData} = useContext(AppContext);

   const [searchTerm, setSearchTerm] = useState('');
   const filteredItems = itemsData.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
   });

   const removeItem = async (itemId) => {
      try {
         const response = await deleteItem(itemId);
         if (response.status === 204) {
            const updatedItems = itemsData.filter(item => item.itemId !== itemId);
            setItemsData(updatedItems);
            toast.success("Item successfully deleted.");
         } else {
            toast.error("Failed to delete item.");
         }

      } catch (error) {
         console.error(error);
         toast.error("Server error: failed to delete item.");
      }
    }

   return (
      <div className="category-list-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
      <div style={{ width: '100%' }}>
         <div className="row pe-2">
            <div className="input-group mb-3">
            <span className="input-group-text bg-light">
               <i className="bi bi-search"></i>
            </span>
            <input
               type="text"
               name="keyword"
               id="keyword"
               placeholder="Search for coffee, food etc"
               className="form-control"
               onChange={(e) => setSearchTerm(e.target.value)}
               value={searchTerm}
            />

            </div>
         </div>

         <div className="row g-3 p-2">
            {filteredItems.map((item) => (
               <div className="card p-3 bg-white col-12 no-shadow">
                  <div className="d-flex align-items-center">
                  <div style={{ marginRight: '15px' }}>
                     <img src={item.imageUrl || "/fallback.png"} alt={item.name} className="image-item" />
                  </div>
                  <div className="flex-grow-1">
                     <h6 className="mb-1 fnt-clr">{item.name}</h6>
                     <p className="mb-0 fnt-clr">Category: {item.categoryName}</p>
                     <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                        &#8369;{item.price}
                     </span>
                  </div>
                  <div>
                     <button className="btn btn-dark btn-sm" onClick={() => removeItem(item.itemId)}>
                        <i className="bi bi-trash"></i>
                     </button>
                  </div>
                  </div>
               </div>
            ))}
         </div>
         </div>
      </div>

   )

}

export default ItemList;