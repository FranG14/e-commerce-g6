import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { addToCart, delFromCart, buy } from "../../redux/actions/cart_actions"
import Footer from '../../containers/Footer/footer';
import UniversalNavBar from '../UniversalNavBar/universalNavBar';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

//{name:"test",price:100,brand:"a"},{name:"test2",price:100,brand:"a"}11,1
function Cart(props) {
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState([])
    const [total, setTotal] = useState(0)
    const [mensajes, setMensajes] = useState([])

    const carrito = useSelector(
        (state) => state.cartReducer.cart
    );

    const authData = useSelector(
        (state) => state.authenticationReducer.authData
    );
    const dispatch = useDispatch()

    function cargarProductos() {
        if (carrito.length == 0) {
            setProducts([])
            setQuantity([])
            return;
        }

        let obj = []
        let cantidad = []
        let objDeCart = []

        for (let i = 0; i < carrito.length; i++) {
            if (!obj.includes(carrito[i].id)) {
                obj.push(carrito[i].id)
                objDeCart.push(carrito[i])
            }
        }

        for (let i = 0; i < obj.length; i++) {
            cantidad[i] = 0;
        }

        for (let i = 0; i < obj.length; i++) {
            for (let j = 0; j < carrito.length; j++) {
                if (carrito[j].id == obj[i]) {
                    cantidad[i] += 1
                }
            }
        }

        setProducts([...objDeCart])
        setQuantity([...cantidad])
    }

    function calcularTotal(operacion, precio) {
        if (operacion == "restar") {
            setTotal(total - parseInt(precio.price))
        }
        if (operacion == "sumar") {
            setTotal(total + parseInt(precio.price))
        }
    }

    function calcularTotalIicio() {
        let temp = 0;
        for (let i = 0; i < carrito.length; i++) {
            temp += parseInt(carrito[i].price)
        }
        setTotal(temp)
    }

    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    function agregarMensajeOrden(msj) {
        //setMensajes(msj.split("\n"))
        let arr = msj.split("\n")
        let arrSuccess = []
        let arrError = []
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i].split(" ")
            if (temp.length != 1) {
                arrError.push(arr[i])
            } else {
                arrSuccess.push(arr[i])
            }
        }

        if (arrSuccess.length != 0) {
            let msjExito = ""
            for (let i = 0; i < arrSuccess.length; i++) {
                msjExito = msjExito + arrSuccess[i] + " ,"
            }
            let cadena = ""

            for (let i = 0; i < msjExito.length - 4; i++) {
                cadena += msjExito.charAt(i)
            }
            cadena += "."
            swal("Compra exitosa", "Productos: " + cadena, "success")
        }

        if (arrError.length != 0) {
            let msjError = ""
            for (let i = 0; i < arrError.length; i++) {
                if (i != arrError.length - 1) {
                    msjError = msjError + arrError[i] + ", "
                } else {
                    msjError = msjError + arrError[i] + "."
                }
            }

            swal("Error", msjError, "error");
        }

    }

    async function enviarDatos() {
        if (authData == null) {
            return document.getElementById("redirect").click();
        }
        setMensajes([])
        let msj = ""
        for (let i = 0; i < products.length; i++) {
            try {
                let response = await axios.post('http://localhost:3001/orders/', {
                    id: products[i].id,
                    quantity: quantity[i],
                    total: quantity[i] * products[i].price,
                    paymentLink: "https://www.test.com/" + uuidv4()
                })
                //.then(function (response) {
                if (response.data.message == "Order stored") {
                    let res = await axios.get("http://localhost:3001/products/detail/" + response.data.createdOrder.product)
                    //.then(res=>{
                    //agregarMensajeOrden("Compra realizada con exito, producto:"+res.data.name)
                    msj = msj + res.data.name + "\n"
                    if (i == products.length - 1) {
                        props.buy()
                        agregarMensajeOrden(msj)
                    }
                    //})

                }
                //})
            } //.catch(function (error) {
            catch (error) {
                //agregarMensajeOrden(error.message)
                msj = msj + error + "\n"
                if (i == products.length - 1) {
                    props.buy()
                    agregarMensajeOrden(msj)
                }
                //});
            }
        }

    }

    useEffect(() => {
        cargarProductos()
        calcularTotalIicio()
    }, [carrito])

    console.log(products)
    return (
        <div class="bg-gray-100">
            <UniversalNavBar />
            <Link to="/auth" id="redirect" style={{ display: "none" }}></Link>
            <body class="bg-gray-100">
                <div class="container mx-auto mt-10">
                    <div class="flex shadow-md my-10">
                        <div class="w-3/4 bg-white px-10 py-10">
                            <div class="flex justify-between border-b pb-8">
                                <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                                <h2 class="font-semibold text-2xl">{carrito.length + " items"}</h2>
                            </div>
                            <div class="flex mt-10 mb-5">
                                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                            </div>

                            {products.map((element, index) => {
                                return (


                                    <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                        <div class="flex w-2/5">
                                            <div class="w-20">
                                                <img class="h-24" src={`http://localhost:3001/products/image/${element.img}`} alt=""></img>
                                            </div>
                                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                                <span class="font-bold text-sm">{element.name}</span>
                                                <span class="text-red-500 text-xs">{element.brand}</span>
                                                <span class="select-none cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={e => {
                                                    //setProducts([])
                                                    //setQuantity([])
                                                    props.delFromCart(element)

                                                }}>Remove</span>
                                            </div>
                                        </div>
                                        <div class="flex justify-center w-1/5">
                                            <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" onClick={e => {
                                                if (quantity[index] > 1) {
                                                    let a = [...quantity]
                                                    a[index] -= 1
                                                    setQuantity([...a])
                                                    calcularTotal("restar", products[index])
                                                }
                                            }

                                            } />
                                            </svg>

                                            <input class="mx-2 border text-center w-8" type="text" value={quantity[index]}></input>

                                            <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={e => {
                                                if (quantity[index] < products[index].stock) {
                                                    let a = [...quantity]
                                                    a[index] += 1
                                                    setQuantity([...a])
                                                    calcularTotal("sumar", products[index])
                                                }
                                            }

                                            }>
                                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        </div>
                                        <span class="text-center w-1/5 font-semibold text-sm select-none">{element.price}</span>
                                        <span class="datosParaSumar text-center w-1/5 font-semibold text-sm select-none">{element.price * quantity[index]}</span>
                                    </div>


                                );
                            })}
                            {/*mensajes.length != 0 ?
                                mensajes.map(element => <div>{element}</div>)
                                :
                                <div></div>*/
                            }


                            <Link to="/Shop">
                                <span class="flex font-semibold text-indigo-600 text-sm mt-10">

                                    <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                                        Continue Shopping
                                                    </span></Link>
                        </div>

                        <div id="summary" class="w-1/4 px-8 py-10">
                            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                            <div class="flex justify-between mt-10 mb-5">
                                <span class="font-semibold text-sm uppercase">{carrito.length + " items"}</span>
                                <span class="font-semibold text-sm">{total}</span>
                            </div>
                            {/*
                            <div>
                                <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                                <select class="block p-2 text-gray-600 w-full text-sm">
                                    <option>Standard shipping - $10.00</option>
                                </select>
                            </div>
                            <div class="py-10">
                                <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                                <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full"></input>
                            </div>
                            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>*/}
                            <div class="border-t mt-8">
                                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Total cost</span>
                                    <span>{total}</span>
                                </div>
                                <button class="bg-green-700 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full" onClick={enviarDatos}>Checkout</button>
                            </div>
                        </div>

                    </div>
                </div>
            </body>
            <Footer />
        </div>
    )
}

export default connect(mapStateToProps, { addToCart, delFromCart, buy })(Cart);
