import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import { Link, useLocation, useHistory, Route, Switch } from "react-router-dom";
import "./universalNavBar.css";
import { useDispatch, useSelector } from "react-redux";
import home from "../../assets/home.png";
import swal from "sweetalert";
import carroHome from "../../assets/carroHome.png";
import { searchProducts } from "../../redux/actions/products_actions";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function UniversalNavBar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  let productsArray = useSelector(
    (state) => state.productsReducer.allProducts.products
  );

  const [input, setInput] = useState({
    name: "",
  });

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      setUser(JSON.parse(localStorage.getItem("profile")));
      //if (decodedToken.exp * 1000 < new Date().getTime()) console.log("Session expired!")
    }

    if (input.name !== "") {
      dispatch(searchProducts(input.name));
    }
  }, [location, input]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/shop");

    setUser(null);
  };

  function myFunction() {
    var x = document.getElementById("myTopnav");
    console.log("entra!!");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  const completeInput = (name) => {
    setInput({ ...input, name: name });
  };

  //------------SEARCH BAR--------------------
  // const [input, setInput] = useState({
  //   name: "",
  // })

  function handleChange(e) {
    setInput({
      name: e.target.value,
    });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    // if (input.name) {
    //   dispatch(searchProducts(input.name))

    // } else
    if (input.name === "") {
      swal({
        title: "Search Not Valid",
        icon: "warning",
        button: true,
      }).then(function () {
        window.location.reload();
      });
    }
  }

  return (
    <div className="">
      <header class="header text-center">
        <Link to="/" class="logo">
          {" "}
          <img alt="logo" src={home}></img>{" "}
        </Link>

        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <Route
          path="/shop"
          render={({ match }) => {
            // Do whatever you want with the match...
            return (
              <input
                onKeyPress={handleKeyPress}
                class="mt-3 mb-3 w-48 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
                type="search"
                name="search"
                autoComplete="true"
                placeholder="Search"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
            );
          }}
        />

        <label class="menu-icon" for="menu-btn">
          <span class="navicon"></span>
        </label>
        <ul class="menu">
          <li className="-py-2">
            <Link to="/">Home</Link>
          </li>
          <li className="-py-2">
            <Link to="/Shop">Shop</Link>
          </li>
          {user?.result?.username ? (
            <li className="-py-2">
              <Link to="/myProfile">{user.result.username}</Link>
            </li>
          ) : (
            <li>
              <Link to="/auth">Log In</Link>
            </li>
          )}

          {user?.result?._id ? (
            <li>
              <Link to={"/cart/" + user.result._id}>
                <img
                  class="mx-auto"
                  width="24px"
                  height="24px"
                  src={carroHome}
                  alt="cart"
                ></img>
              </Link>
            </li>
          ) : (
            <li>
              <Link to={"/cart/"}>
                <img
                  class="mx-auto"
                  width="24px"
                  height="24px"
                  src={carroHome}
                  alt="logo cart"
                ></img>
              </Link>
            </li>
          )}
        </ul>
        <br />
      </header>
      {/* <div clasName = " bg-black"> */}
      {window.location.pathname === "/Shop" && (
        <div id="responsiveSearch" className="ml-20 mt-2 absolute">
          <input
            onKeyPress={handleKeyPress}
            class="mt-3 mb-3 w-48 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            autoComplete="off"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          <div className="-mt-2 ml-2">
            {productsArray &&
              productsArray.length > 0 &&
              input.name !== "" &&
              productsArray.map((prop, key) => {
                return (
                  <div className="flex justify-center" key={key}>
                    <p
                      onClick={(e) => completeInput(prop.name)}
                      className="cursor-pointer bg-white w-40 mr-80 hover:bg-gray-200"
                    >
                      {prop.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
