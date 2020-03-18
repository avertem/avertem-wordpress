import React from 'react';
//import logo from './logo.svg';
//import cx from 'classnames'
//import './App.css';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';

import {Account} from './components';
import {AccountSession} from './services/AccountSession';

function App() {  
  return (
    <AccountSession>
      <Container>
        <Account></Account>
      </Container>
    </AccountSession>
  );
}

export default App;
