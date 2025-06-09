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
                  <div key={index} className="cart-item mb-3 p-3 bg-white rounded d-flex align-items-center justify-content-between">
                     {/* Left: Image */}
                     <div style={{ flexShrink: 0, maxWidth: '150px', marginRight: '15px' }}>
                        <img
                           src={item.imageUrl}
                           alt={item.name}
                           style={{ width: '70px', height: '60px', borderRadius: '8px' }}
                        />
                     </div>

                     <div style={{ flexGrow: 1 }}>
                        <h6 className='mb-1 mb-2'  style={{ color: '#77787a' }}>{item.name}</h6>
                        <p className='mb-0 font-clr fw-bold'>&#8369;{(item.price * item.quantity).toFixed(2)}</p>
                     </div>

                     <div>
                        <div className="d-flex align-items-center gap-2 ">
                           <button
                           className="btn btn-outline-warning fw-bold btn-sm rounded-circle"
                           onClick={() => {
                              if (item.quantity - 1 === 0) {
                                 removeFromCart(item.itemId);
                              } else {
                                 updateQuantity(item.itemId, item.quantity - 1);
                              }
                           }}
                           >
                           <i className="bi bi-dash"></i>
                           </button>
                           <span className='font-clr' style={{fontSize: '14px'}}>{item.quantity}</span>
                           <button
                           className="btn btn-outline-warning btn-sm rounded-circle"
                           onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                           >
                           <i className='bi bi-plus fw-bold'></i>
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default CartItems;