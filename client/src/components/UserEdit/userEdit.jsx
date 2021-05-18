import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UniversalBar from '../UniversalNavBar/universalNavBar';
import Footer from '../../containers/Footer/footer';
import { Redirect, useParams } from 'react-router-dom';
import { getUserById, editUser } from '../../redux/actions/user_actions'
import swal from "sweetalert";

export default function UserEdit() {
    var { id } = useParams();
    console.log(id)
    //console.log("ENTRE")
    //console.log(id)

    const newUser = {
        id: id,
        firstname: "",
        lastname: "",
        email: "",

        street: "",
        streetNumber: "",
        state: "",
        country: "",
        zipCode: "",
    };
    const [user, setUser] = useState(newUser)

    const userArray = useSelector(
        (state) => state
    );
    console.log(userArray)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("USE EFFECT")
        dispatch(getUserById(id))
    }, [id, dispatch])

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const userSend = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,

            street: user.street,
            streetNumber: user.streetNumber,
            state: user.state,
            country: user.country,
            zipcode: user.zipcode,

        };
        dispatch(editUser(userSend));
        setUser(newUser)
        swal({
            title: "User Edited",
            icon: "success",
            button: true,
        }).then(function () {
            window.location.href = "http://localhost:3000/myProfile"
        });

    };

    return (
        <div>


            <UniversalBar />

            <div class="grid min-h-screen place-items-center">
                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 mt-4
            bg-white rounded-lg shadow-md lg:shadow-lg">
                    <h1 class="text-xl font-semibold">Edit Your Profile</h1>
                    <form class="mt-6" onSubmit={handleSubmit}>
                        <div class="flex justify-between gap-3">
                            <span class="w-1/2">
                                <label for="firstname" class="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
                                <input value={user.firstname} onChange={handleInputChange} id="firstname" type="text" name="firstname" placeholder="FirstName" autocomplete="given-name" class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                            </span>
                            <span class="w-1/2">
                                <label for="lastname" class="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
                                <input id="lastname" value={user.lastname} onChange={handleInputChange} type="text" name="lastname" placeholder="LastName" autocomplete="family-name" class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                            </span>
                        </div>
                        <label
                            for="email"
                            class="block text-xs font-semibold text-gray-600 uppercase"
                        >
                            E-mail
            </label>
                        <input
                            value={user.email}
                            onChange={handleInputChange}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="e-mail address"
                            autocomplete="email"
                            class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />


                        <h1 class="text-xl font-semibold">Address</h1>
                        <input

                            id="streetNumber"
                            type="number"
                            name="streetNumber"
                            placeholder="Street Number"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <input
                            value={user.street}
                            onChange={handleInputChange}
                            id="street"
                            type="text"
                            name="street"
                            placeholder="Street Name"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <input
                            value={user.state}
                            onChange={handleInputChange}
                            id="state"
                            type="text"
                            name="state"
                            placeholder="State"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <input
                            value={user.country}
                            onChange={handleInputChange}
                            id="country"
                            type="text"
                            name="country"
                            placeholder="Country"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <input
                            value={user.zipcode}
                            onChange={handleInputChange}
                            id="zipcode"
                            type="number"
                            name="zipcode"
                            placeholder="zipcode"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <button type="submit" class="w-full py-3 mt-5 bg-green-700 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-green-600 hover:shadow-none">
                            Edit!
      </button>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}


