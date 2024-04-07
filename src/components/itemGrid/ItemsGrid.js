import React, { useState } from "react";
import './ItemsGrid.css';
import ItemCard from "./ItemCard";

function ItemsGrid (props) {
    console.log("json signify of iten 3: " + JSON.stringify(props.items[2]));


    return (
        <div className="items__grid">
            {props.items.map(item=>(<ItemCard item={item} key={"item" + item.id} />))}
        </div>
    );
}

export default ItemsGrid;