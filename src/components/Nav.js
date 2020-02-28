import React from 'react';
import { Menu, Image, Icon, Segment, Input, Modal, Label } from 'semantic-ui-react'
import logo from '../img/logo.png'

import CartModal from './CartModal'

const Nav = (props) => {

    const iconDisplay = () => {

        if (props.cart && props.cart.total_unique_items > 0) {
            return(
                <Label color='green' >
                    <Icon name='shopping cart' size='large'/>
                    {props.cart.total_unique_items}
                </Label>
            )
        } else {
            return (
                <Icon name='shopping cart' size='large'/>
            )
        }
    }


    return (
        <Menu borderless> 
            <Segment className='nav-segment'>
                <Menu.Item>
                    <Image src={logo} size='tiny' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item>
                    <Modal trigger={iconDisplay()}>
                        <CartModal cart={props.cart} emptyCart={props.emptyCart}/>
                    </Modal>
                </Menu.Item>
            </Segment>
        </Menu>
    );
};

export default Nav