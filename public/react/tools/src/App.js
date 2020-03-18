import React from 'react';
//import logo from './logo.svg';
import cx from 'classnames'
//import './App.css';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function App() {  
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
        </CardBody>
        <CardBody>
          <CardTitle>Card title</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
