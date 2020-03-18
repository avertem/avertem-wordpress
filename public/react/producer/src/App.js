import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';
import { ProducerSession } from './services/ProducerSession';

import {
  Container
} from 'reactstrap';

import {
  Producer
} from './components';

function App() {  
  return (
    <ProducerSession>
      <Container>
        <Producer></Producer>
      </Container>
    </ProducerSession>
  );
}

export default App;
