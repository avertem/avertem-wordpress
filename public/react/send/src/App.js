import React from 'react';
import cx from 'classnames'
//import './App.css';


import {
 Container
} from 'reactstrap';

import {Send} from './components';
import {AccountSession} from './services/AccountSession';

function App() {  
  return (
    <AccountSession>
        <Container>
          <Send></Send>
        </Container>
    </AccountSession>
  );
}

export default App;
