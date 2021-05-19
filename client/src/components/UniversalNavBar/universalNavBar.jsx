import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
import SearchBar from '../SearchBar/searchBar'
import { Link, useLocation, useHistory } from "react-router-dom";
import "./universalNavBar.css";
import { useDispatch } from "react-redux";
import home from '../../assets/home.png'
import carroHome from '../../assets/carroHome.png'
export default function UniversalNavBar(props) {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) console.log("Session expired!")
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/shop")

    setUser(null);
  }

  function myFunction() {
    var x = document.getElementById("myTopnav");
    console.log("entra!!")
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


  return (

    <header class="header text-center">

      <Link to="/" class="logo"> <img src={home}></img> </Link>
      <input class="menu-btn" type="checkbox" id="menu-btn" />

      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>

      <input class="mt-3 mb-3 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
        type="search" name="search" autoComplete="true" placeholder="Search" />

      <ul class="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Shop">Shop</Link></li>
        {
          (user?.result?.username) ? <li><Link to="/myProfile">{user.result.username}</Link></li> : <li><Link to="/auth">Log In</Link></li>

        }
        
        <li><Link to="/Cart"><img class="mx-auto" src={carroHome}></img></Link></li>

      </ul>

    </header>
  )
}
