import React, { useContext, useEffect, useState } from "react";
import classes from "./OrderModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import OrderListContext from "../context/OrderListContext";
import { createOrder } from "../../services/api";
import AuthContext, { AuthProvider } from "../context/AuthProvider";
import { getUserAddress } from "../../services/api";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ setIsModalOpen, totalOrderPrice }) => {
  const [paymentValue, setPaymentValue] = useState("creditCard");
  const authContext = useContext(AuthContext);
  const { orderList, setOrderList } = useContext(OrderListContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    order: {
      adress: "",
      price: totalOrderPrice,
    },
    list: [],
  });

  useEffect(() => {
    if (Object.keys(authContext["auth"]).length > 0) {
      getUserAddress({ Authorization: "Bearer " + authContext["auth"] }).then(
        (res) => {
          const list = orderList.map((item) => {
            return { itemId: item.id, quantity: item.qnt };
          });
          const data = {
            order: {
              address: res.data,
              price: totalOrderPrice,
            },
            list: list,
          };
          setFormData(data);
        }
      );
    }
  }, []);

  const onAdressChange = (event) => {
    const newFormData = {
      order: { ...formData.order, address: event.target.value },
      list: [...formData.list],
    };
    setFormData(newFormData);
  };

  const handleRadioInputsChange = (event) => {
    setPaymentValue(event.target.value);
  };

  const onUserSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(authContext["auth"]).length > 0) {
      createOrder(formData, {
        Authorization: "Bearer " + authContext["auth"],
      }).then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        setMessage("An issue has occur: " + err.message);
      });
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setMessage("");
    setOrderList([]);
    navigate("/");
  };


  return (
    <div className={classes.modal__wrapper}>
      <FontAwesomeIcon
        icon={faTimes}
        style={{ color: "#f40101" }}
        className={classes.modal__close}
        onClick={() => setIsModalOpen(false)}
      />
      <form className={classes.modal__content} onSubmit={onUserSubmit}>
        <div className={classes.modal__address}>
          <label>Ship to: </label>
          <input className={classes.input__adress} type="text" onChange={onAdressChange} value={formData.order.address} />
        </div>
        <label>Choose your method: </label>
        <div className={classes.modal__radio__wrapper}>
          
          <label className={classes.modal__label}>
            <input
              className={classes.modal__input}
              type="radio"
              value="creditCard"
              checked={paymentValue === "creditCard"}
              onChange={handleRadioInputsChange}
            />
            Credit Card
          </label>
          <label className={classes.modal__label}>
            <input
              className={classes.modal__input}
              type="radio"
              value="PayBox"
              checked={paymentValue === "PayBox"}
              onChange={handleRadioInputsChange}
            />
            PayBox
          </label>
          <label className={classes.modal__label}>
            <input
              className={classes.modal__input}
              type="radio"
              value="PayPal"
              checked={paymentValue === "PayPal"}
              onChange={handleRadioInputsChange}
            />
            PayPal
          </label>
        </div>
        <div className={classes.modal__price}>Price: <FontAwesomeIcon icon={faDollarSign} style={{color: "#2B6D0A"}}/>{totalOrderPrice.toFixed(2)}</div>
        <button className={classes.modal__submit} type="submit" value="Send">Create Order</button>

        {message && (
          <div className={classes.overlay}>
            <div className={classes.overlay__text}>{message}</div>
            <button className={classes.overlay__button} onClick={onModalClose}>Back Home</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderModal;
