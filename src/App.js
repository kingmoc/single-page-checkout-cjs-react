import React from 'react';
import { Grid } from 'semantic-ui-react';


//Component Imports
import Nav from './components/Nav'
import LeftPanel from './components/LeftPanel'
import Footer from './components/Footer'
import ProductContainer from './components/ProductContainer'

function App() {

  return (
    <div className="App">
      <Nav />
      <Grid centered stackable padded relaxed>
        <Grid.Column className='left-column' width={5}>
          <LeftPanel />
        </Grid.Column>
        <Grid.Column width={9}>
          <ProductContainer />
        </Grid.Column>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
