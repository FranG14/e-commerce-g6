import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
// import SearchBar from '../SearchBar/searchBar'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { getUserById } from '../../redux/actions/user_actions'

export default function UserDetail() {
    // const {id} = match.params;
    const [user, setUser] =
        useState(JSON.parse(localStorage.getItem('profile')));


    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();


    const userData = useSelector(
        (state) => state.userReducer.user.list.userFound
    );
    //console.log("USER DATAA", userData)
    useEffect(() => {
        //Por ahora traigo el user guardado en el localStorage.
        //Después traigo un Usuario por params
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) console.log("Session expired!")
        }
        dispatch(getUserById(user.result._id))
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logout = () => {
        dispatch({ type: "LOGOUT" });

        history.push("/shop")

        setUser(null);
    }

    // <h4>{user.result.username}</h4>
    return (
        <div className="bg-gray-200">
            <div className="pb-10 bg-gray-200">
                <UniversalNavBar />
            </div>
            {user?.result && userData && 
                <div className="bg-gray-200 pt-20 pb-10">
                    <div className="max-w-4xl flex items-center mt-4 mb-4 bg-gray-200 flex-wrap mx-auto lg:my-0">

                        {/* <!--Main Col--> */}
                        <div id="profile" className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">


                            <div className="p-4 md:p-12  text-center lg:text-left">
                                {/* <!-- Image for mobile view--> */}
                                {/* <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div> */}

                                <h1 className="text-3xl font-bold pt-8 lg:pt-0">  {(user.result) ? user.result.username : ""}'s Profile</h1>
                                <div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Name: {(userData) ? userData.firstname : ""}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Surname: {(userData) ? userData.lastname : ""}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📧 E-Mail: {(userData) ? userData.email : ""}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📌 Street: {(userData) ? userData.street : ""} {(userData) ? userData.streetNumber : ""}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📍 State: {(userData) ? userData.state : ""}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📭 Zip Code: {(userData) ? userData.zipcode : ""}</p>

                                <div className="pt-12 pb-8  text-center content-between">
                                    <Link to={"/MyProfile/Edit/" + user.result._id}>
                                        <button className="mr-5  bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                                            Edit your profile 🖍
				                </button>

                                    </Link>
                                    {
                                        user.result?.isAdmin &&
                                        <Link to="/Admin/Actions" >
                                            <button className="ml-10 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                                                Admin Actions
				                </button>
                                        </Link>
                                    }
                                    {
                                        user.result?.username &&
                                        <Link to={"/users/password/" + user.result._id}  >
                                            <button className="ml-10 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                                                Change Password
				                </button>
                                        </Link>
                                    }

                                    <button className="ml-10 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>
                                        Logout
				                         </button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Pin to top right corner --> */}
                    </div>
                </div>
            }
            <div className="pt-10 bg-gray-200">
                <Footer />
            </div>
        </div>
    )

}