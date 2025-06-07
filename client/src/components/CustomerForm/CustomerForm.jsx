import './CustomerForm.css';

const CustomerForm = ({ customerName, setCustomerName, orderType, setOrderType, moneyReceived, setMoneyReceived}) => {
   
   return (
      <div className="p-3" style={{color: '#1a1a1a'}}>
         <div className="mb-3">
            <div className="d-flex align-items-center gap-2">
               <label htmlFor="customerName" className="col-4">Customer Name</label>
               <input
                  type="text"
                  className="form-control form-control-sm"
                  id="customerName"
                  onChange={(e) => setCustomerName(e.target.value)}
                  value={customerName}
                  required
               />
            </div>
         </div>

         <div className="mb-3">
            <div className="d-flex align-items-center gap-2">
               <label htmlFor="money" className="col-4">Money Received</label>
               <input
                  type="number"
                  className="form-control form-control-sm"
                  id="money"
                  value={moneyReceived}
                  onChange={(e) => setMoneyReceived(e.target.value)}
                  placeholder="₱200.00"
                  required/>
            </div>
         </div>
         <div className="mb-3">
            <div className="d-flex align-items-center gap-2">
               <label htmlFor="orderType" className="col-4">Order Mode</label>
               <select
                  id="orderType"
                  className="form-control form-control-sm"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  required>
                  <option value="">Select Order Mode</option>
                  <option value="For Here">For here</option>
                  <option value="To-go">To-go</option>
               </select>
            </div>
         </div>
      </div>
   );
};

export default CustomerForm;
