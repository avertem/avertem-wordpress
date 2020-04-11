import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {ContractErrorsSession} from './services/ContractErrorsSession';
import {ContractErrors} from './components';

function App() {  
  return (
    <ContractErrorsSession>
      <Container>
        <ContractErrors></ContractErrors>
      </Container>
    </ContractErrorsSession>
  );
}

export default App;
