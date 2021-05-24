import React, { useEffect, useState } from 'react'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getActiveCartFromUser, getCartFromUser, getCartsByUser } from '../../redux/actions/cart_actions';
import { useParams } from 'react-router';
import swal from 'sweetalert';

const NewCart = () => {
    var { id } = useParams()
    // const user = useSelector(state =>
    //      state.userReducer)
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const userCart = useSelector(
        (state) => (state.cartReducer.cart && state.cartReducer.cart && user )?state.cartReducer.cart.cart.items:state.cartReducer
    );

    const [total, setTotal] = useState({ totalItems: 0, totalPrice: 0 })

    const totalItems = () => {
        let totalItems = 0
        let totalPrice = 0
        for (var i = 0; i < userCart.length; i++) {
            totalItems = totalItems + userCart[i].quantity
            totalPrice = totalPrice + userCart[i].price
        }
        setTotal({ ...total, totalItems: totalItems, totalPrice: totalPrice })
    }

    const deleteC = (userId, productId) => {
        dispatch(deleteItem(userId, productId))
        swal({
            title: "Deleted product",
            icon: "warning",
            buttons: false,
            dangerMode: true,
        })
        window.location.reload()
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartFromUser(id))
        totalItems()
    }, [id])

    return (
        <div class="bg-gray-200 h-full md:h-screen">
            <UniversalNavBar />
            <div class="grid grid-cols-12 mt-16 pt-4 gap-6">
                <div class="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
                    {userCart && userCart.length > 0 && userCart.map(cart => {
                        return (
                            <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                <div class="flex justify-between px-4 items-center">
                                    <div class="text-lg font-semibold">
                                        <p>{cart.name}</p>
                                        <p class="text-gray-400 text-base">${cart.price}</p>
                                    </div>
                                    <div class="text-lg font-semibold ">
                                        <button onClick={() => deleteC(user.result._id, cart.productId)} class="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                                            <svg xmlns="http://www.w3.org/2000/svg" class=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

                <div class="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- classic add --> */}
                        {userCart.length > 0 && userCart.map(cart => {
                            return (
                                <div class="flex justify-between border-b-2 mb-2">
                                    <div class="text-lg py-2">
                                        <p>{cart.name}</p>
                                    </div>
                                    <div class="text-lg py-2">
                                        <div class="flex flex-row space-x-2 w-full items-center rounded-lg">
                                            <button class="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                                                </svg>
                                            </button>
                                            <p> {cart.quantity} </p>
                                            <button class="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                        {/* <!-- End classic add -->

                        {/* <!-- Total Item --> */}
                        <div class="flex justify-center items-center text-center">
                            <div class="text-xl font-semibold">
                                <p>Total Item</p>
                                <p class="text-5xl">{total.totalItems}</p>
                            </div>
                        </div>
                        {/* <!-- End Total Item --> */}

                    </div>
                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- Total Price --> */}
                        <div class="flex justify-center items-center text-center">
                            <div class="text-xl font-semibold">
                                <p>Total Price</p>
                                <p class="text-5xl">${total.totalPrice}</p>
                            </div>
                        </div>
                        {/* <!-- End Total PRice --> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewCart
