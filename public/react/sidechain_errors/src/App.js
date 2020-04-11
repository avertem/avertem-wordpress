import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {SidechainErrorsSession} from './services/SidechainErrorsSession';
import {SidechainErrors} from './components';

function App() {  
  return (
    <SidechainErrorsSession>
      <Container>
        <SidechainErrors></SidechainErrors>
      </Container>
    </SidechainErrorsSession>
  );
}

export default App;
