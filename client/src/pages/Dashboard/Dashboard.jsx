import { useEffect, useState, useContext } from 'react';
import './Dashboard.css'
import { fetchDashboardData, fetchTotalItem, fetchTotalCategory } from '../../Service/Dashboard.js';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext.jsx';

const Dashboard = () => {
   const {setAuthData, auth} = useContext(AppContext);

   const [data, setData] = useState(null);
   const [totalItems, setTotalItems] = useState(null);
   const [totalCategories, setTotalCategories] = useState(null);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const loadData = async () => {
         try {
            const response = await fetchDashboardData();
            setData(response.data);

            const totalItemsResponse = await fetchTotalItem();
            setTotalItems(totalItemsResponse.data);

            const totalCategoriesResponse = await fetchTotalCategory();
            setTotalCategories(totalCategoriesResponse.data);
         } catch (error) {
            console.error(error);
            toast.error("Unable to view the data")
         } finally {
            setLoading(false);
         }
      }
      loadData();
   }, []);
   
   if (loading) {
      return <div className='loading'>
         Loading Dashboard...
      </div>
   }

   if (!data) {
      return <div className='error'>
         Failed to load the dashboard data...
      </div>
   }

   const personLogIn = auth.role == "ROLE_OWNER" ? "Owner" : "Staff"

   return (
      <div className='dashboard-wrapper'>
         <div className="dashboard-container">
            <h3>Dashboard Overview</h3>
            <p style={{color: 'rgb(85, 85, 85)'}}>Welcome back {personLogIn}!</p>
            <div className="stats-grid">
               <div className="stats-card">
                  <div className="stats-icon top-right">
                     ₱
                  </div>
                  <div className="stats-content">
                     <h3>Today's Sale</h3>
                     <p className="stats-value">₱{data.todaySales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                     <div className="stats-chart green mt-4"></div>
                  </div>
               </div>

               <div className="stats-card">
                  <div className="stats-icon top-right">
                     <i className="bi bi-cart-check"></i>
                  </div>
                  <div className="stats-content">
                     <h3>Today's Orders</h3>
                     <p className="stats-value">{data.todayOrderCount}</p>
                     <div className="stats-chart yellow mt-4"></div>
                  </div>
               </div>

               <div className="stats-card">
                  <div className="stats-icon top-right">
                     <i className="bi bi-box-seam"></i>
                  </div>
                  <div className="stats-content">
                     <h3>Total Items</h3>
                     <p className="stats-value">{totalItems}</p>
                     <div className="stats-chart blue mt-4"></div>
                  </div>
            </div>

            <div className="stats-card">
               <div className="stats-icon top-right">
                  <i className="bi bi-tags"></i>
               </div>
               <div className="stats-content">
                  <h3>Total Categories</h3>
                  <p className="stats-value">{totalCategories}</p>
                  <div className="stats-chart red mt-4"></div>
               </div>
            </div>
            </div>
            <div className='recent-orders-card'>
               <h3 className='recent-orders-title'>
                  <i className="bi bi-clock-history"></i>
                  Recent Orders
               </h3>
               <div className='orders-table-container'>
                  <table className='orders-table'>
                     <thead>
                        <tr>
                           <th>Order ID</th>
                           <th>Customer Name</th>
                           <th>Amount</th>
                           <th>Payment</th>
                           <th>Status Order</th>
                           <th>Date</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.recentOrders.map((order) => (
                           <tr key={order.orderId}>
                              <td>{order.orderId.substring(0, 8)}...</td>
                              <td>{order.customerName}</td>
                              <td>₱{order.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td>
                                 <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>
                                    {order.paymentMethod}
                                 </span>
                              </td>
                              <td> 
                                 <span className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}>
                                    {order.paymentDetails.status} 
                                 </span>
                              </td>
                              <td>
                                 {new Date(order.createdAt).toLocaleDateString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',              
                                 })}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;