import React from 'react/addons';
import {RouteHandler} from 'react-router';
import {List,Map} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');
const score = Map({'Trainspotting': 5, '28 Days Later': 4});

export default React.createClass({
  render: function() {
    "use strict";
    return <RouteHandler pair={pair} score={score} />;
  }
});
