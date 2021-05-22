import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProduct, searchProducts } from "./../../redux/actions/products_actions";
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';

const TableProduct = () => {
  const dispatch = useDispatch();

  const { allProducts, isLoading } = useSelector(
    (state) => state.productsReducer
  );
  let productsArray = allProducts.products
  console.log("ppppp", productsArray)
  const [page, setPage] = useState(1)

  const next = () => {
    setPage(page + 1)

  }
  const prev = () => {
    setPage(page - 1)
  }
  console.log("!!!!!!!!!", productsArray);

  useEffect(() => {
    dispatch(getAllProducts(page));
  }, [page]);

  const deleteC = (id) => {
    dispatch(deleteProduct(id))
    swal({
      title: "Deleted product",
      icon: "warning",
      buttons: false,
      dangerMode: true,
    })
    window.location.reload()
  }
  const [input, setInput] = useState({
    name: "",
  })

  function handleChange(e) {
    setInput({
      name: e.target.value
    })
  };

  function handleSubmit(e) {
    e.preventDefault()

    if (input.name) {
      dispatch(searchProducts(input.name))
    } else if (!input.name) {
      swal({
        title: "Search Not Valid",
        icon: "warning",
        button: true,
      })
    }


  }
  return (
    <div>
      <div className="mt-4 pt-20 mb-4 flex justify-center">

        <div class="relative mr-6 my-2 ml-2 -mt-0.5">
         
          {/*   <button className="bg-white" onClick={handleSubmit}>🔍</button> */}
          <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
            <svg version="1.1" class="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 52.966 52.966" style={{ enableBackground: "new 0 0 52.966 52.966" }} xmlSpace="preserve">

            </svg>

          </div>
        </div>




      </div >

      <table class="border-collapse w-full">
        <thead>
          <tr>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product ID</th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product</th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Prand</th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Color</th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Size</th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Stock</th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>
          </tr>
        </thead>
        <tbody>
          {productsArray && productsArray.length > 0 ? productsArray.map((c, id) => {
            return <tr key={id} class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                {c._id}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.name}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.brand}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.color}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.size}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.stock}
              </td>
              <td class="p-2 border-r flex justify-center">

                {c.img === undefined ? (
                  <div>loading</div>
                ) : (
                  <img
                    src={`http://localhost:3001/products/image/${c.img}`}
                    alt="https://i.stack.imgur.com/y9DpT.jpg"
                    style={{ height: "100px", with: "150px" }}
                  />
                )}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <button class="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"> <Link to={'/editProduct/' + c._id}>✍</Link> </button>
                <button class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => deleteC(c._id)}> 🗑 </button>
              </td>
            </tr>
          }) : ""}



        </tbody>
      </table>
      <br></br>
      <div class="flex justify-center">
        <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
          <svg class="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
            <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
          </svg>
                                     Previous page
                             </button>
        <button onClick={next} disabled={productsArray && productsArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
          Next page
                            <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
            <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
          </svg>
        </button>
      </div>
    </div >
  )
}

export default TableProduct;
