import React from 'react';
import { Menu, Image, Icon, Segment, Input } from 'semantic-ui-react'
import logo from '../img/logo.png'

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
                    <Icon name='shopping cart' size='large' color='green'/>
                </Menu.Item>
            </Segment>
        </Menu>
    );
};

export default Nav