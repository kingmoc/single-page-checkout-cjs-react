import React from 'react';
import { Item, Header } from 'semantic-ui-react';

const CheckoutItems = (props) => {
    // console.log(props, 'props from checkout container')


    return (
        <>
            <div className='item-group-name-size'>
                <h3>{props.item.product_name}</h3>
                <span>{props.item.variants[0].option_name}</span>
            </div>
            <h4>{props.item.line_total.formatted_with_symbol}</h4>
        </>
    );
};

export default CheckoutItems;