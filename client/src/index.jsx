import React from 'react';
import Voting from './components/Voting';

const pair = ['ErrorInterno', 'FreeWifi'];

React.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
