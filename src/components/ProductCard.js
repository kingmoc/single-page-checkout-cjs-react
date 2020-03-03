import React, { useState, useEffect } from 'react';
import { Card, Image, Button, Icon, Dropdown } from 'semantic-ui-react';

const ProductCard = (props) => {
    // console.log(props.product, 'props from Container')

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

    const handleButtonAddCart = e => {
        e.preventDefault()
        props.addToCart(props.product.id, variantInfo)
        
        
        // Funtion to Clear Select Input for Dropdown - Needs work. 
        // let selectInput = document.querySelectorAll('.sizes-drop')
        // selectInput.forEach((input,i) => {
        //     input.children[0].innerHTML = 'Select Size'
        //     // input.children[0].classList.add('default')
        // })
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
                <Button fluid className='add-button' onClick={handleButtonAddCart}>
                    Add to Cart
                    <Icon name='arrow right' />
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ProductCard;
