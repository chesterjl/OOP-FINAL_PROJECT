import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { updateCategory } from "../../Service/CategoryService.js";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

const UpdateCategoryForm = () => {
   const { categories, setCategories } = useContext(AppContext);
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState(false);
   const [data, setData] = useState({
      name: '',
      newName: '',
      description: ''
   });

   useEffect(() => {
      console.log(data);
   }, [data]);

   const onChangeHandler = (e) => {
         const value = e.target.value;
         const newName = e.target.name;
         setData((data) => ({...data, [newName]: value}));  
   };

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      if (!image) {
         toast.error("Please select an image for category");
         return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("category", JSON.stringify(data));
      formData.append("file", image);

      try {
         const response = await updateCategory(formData);
         if (response.status === 200) {
         setCategories(categories.map(cat =>
            cat.name === data.name ? response.data : cat
         ));
         toast.success("Category successfully updated.");
         setData({
            name: '',
            newName: '',
            description: ''
         });
         setImage(false);
         }
      } catch (error) {
         console.error(error);
         toast.error("Failed to update category");
      } finally {
         setLoading(false);
      }
   };

   return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container no-shadow">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48} />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Select Coffee Category to update
                </label>
                <select
                  name="name"
                  id="name"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                >
                  <option value="">Choose a category to update from the list</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="newName" className="form-label">New Category Name</label>
                <input
                  type="text"
                  name="newName"
                  id="newName"
                  className="form-control"
                  placeholder="Enter the updated category name"
                  onChange={onChangeHandler}
                  value={data.newName}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea rows="5"
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Describe the category (flavor, notes, etc.)"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-dark mt-3 w-100">
                {loading ? "Loading..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
