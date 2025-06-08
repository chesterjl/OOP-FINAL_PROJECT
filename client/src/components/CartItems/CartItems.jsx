import './CartItems.css';  
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CartItems = () => { 
   const {cartItems, removeFromCart, updateQuantity} = useContext(AppContext);
   
   return (
      <div className="p-3 h-100 overflow-y-auto">
         {cartItems.length === 0 ? (
            <p className='font-clr'>
               No brews queued up yet.
            </p>
         ) : (
            <div className="cart-items-list">
               <h3 className='text-dark fw-bold'>
                  Order Details
               </h3>
               {cartItems.map((item, index) => (
                  <div key={index} className="cart-item mb-3 p-3 bg-white rounded">
                     <div>{item.imageUrl}</div>
                     <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className='mb-0 font-clr'>{item.name}</h6>
                        <p className='mb-0 font-clr'>&#8369;{(item.price * item.quantity).toFixed(2)}</p>
                     </div>
                     <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                           <button className="btn btn-danger btn-sm" onClick={() => updateQuantity(item.itemId, item.quantity - 1)} disabled={item.quantity === 1} >
                              <i className="bi bi-dash"></i>
                           </button>
                           <span className='font-clr'>{item.quantity}</span>
                           <button className="btn btn-primary btn-sm" onClick={() => updateQuantity(item.itemId, item.quantity + 1)}>
                              <i className='bi bi-plus'></i>
                           </button>
                        </div>
                        <button className="btn btn-danger btn-sm" style={{width: 'auto'}} onClick={() => removeFromCart(item.itemId)}>
                           <i className="bi bi-trash"></i>
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default CartItems;