import React from 'react';
import cx from 'classnames'
//import './App.css';

import {
 Container
} from 'reactstrap';

import {Send} from './components';
import {AccountSession} from './services/AccountSession';
import {TransactionSession} from './services/TransactionSession';

function App() {  
  return (
    <AccountSession>
      <TransactionSession>
        <Container>
          <Send></Send>
        </Container>
      </TransactionSession>
    </AccountSession>
  );
}

export default App;
