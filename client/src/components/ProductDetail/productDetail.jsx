import React, { useEffect, useState } from 'react';
import { detailProduct } from '../../redux/actions/products_actions'
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../../redux/actions/cart_actions'
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from '../../containers/Footer/footer';
import swal from 'sweetalert';
import carro from '../../assets/carro.png'
function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

function DetailProduct(props) {
    var { id } = useParams();
    //console.log("ENTRE")
    //console.log(id)
    const productsArray = useSelector(
        (state) => state.productsReducer.allProducts
    );
    console.log("!!!!!!!,", productsArray.img)
    const productsSize = useSelector(
        (state) => state.productsReducer.allProducts.size
    );
    const dispatch = useDispatch()
    const [imagePos, setImagePos] = useState(0);
    // console.log(productsSize)

    const changeImage = () => {
        if (imagePos < productsArray.img.length - 1) {
            setImagePos(imagePos + 1)
        }
        if (imagePos === productsArray.img.length - 1) setImagePos(0)
    }

    useEffect(() => {
        dispatch(detailProduct(id))
    }, [])

    function addProductToCart() {
        //props.addToCart({id:id,img:productsArray.img,brand:productsArray.brand,name:productsArray.name,stock:productsArray.stock,price:productsArray.price})
        dispatch(addToCart({ id: id, img: productsArray.img, brand: productsArray.brand, name: productsArray.name, stock: productsArray.stock, price: productsArray.price }))
        swal({
            title: "Your Product Was Added to Cart!",
            icon: carro,
            button: true,
            dangerMode: true,
        })
    }
    console.log(imagePos)
    return (
        <div>
            <UniversalNavBar />
            <section class="text-gray-700 body-font overflow-hidden bg-gray-200">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap bg-gray-100 pr-5 rounded-2xl">
                        {productsArray.img && productsArray.img.length > 0 &&
                            <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" onClick={changeImage} src={`http://localhost:3001/products/image/${productsArray.img[imagePos]}`} />}
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-2xl title-font text-gray-500 tracking-widest">{productsArray.brand}</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{productsArray.name}</h1>
                            <h2 class="text-l title-font text-gray-500 tracking-widest">{productsArray.stock === 0 ? <h2 className="text-red-500">No Stock</h2> : (productsArray.stock < 10) ? <h2>There is only {productsArray.stock} left</h2> : <h2>In Stock</h2>}</h2>
                            <div class="flex mb-4">
                                <span class="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <Link to={"/reviews/" + productsArray._id}><span class="text-gray-600 ml-3">Reviews</span></Link>
                                </span>
                                <span class="flex ml-3 pl-3 -mr-3 py-2 border-l-2 border-gray-200"></span>
                                <Link to={"/addReview/" + productsArray._id}><span class="text-gray-600 ml-3">Add Review</span></Link>
                            </div>
                            <p class="leading-relaxed">{productsArray.description}</p>
                            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div class="flex">
                                    <span class="mr-3">Color</span>
                                    <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div class="flex ml-6 items-center">
                                    <span class="mr-3">Size</span>
                                    <div class="relative">
                                        <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                            <option>XS</option>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>

                                        </select>
                                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <span class="title-font font-medium text-2xl text-gray-900">${productsArray.price}</span>
                                {
                                    (productsArray.stock >= 1) ?
                                        <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={addProductToCart}>Add to Cart</button>
                                        : ""
                                }
                                {
                                    (productsArray.stock >= 1) ?
                                        <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default connect(mapStateToProps, { addToCart })(DetailProduct);
