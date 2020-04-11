import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {NamespacesSession} from './services/NamespacesSession';
import {Namespaces} from './components';

function App() {  
  return (
    <NamespacesSession>
      <Container>
        <Namespaces></Namespaces>
      </Container>
    </NamespacesSession>
  );
}

export default App;
