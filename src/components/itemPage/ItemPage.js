import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import classes from "./ItemPage.module.css";
import { useParams } from "react-router-dom";
import {
  getItem,
  getItemAuthenticate,
  addToFavorite,
  removeFromFavorite
} from "../../services/api";
import OrderListContext from "../context/OrderListContext";
import AuthContext, { AuthProvider } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faHeart, faShoppingCart, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import normalizeItemName from "../../utils/itemUtils";

function ItemPage() {
  const authContext = useContext(AuthContext);
  const [qnt, setQnt] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const { id } = useParams();
  const totalPrice = (qnt * selectedItem.price).toFixed(2);
  const { addToCartHandler } = useContext(OrderListContext);
  const [message, setMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (Object.keys(authContext["auth"]).length > 0) {
      const fetchedData = async () => {
        try {
          const res = await getItemAuthenticate(id, {
            Authorization: "Bearer " + authContext["auth"],
          });
          let itemName = normalizeItemName(res.data.name);
          setSelectedItem({ ...res.data, displayName: itemName });
        } catch (err) {
          console.log("error receiving item " + err);
        }
      };
      fetchedData();
    } else {
      const fetchedData = async () => {
        try {
          const res = await getItem(id);
          let itemName = normalizeItemName(res.data.name);
          setSelectedItem({ ...res.data, displayName: itemName });
        } catch (err) {
          console.error("error receiving item " + err);
        }
      };
      fetchedData();
    }
  }, [selectedItem.isFavorite]);

  const favToggle = useCallback( async () => {
    if (Object.keys(authContext["auth"]).length > 0) {
      console.log("JWT is: " + authContext["auth"]);
      if (!selectedItem.isFavorite) {
        console.log("On Item Page - Adding item id: " + selectedItem.id);
        addToFavorite({
          itemId: selectedItem.id,
          Authorization: "Bearer " + authContext["auth"],
        }).then(() => {
          console.log("Hi from add to favorite");
          setSelectedItem((prev) => ({...prev, isFavorite:true}));
        });
      } else {
        removeFromFavorite({
          itemId: selectedItem.id,
          Authorization: "Bearer " + authContext["auth"],
        }).then(() => {
          console.log("Hi from remove fromfavorite");
          setSelectedItem((prev) => ({...prev, isFavorite:false}));
        });
      }
    } else {
      console.log("Authorization not provider");
    }
  }, [selectedItem.isFavorite]);

  function handleIncrementCount() {
    const { inStock } = selectedItem;
    if (qnt === inStock) {
      alert("Not In Stock");
      return;
    }
    setQnt((prev) => prev + 1);
  }

  function handleDecrementCount() {
    if (qnt === 0) return;
    setQnt((prev) => prev - 1);
  }

  function addToCart() {
    if (Object.keys(authContext["auth"]).length > 0) {
      addToCartHandler(selectedItem, qnt);
      setMessage("Adding...");
      setTimeout(() => {
        setIsAdded(true);
        setMessage("");
      }, 1000);
    } else {
      setMessage("You have to login first!");
      setTimeout(() => setMessage(""), 1000);
    }
  }

  return (
    <div className={classes.container}>
      <div>
        <h3>{selectedItem.displayName}</h3>
        <p>{selectedItem.description}</p>
        <img src={selectedItem.bigUrlPicture} width="540" height="300" />
      </div>
      <div>
        <p>
          Price:{" "}
          <FontAwesomeIcon icon={faDollarSign} style={{ color: "#274e13" }} />
          <span>{selectedItem.price}</span>
        </p>
        <p>
          {!selectedItem.isFavorite && <span>Add to favorite </span>}{" "}
          <FontAwesomeIcon
            icon={selectedItem.isFavorite ? faHeart : regular.faHeart}
            style={{ color: "#e61428" }}
            onClick={() => favToggle()}
            className={classes.clickable}
          />
        </p>
      </div>
      <div className={classes.bottonContainer}>
        {selectedItem.inStock < 10 && (
          <p className={classes.in__stock}>
            Only {selectedItem.inStock} availeble!
          </p>
        )}
        {message && <p>{message}</p>}
        <button onClick={handleDecrementCount}><FontAwesomeIcon icon={faMinus} style={{ color: "#2B6D0A" }}/></button>
        <span> {qnt} </span>
        <button onClick={handleIncrementCount}><FontAwesomeIcon icon={faPlus} style={{ color: "#2B6D0A" }}/></button>
        <button onClick={addToCart} disabled={qnt === 0 || isAdded}>
          {!isAdded ? <span>Add to cart <FontAwesomeIcon icon={faShoppingCart} style={{color: "#E19559",}} /></span> : <span>Added <FontAwesomeIcon icon={faShoppingCart} style={{color: "#ff7000",}} /></span>}
        </button>
        <p>
          Total Price:{" "}
          {totalPrice > 0 && (
            <span>
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ color: "#274e13" }}
              />{" "}
              {totalPrice}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ItemPage;
