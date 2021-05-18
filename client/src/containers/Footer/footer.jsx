import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className="footer bg-white relative pt-1 border-b-2 border-blue-700">
                <div className="container mx-auto px-6">

                    <div className="sm:flex sm:mt-8">
                        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-700 uppercase mb-2">Account</span>
                                <span className="my-2"><Link to="/MyProfile">Your user account</Link></span>
                                <span className="my-2"><Link to="/MyProfile/Edit">Edit your account</Link></span>
                                <span className="my-2"><Link to="/Order">Your Orders</Link></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">About</span>
                                <span className="my-2"><Link to="/About">About us</Link></span>
                                <span className="my-2"><Link to="/Terms">Terms of use</Link></span>
                                <span className="my-2"><Link to="/Privacy">Privacy Policy</Link></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Contact us</span>
                                <span className="my-2"><a href="https://www.facebook.com/" className="text-blue-700  text-md hover:text-blue-500">Facebook</a></span>
                                <span className="my-2"><a href="https://www.twitter.com/" className="text-blue-700  text-md hover:text-blue-500">Twitter</a></span>
                                <span className="my-2"><a href="https://www.instagram.com/" className="text-blue-700  text-md hover:text-blue-500">Instagram</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6">
                    <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                        <div className="sm:w-2/3 text-center py-6">
                            <p className="text-sm text-blue-700 font-bold mb-2">
                                © 2021 by HENRY STUDENTS
                </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}