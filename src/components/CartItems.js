import React, { useContext } from 'react';
import { Item, Header, Button, Icon, Input } from 'semantic-ui-react';

import { CartItemsContext } from '../App'

const CartItems = (props) => {

    console.log(props, "props from CartModal to Cart Items")

    const helpFnc = useContext(CartItemsContext)
    console.log(helpFnc, 'test from useContext')

    return (
        <>
            <Item.Image size='tiny' src={props.item.media.source} />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.item.name}</Item.Header>
                <Item.Meta>
                    <span>{props.item.variants[0].option_name}</span>
                </Item.Meta>
                <div className='quanity-group'>
                    <Button 
                        className='quan-buttons' 
                        onClick={() => {
                            let newQuanity = props.item.quantity - 1
                            helpFnc.subtractQuanity(props.item.id, newQuanity)
                        }}
                    > 
                        <Icon name='minus' /> 
                    </Button>
                    <Input 
                        className='input-quanity'
                        value={props.item.quantity} 
                    />
                    <Button 
                        className='quan-buttons'
                        onClick={() => {
                            let newQuanity = props.item.quantity + 1
                            helpFnc.addQaunity(props.item.id, newQuanity)
                        }}
                    > 
                        <Icon name='plus' /> 
                    </Button>
                </div>
                {/* <Button circular icon='x' /> */}
                <Item.Extra className='item-total'>
                    <Header floated='right'>${props.item.line_total.formatted_with_symbol}</Header>
                </Item.Extra>
            </Item.Content>
        </>
    );
};

export default CartItems;