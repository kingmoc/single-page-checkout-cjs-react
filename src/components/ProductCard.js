import React, { useState, useEffect } from 'react';
import { Card, Grid, Image, Button, Icon, Dropdown } from 'semantic-ui-react';

const ProductCard = ({product}) => {
    // console.log(product, 'props from Container')

    const [sizes, setSizes] = useState([])
    const [variantInfo, setVariantInfo] = useState()

    useEffect(() => {        
        
        let finalSizeArray = product.variants[0].options.map(option => {
            let sizeInfo = {}

            sizeInfo.key = option.name
            sizeInfo.text = option.name
            sizeInfo.value = option.id

            return sizeInfo
        })

        setSizes(finalSizeArray)
    }, [])

    const handleSize = (e, {value}) => {
        setVariantInfo({[product.variants[0].id]: value})
    }

    const addToCart = e => {
        e.preventDefault()
        console.log(variantInfo, 'works!!!')
    }


    return (
        <Card>
            <Image src={product.media.source} />
            <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>{product.price.formatted_with_symbol}</Card.Meta>
                <Card.Description>{product.description.replace(/(<([^>]+)>)/ig,"")}</Card.Description>
                <Dropdown
                    className="sizes-drop"
                    onChange={handleSize}
                    // value={numShirts} 
                    fluid
                    placeholder='Select Size' 
                    selection
                    options={sizes}
                />
                <Button className='add-button' onClick={addToCart}>
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

// commerce.cart.add('productId', [num of items], {vrtn: vrtnID})