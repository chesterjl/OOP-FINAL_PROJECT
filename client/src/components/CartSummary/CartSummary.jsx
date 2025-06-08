import { useContext, useState } from 'react';
import './CartSummary.css';
import { AppContext } from '../../context/AppContext';
import ReceiptPopUp from '../ReceiptPopUp/ReceiptPopUp.jsx';
import { createOrder, deleteOrder } from '../../Service/OrderService.js';
import { toast } from 'react-toastify';

const CartSummary = ({customerName, setCustomerName, orderType, setOrderType, moneyReceived, setMoneyReceived}) => { 

   const {cartItems, clearCart}  = useContext(AppContext)

   const [isProcessing, setIsProcessing] = useState(false); 
   const [orderDetails, setOrderDetails] = useState(null);
   const [showPopup, setShowPopup] = useState(false);

   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
   const subTotal = totalAmount;
   const tax = totalAmount * 0.05;
   const grandTotal = totalAmount + tax;
   
   const clearAll = () => {
      setCustomerName("");
      setOrderType("");
      setMoneyReceived("");
      clearCart();
   }

   const placeOrder = () => {
      setShowPopup(true);
      clearAll();
   };

   const handlePrintReceipt = () => {
      window.print();
   }

   const completePayment = async (paymentMode) => {
      
      if (!customerName || !orderType || !moneyReceived) {
         toast.error("Please enter customer details");
         return;
      }

      if (moneyReceived < grandTotal) {
         toast.error("Total exceeds the amount received.");
         return;
      }

      if (cartItems.length === 0) {
         toast.error("Cart is empty. Please add items to proceed.");
         return;
      }
      const orderData = {
         customerName,
         orderType,
         moneyReceived,
         cartItems,
         subTotal: totalAmount,
         tax,
         grandTotal,
         paymentMethod: paymentMode.toUpperCase()
      }

      setIsProcessing(true);

      try {
         const response = await createOrder(orderData);
         const savedData = response.data;
         if (response.status === 201 && paymentMode === "cash") {
            toast.success("Cash received");
            setOrderDetails(savedData);
         }
      } catch (error) {
         console.error(error);
         toast.error("Payment processing failed");
      } finally {
         setIsProcessing(false);
      }
   }

   return (
      <div className="mt-2">
         <div className="cart-summary-details">
            <div className="d-flex justify-content-between mb-2">
               <span className="fnt-clr">Subtotal</span>
               <span className='fnt-clr'>&#8369;{subTotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
               <span className="fnt-clr-tax">Tax (5%)</span>
               <span className="fnt-clr-tax">&#8369;{tax.toFixed(2)}</span>
            </div>

            <hr className="custom-hr" />
            <div className="d-flex justify-content-between mb-4 fw-bold">
               <span className="fnt-clr">Total</span>
               <span className="fnt-clr">&#8369;{grandTotal.toFixed(2)}</span>
            </div>
         </div>
         
         <div className="d-flex gap-3">
            <button className="btn btn-success flex-grow-1" onClick={() => completePayment("cash")} disabled={isProcessing}>
               {isProcessing ? "Processing..." : "Cash"}
            </button>
         </div>
         <div className='d-flex gap-3 mt-3'> 
            <button className="flex-grow-1 btn btn-dark" onClick={placeOrder} disabled={isProcessing || !orderDetails}>
               Print bills
            </button>
         </div>
         {
            showPopup && (
               <ReceiptPopUp 
                  orderDetails={orderDetails}
                  onClose={() => setShowPopup(false)}
                  onPrint={handlePrintReceipt}
               />
            )
         }
      </div>
   )
}

export default CartSummary;
