import React, { useState, useEffect } from 'react';
import { Form, Grid, Item, Header, Container, Segment, Divider, Dropdown } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'

// Import Selections
import { monthOptions, yearOptions} from '../utils/cardOptions'
import { stateOptions } from '../utils/stateOptions'

// Component Imports
import CheckoutForm from './CheckoutForm'
import CheckoutItems from './CheckoutItems'
import { Link } from 'react-router-dom';

const CheckoutContainer = (props) => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [liveObject, setLiveObject] = useState()
    const [tokenId, setTokenId] = useState()

    useEffect(() => {
        let cartId = props.match.params.id
        commerce.checkout.generateToken(cartId, { type: 'cart' })
            .then(res => {
                console.log(res, 'response from generating checkout Token')
                setLiveObject(res.live)
                setTokenId(res.id)
            })
            .catch(err => {
                console.log(err)
            })

        props.setCheckout(true)
    },[])

    const handleReturnCart = e => {
        props.setModalOpen(true)
    }


    return (
        <Grid columns={2} centered padded>
            <Grid.Row className='checkout-row'>
                <Grid.Column width={8}>
                    {liveObject && tokenId && <CheckoutForm liveObject={liveObject} tokenId={tokenId} />}
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment padded>
                        <Header textAlign='center' size='huge'>Current Cart</Header>
                        <Header onClick={handleReturnCart} textAlign='center'><Link to='/'>Return to Cart</Link></Header>
                        {liveObject && liveObject.line_items.map(item => (
                            <Container className='item-data-container' key={item.id}>
                                <CheckoutItems item={item} key={item.id}/>
                            </Container>
                        ))}
                    <Divider horizontal>Shipping Options</Divider>
                    <Dropdown
                        placeholder='Select Shipping Method'
                        fluid
                        selection
                        // options={friendOptions}
                    />      
                    <Divider horizontal>Cart Totals</Divider>
                    {liveObject && <Header textAlign='center' size='large'>{liveObject.total.formatted_with_symbol}</Header>}
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default CheckoutContainer;