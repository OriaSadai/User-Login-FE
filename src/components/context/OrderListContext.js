import React, { createContext, useState } from "react";

const OrderListContext = createContext({});

export const OrderListProvider = ({ children }) => {
    const [ orderList, setOrderList ] = useState([]);

    const addToCartHandler = (item, qnt) => {
        const isItemExist = orderList.some((currentItem) => currentItem.id === item.id)
        if(!qnt) return;
        if(!isItemExist) {
            const newOrderList = [...orderList,{...item,qnt}]
            setOrderList(newOrderList)
        }
    }

    return (
        <OrderListContext.Provider value={{ orderList, setOrderList, addToCartHandler}}>
            {children}
        </OrderListContext.Provider>
    );
}

export default OrderListContext;