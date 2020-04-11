import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import {
  Container
} from 'reactstrap';

import {Contract} from './components';
import {AccountSession} from './services/AccountSession';
import {NamespacesSession} from './services/NamespacesSession';

function App() {  
  return (
    <AccountSession>
      <NamespacesSession>
        <Container>
          <Contract></Contract>
        </Container>
      </NamespacesSession>
    </AccountSession>
  );
}

export default App;
