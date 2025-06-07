import "./CategoryList.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteCategory } from "../../Service/CategoryService.js";
import { toast } from "react-toastify";


const CategoryList = () => { 
   const {categories, setCategories} = useContext(AppContext);
   const [searchTerm, setSearchTerm] = useState("");

   const filteredCategories = categories.filter(category => 
         category.name.toLowerCase().includes(searchTerm.toLowerCase()));

   const deleteByCategoryId = async (categoryId) => {
      try {
         const response = await deleteCategory(categoryId);
         if (response.status === 204) {
            const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
            setCategories(updatedCategories);
            toast.success("Category deleted successfully");    
         } else {
            toast.error("Failed to delete category");
         }
      } catch (error) {
         console.error( error);
         toast.error("Server error: Failed to delete category");
      }
   }
         
   return (
  <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="row pe-2">
        <div className="col-12">
          <div className="input-group mb-3">
            <span className="input-group-text bg-light">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              name="keyword"
              id="keyword"
              placeholder="Search for category"
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
      </div>

      <div className="row g-3 px-2">
        {filteredCategories.map((category, index) => (
            <div className="card p-3 no-shadow" style={{ backgroundColor: 'white' }}>
              <div className="d-flex align-items-center">
                <div style={{ marginRight: '15px' }}>
                  <img src={category.imageUrl} alt={category.name} className="image-category" />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 fnt-clr">{category.name}</h5>
        
                </div>
                <div>
                  <button className="btn btn-dark btn-sm" onClick={() => deleteByCategoryId(category.categoryId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
  </div>
);

} 

export default CategoryList;