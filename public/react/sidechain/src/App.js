import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import {
  Container
} from 'reactstrap';

import {Sidechain} from './components';
import {AccountSession} from './services/AccountSession';

function App() {  
  return (
    <AccountSession>
      <Container>
        <Sidechain></Sidechain>
      </Container>
    </AccountSession>
  );
}

export default App;
