import { useContext } from 'react';
import './Item.css'; 
import { AppContext } from '../../context/AppContext';

const Item = ({itemName, itemPrice, itemImage, itemId}) => { 
   const {addToCart} = useContext(AppContext);

   const handleAddToCart = () => { 
      addToCart({
         name: itemName,
         price: itemPrice,
         quantity: 1,
         itemId: itemId
      });
   }

   return (
      <div className="p-3 bg-white shadow-sm h-100 item-card">
         <div className="mb-3 d-flex justify-content-center" >
            <img src={itemImage} alt={itemName} className="item-image" />
         </div>
         
         <div className="d-flex justify-content-between gap-3 price-div">
            <h6 className="mb-0 itemsDep">{itemName}</h6>
            <p className="mb-0 fw-bold itemsDep">&#8369;{itemPrice}</p>
         </div>
         
         <div className="d-flex justify-content-end">
            <button className="add-button" onClick={handleAddToCart}>
               <i className="bi bi-plus"></i>
            </button>
         </div>
      </div>
   )
}

export default Item; 