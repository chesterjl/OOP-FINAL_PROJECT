import './Category.css';

const Category = ({ categoryName, imageUrl, numberOfItems, isSelected, onClick }) => {
   return (
      <div
         className="d-flex align-items-center p-3 rounded gap-1 position-relative category-hover"
         style={{
            cursor: 'pointer',
            backgroundColor: isSelected ? '#1a1a1a' : 'transparent'
         }}
         onClick={onClick}
      >
         <div>
            <h6
               className='mb-0'
               style={{ color: isSelected ? 'white' : '#1a1a1a' }}
            >
               {categoryName}
            </h6>
         </div>
         {isSelected && <div className="active-category"></div>}
      </div>
   );
};

export default Category;
