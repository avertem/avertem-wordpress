import React from 'react';
import ReactDOM from 'react-dom';
import Cards from './Cards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Blocks />, div);
  ReactDOM.unmountComponentAtNode(div);
});
