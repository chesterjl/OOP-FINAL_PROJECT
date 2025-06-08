import './UpdateItem.css'
import UpdateItemForm from '../../components/UpdateItemForm/UpdateItemForm.jsx';
import UpdateItemList from '../../components/UpdateItemList/UpdateItemList.jsx';

const UpdateItem = () => {
   return (
      <div className="items-container text-light">
         <div className="left-column">
            <UpdateItemForm />
         </div>
         <div className="right-column">
            <UpdateItemList />
         </div>
      </div>
   )
}

export default UpdateItem;