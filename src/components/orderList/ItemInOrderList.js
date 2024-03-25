import React, { useContext, useState } from "react";
import classes from './ItemInOrderList.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import OrderListContext from "../context/OrderListContext";

function ItemInOrderList ({item, onRemovingItemFromList}) {
    const {orderList, setOrderList} = useContext(OrderListContext)
    const [isRemoving,setIsRemoving] = useState(false);

    const handleRemoveButton = (id) => {
        setIsRemoving(true)
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

    console.log(orderList)

    return (
        <li className={classes.item && classes.card && classes.frame} >
            <div className={classes.item__description} >  
                <h5 className={classes.item__description} >{item.name}</h5>
                <p className={classes.frame}>Total price: <FontAwesomeIcon icon={faDollarSign} />{item.qnt * item.price}</p>
                <div className={classes.frame}>Qnt. &nbsp;
                    <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(item.id)}/> {item.qnt} <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(item.id)}/>
                </div>
                <button type="button" onClick={() => handleRemoveButton(item.id)} >Remove</button>
            </div>
            {isRemoving && <p className={classes.removeMessage}>Removing...</p>}
        </li>
    );
}

export default ItemInOrderList;