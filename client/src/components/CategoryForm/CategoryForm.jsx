import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { addCategory } from "../../Service/CategoryService.js";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

const CategoryForm = props => { 

   const {categories, setCategories} = useContext(AppContext)
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState(false);
   const [data, setData] = useState({
      name: '',
      description: ''
   }); 

   useEffect(() => {
      console.log(data);
      
   }, [data]);

   const onChangeHandler = (e) => { 
      const value = e.target.value;
      const name = e.target.name; 
      setData((data) => ({...data, [name]: value})); 

   }

   const onSubmitHandler = async (e) => { 
      e.preventDefault();
      if(!image) {
         toast.error('Please select an image for category');
         return;
      }
      setLoading(true); 
      const formData = new FormData();
      formData.append('category', JSON.stringify(data));
      formData.append('file', image);
      try {
         const response = await addCategory(formData)
         if (response.status === 201) { 
            setCategories([...categories, response.data]);
            toast.success('Category successfully added.');
            setData({
               name: '',
               description: ''
            });
            setImage(false);
         }
      } catch (error) {
         console.error(error);
         toast.error('Failed to add category');
      } finally {
         setLoading(false);
      }
   }


   return (
      <div className="mx-2 mt-2">
         <div className="row">
            <div className="card col-md-12 form-container no-shadow">
               <div className="card-body">
                  <form onSubmit={onSubmitHandler}>
                     <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                           <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48}/>
                        </label>
                        <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" 
                           name="name"
                           id="name"
                           className="form-control"
                           placeholder="Category Name"
                           onChange={onChangeHandler}
                           value={data.name}
                           required/>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea rows="5" 
                           name="description"
                           id="description"
                           className="form-control"
                           placeholder="Write content here.."
                           onChange={onChangeHandler}
                           value={data.description}>
                        </textarea>
                        <button type="submit" disabled={loading} className="btn btn-dark mt-3 w-100">{loading ? "Loading..." : "Submit  "}</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   ) 
} 

export default CategoryForm;