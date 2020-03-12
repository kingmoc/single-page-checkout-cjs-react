import React, { useEffect } from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import img from '../img/checkout-complete-img.JPG'


const CheckoutComplete = (props) => {

    useEffect(() => {
        props.setCheckout(true)
    }, [])

    return (
        <>
            <Segment className='order-complete'>
                <div>
                    <h1>Order Complete</h1>
                    <Header>Thanks for shopping at Seities Apparel</Header>
                    <Link to='/'>Return to All Products</Link>
                </div>
                <Image src={img} size='large' />
            </Segment>
        </>
    );
};

export default CheckoutComplete;