import './UpdateCategory.css';
import UpdateCategoryForm from '../../components/UpdateCategoryForm/UpdateCategoryForm';
import UpdateCategoryList from '../../components/UpdateCategoryList/UpdateCategoryList';

const UpdateCategory = () => {
   return (
      <div className="category-container text-light">
         <div className="left-column">
            <UpdateCategoryForm />
         </div>
         <div className="right-column">
            <UpdateCategoryList />
         </div>
      </div>
   )
}

export default UpdateCategory;