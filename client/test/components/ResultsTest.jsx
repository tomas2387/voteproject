import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {assert} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass} = ReactTestUtils;

suite('Results', () => {
  "use strict";

  test('renders entries with vote counts or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const score = Map({'Trainspotting': 5});
    const component = renderIntoDocument(
      <Results pair={pair} score={score} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    assert.equal(entries.length, 2);
    assert.include(train, 'Trainspotting');
    assert.include(train, '5');
    assert.include(days, '28 Days Later');
    assert.include(days, '0');
  });

  test('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting"
               pair={["Trainspotting", "28 Days Later"]}
               score={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);

    assert.equal(true, !!winner);
    assert.include(winner.textContent, 'Trainspotting');
  });

});
