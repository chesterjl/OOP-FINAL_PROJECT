import './SearchBox.css'

import { useState, useContext } from 'react';

const SearchBox = ({onSearch}) => { 
   const [searchText, setSearchText] = useState('');

   const handleInputChange = (e) => { 
      const text = e.target.value;
      setSearchText(text);
      onSearch(text); 
   }
   
   return (
      <div className="input-group mb-3">
         <span className="input-group-text">
            <i className="bi bi-search"></i>
         </span>
         <input type="text" className="form-control" id="itemsb"placeholder="Search for cofee, food etc" value={searchText} onChange={handleInputChange} />
      </div>
   )
}

export default SearchBox;