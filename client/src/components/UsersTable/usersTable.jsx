import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import { deleteUser, getUsers, searchUser, toggleAdmin } from "../../redux/actions/user_actions";
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";


const UsersTable = () => {
    const dispatch = useDispatch();
    const usersArray = useSelector(
        (state) => state.userReducer.user.list.users
    );
    console.log(usersArray)
    const [page, setPage] = useState(1)

    const next = () => {
        setPage(page + 1)

    }
    const prev = () => {
        setPage(page - 1)
    }
    console.log("!!!!!!!!!", usersArray);

    useEffect(() => {
        dispatch(getUsers(page));
    }, [page]);

    const deleteU = (id) => {
        dispatch(deleteUser(id))
        swal({
            title: "User Deleted",
            icon: "warning",
            buttons: false,
            dangerMode: true,
        })
        window.location.reload()
    }

    const makeAdmin = (id) => {
        swal({
            title: "Admin Property Changed",
            type: "warning"
        }).then(function () {
            window.location.reload()
        });
        dispatch(toggleAdmin(id))

    }

    const [input, setInput] = useState({
        email: "",
    })

    function handleChange(e) {
        setInput({
            email: e.target.value
        })
    };

    function handleSubmit(e) {
        e.preventDefault()

        if (input.email) {
            dispatch(searchUser(input.email))
        } else if (!input.email) {
            swal({
                title: "Search Not Valid",
                icon: "warning",
                button: true,
            });
        }


    }


    return (
        <div class="bg-gray-200  ">
            <UniversalNavBar />
            <div className="mt-16 pt-8 mb-4 flex justify-center">
                <div class="relative mr-6 my-2 ml-2 -mt-0.5">
                    <input type="search" class="bg-purple-white shadow rounded border-0 p-3" value={input.email} onChange={(e) => handleChange(e)} placeholder="Search by email...   " />
                    <button className="bg-gray-200" onClick={handleSubmit}>🔍</button>
                    <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
                        <svg version="1.1" class="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 52.966 52.966" style={{ enableBackground: "new 0 0 52.966 52.966" }} xmlSpace="preserve">

                        </svg>

                    </div>
                </div>




            </div >

            <table class="border-collapse w-full">
                <thead>
                    <tr>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">ADMIN</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">USERNAME</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">USER E-MAIL</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersArray && usersArray.length > 0 ? usersArray.map((c, id) => {
                        return <tr key={id} class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            {c.isAdmin === true && <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">✔️</td>}
                            {c.isAdmin === false && <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">❌</td>}
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.username}
                            </td>
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.email}
                            </td>
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <button class="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-yellow-500 rounded-lg focus:shadow-outline hover:bg-yellow-400" onClick={() => makeAdmin(c._id)}>👮🏽</button>
                                <button class="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"> <Link to={'/users/edit/' + c._id}>✍</Link> </button>
                                <button class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => deleteU(c._id)}> 🗑 </button>
                            </td>
                        </tr>
                    }) : ""}



                </tbody>
            </table>
            <br></br>
            <div class="flex justify-center">
                <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
                    <svg class="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
                    </svg>
                                     Previous page
                             </button>
                <button onClick={next} disabled={usersArray && usersArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
                    Next page
                            <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
                    </svg>
                </button>
            </div>
            <Footer />
        </div >
    )
}

export default UsersTable
