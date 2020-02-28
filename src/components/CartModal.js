import React from 'react';
import { Button } from 'semantic-ui-react';

const CartModal = (props) => {

    console.log(props.cart, 'cart info inside CartModal!!')

    return (
        <div>
            <h1> Hello from Cart</h1>
            <Button onClick={props.emptyCart}>Empty Cart</Button>
        </div>
    );
};

export default CartModal;