import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Label } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'
import { useForm, Controller } from 'react-hook-form'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import qs from 'qs'

// Import Selections
import { monthOptions, yearOptions} from '../utils/cardOptions'
import { stateOptions } from '../utils/stateOptions'
import { canada } from '../utils/North America/canada'
import { mexico } from '../utils/North America/mexico'
import { countries } from '../utils/Countries'

const CheckoutForm = (props) => {
    // console.log(props, 'inside checkout form!!')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
    const { register, handleSubmit, errors, control, reset } = useForm()

    let history = useHistory()

    const [sameBilling, setSameBilling] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [lineItems, setLineItems] = useState()
    const [shipCountry, setShipCountry] = useState()
    const [billingShipCountry, setBillingShipCountry] = useState()


    useEffect(() => {

        /* 
            Takes Line Items from props and strutures the data 
            Object added to state   
        */

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

        setLineItems(lineItems)

    }, [])

    useEffect(() => {
        /* *** Takes the Shipping Country and updates shipping Options *** */
        props.getShippingOptions(shipCountry)
    }, [shipCountry])

    const getCountryInfoShipping = () => {

        /* *** Gives user proper options based on Shipping Country *** */
        
        if (shipCountry === 'MX') {
            return mexico
        }

        if (shipCountry === 'CA') {
            return canada
        }

        if (shipCountry === 'US') {
            return stateOptions
        }
    }
    
    const getCountryInfoBilling = () => {

        /* *** Gives user proper options based on Shipping Country *** */
        
        if (billingShipCountry === 'MX') {
            return mexico
        }

        if (billingShipCountry === 'CA') {
            return canada
        }

        if (billingShipCountry === 'US') {
            return stateOptions
        }
    }

    const handleCheckBox = e => {  
        /* *** Toggles Checkbox on/off *** */
        setSameBilling(!sameBilling)
    }

    const onSubmit = (data) => {

        /* *** 
            Takes in all the data gathered from the Form
            Parses the data properly to match the shape for capture
        *** */

        setProcessing(true)

        let final = {}

        final.line_items = lineItems

        final.fulfillment = {
            shipping_method: props.shipOption
        }

        final.customer = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email
        }

        final.shipping = {
            name: `${data.firstname} ${data.lastname}`,
            street: data.street,
            town_city: data.town_city,
            county_state: data.county_state,
            postal_zip_code: data.postal_zip_code,
            country: data.country
        }

        if (!sameBilling) {
            final.billing = {
                name: data.billing_name,
                street: data.billing_street,
                town_city: data.billing_town_city,
                county_state: data.billing_county_state,
                postal_zip_code: data.billing_postal_zip_code,
                country: data.billing_country
            }
        }

        if (data.gateway === 'stripe') {

            let stripInfo = {
                name: `${data.firstname} ${data.lastname}`,
                number: data.number,
                exp_month: data.expiry_month,
                exp_year: data.expiry_year,
                cvc: data.cvc,
                address_zip: data.postal_billing_zip_code
            }

            axiosWithAuth().post('/tokens', qs.stringify({card: stripInfo}))
                .then(res => {
                    // console.log(res, 'res from token call')
                    final.payment = {
                        gateway: data.gateway,
                        card: {
                            token: res.data.id
                        }
                    }

                    if (props.shipOption) {
                        commerce.checkout.capture(props.tokenId, final)
                            .then(res => {
                                    // console.log(res, 'res from CAPTURING CHECKOUT!!!')
                                    props.setReceipt(res)
                                    localStorage.removeItem('cart-id')
                                    history.push(`/order-complete/${props.tokenId}/${res.id}`)
                                    setProcessing(false)
                            })
                            .catch(err => {
                                    window.alert(err.data.error.message)
                                    setProcessing(false)
                            })
                    }
                })
                .catch(err => {
                    console.log(err.data, 'error message')
                })
        } else {
            final.payment = {
                gateway: data.gateway,
                card: {
                    number: data.number,
                    expiry_month: data.expiry_month,
                    expiry_year: data.expiry_year,
                    cvc: data.cvc,
                    postal_zip_code: data.postal_billing_zip_code,
                }
            }

            if (props.shipOption) {
                commerce.checkout.capture(props.tokenId, final)
                    .then(res => {
                            // console.log(res, 'res from CAPTURING CHECKOUT!!!')
                            props.setReceipt(res)
                            localStorage.removeItem('cart-id')
                            history.push(`/order-complete/${props.tokenId}/${res.id}`)
                            setProcessing(false)
                    })
                    .catch(err => {
                            window.alert(err.data.error.message)
                            setProcessing(false)
                    })
            }
        }
    }
        
    return (
        <Form className='checkout-form' onSubmit={handleSubmit(onSubmit)} loading={processing}>
            <h1>Customer Info</h1>
            <Form.Group widths='equal'>
                <Controller
                    id='customer' 
                    as={Form.Input} 
                    name="firstname" 
                    control={control}
                    fluid
                    label='First Name'
                    placeholder='John'
                    rules={{ required: "Please enter Firstname" }}
                    error={errors.firstname && errors.firstname.message} 
                />
                <Controller 
                    fluid 
                    as={Form.Input}
                    control={control}
                    name='lastname' 
                    label='Last name' 
                    placeholder='Smith'
                    rules={{ required: "Please enter Lastname" }}
                    error={errors.lastname && errors.lastname.message}  
                />
                <Controller 
                    fluid 
                    name='email'
                    type='email' 
                    label='Email' 
                    placeholder='xyz@example.com'
                    as={Form.Input}
                    control={control}
                    rules={{ required: "Please enter email" }}
                    error={errors.email && errors.email.message}  
                />
            </Form.Group>
            <Form.Group>
                <Controller 
                    width={10} 
                    name='street' 
                    label='Address' 
                    placeholder='122 Example St'
                    as={Form.Input}
                    control={control}
                    rules={{ required: "Please enter address" }}
                    error={errors.street && errors.street.message}   
                />
                <Controller
                    width={6} 
                    name='country' 
                    label='Select Country' 
                    options={countries}
                    as={Form.Select}
                    control={control}
                    rules={{ required: "Please select country" }}
                    error={errors.country && errors.country.message} 
                    onChange={(e) => {
                        setShipCountry(e[1].value)
                        props.setShipOption(false)
                        reset({
                            county_state: ''
                        })
                        return e[1].value 
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Controller 
                    width={6} 
                    name='town_city' 
                    label='Town/City' 
                    placeholder='Las Vegas' 
                    as={Form.Input}
                    control={control}
                    rules={{ required: "Please enter Town/City" }}
                    error={errors.town_city && errors.town_city.message} 
                />
                <Controller
                    width={6} 
                    label='County/State/Province/Territory' 
                    placeholder='Search ...'
                    name='county_state' 
                    search 
                    fluid
                    options={getCountryInfoShipping()}
                    as={Form.Select}
                    control={control}
                    rules={{ required: "Must Select Country First" }}
                    error={errors.county_state && errors.county_state.message} 
                    onChange={(e) => e[1].value}
                />
                <Controller
                    width={4} 
                    type='number'
                    name='postal_zip_code' 
                    label='Zip/Postal' 
                    placeholder='00000'
                    as={Form.Input}
                    control={control}
                    max='99999'
                    rules={{ 
                        required: "Please enter zip",
                        // max: 99999
                    }}
                    error={errors.postal_zip_code && errors.postal_zip_code.message} 
                />
            </Form.Group>
            <h1>Payment Info</h1>
            <Form.Group className='payment-radio'>
                <input
                    name='gateway' 
                    type='radio'
                    value='test_gateway'
                    ref={register({ required: "Please select Payment Type" })}
                />
                <label htmlFor="test_gateway">Test Gateway</label>
                <input
                    name='gateway' 
                    type='radio'
                    value='stripe'
                    ref={register({ required: "Please select Payment Type" })}
                />
                <label htmlFor="stripe">Credit Card</label>
            </Form.Group>
            {errors.gateway && (
                <Label 
                    className='payment-type-error'
                    basic   
                    pointing  
                >
                    {errors.gateway.message}
                </Label>
            )}
            <Form.Group>
                <Controller
                    name='number'
                    type='number' 
                    label='Credit Card Number' 
                    placeholder='0000111100001111' 
                    as={Form.Input}
                    control={control}
                    rules={{ required: "Please enter Card Number" }}
                    error={errors.number && errors.number.message}
                />
                <Controller
                    name='postal_billing_zip_code' 
                    type='number'
                    max='99999'
                    label='Billing Zip' 
                    placeholder='Enter Billing Zip Code'
                    as={Form.Input}
                    control={control}
                    rules={{ required: "Please enter Billing zip" }}
                    error={errors.postal_billing_zip_code && errors.postal_billing_zip_code.message} 
                />
            </Form.Group>
            <Form.Group>
                <Controller 
                    width={3} 
                    name='expiry_month' 
                    fluid 
                    options={monthOptions} 
                    label='Month' 
                    as={Form.Select}
                    control={control}
                    rules={{ required: "Must Select Expiration Month" }}
                    error={errors.expiry_month && errors.expiry_month.message} 
                    onChange={(e) => e[1].value} 
                />
                <Controller 
                    width={3} 
                    name='expiry_year' 
                    fluid 
                    options={yearOptions} 
                    label='Year' 
                    as={Form.Select}
                    control={control}
                    rules={{ required: "Must Select Expiration Year" }}
                    error={errors.expiry_year && errors.expiry_year.message} 
                    onChange={(e) => e[1].value} 
                />
                <Controller 
                    width={3} 
                    name='cvc'
                    type='number'
                    label='CVC' 
                    placeholder='123'
                    as={Form.Input}
                    control={control}
                    rules={{ required: "Please enter CVC" }}
                    error={errors.cvc && errors.cvc.message} 
                />
            </Form.Group>
            <h1>Billing Address</h1>
            <Form.Checkbox label='Billing Address Same as Shipping ...' onChange={handleCheckBox} />
            {!sameBilling && (
                <>
                    <Form.Group widths='equal'>
                        <Controller 
                            width={10} 
                            name='billing_name' 
                            label='Billing Name' 
                            placeholder='John Smith' 
                            as={Form.Input}
                            control={control}
                            rules={{ required: "Please enter Billing Name" }}
                            error={errors.billing_name && errors.billing_name.message} 
                        />
                        <Controller
                            width={6} 
                            name='billing_country' 
                            label='Select Country' 
                            options={countries}
                            as={Form.Select}
                            control={control}
                            rules={{ required: "Please select country" }}
                            error={errors.billing_country && errors.billing_country.message} 
                            onChange={(e) => {
                                setBillingShipCountry(e[1].value)
                                reset({
                                    billing_county_state: ''
                                })
                                return e[1].value 
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Controller 
                            width={4} 
                            name='billing_street' 
                            label='Address' 
                            placeholder='122 Example St' 
                            as={Form.Input}
                            control={control}
                            rules={{ required: "Please enter Street Address" }}
                            error={errors.billing_street && errors.billing_street.message} 
                        />
                        <Controller 
                            width={3} 
                            name='billing_town_city' 
                            label='City' 
                            placeholder='Las Vegas' 
                            as={Form.Input}
                            control={control}
                            rules={{ required: "Please enter City/Town" }}
                            error={errors.billing_town_city && errors.billing_town_city.message} 
                        />
                        <Controller
                            width={6} 
                            label='County/State/Province/Territory' 
                            placeholder='Search State'
                            name='billing_county_state' 
                            search 
                            selection 
                            fluid
                            options={getCountryInfoBilling()}
                            as={Form.Select}
                            control={control}
                            rules={{ required: "Must Select Country First" }}
                            error={errors.billing_county_state && errors.billing_county_state.message} 
                            onChange={(e) => e[1].value}
                        />
                        <Controller 
                            width={3} 
                            type='number'
                            name='billing_postal_zip_code' 
                            label='Zip' 
                            placeholder='00000' 
                            as={Form.Input}
                            control={control}
                            rules={{ required: "Please enter Billing Zipcode" }}
                            error={errors.billing_postal_zip_code && errors.billing_postal_zip_code.message} 
                        />
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