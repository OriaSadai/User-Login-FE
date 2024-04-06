import React, { useContext, useEffect } from "react";
import AuthContext, {AuthProvider} from "./context/AuthProvider";
import { getAllItems, getAllItemsAuthenticate } from "../services/api";
import ItemsGrid from "./itemGrid/ItemsGrid";
import './Home.css';
import normalizeItemName from '../utils/itemUtils';

function Home({ itemList, setItemList }) {
    const authContext = useContext(AuthContext);

    useEffect( () => {
        if(Object.keys(authContext["auth"]).length > 0 ) {
            getAllItemsAuthenticate({ "Authorization": "Bearer " + authContext["auth"] }
            ).then(async res => {
                let items = res.data.map(item => {
                    let itemName = normalizeItemName(item.name);
                    return ({ ...item, displayName: itemName});
                });
                setItemList(items);
            });
        } else {
            getAllItems().then(async res => {
                let items = res.data.map(item => {
                    let itemName = normalizeItemName(item.name);
                    return ({ ...item, displayName: itemName});
                });
                setItemList(items);
            });
        }
    },[]);

    return (
        <>
            <header>
                <h1>Ship Shop Free</h1>
                <img src="https://media.istockphoto.com/id/1519442377/photo/shopping-trolley-and-cardboard-boxes-stand-on-laptop.jpg?s=1024x1024&w=is&k=20&c=AmYJNJvwHs5JunE5FHL7sSfhIV6U7nhB7hXihv3dgb8=" alt="Intruduction picture" width="80%" height="200rem"></img>
                <h5>On our website all the shipments are free!!!</h5>
            </header>
            
            <ItemsGrid items={itemList}></ItemsGrid>
        </>
    );
}

export default Home;