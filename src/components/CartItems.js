import React from 'react';
import { Item, Header, Button, Icon, Input } from 'semantic-ui-react';

const CartItems = (props) => {

    console.log(props, "props from CartModal to Cart Items")

    return (
        <>
            <Button className='delete-item' negative circular icon='x' />
            <Item.Image size='tiny' src={props.item.media.source} />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.item.name}</Item.Header>
                <Item.Meta>
                    <span>{props.item.variants[0].option_name}</span>
                </Item.Meta>
                {/* <Button.Group>
                    <Button>
                        <Icon name='play' />
                    </Button>
                    <Input className='input-quanity' focus size='large'/>
                    <Button>
                        <Icon name='shuffle' />
                    </Button>
                </Button.Group> */}
                <div className='quanity-group'>
                    <Button className='quan-buttons'> <Icon name='minus' /> </Button>
                    <Input 
                        className='input-quanity'
                        value={props.item.quantity} 
                    />
                    <Button className='quan-buttons'> <Icon name='plus' /> </Button>
                </div>
                {/* <Button circular icon='x' /> */}
                <Item.Extra className='item-total'>
                    <Header floated='right'>${props.item.price.formatted_with_symbol}</Header>
                </Item.Extra>
            </Item.Content>
        </>
    );
};

export default CartItems;