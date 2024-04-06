import React, { useCallback, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import classes from './ItemCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import AuthContext, {AuthProvider} from ".././context/AuthProvider";
import { addToFavorite, removeFromFavorite } from "../../services/api";

function ItemCard (props) {

    let [ isFavorite, setIsFavorite ] = useState(props.item.isFavorite ? faHeart : regular.faHeart);
    const authContext = useContext(AuthContext);

    const favToggle = useCallback ( async () => {
        if ( Object.keys(authContext["auth"]).length > 0 ) {
            console.log(authContext["auth"]);
            if ( isFavorite === regular.faHeart ) {
                console.log("Item id: " + props.item.id);
                addToFavorite({"itemId": props.item.id, "Authorization": "Bearer " + authContext["auth"]})
                .then(() => {
                    console.log("Hi from add to favorite");
                    setIsFavorite(faHeart);
                });
            } else if ( isFavorite === faHeart ) {
                console.log("Item id: 2");
                removeFromFavorite({"itemId": props.item.id, "Authorization": "Bearer " + authContext["auth"]})
                .then(() => {
                    console.log("Hi from remove fromfavorite");
                    setIsFavorite(regular.faHeart);
                });
            }
        } else {
            console.log("Authorization not provider");
        }
    },[isFavorite]);


    return (
        <div className={classes.item__card}>
            <Link to={{
                pathname: "/item/" + props.item.id
            }}>
                <div>
                    <h4>{props.item.displayName}</h4>
                    <img src={props.item.smallUrlPicture} />
                </div>
            </Link>
            <br />
            <div className={classes.bottom__card}>
                <p>
                    <FontAwesomeIcon icon={faDollarSign} style={{ color: "#2B6D0A"}} />
                    <span>{props.item.price}</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={isFavorite} style={{color: "#e61428"}} onClick={favToggle} className={classes.clickable} />
                </p>
                    
                    
            </div>
        </div>
    );
}

export default ItemCard;