import React from "react";
import { Link } from 'react-router-dom';
import "./carousel.css"

export default function Carousel(props) {
  return (
    <div class="slider">
      <ul>
        <Link style={{ width: "100%" }} to={props.productos[0].id}>
          <li>
            <img style={{ width: "100%", height: "300px" }} src={props.productos[0].url} alt="" />
          </li>
        </Link>
        <Link style={{ width: "100%" }} to={props.productos[1].id}>
          <li>
            <img style={{ width: "100%", height: "300px" }} src={props.productos[1].url} alt="" />
          </li>
        </Link>
        <Link style={{ width: "100%" }} to={props.productos[2].id}>
          <li>
            <img style={{ width: "100%", height: "300px" }} src={props.productos[2].url} alt="" />
          </li>
        </Link>
        <Link style={{ width: "100%" }} to={props.productos[3].id}>
          <li>
            <img style={{ width: "100%", height: "300px" }} src={props.productos[3].url} alt="" />
          </li>
        </Link>
      </ul>
    </div>
  );
}