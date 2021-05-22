import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {changePassword } from "../../redux/actions/authentication_actions";
import "../Catalog/catalog.css"
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert'; 

const UserPassword = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory()

    const newPassword = {
        _id: id,
        oldPassword: "",
        newPassword: "",

    };
    console.log(id)
    const [password, setPassword] = useState(newPassword);

    const passwordArray = useSelector(
        (state) => state.authenticationReducer
        );
        
        console.log(passwordArray)


    const handleInputChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const passwordSend = {
            id: password._id,
            oldPassword: password.oldPassword,
            newPassword: password.newPassword

        };
       /*  if(password.name === '') return swal({
            title: "Name Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true,
        })
          if(password.description === '') return  swal({
            title: "Description Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true, */
       /*  }) */
        dispatch(changePassword(passwordSend));
        setPassword(newPassword)
            
            swal("Good job!", "Well done!", "success",{ buttons: false} )
        /* history.goBack() */
    };
    // console.log(product)
    return (
        <div class="  bg-gray-200">
            <UniversalNavBar />
            <form onSubmit={handleSubmit}>
                <div class="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
                    <div class="container mx-auto">
                        <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                            <div class="text-center">
                                <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Edit Password</h1>

                            </div>
                            <div class="m-7">
                                <form >
                                    <div class="mb-6">

                                        <label for="oldPassword" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Current Password</label>
                                        <input id="oldPassword"
                                            type="password"
                                            name="oldPassword"
                                            value={password.oldPassword}
                                            onChange={handleInputChange}
                                            placeholder="Current"
                                            required
                                            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                    </div>

                                    <div class="mb-6">
                                        <label for="newPassword" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">New Password</label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            name="newPassword"
                                            value={password.newPassword}
                                            onChange={handleInputChange}
                                            placeholder="New "
                                            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500" required
                                        />

                                    </div>
                                    <div class="mb-6">
                                        <button type="submit"  class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};
//name, img, brand, category, description, price, stock, rating, review, size, color
export default UserPassword;