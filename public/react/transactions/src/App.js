import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {Container} from 'reactstrap';

import {TransactionSession} from './services/TransactionSession';
import {Transactions} from './components';

function App() {  
  return (
    <TransactionSession>
      <Container>
        <Transactions></Transactions>
      </Container>
    </TransactionSession>
  );
}

export default App;
