import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
// import Commerce from '@chec/commerce.js'

// Import Selections
import { monthOptions, yearOptions} from '../utils/cardOptions'
import { stateOptions } from '../utils/stateOptions'

const CheckoutForm = (props) => {

    // console.log(props, 'props from CheckoutContainer - live object')
    
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
        let li = props.liveObject.line_items.map(item => {

            return {
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
            line_items: {...li},
            fullfillment: {
                shipping_method: props.liveObject.shipping.available_options[0].id
            }
        })
    }, [])


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
                }
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
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        console.log(formInfo, 'form info after submit!!!!')
    }

    return (
        <Form className='checkout-form' onSubmit={handleSubmit}>
            <h1>Customer Info</h1>
            <Form.Group widths='equal'>
                <Form.Input fluid id='customer' name='firstname' label='First name' placeholder='John' onChange={handleChanges}/>
                <Form.Input fluid id='customer' name='lastname' label='Last name' placeholder='Smith' onChange={handleChanges}/>
                <Form.Input fluid id='customer' name='email' label='Email' placeholder='xyz@example.com' onChange={handleChanges}/>
            </Form.Group>
            <Form.Group>
                <Form.Input width={5} id='shipping' name='street' label='Address' placeholder='122 Example St' onChange={handleChanges}/>
                <Form.Input width={3} id='shipping' name='town_city' label='City' placeholder='Las Vegas' onChange={handleChanges}/>
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
                <Form.Input width={2} id='shipping' name='postal_zip_code' label='Zip' placeholder='00000' maxLength="5" onChange={handleChanges}/>
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
            <Form.Button>
                Complete Checkout
            </Form.Button>
        </Form>
    );
};

export default CheckoutForm;