import React from "react";
import './ItemsGrid.css';
import ItemCard from "./ItemCard";

function ItemsGrid (props) {   

    return (
        <div className="items__grid">
            {props.items.map(item=>(<ItemCard item={item} key={"item" + item.id} />))}
        </div>
    );
}

export default ItemsGrid;