import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import './filterBar.css';
import { filterByBrand, filterByName, filterByPrice, filterBySize } from "../../redux/actions/filters_actions";
import { getCategories } from '../../redux/actions/category_actions';


function FilterBar() {
  const dispatch = useDispatch();
  const [filterName, setFilterName] = React.useState({ brand: "", size: "", genre: "", price: "", category: "" });
  const [filter, setFilter] = React.useState(null);
  const [applyFilter, setApplyFilter] = React.useState(false);

  const categoryArray = useSelector(
    (state) => state.categoriesReducer.categories.list.categories
  );
  let productsArray = useSelector((state) => state.productsReducer.allProducts);

  useEffect(() => {
    dispatch(getCategories())
  }, [filterName])


  function handleOnClick(e) {
    setFilterName({ ...filterName, [e.target.id]: e.target.innerText });
    setFilter(e.target.id);

    console.log(filterName)
  }


  function handleSubmit() {
    dispatch(filterByBrand(filterName))

  }

  return (
    <div id ="responsiveFilter" className="flex w-80 bg-gray-200 pt-4 pb-4 gap-4 justify-center">

      < div className="group inline-block " >
        <button
          className="outline-none focus:outline-none border px-3 py-1  bg-white rounded-sm flex items-center min-w-32"
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

                  <span onClick={handleOnClick} name="size" id="size" className="pr-1 flex-1">Small</span>
                  <span className="mr-auto">
                  </span>
                </button>
              </li>

              <li onClick={handleOnClick} id="size" name="size" className="px-3 py-1 hover:bg-gray-100">Medium</li>
              <li onClick={handleOnClick} id="size" name="size" className="px-3 py-1 hover:bg-gray-100">Large</li>

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
              <li onClick={handleOnClick} id="brand" name="brand" className="px-3 py-1 hover:bg-gray-100">Nike</li>
              <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                <button
                  className="w-full text-left flex items-center outline-none focus:outline-none"
                >
                  <span onClick={handleOnClick} id="brand" name="brand" className="pr-1 flex-1">Adidas</span>
                  <span className="mr-auto">
                  </span>
                </button>
              </li>
              <li onClick={handleOnClick} id="brand" name="brand" className="px-3 py-1 hover:bg-gray-100">Puma</li>
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
                  <span onClick={handleOnClick} id="genre" className="pr-1 flex-1">Men</span>
                  <span className="mr-auto">
                  </span>
                </button>
              </li>
              <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Woman</li>
              <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Unisex</li>
              <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Boys</li>
              <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Girls</li>
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
              <li onClick={handleOnClick} id="price" name="price" className="px-3 py-1 hover:bg-gray-100">ASC</li>
              <li onClick={handleOnClick} id="price" name="price" className="px-3 py-1 hover:bg-gray-100">DESC</li>
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

            </ul>
          </li>
          <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
            <button
              className="w-full text-left flex items-center outline-none focus:outline-none"
            >
              <span className="pr-1 flex-1">Category</span>
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
              <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                <button
                  className="w-full text-left flex items-center outline-none focus:outline-none"
                >

                  <span className="mr-auto">
                  </span>
                </button>
              </li>
              {(categoryArray && categoryArray.length > 0) ?
                categoryArray.map(category => {
                  return <li onClick={handleOnClick} id="category" className="cursor-pointer px-3 py-1 hover:bg-gray-100">{category.name}</li>
                }) : ""}

            </ul>
          </li>


        </ul>

      </div >
      <div>
        <button onClick={handleSubmit} className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">Apply Filter</button>
      </div>
    </div >
  )
}

export default FilterBar;
