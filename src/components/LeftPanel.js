import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import leftImage from '../img/seities_apparel_logo_small.png'

const LeftPanel = () => {
    return (
        <>
            <Menu vertical size='massive'>
            <Image src={leftImage} />
                <Menu.Item>
                    <Menu.Header>Clothings</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='shirts' />
                        <Menu.Item name='sweatshirts' />
                        <Menu.Item name='Tank Tops' />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Misc</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='hats' />
                        <Menu.Item name='jewerly' />
                        <Menu.Item name='Seities X Collection' />
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default LeftPanel;