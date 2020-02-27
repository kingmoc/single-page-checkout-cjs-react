import React from 'react';
import Commerce from '@chec/commerce.js'
import { Button } from 'semantic-ui-react';

const CartModal = () => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const emptyCart = e => {
        e.preventDefault()
        console.log('works')
        commerce.cart.empty()
            .then(res => {
                console.log(res, 'res from empty cart')
            })
    }

    return (
        <div>
            <h1> Hello from Cart</h1>
            <Button onClick={emptyCart}>Empty Cart</Button>
        </div>
    );
};

export default CartModal;