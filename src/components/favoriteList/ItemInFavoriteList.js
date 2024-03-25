import React from "react";
import classes from './ItemInFavoriteList.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function ItemInFavoriteList (props) {
    
    return (
        <li className={classes.item & classes.card} >            
            <div className={classes.item__description} >
                <h5>{props.item.name}</h5>
                <p>Price: <FontAwesomeIcon icon={faDollarSign} />{props.item.name}</p>
            </div>
            <button type="button">Remove From List</button>
        </li>
    );
}

export default ItemInFavoriteList;