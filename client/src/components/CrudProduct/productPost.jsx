import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { getCategories } from "./../../redux/actions/category_actions";
import { addProducts } from "./../../redux/actions/products_actions";
import "../Catalog/catalog.css";
import swal from 'sweetalert'

const ProductPostForm = () => {
  const dispatch = useDispatch();
  const categoryArray = useSelector(
    (state) => state.categoriesReducer.categories.list.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const newProduct = {
    name: "",
    brand: "",
    category: [],
    description: "",
    price: "",
    genre: "",
    size: [],
    color: [],
    stock: "",
    img: "",
  };
  const [product, setProduct] = useState(newProduct);
  const [selectedName, setSelectedName] = useState({ categoryName: [] });

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = () => {
    let select = document.getElementById("categoryId");

    if (select) {
      let selectValue = select.options[select.selectedIndex].value;
      let selectedCategoryNames =
        select.options[select.selectedIndex].innerText;
      let selectCategoryName = selectedName.categoryName.concat(
        selectedCategoryNames + " "
      );
      setSelectedName({ ...selectedName, categoryName: selectCategoryName });
      let selectCategory = product.category.concat(selectValue);
      setProduct({ ...product, category: selectCategory });
    }
  };
  //TERMINAR ESTA WEAAA!
  const deleteCateg = (e) => {
    // console.log({...selectedName, categoryName:selectedName.categoryName.find((cate) => cate === 'prueba')})
    setSelectedName({ ...selectedName, categoryName: selectedName.categoryName.splice(0, e.target.id) });
    // e.target.remove()
  }
  console.log(selectedName.categoryName)
  const [selectedFile, setSelectedFile] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    // console.log("IMAGENES",selectedFile)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    //--------VALIDACION IMAGEN-------------------------------

    if (product.name == '') return swal({
      title: "Name Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.color == '') return swal({
      title: "Color Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.stock == '') return swal({
      title: "Strock Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.price == '') return swal({
      title: "Price Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.brand == '') return swal({
      title: "Brand Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.description == '') return swal({
      title: "Description Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.category == '') return swal({
      title: "Category Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (selectedFile === null) return swal({
      title: "Image Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    //--------------------------------------------------------
    let extension;
    if (selectedFile.length > 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        extension = selectedFile[i].name.split(".");
        fd.append(
          "img",
          selectedFile[i],
          product.name + "." + extension[1]
        );
      }
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    fd.append("name", product.name);
    fd.append("genre", product.genre);
    fd.append("brand", product.brand);
    fd.append("categories", product.category);
    fd.append("description", product.description);
    fd.append("price", product.price);
    fd.append("size", product.size);
    fd.append("color", product.color);
    fd.append("stock", product.stock);
    dispatch(addProducts(fd, config));
    setProduct(newProduct);
    swal({
      title: "Product Edited",
      icon: "success",
      button: true,
    }).then(function () {
      window.location.reload()
    });
  };

  return (
    <div class="grid grid-cols-2 gap-2 pt-20 bg-gray-200">
      <div class="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
        <div class="container mx-auto">
          <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
            <div class="text-center">
              <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Post New Product
              </h1>
            </div>
            <div class="m-7">
              <form onSubmit={handleSubmit}>
                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Product
                  </label>
                  <input
                    id="product"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product"
                    required
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="color"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Color
                  </label>
                  <input
                    id="color"
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={product.color}
                    onChange={handleInputChange}
                    required
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                {/* genre */}
                <div>
                  <div class="mb-1"><label for="genres" class="text-sm text-gray-600 dark:text-gray-400">Genres</label></div>
                  <label class="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="men" onChange={handleInputChange} class="form-checkbox h-4 w-4 text-purple-600" /><span class="ml-2 text-gray-700 mr-2">Men</span>
                  </label>
                  <label class="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="woman" onChange={handleInputChange} class="form-checkbox h-4 w-4 text-purple-600" /><span class="ml-2 text-gray-700 mr-2">Woman</span>
                  </label>
                  <label class="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="unisex" onChange={handleInputChange} class="form-checkbox h-4 w-4 text-purple-600" /><span class="ml-2 text-gray-700 mr-2">Unisex</span>
                  </label>
                  <label class="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="boys" onChange={handleInputChange} class="form-checkbox h-4 w-4 text-purple-600" /><span class="ml-2 text-gray-700 mr-2">boys</span>
                  </label><label class="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="girls" onChange={handleInputChange} class="form-checkbox h-4 w-4 text-purple-600" /><span class="ml-2 text-gray-700">girls</span>
                  </label>
                </div>
                {/* fin genre */}
                <div class="mb-6 mt-4">
                  <label
                    for="stock"
                    class="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Stock
                  </label>
                  <input
                    id="stock"
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    placeholder="Stock"
                    required
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="price"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleInputChange}
                    required
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="size"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Size
                  </label>
                  <input
                    id="size"
                    type="text"
                    name="size"
                    value={product.size}
                    onChange={handleInputChange}
                    placeholder="Size"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="brand"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    placeholder="Brand"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="description"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="category"
                    class="block text-xs font-semibold text-gray-600 mt-2 uppercase"
                  >
                    Category
                  </label>
                  <label className="label-select">
                    <select id="categoryId" onChange={handleSelect} className="mb-2">
                      <option value="">--- category ---</option>
                      {categoryArray && categoryArray.length > 0
                        ? categoryArray.map((c, id) => {
                          return (
                            <option key={c.id} value={c._id}>
                              {c.name}
                            </option>
                          );
                        })
                        : ""}
                    </select><br />
                    {/* muestro las categorias que se eligio */}
                    {selectedName.categoryName.length > 0 ? selectedName.categoryName.map((cate, key) => {
                      return <p onClick={deleteCateg} key={key} id={key} className="inline-block mr-2 rounded round bg-gray-200 mb-2 w-20 text-center">
                        {cate}
                      </p>
                    }) : ""}
                    <p className="text-sm mt-2 -mb-2">Can't find your Category? <Link to='/postCategory' className="underline text-sm text-blue-800">Add New One</Link></p>
                  </label>
                </div>
                <div class="mb-6">
                  <label
                    for="img"
                    class="block text-xs font-semibold text-gray-600 mt-2 uppercase"
                  >
                    Images
                  </label>
                  <label className="label-select" >
                    <input type="file" onChange={handleFileInputChange} required multiple />
                  </label>
                </div>

                <div class="mb-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    class="w-full px-3 py-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Post New Product
                  </button>
                </div>
                <p class="text-base text-center text-gray-400" id="result"></p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
          <div class="container mx-auto">
            <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-</div>sm">
              <div class=" justify-center justify-items-center content-center items-center">
                <div className="card">
                  <div className="flex justify-center">
                    <img
                      src={imgUrl}
                      alt={imgUrl}
                    />
                  </div>
                  <div className="bg-gray-200" style={{ height: "1px" }}></div>
                  <div className="p-4">
                    <p className="text-black">{product.name}</p>
                    <p className="text-blue-300">${product.price}</p>
                    <p className="text-blue-300">{product.brand}</p>
                    <p className="text-blue-300 bg-blue-50">
                      {selectedName.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPostForm;
