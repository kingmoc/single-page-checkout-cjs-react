import React, { useEffect } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'
import { useParams } from 'react-router';


const CheckoutComplete = () => {
    // console.log(props, 'props from reciept!!!')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    let {checkoutToken, orderId} = useParams()

    console.log(checkoutToken, orderId, 'from useParams HOOK!!')

    useEffect(() => {
        
        commerce.checkout.receipt('chkt_Vw7prN84MD0ejo')
            .then(res=> {
                console.log(res, 'res from reciept call')
            })
            .catch(err=>console.log(err, 'error from reciept call'))
    }, [])

    return (
        <>
            <Segment className='order-complete'>
                <h1>Order Complete</h1>
                <Header>Shipping to:</Header>
                {/* <p>{props.receipt.shipping.name}</p> */}
            </Segment>
        </>
    );
};

export default CheckoutComplete;