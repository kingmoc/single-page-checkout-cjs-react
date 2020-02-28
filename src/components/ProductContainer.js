import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import { Image, Grid } from 'semantic-ui-react';
import hero from '../img/hero.jpg'
import ProductCard from '../components/ProductCard'

const ProductContainer = (props) => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
    const [products, setProducts] = useState([])

    useEffect(() => {
        commerce.products.list()
          .then(res => {
            setProducts(res.data)
          })
          .catch(err => console.log(err))
    },[])



    return (
        <>
            <Grid stackable columns='equal' centered>
                <Image src={hero} fluid/>
                {products.map(product => (
                    <Grid.Column width={5} key={product.id}>
                        <ProductCard 
                            product={product} 
                            addToCart={props.addToCart} 
                        />
                    </Grid.Column>
                ))}
            </Grid>
        </>
    );
};

export default ProductContainer;