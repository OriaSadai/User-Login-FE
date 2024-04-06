import React, { useEffect, useState, useContext } from "react";
import classes from './FavoriteList.module.css';
import AuthContext, {AuthProvider} from "../context/AuthProvider";
import { getFavoriteItems } from "../../services/api";
import ItemsGrid from "../itemGrid/ItemsGrid";

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

    return (
        <div>
            { !(Object.keys(authContext["auth"]).length > 0) ?
            <p className={classes.fav__message} >You have to log in first!</p> : !(favoriteList.length > 0) ?
            <p className={classes.fav__message} >No items selected to your favorite list yet!</p> :
            <ItemsGrid items={favoriteList}></ItemsGrid>
            }
        </div>
    );

}

export default FavoriteList;