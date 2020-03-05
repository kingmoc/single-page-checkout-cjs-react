import React, { useState, useEffect } from 'react';
import { Form, Grid, Item, Header, Container, Segment, Divider, Dropdown, Input, Button } from 'semantic-ui-react';
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
    const [shippingOptions, setShippingOptions] = useState()
    const [shippingPrice, setShippingPrice] = useState()
    const [shipOption, setShipOption] = useState()
    const [discountCode, setDiscountCode] = useState()


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

    useEffect(() => {
        let shippingOptionsArray = []

        if(liveObject) {
            shippingOptionsArray = liveObject.shipping.available_options.map(option => {
                console.log(option, 'option from inital shipping property')
                let sizeInfo = {}
    
                sizeInfo.key = option.id
                sizeInfo.text = `${option.description}(${option.price.formatted_with_code})`
                // sizeInfo.value = option.price.raw
                sizeInfo.value = option.id
    
                return sizeInfo
            })
        }

        setShippingOptions(shippingOptionsArray)

    }, [liveObject])

    const handleReturnCart = e => {
        props.setModalOpen(true)
    }

    const handleDropDownShipping = (e, {value, options}) => {

        console.log(value, 'value')
        console.log(options, 'options')
        

        // commerce.checkout.checkShippingOption(tokenId, {
        //     id: value,
        //     // country: "US"
        // })
        //     .then(res => {  
        //         console.log(res, 'res from checking discount code')
        //         // setLiveObject(res.live)
        //     })
        //     .catch(err => console.log(err))

    }

    const handleDiscountCode = (e, {value}) => {
        setDiscountCode(value)
    }
    
    const handleDiscountClick = (e, {value}) => {
        e.preventDefault()
        console.log(discountCode, 'Discount Code')

        commerce.checkout.checkDiscount(tokenId, {code: discountCode})
            .then(res => {  
                console.log(res, 'res from checking discount code')
                setLiveObject(res.live)
            })
            .catch(err => console.log(err))

    }



    return (
        <Grid columns={2} centered padded>
            <Grid.Row className='checkout-row'>
                <Grid.Column width={8}>
                    {liveObject && tokenId && (
                        <CheckoutForm liveObject={liveObject} tokenId={tokenId} shipOption={shipOption}/>
                    )}
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
                        onChange={handleDropDownShipping}
                        options={shippingOptions}
                    /> 
                    <Divider horizontal>Discount Code</Divider>
                    <form className='discount-code'>
                        <Input onChange={handleDiscountCode} />
                        <Button color='black' onClick={handleDiscountClick}>Apply</Button>     
                    </form>
                    <Divider horizontal>Cart Totals</Divider>
                    {liveObject && (
                        <Header textAlign='center' size='large'>
                            {
                                shippingPrice ? `$${(liveObject.total.raw + shippingPrice).toFixed(2)}`  
                                : 
                                liveObject.total.formatted_with_symbol
                            }
                        </Header>
                    )}
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default CheckoutContainer;