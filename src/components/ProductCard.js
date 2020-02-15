import React from 'react';
import { Card, Grid } from 'semantic-ui-react';

const ProductCard = ({product}) => {
    console.log(product, 'props from Container')
    return (
        // <Grid.Column width={5}>
            <Card 
                image={product.media.source}
                header={product.name}
                meta={product.price.formatted_with_symbol}
                description={product.description.replace(/(<([^>]+)>)/ig,"")}
            />
        // </Grid.Column>
    );
};

export default ProductCard;