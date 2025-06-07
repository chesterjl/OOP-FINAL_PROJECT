import { useContext, useState } from 'react';
import './CartSummary.css';
import { AppContext } from '../../context/AppContext';
import ReceiptPopUp from '../ReceiptPopUp/ReceiptPopUp.jsx';
import { createOrder, deleteOrder } from '../../Service/OrderService.js';
import { toast } from 'react-toastify';
import { AppConstants } from '../../util/constants.js';
import { verifyPayment, createRazorpayOrder } from '../../Service/PaymentService.js';


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

   const loadRazorpayScript = () => {
      return new Promise((resolve, receipt) => { 
         const script = document.createElement('script');
         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
      });
   }

   const deleteOrderOnFailure = async (orderId) => { 
      try {
        await deleteOrder(orderId);
      } catch (error) {
         console.error(error); 
         toast.error("Something went wrong.");
      }
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
         } else if (response.status === 201 && paymentMode == "upi") {
            const razorpayLoaded = await loadRazorpayScript();
            
            if (!razorpayLoaded) {
               toast.error("Unable to load razorpay");
               await deleteOrderOnFailure(savedData.orderId);
               return;
            }

            const razorpayResponse = await createRazorpayOrder({
               amount: grandTotal,
               currency: 'PHP'
            });

            savedData.razorpayOrderId = razorpayResponse.data.id;

            const options = {
               key: AppConstants.RAZORPAY_KEY_ID,
               amount: razorpayResponse.data.amount,
               currency: razorpayResponse.data.currency,
               orderId: razorpayResponse.data.id,
               name: "Coffe Shop Management System",
               description: "Order payment",
               handler: async function (response) {
                  await verifyPaymentHandler(response, savedData);
                  
               },
               prefill: {
                  name: customerName,
                  typeOrder: orderType,
                  receivedMoney: moneyReceived
               },
               theme: {
                  color: "#6F4E37"
               },
               modal: {
                  ondismiss: async () => {
                     await deleteOrderOnFailure(savedData.orderId);
                     toast.error("Payment cancelled");
                  }
               },
            };
            const rzp = new window.Razorpay(options); 
            rzp.on("payment.failed", async (response) => {
               await deleteOrderOnFailure(savedData.orderId);
               toast.error("Payment failed");
               console.error(response.error.description);
            });
            rzp.open();
         } 
      } catch (error) {
         console.error(error);
         toast.error("Payment processing failed");
      } finally {
         setIsProcessing(false);
      }
   }

   const verifyPaymentHandler = async (response, savedOrder) => {
      const paymentData = {
         razorpayOrderId: response.razorpay_order_id,
         razorpayPaymentId: response.razorpay_payment_id,
         razorpaySignature: response.razorpay_signature,
         orderId: savedOrder.orderId,
      };

      try {
         const paymentResponse = await verifyPayment(paymentData);
         if (paymentResponse.status === 200) {
            toast.success("Payment successful");
            setOrderDetails({
               ...savedOrder,
               paymentDetails : {
                  razorpayOrderId: response.razorpay_order_id, 
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature
               },
            });
         } else {
            toast.error("Payment processing failed");
         }
      } catch (error) {
         console.error(error);
         toast.error("Payment failed")
      }
    
   };
   
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
            {/* <button className="btn btn-primary flex-grow-1" onClick={() => completePayment("upi")} disabled={isProcessing}>
               {
                  isProcessing ? "Processing..." : "Card"
               }            
            </button> */}
            <button className="btn btn-success flex-grow-1"  onClick={() => completePayment("cash")} disabled={isProcessing}>
               {
                  isProcessing ? "Processing..." : "Cash"
               }
            </button>
         </div>
         <div className='d-flex gap-3 mt-3 '> 
            <button className="flex-grow-1 btn btn-dark"  onClick={placeOrder} disabled={isProcessing || !orderDetails}>
               Print bills
            </button>
         </div>
            {
               showPopup && (
                  <ReceiptPopUp 
                     orderDetails={{
                        ...orderDetails,
                        razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId || orderDetails.razorpayOrderId,
                        razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
                     }}
                     
                     onClose={() => setShowPopup(false)}
                     onPrint={handlePrintReceipt}
                  />
               )
            }

      </div>
   )
}

export default CartSummary;

