import React, { useContext, useState } from "react";
import classes from './ItemInOrderList.module.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faMinus, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import OrderListContext from "../context/OrderListContext";

function ItemInOrderList ({item, onRemovingItemFromList}) {
    const { orderList, setOrderList } = useContext(OrderListContext);
    const [ isRemoving, setIsRemoving ] = useState(false);

    const handleRemoveButton = (id) => {
        setIsRemoving(true);
        setTimeout( () => {
            onRemovingItemFromList(id);
        }, 1000);
    }

    const handleDecrementCount = (id) => {
        if(item.qnt === 0) return;
        const newOrederList = orderList.map((item) => item.id === id ? {...item, qnt: item.qnt - 1} : item)
        setOrderList(newOrederList)
    }
    const handleIncrementCount = (id) => {       
        if(item.qnt === item.inStock) {
            alert("Not In Stock");
            return;
        }
        const newOrederList = orderList.map((item) => item.id === id ? {...item, qnt: item.qnt + 1} : item)
        setOrderList(newOrederList)
    }

    return (
        <li className={classes.item__line} >
            <div className={classes.item__description} >
                <div className={classes.item__description} >
                <Link to={{
                    pathname: "/item/" + item.id
                }} className={classes.item__description} >
                        <img src={item.smallUrlPicture} />
                        <h5 className={classes.item__description} >{item.displayName}</h5>
                </Link>
                    </div>
                <p className={classes.frame}>Total price: <FontAwesomeIcon icon={faDollarSign} style={{ color: "#2B6D0A"}} />{(item.qnt * item.price).toFixed(2)}</p>
                <div className={classes.frame}>Qnt.
                    <button><FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(item.id)} style={{ color: "#2B6D0A" }} /></button>
                    {item.qnt}
                    <button><FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(item.id)} style={{ color: "#2B6D0A" }} /></button>
                </div>
                <button type="button" onClick={() => handleRemoveButton(item.id)} >Remove</button>
            </div>
            {isRemoving && <p className={classes.removeMessage}><FontAwesomeIcon icon={faInfoCircle} /> Removing...</p>}
        </li>
    );
}

export default ItemInOrderList;