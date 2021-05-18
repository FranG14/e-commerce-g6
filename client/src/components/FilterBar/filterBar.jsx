import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import './filterBar.css';
import { filterByName, filterByPrice } from "../../redux/actions/filters_actions";
function FilterBar(){
  const dispatch = useDispatch();
  const [filterName,setFilterName] = React.useState(null);
  const [filter, setFilter] = React.useState(null);
  const [minPrice,setMinPrice] = React.useState(null);
  const [maxPrice,setMaxPrice] = React.useState(null);
  const [applyFilter,setApplyFilter] = React.useState(false);

  let productsArray = useSelector((state) => state.productsReducer.allProducts);

  function handleMinPrice(e){
    setMinPrice(e.target.value)
    setFilter(e.target.name);
  }

  function handleMaxPrice(e){
    setMaxPrice(e.target.value)
    setFilter(e.target.name);
  }

  function handleOnClick(e){
    setFilterName(e.target.innerText);
    setFilter(e.target.id);
  }

  function handleSubmit(){
    if(!minPrice && !maxPrice && filterName){
      //el primer parametro es el nombre de filtrado ej: brand,size,color,genre
      //el segundo parametro es el tipo de filtrado ej:nike,small,red,men 
      dispatch(filterByName(filter,filterName));
    }
    if(!filterName && minPrice && !maxPrice){
      dispatch(filterByPrice(null,minPrice))
    }
    if(!filterName && !minPrice && maxPrice){
      dispatch(filterByPrice(maxPrice))
    }
    if(!filterName && minPrice && maxPrice){
      dispatch(filterByPrice(maxPrice,minPrice))
    }
  }
return(
<div>
{(filter || minPrice || maxPrice) &&
  <button onClick = {handleSubmit} className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">Apply Filter</button>}
<div className="group inline-block">
  <button
    className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
  >
    <span className="pr-1 font-semibold flex-1">Filters</span>
    <span>
      <svg
        className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </span>
  </button>
 {/* primer filtro Talle */}
  <ul
    className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
  >
    <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
      <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Size</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        {/* <a href = {`/filter-by-size/${filterName}`}> */}
        <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100"> 
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
           
            <span onClick = {handleOnClick} id = "size" className="pr-1 flex-1">Small</span>
            <span className="mr-auto">
            </span>
          </button>
        </li>
        
        <li onClick = {handleOnClick} id = "size" className="px-3 py-1 hover:bg-gray-100">Medium</li>
        <li onClick = {handleOnClick} id = "size" className="px-3 py-1 hover:bg-gray-100">Large</li>
        
        {/* </a> */}
      </ul>
    </li>

  {/* segundo filtro Brand */}
    <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
      <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Brand</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        {/* <a href = {`/filter-by-stock/${filterName}`}> */}
        <li onClick = {handleOnClick} id ="brand" className="px-3 py-1 hover:bg-gray-100">Nike</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
            <span onClick = {handleOnClick} id = "brand" className="pr-1 flex-1">Adidas</span>
            <span className="mr-auto">
            </span>
          </button>
        </li>
        <li onClick = {handleOnClick} id ="brand" className="px-3 py-1 hover:bg-gray-100">Puma</li>
        {/* </a> */}
      </ul>
    </li>
{/* Tercer filtro Genero */}
    <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
      <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Genre</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        {/* <a href = {`/filter-by-genre/${filterName}`}> */}
        <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
            <span onClick = {handleOnClick} id ="genre" className="pr-1 flex-1">Men</span>
            <span className="mr-auto">
            </span>
          </button>
        </li>
        <li onClick = {handleOnClick} id ="genre" className="px-3 py-1 hover:bg-gray-100">Woman</li>
        <li onClick = {handleOnClick} id ="genre" className="px-3 py-1 hover:bg-gray-100">Unisex</li>
        <li onClick = {handleOnClick} id ="genre" className="px-3 py-1 hover:bg-gray-100">Boys</li>
        <li onClick = {handleOnClick} id ="genre" className="px-3 py-1 hover:bg-gray-100">Girls</li>
        {/* </a> */}
      </ul>
    </li>

{/* cuarto filtro Precio */}
    <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
      <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Price</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        {/* <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
            <a href = {`/filter-by-price/${filterName}`}>
            <span onClick = {handleOnClick} className="pr-1 flex-1">Asc</span>
            <span className="mr-auto">
            </span>
          </a>
          </button>
        </li> */}
        <input onChange = {handleMinPrice} name="price" placeholder = "Minimum" className="px-3 py-1 hover:bg-gray-100"/>
        <input onChange = {handleMaxPrice} name="price" placeholder = "Maximum" className="px-3 py-1 hover:bg-gray-100"/>
        
      </ul>
    </li>
  </ul>
</div>
  
</div>
)}

export default FilterBar;
