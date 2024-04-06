import React, { useContext, useEffect, useState } from "react";
import classes from "./OrderList.module.css";
import ItemInOrderList from "./ItemInOrderList";
import AuthContext, { AuthProvider } from "../context/AuthProvider";
import OrderListContext from "../context/OrderListContext";
import OrderModal from "./OrderModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function OrderList() {
  const { orderList, setOrderList } = useContext(OrderListContext);
  const authContext = useContext(AuthContext);
  const [totalOrderPrice, setTotalOrderPrice] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const totalPrice = orderList.reduce(
      (acc, curr) => acc + curr.qnt * curr.price,
      0
    );
    setTotalOrderPrice(totalPrice);
  }, [orderList]);

  const removeItemFromList = (id) => {
    const newOrderList = orderList.filter((item) => item.id !== id);
    setOrderList(newOrderList);
  };

  return (
    <div className={classes.order__container}>
      {!(Object.keys(authContext["auth"]).length > 0) ? (
        <p>You have to log in first!</p>
      ) : !(orderList.length > 0) ? (
        <p>The crat is empty!</p>
      ) : (
        <div>
          <ul className={classes.order__list}>
            {orderList.map((item) => (
              <ItemInOrderList
                key={item.id}
                item={item}
                onRemovingItemFromList={removeItemFromList}
              />
            ))}
          </ul>
          <br />
          <div className={classes.order__button}>
            <p>All in total: <FontAwesomeIcon icon={faDollarSign} style={{ color: "#2B6D0A"}} />{totalOrderPrice}</p>
            <button onClick={() => setIsModalOpen(true)}>Order</button>
          </div>
        </div>
      )}
      {isModalOpen && <OrderModal setIsModalOpen={setIsModalOpen} totalOrderPrice={totalOrderPrice}/>}
    </div>
  );
}

export default OrderList;
