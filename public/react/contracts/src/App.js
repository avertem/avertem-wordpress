import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {ContractsSession} from './services/ContractsSession';
import {Contracts} from './components';

function App() {  
  return (
    <ContractsSession>
      <Container>
        <Contracts></Contracts>
      </Container>
    </ContractsSession>
  );
}

export default App;
