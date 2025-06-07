import './DisplayCategory.css';
import Category from '../Category/Category.jsx';
import { assets } from '../../assets/assets.js';

const DisplayCategory = ({ selectedCategory, setSelectedCategory, categories }) => {
   return (
      <div className="d-flex gap-3 overflow-auto flex-nowrap px-3" style={{ width: '100%' }}>

         <Category 
            categoryName="All"
            imageUrl={assets.all}
            numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
            isSelected={selectedCategory === ""}
            onClick={() => setSelectedCategory("")}
         />

         {categories.map(category => (
            <Category
               key={category.categoryId}
               categoryName={category.name}
               imageUrl={category.imageUrl}
               numberOfItems={category.items}
               isSelected={selectedCategory === category.categoryId}
               onClick={() => setSelectedCategory(category.categoryId)}
            />
         ))}
      </div>
   );
};

export default DisplayCategory;
