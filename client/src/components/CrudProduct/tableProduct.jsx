import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProduct } from "./../../redux/actions/products_actions";

const TableProduct = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const { allProducts, isLoading } = useSelector(
    (state) => state.productsReducer
  );
  let products = allProducts.products;

  const removeProduct = (id) => {
    dispatch(deleteProduct(id))
    window.location.reload()
  }

  const next = () => {
    setPage(page + 1)

  }
  const prev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    dispatch(getAllProducts(page));
  }, [page]);


  if (products === undefined || isLoading) {
    return (
      <div class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div class="table w-full mt-20 pt-2">
      {products && products.length > 0 &&
        <table class="w-full border">
          <thead>
            <tr class="bg-gray-50 border-b">
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  ID
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Brand
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Color
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Size
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Stock
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Image
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th class="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div class="flex items-center justify-center">
                  Action
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.length &&
              products.map((p, id) => (
                <>
                  <tr class="bg-gray-100 text-center border-b text-sm text-gray-600">
                    <td class="p-2 border-r">{p._id}</td>
                    <td class="p-2 border-r">{p.name}</td>
                    <td class="p-2 border-r">{p.brand}</td>
                    <td class="p-2 border-r">{p.color}</td>
                    <td class="p-2 border-r">{p.size}</td>
                    <td class="p-2 border-r">{p.stock}</td>
                    <td class="p-2 border-r flex justify-center">

                      {p.img === undefined ? (
                        <div>loading</div>
                      ) : (
                        <img
                          src={`http://localhost:3001/products/image/${p.img}`}
                          alt="https://i.stack.imgur.com/y9DpT.jpg"
                          style={{ height: "100px", with: "150px" }}
                        />
                      )}
                    </td>
                    <td>
                      <a
                        href={`/editProduct/${p._id}`}
                        class="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => removeProduct(p._id)}
                        class="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      }
      <div class="flex justify-center">
        <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
          <svg class="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
            <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
          </svg>
                                     Previous page
                             </button>
        <button onClick={next} disabled={products && products.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
          Next page
                            <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
            <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TableProduct;
