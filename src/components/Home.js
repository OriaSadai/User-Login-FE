import React, {useContext, useEffect, useState} from "react";
import AuthContext, {AuthProvider} from "./context/AuthProvider";
import {testAuthenticatedApi, getAllItems} from "../services/api";
import ItemsGrid from "./itemGrid/ItemsGrid";
import './Home.css';

function Home() {
    const authContext = useContext(AuthContext);
    const [testResponse, setTestResponse] = useState();
    const [itemList, setItemList] = useState([]);

    useEffect( () => {
        if(Object.keys(authContext["auth"]).length > 0 ) {
            testAuthenticatedApi({"Authorization": "Bearer " + authContext["auth"]}
            ).then(
                res => {
                    setTestResponse(res.data.response);
                }
            );
        }
    }, [authContext]);

    useEffect( () => { 
        getAllItems().then(async res => {
           
            setItemList(res.data);
            
        });
        

    },[]);

    // useEffect(()=>{console.log(itemList)},[itemList]); //i need to leave this note just for testing (oria sadai)

    return (
        <>
            <header>
                <h1>Ship Shop Free</h1>
                <img src="https://media.istockphoto.com/id/1519442377/photo/shopping-trolley-and-cardboard-boxes-stand-on-laptop.jpg?s=1024x1024&w=is&k=20&c=AmYJNJvwHs5JunE5FHL7sSfhIV6U7nhB7hXihv3dgb8=" alt="Intruduction picture" width="80%" height="200rem"></img>
                <h5>On our website all the shipments are free</h5>
            </header>
            
            {Object.keys(authContext["auth"]).length > 0 && <p>{testResponse}</p>}
            
            <ItemsGrid items={itemList}></ItemsGrid>
        </>
    );
}

export default Home;