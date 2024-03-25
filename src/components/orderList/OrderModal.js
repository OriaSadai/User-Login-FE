import React, { useContext, useEffect, useState } from "react";
import classes from "./OrderModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import OrderListContext from "../context/OrderListContext";
import {createOrder} from "../../services/api";
import AuthContext, {AuthProvider} from "../context/AuthProvider";


const OrderModal = ({setIsModalOpen, totalOrderPrice}) => {
    const [paymentValue, setPaymentValue] = useState("creditCard");
    const authContext = useContext(AuthContext);
    const {orderList} = useContext(OrderListContext);
    const [formData,setFormData] = useState({})

    useEffect(() => {
        const list = orderList.map((item) => {
            return {itemId: item.id, quantity: item.qnt};
        })
        const data = {
            order: {
                address: "test adress",
                price: totalOrderPrice,
            },
            list: list
        }

        setFormData(data)
    },[])

    console.log(formData)

    const handleRadioInputsChange = (event) => {
        setPaymentValue(event.target.value)
    }

    const onUserSubmit = (event) => {
        event.preventDefault();

        if(Object.keys(authContext["auth"]).length > 0 ) {
            createOrder({"Authorization": "Bearer " + authContext["auth"], formData})
            .then(
                res => {
                    console.log(res)
                }
            );
        }
    }

  return (
    <div className={classes.modal__wrapper}>
        <FontAwesomeIcon icon={faTimes} size="lg" style={{color: "#f40101",} } className={classes.modal__close} onClick={() => setIsModalOpen(false)}  />
      <form className={classes.modal__content} onSubmit={onUserSubmit}>
        <div className={classes.modal__radio__wrapper}>
            <label className={classes.modal__label}>
                <input className={classes.modal__input} type="radio" value="creditCard" checked={paymentValue === "creditCard"} onChange={handleRadioInputsChange}/>
                Credit Card
            </label>
            <label className={classes.modal__label}>
                <input className={classes.modal__input} type="radio" value="PayBox" checked={paymentValue === "PayBox"} onChange={handleRadioInputsChange}/>
                PayBox
            </label>
            <label className={classes.modal__label}>
                <input className={classes.modal__input} type="radio" value="PayPal" checked={paymentValue === "PayPal"} onChange={handleRadioInputsChange}/>
                PayPal
            </label>
        </div>
        <div className={classes.modal__price}>{totalOrderPrice.toFixed(2)}</div>
        <input className={classes.modal__submit} type="submit" value="Send" />
      </form>
    </div>
  );
};

export default OrderModal;
