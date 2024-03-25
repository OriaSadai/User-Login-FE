import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./ItemPage.module.css";
import { useParams } from "react-router-dom";
import { getItem } from "../../services/api";
import OrderListContext from "../context/OrderListContext";

function ItemPage(props) {
  const [qnt, setQnt] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const { id } = useParams();
  const totalPrice = (qnt * selectedItem.price).toFixed(2);
  const {addToCartHandler} = useContext(OrderListContext);

  // const a = ["dsf","222"]
  // const b = {iid:1,title:"sadsada"}
  // const [first,second] = a;
  // const {iid, title} = b;
  // console.log(title)
  // console.log(second)
  

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await getItem(id);
        setSelectedItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchedData();
  }, []);

  function handleIncrementCount() {
    const {inStock} = selectedItem;
    if(qnt === inStock) {
        alert("Not In Stock");
        return;
    }
    setQnt((prev) => prev + 1);
  }

  function handleDecrementCount() {
    if(qnt === 0) return;
    setQnt((prev) => prev - 1);
  }

  function addToCart () {
    addToCartHandler(selectedItem,qnt);
  }

  return (
    <div className={classes.container}>
      <div>
        <h3>{selectedItem.name}</h3>
        <p>{selectedItem.description}</p>
        <img src={selectedItem.bigUrlPicture} width="540" height="300" />
      </div>
      <div>
        <p>Price: <span>{selectedItem.price}</span></p>
      </div>
      <div className={classes.bottonContainer}>
        <p className={classes.in__stock}>Only {selectedItem.inStock} availeble!</p>
        <button onClick={handleDecrementCount}>-</button>
        <span>{qnt}</span>
        <button onClick={handleIncrementCount}>+</button>
        <button onClick={addToCart}>Add to cart </button>
        <p>Total Price: <span>{totalPrice}</span></p>
      </div>
    </div>
  );
}

export default ItemPage;
