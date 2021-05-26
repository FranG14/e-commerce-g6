import React from 'react'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { Link } from "react-router-dom";

export default function AdminAction() {
    return (
        <div>
            <UniversalNavBar />
            <div class="pt-28  h-100 w-full flex items-center justify-center bg-teal-lightest font-sans pb-16 mt-2">
                <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div class="mb-4">
                        <h1 class="text-grey-darkest font-extrabold text-2xl">ADMIN</h1>

                    </div>
                    <div>
                        <div class="flex mb-4 items-center border-4 border-gray-400">
                            <p class="w-full text-grey-darkest p-4">Post Product</p>
                            <Link to="/post">
                                <button class="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button>
                            </Link>
                        </div>
                        <div class="flex mb-4 items-center border-4 border-gray-400">
                            <p class="w-full text-grey-darkest p-4"> Products Table</p>
                            <Link to="/Admin">
                                <button class="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button>
                            </Link>

                        </div>
                        <div class="flex mb-4 items-center border-4 border-gray-400">
                            <p class="w-full text-grey-darkest p-4"> Category Table</p>
                            <Link to="/categories">
                                <button class="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button>
                            </Link>

                        </div>
                        <div class="flex mb-4 items-center border-4 border-gray-400">
                            <p class="w-full text-grey-darkest p-4">User Table</p>
                            <Link to="/users">

                                <button class="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button>
                            </Link>

                        </div>
                        <div class="flex mb-4 items-center border-4 border-gray-400">
                            <p class="w-full text-grey-darkest p-4">Order Table</p>
                            <Link to="/orders">

                                <button class="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
