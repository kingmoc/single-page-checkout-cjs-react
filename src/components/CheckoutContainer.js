import React, { useState, useEffect } from 'react';
import { Form, Grid, Item, Header } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'

// Import Selections
import { monthOptions, yearOptions} from '../utils/cardOptions'
import { stateOptions } from '../utils/stateOptions'

// Component Imports
import CheckoutForm from './CheckoutForm'
import CheckoutItems from './CheckoutItems'

const CheckoutContainer = (props) => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [liveObject, setLiveObject] = useState()

    useEffect(() => {
        let cartId = props.match.params.id
        commerce.checkout.generateToken(cartId, { type: 'cart' })
            .then(res => {
                console.log(res, 'response from generating checkout Token')
                setLiveObject(res.live)
            })
            .catch(err => {
                console.log(err)
            })

        props.setCheckout(true)
    },[])


    return (
        <Grid columns={2} centered padded>
            <Grid.Row className='checkout-row'>
                <Grid.Column width={8}>
                    {liveObject && <CheckoutForm liveObject={liveObject}/>}
                </Grid.Column>
                <Grid.Column width={5}>
                    <Item.Group>
                        <Header textAlign='center' size='huge'>Current Cart</Header>
                        {liveObject && liveObject.line_items.map(item => (
                            <Item key={item.id}>
                                <CheckoutItems item={item} />
                            </Item>
                        ))}
                    </Item.Group>
                    {liveObject && <Header floated='right'>Total = {liveObject.total.formatted_with_symbol}</Header>}      
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default CheckoutContainer;