import React from 'react/addons';
import Voting from '../../src/components/Voting';
import {assert} from 'chai';

const {renderIntoDocument,scryRenderedDOMComponentsWithTag,Simulate} = React.addons.TestUtils;

suite('> Voting', ()=>{

  test('renders a pair of buttons', ()=>{
    const component = renderIntoDocument(
      <Voting pair={["InternalError", "WIFI"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    assert.equal(buttons.length, 2);
    assert.equal(buttons[0].getDOMNode().textContent, 'InternalError');
    assert.equal(buttons[1].getDOMNode().textContent, 'WIFI');
  });

  test('invokes callback when clicked a button',  ()=>{
    let votedWith;
    let vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0].getDOMNode());

    assert.equal(votedWith, 'Trainspotting');
  });

});
