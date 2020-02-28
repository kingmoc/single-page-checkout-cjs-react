import React from 'react';
import { Item, Header } from 'semantic-ui-react';

const CartItems = (props) => {

    console.log(props, "props from CartModal to Cart Items")

    return (
        <>
            <Item.Image size='tiny' src={props.item.media.source} />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.item.name}</Item.Header>
                <Item.Meta>
                    <span>{props.item.variants[0].option_name}</span>
                </Item.Meta>
                <Item.Extra>
                    <Header floated='right'>${props.item.price.formatted_with_symbol}</Header>
                </Item.Extra>
            </Item.Content>
        </>
    );
};

export default CartItems;