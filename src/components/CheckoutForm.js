import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'

// Import Selections
import { monthOptions, yearOptions} from '../utils/cardOptions'
import { stateOptions } from '../utils/stateOptions'

const CheckoutForm = (props) => {
    // console.log(props, 'inside checkout form!!')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [sameBilling, setSameBilling] = useState(false)
    const [formInfo, setFormInfo] = useState({
        customer: {
            firstname: '',
            lastname: '',
            email: ''
        },
        shipping: {
            name: '',
            street: '',
            town_city: '',
            county_state: '',
            postal_zip_code: '',
            country: 'US',
        },
        payment: {
            gateway: 'test_gateway',
            card: {
                number: '',
                expiry_month: '',
                expiry_year: '',
                cvc: '',
                postal_zip_code: ''
            }
        }
    })

    useEffect(() => {
        let lineItems = {}

        props.liveObject.line_items.forEach(item => {

            lineItems = {
                ...lineItems,
                [item.id]: {
                    quantity: item.quantity,
                    variants: {
                        [item.variants[0].variant_id]: item.variants[0].option_id
                    }
                }
            }
        })

        setFormInfo({
            ...formInfo,
            line_items: lineItems,
            fulfillment: {
                shipping_method: props.liveObject.shipping.available_options[0].id
            }
        })
    }, [])

    useEffect(() => {

        if(sameBilling) {
            console.log('SameBilling is checked')
            setFormInfo({
                ...formInfo,
                billing: {...formInfo.shipping}
            })
        }

    }, [sameBilling])


    const handleChanges = (e, { name, value, id }) => {
        
        if (id === 'customer') {
            setFormInfo({
                ...formInfo, 
                customer: {
                    ...formInfo.customer,
                    [name]: value
                }
            })
        }

        if (id === 'shipping') {
            setFormInfo({
                ...formInfo,
                shipping: {
                    ...formInfo.shipping,
                    [name]: value,
                    name: `${formInfo.customer.firstname} ${formInfo.customer.lastname}`
                },
                // billing: {
                //     ...formInfo.billing,
                //     [name]: value,
                //     name: `${formInfo.customer.firstname} ${formInfo.customer.lastname}`,
                //     country: 'US'

                // }
            })
        }

        if (id === 'payment') {
            setFormInfo({
                ...formInfo,
                payment: {
                    ...formInfo.payment,
                    card: {
                        ...formInfo.payment.card, 
                        [name]: value
                    }
                }
            })
        }

        if (id === 'billing' && !sameBilling) {
            setFormInfo({
                ...formInfo,
                billing: {
                    ...formInfo.billing,
                    [name]: value,
                    country: 'US'
                }
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(formInfo, 'info that is being submitted to capture!')

        
        // commerce.checkout.capture(props.tokenId, formInfo)
        //     .then(res => {
        //         console.log(res, 'res from CAPTURING CHECKOUT!!!')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

    }

    const handleCheckBox = e => {  
        setSameBilling(!sameBilling)
    }

    return (
        <Form className='checkout-form' onSubmit={handleSubmit}>
            <h1>Customer Info</h1>
            <Form.Group widths='equal'>
                <Form.Input fluid id='customer' name='firstname' label='First name' placeholder='John' onChange={handleChanges}/>
                <Form.Input fluid id='customer' name='lastname' label='Last name' placeholder='Smith' onChange={handleChanges}/>
                <Form.Input fluid id='customer' name='email' label='Email' placeholder='xyz@example.com' onChange={handleChanges}/>
            </Form.Group>
            <Form.Input id='shipping' name='street' label='Address' placeholder='122 Example St' onChange={handleChanges}/>
            <Form.Group>
                <Form.Input width={6} id='shipping' name='town_city' label='City' placeholder='Las Vegas' onChange={handleChanges}/>
                <Form.Select 
                    width={6} label='State' 
                    placeholder='Search State'
                    id='shipping'
                    name='county_state' 
                    search 
                    selection 
                    fluid
                    options={stateOptions}
                    onChange={handleChanges}
                />
                <Form.Input width={4} id='shipping' name='postal_zip_code' label='Zip' placeholder='00000' maxLength="5" onChange={handleChanges}/>
            </Form.Group>
            <h1>Payment Info</h1>
            <Form.Group>
                <Form.Input id='payment' name='number' label='Credit Card Number' placeholder='0000111100001111' onChange={handleChanges}/>
                <Form.Input id='payment' name='postal_zip_code' label='Billing Zip' placeholder='Enter Billing Zip Code' onChange={handleChanges}/>
            </Form.Group>
            <Form.Group>
                <Form.Select id='payment' width={3} name='expiry_month' fluid options={monthOptions} label='Month' placeholder='02' onChange={handleChanges}/>
                <Form.Select id='payment' width={3} name='expiry_year' fluid options={yearOptions} label='Year' placeholder='23' onChange={handleChanges}/>
                <Form.Input id='payment' width={3} name='cvc' fluid label='CVV' placeholder='123' type='password' maxLength="3" onChange={handleChanges}/>
            </Form.Group>
            <h1>Billing Address</h1>
            <Form.Checkbox label='Billing Address Same as Shipping ...' onChange={handleCheckBox} />
            {!sameBilling && (
                <>
                    <Form.Group widths='equal'>
                        <Form.Input fluid id='billing' name='name' label='Billing Name' placeholder='John Smith' onChange={handleChanges}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input width={5} id='billing' name='street' label='Address' placeholder='122 Example St' onChange={handleChanges}/>
                        <Form.Input width={3} id='billing' name='town_city' label='City' placeholder='Las Vegas' onChange={handleChanges}/>
                        <Form.Select 
                            width={6} label='State' 
                            placeholder='Search State'
                            id='billing'
                            name='county_state' 
                            search 
                            selection 
                            fluid
                            options={stateOptions}
                            onChange={handleChanges}
                        />
                        <Form.Input width={2} id='billing' name='postal_zip_code' label='Zip' placeholder='00000' maxLength="5" onChange={handleChanges}/>
                    </Form.Group>
                </>
            )}
            <Form.Button color='green' size='huge'>
                Complete Checkout and Pay
            </Form.Button>
        </Form>
    );
};

export default CheckoutForm;