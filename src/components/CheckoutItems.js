import React from 'react';
import { Item, Header } from 'semantic-ui-react';

const CheckoutItems = (props) => {
    console.log(props, 'props from checkout container')


    return (
        <>
            <Item.Image size='tiny' src={props.item.image} />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.item.product_name}</Item.Header>
                <Item.Meta>
                    <span>{props.item.variants[0].option_name}</span>
                </Item.Meta>
                <Item.Extra className='item-total'>
                    <Header floated='right'>{props.item.line_total.formatted_with_symbol}</Header>
                </Item.Extra>
            </Item.Content>
        </>
    );
};

export default CheckoutItems;