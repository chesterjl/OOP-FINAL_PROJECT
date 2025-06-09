import { useEffect, useState } from 'react';
import './OrderHistory.css';
import { latestOrders } from '../../Service/OrderService';

const OrderHistory = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await latestOrders();
            setOrders(response.data);
         } catch (error) {
            console.error(error);
         } finally {
            setLoading(false);
         }
      }
      fetchOrders(); 
   }, []);

   const formatItems = (items) => {
      return items.map((item) => `${item.name} x ${item.quantity}`).join(", ");
   }

   const formateDate = (dateString) => {
      const options = {
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
      }
      return new Date(dateString).toLocaleDateString('en-US', options);
   }

   if (loading) {
      return <div className="text-center py-4">
         Loading orders...
      </div>
   }

   if (orders.length === 0) {
      return <div className="text-center py-4">
         No orders found
      </div>
   }

   return (
      <div className="orders-history-container">
         <h2 className='mb-2 text-dark'>Orders History</h2>
         <div className="table-responsive">
            <table className='table table-striped table-hover'>
               <thead className='table-dark'>
                  <tr>
                     <th>Order Id</th>
                     <th>Customer Name</th>
                     <th>Order Mode</th>
                     <th>Items</th>
                     <th>Total</th>
                     <th>Status</th>
                     <th>Date</th>
                  </tr>
               </thead>
               <tbody>
                  {orders.map(order => (
                     <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.customerName}</td>
                        <td>{order.orderType}</td>
                        <td>{formatItems(order.items)}</td>
                        <td>₱{order.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td>
                           <span className="badge bg-black border border-white">
                              {order.paymentDetails?.status || "PENDING"}
                           </span>                      
                        </td>
                        <td>{formateDate(order.createdAt)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default OrderHistory;