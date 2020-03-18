import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';
import { ExplorerSession } from './services/ExplorerSession';


import {
  Container
} from 'reactstrap';

import {Blocks} from './components';

function App() {  
  return (
    <ExplorerSession>
      <Container>
        <Blocks></Blocks>
      </Container>
    </ExplorerSession>
  );
}

export default App;
