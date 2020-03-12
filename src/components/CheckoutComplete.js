import React, { useEffect } from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import img from '../img/checkout-complete-img.JPG'


const CheckoutComplete = (props) => {
    // console.log(props, 'props from reciept!!!')
    // const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)


    useEffect(() => {
        props.setCheckout(true)
    }, [])
        
    // let {checkoutToken, orderId} = useParams()
    // console.log(checkoutToken, orderId, 'from useParams HOOK!!')

    // useEffect(() => {
        
    //     commerce.checkout.receipt(checkoutToken)
    //         .then(res=> {
    //             console.log(res, 'res from reciept call')
    //         })
    //         .catch(err=>console.log(err, 'error from reciept call'))
    // }, [])

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