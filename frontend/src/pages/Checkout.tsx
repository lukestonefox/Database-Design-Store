import React from "react";
import OrdersRegister from "../OrdersRegister";
import { Product } from "../types";

interface CheckoutProps {
    order: Product[];
    removeFromOrder: (productId: number) => void;
}

const Checkout: React.FC<CheckoutProps> = ({order, removeFromOrder}) => {

    return (
        <div style={{paddingTop: '50px'}}>
            <div style={{paddingLeft: '20px'}}>
                <OrdersRegister order={order} removeFromOrder={removeFromOrder}></OrdersRegister>
            </div>
        </div>
    );
};

export default Checkout;
