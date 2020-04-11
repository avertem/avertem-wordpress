import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {SidechainsSession} from './services/SidechainsSession';
import {Sidechains} from './components';

function App() {  
  return (
    <SidechainsSession>
      <Container>
        <Sidechains></Sidechains>
      </Container>
    </SidechainsSession>
  );
}

export default App;
