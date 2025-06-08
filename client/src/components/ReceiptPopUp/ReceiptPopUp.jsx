import './ReceiptPopUp.css';
import './Print.css'; 

const ReceiptPopUp = ({ orderDetails, onClose, onPrint }) => { 
   
   const isTaxApply = orderDetails.orderType == "For here" ? true : false;
   
   return (
      <div className="receipt-popup-overlay text-dark">
         <div className="receipt-popup rounded shadow-sm p-4 bg-white">
            <div className="text-center mb-3">
               <i className="bi bi-cart-check-fill text-dark fs-1"></i>
               <h3 className="mt-2">Order Receipt</h3>
            </div>

            <div className="mb-3">
               <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
               <p><strong>Name:</strong> {orderDetails.customerName}</p>
               <p><strong>Order Type:</strong> {orderDetails.orderType}</p>
               <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
            </div>

            <hr className="my-3"/>

            <div className="mb-3">
               <h5 className="mb-3">Items Ordered</h5>
               <div className="cart-items-scrollable">
                  {orderDetails.items.map((item, index) => (
                     <div key={index} className="d-flex justify-content-between mb-2">
                        <span>{item.name} x{item.quantity}</span>
                        <span>&#8369;{(item.price * item.quantity).toFixed(2)}</span>
                     </div>
                  ))}
               </div>
            </div>

            <hr className="my-3" />

            <div className="mb-3">
               <div className="d-flex justify-content-between mb-2">
                  <span><strong>Subtotal:</strong></span>
                  <span>&#8369;{(orderDetails.grandTotal - orderDetails.tax).toFixed(2)}</span>
               </div>
               {isTaxApply && (
                  <div className="d-flex justify-content-between mb-2">
                     <span><strong>Tax (10%):</strong></span>
                     <span>&#8369;{orderDetails.tax.toFixed(2)}</span>
                  </div>
               )}
               <div className="d-flex justify-content-between mb-2">
                  <span><strong>Grand Total:</strong></span>
                  <span>&#8369;{orderDetails.grandTotal.toFixed(2)}</span>
               </div>
               <div className="d-flex justify-content-between mb-2">
                  <span><strong>Money Received:</strong></span>
                  <span>&#8369;{orderDetails.moneyReceived.toFixed(2)}</span>
               </div>
               <div className="d-flex justify-content-between mb-2">
                  <span><strong>Change:</strong></span>
                  <span>&#8369;{(orderDetails.moneyReceived - orderDetails.grandTotal).toFixed(2)}</span>
               </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-4">
               <button className="btn btn-warning" onClick={onPrint}>Print Receipt</button>
               <button className="btn btn-danger" onClick={onClose}>Close</button>
            </div>
         </div>
      </div>
   );
};

export default ReceiptPopUp;
