import { useContext, useState } from "react";
import { assets } from '../../assets/assets';
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { updateItem } from "../../Service/ItemService.js";
import './UpdateItemForm.css';

const UpdateItemForm = () => { 
   const {categories, itemsData, setItemsData, setCategories} = useContext(AppContext);
   const [image, setImage] = useState(false);
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      name: '',
      categoryId: '',
      newName: '',
      price: '',
      description: ''
   });


   const onChangeHandler = (e) => { 
      const value = e.target.value;
      const newName = e.target.name;
      setData((data) => ({...data, [newName]: value}));  
   }

   const onSubmitHandler = async (e) => { 
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append('item', JSON.stringify(data));
      formData.append('file', image);
      try {
         if(!image) {
            toast.error("Please select an image.");
            return;
         }
         const response = await updateItem(formData);
         if (response.status === 200) {
            setItemsData(itemsData.map(item => item.name === data.name ? {...response.data,imageUrl: `${response.data.imageUrl}?t=${Date.now()}`} : item));        
            setCategories((prevCategories) => 
            prevCategories.map((category) => category.categoryId === data.categoryId ? {...category, items: category.items + 1} : category));
            toast.success("Item updated successfully.");
            setData({
               name: '',
               newName: '',
               categoryId: '',
               price: '',
               description: ''
            });
            setImage(false);
         } else {
            toast.error("Failed to update item. Please try again.");
         }
      } catch (error) {
         console.error(error);
         toast.error("Failed to update item. Please try again.");
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className="items-form-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
         <div className="mx-2 mt-2">
            <div className="row">
               <div className="card col-md-12 form-container no-shadow">
                  <div className="card-body">
                     <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                           <label htmlFor="image" className="form-label">
                              <img src={image ?  URL.createObjectURL(image) : assets.upload} alt="" width={48}/>
                           </label>
                           <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="name" className="form-label"> 
                              Select Coffee to Update	
                           </label>
                          <select name="name" id="name" className="form-control" onChange={onChangeHandler} value={data.name} required>
                              <option value="">Please choose a coffee from the list</option>
                              {itemsData.map((item, index) => (
                                 <option key={index} value={item.name}>{item.name}</option>
                              ))}
                              </select>
                           </div>
                           <div className="mb-3">
                           <label htmlFor="newName" className="form-label">New Coffee Name</label>
                           <input type="text" 
                              name="newName"
                              id="newName"
                              className="form-control"
                              placeholder="Enter the updated name"
                              onChange={onChangeHandler}
                              value={data.newName}
                              required
                              /> 
                        </div>
                        <div className="mb-3">
                           <label htmlFor="category" className="form-label"> 
                              Coffee Type
                           </label>
                           <select name="categoryId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId} required>
                              <option value="">Select type (e.g., Latte, Macchiato, Espresso)</option>
                              {categories.map((category, index) => (
                                 <option key={index} value={category.categoryId}>{category.name}</option>

                              ))}
                           </select>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" name="price" id="price" className="form-control" placeholder="&#8369;200.00" onChange={onChangeHandler} value={data.price} required/>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="description" className="form-label">Description</label>
                           <textarea rows="5" 
                              name="description"
                              id="description"
                              className="form-control"
                              placeholder="Describe the coffee (flavor, notes, etc.)"
                              onChange={onChangeHandler}
                              value={data.description}>
                           </textarea>
                           <button type="submit" className="btn btn-dark mt-3 w-100" disabled={loading}> {loading ? "Loading..." : "Update"}</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UpdateItemForm;