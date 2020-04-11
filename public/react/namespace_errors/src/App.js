import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {NamespaceErrorsSession} from './services/NamespaceErrorsSession';
import {NamespaceErrors} from './components';

function App() {  
  return (
    <NamespaceErrorsSession>
      <Container>
        <NamespaceErrors></NamespaceErrors>
      </Container>
    </NamespaceErrorsSession>
  );
}

export default App;
