import React from "react";
import { Link } from "react-router-dom";

function CatItem(props) {
  //category item box
  return (
    <>
      <li className="cat_item">
        <Link className="cat__item__link" to={props.path}>
          <figure className="cat__item__pic-wrap" data-category={props.label}>
            <img src={props.src} alt="Travel" className="cat__item__img"></img>
          </figure>
          <div className="cat__item__info">
            <h5 className="cat__item__text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CatItem;
