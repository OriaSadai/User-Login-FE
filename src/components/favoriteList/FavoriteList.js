import React, { useEffect, useState, useContext } from "react";
import classes from './FavoriteList.module.css';
import ItemInFavoriteList from "./ItemInFavoriteList";
import AuthContext, {AuthProvider} from "../context/AuthProvider";
import { getFavoriteItems } from "../../services/api";

function FavoriteList () {

    const authContext = useContext(AuthContext);
    const [ favoriteList, setFavoriteList ] = useState([]);

    useEffect( () => {
        if ( Object.keys(authContext["auth"].lengh > 0) ) {
            getFavoriteItems({ "Authorization" : "Bearer " + authContext["auth"]})
            .then( res => {
                setFavoriteList(res.data);
            });
        }
    }, []);

    const changeQuantity = () => {
        console.log("change quantity");
    }    

    return (
        <div className={classes.fav__container}>
            { !(Object.keys(authContext["auth"]).length > 0) ?
            <p>You have to log in first!</p> : !(favoriteList.length > 0) ?
            <p>No items selected to your favorite list yet!</p> :
            <ul className={classes.fav__list}>
                {favoriteList.map(item =>                
                    (<ItemInFavoriteList key={item.id} item={item} onChangeQuantity={changeQuantity} />)
                )}
            </ul> }
        </div>
    )

}

export default FavoriteList;