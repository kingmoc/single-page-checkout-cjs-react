import React from 'react';
import { Menu, Image, Icon, Segment, Input, Modal } from 'semantic-ui-react'
import logo from '../img/logo.png'

import CartModal from './CartModal'

const Nav = () => {
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
                    <Modal trigger={<Icon name='shopping cart' size='large' color='green'/>}>
                        <CartModal />
                    </Modal>
                </Menu.Item>
            </Segment>
        </Menu>
    );
};

export default Nav