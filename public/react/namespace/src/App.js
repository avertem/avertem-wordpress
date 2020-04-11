import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import {
  Container
} from 'reactstrap';

import {Namespace} from './components';
import {AccountSession} from './services/AccountSession';

function App() {  
  return (
    <AccountSession>
      <Container>
        <Namespace></Namespace>
      </Container>
    </AccountSession>
  );
}

export default App;
