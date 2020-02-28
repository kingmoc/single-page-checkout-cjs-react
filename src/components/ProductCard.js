import React, { useState, useEffect } from 'react';
import { Card, Grid, Image, Button, Icon, Dropdown, Label, Modal, Header } from 'semantic-ui-react';

const ProductCard = (props) => {
    // console.log(product, 'props from Container')

    const [sizes, setSizes] = useState([])
    const [variantInfo, setVariantInfo] = useState()

    useEffect(() => {        
        
        let finalSizeArray = props.product.variants[0].options.map(option => {
            let sizeInfo = {}

            sizeInfo.key = option.name
            sizeInfo.text = option.name
            sizeInfo.value = option.id

            return sizeInfo
        })

        setSizes(finalSizeArray)
    }, [])

    const handleSize = (e, {value}) => {
        setVariantInfo({[props.product.variants[0].id]: value})
    }

    return (
        <Card>
            <Image src={props.product.media.source} />
            <Card.Content>
                <Card.Header>{props.product.name}</Card.Header>
                <Card.Meta>{props.product.price.formatted_with_symbol}</Card.Meta>
                <Card.Description>{props.product.description.replace(/(<([^>]+)>)/ig,"")}</Card.Description>
                <Dropdown
                    className="sizes-drop"
                    onChange={handleSize}
                    value={sizes.text} 
                    fluid
                    placeholder='Select Size'
                    selection
                    options={sizes}
                />
                <Button className='add-button' onClick={(e) => {
                    e.preventDefault()
                    props.addToCart(props.product.id, variantInfo)
                }}>
                    Add to Cart
                    <Icon name='arrow right' />
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ProductCard;



// commerce.cart.add(
//     'prod_QG375vVPR5rMOg',
//     // optional: the number of items to add
//     1,
//     // optional: if your product has variants, the variant and option ID to add
//     { vrnt_RyWOwmPO9lnEa2: 'optn_zkK6oLpvEoXn0Q' }
//   )

