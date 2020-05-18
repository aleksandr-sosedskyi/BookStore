import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import ShoppingCartMain from "../../components/ShoppingCart/ShoppingCart";


const ShoppingCart = (props) => {
    return (
        <>
            <Dashboard mainComponent={ShoppingCartMain} />
        </>
    );
}

export default ShoppingCart;