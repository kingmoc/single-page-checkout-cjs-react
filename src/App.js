import React, { useEffect, useState } from 'react';
import Commerce from '@chec/commerce.js'
import { Grid } from 'semantic-ui-react';


//Component Imports
import Nav from './components/Nav'
import LeftPanel from './components/LeftPanel'
import Footer from './components/Footer'
import ProductContainer from './components/ProductContainer'

function App() {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
    const [cart, setCart] = useState()

    const addToCart = (productId, variantInfo) => {

        if(variantInfo) {
            commerce.cart.add(productId, 1, variantInfo)
                .then(res => {
                    console.log(res, 'res from adding to CART!!')
                })
        } else {
            console.log('Error - Please Select Size')
        }

    }

    return (
        <div className="App">
            <Nav />
            <Grid centered stackable padded relaxed>
                <Grid.Column className='left-column' width={5}>
                    <LeftPanel />
                </Grid.Column>
                <Grid.Column width={9}>
                    <ProductContainer addToCart={addToCart}/>
                </Grid.Column>
            </Grid>
            <Footer />
        </div>
  );
}

export default App;
