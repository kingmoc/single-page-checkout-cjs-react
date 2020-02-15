import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import { Image, Grid } from 'semantic-ui-react';
import hero from '../img/hero.jpg'
import ProductCard from '../components/ProductCard'

const ProductContainer = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const commerce = new Commerce('pk_test_17783a8bca56c22cbeb55accde3d1c62748bda930b70c')
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
                {products.map(product => <Grid.Column width={5} key={product.id}><ProductCard product={product} /></Grid.Column>)}
            </Grid>
        </>
    );
};

export default ProductContainer;