import React from 'react/addons';
import Voting from '../../src/components/Voting';
import {assert} from 'chai';
import {List} from 'immutable';


const {renderIntoDocument,scryRenderedDOMComponentsWithTag,Simulate} = React.addons.TestUtils;

suite('> Voting', ()=>{
  "use strict";

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

  test('click to button vote makes it disabled', ()=>{
    const buttons = renderVotedButtons();
    assert.equal(buttons.length, 2);
    assert.equal(buttons[0].getDOMNode().hasAttribute('disabled'), true);
    assert.equal(buttons[1].getDOMNode().hasAttribute('disabled'), true);
  });

  test('when voted it should add a label to warn the user that it has already voted', ()=>{
    const buttons = renderVotedButtons();
    assert.equal(buttons.length, 2);
    assert.include(buttons[1].getDOMNode().textContent, 'Voted');
  });

  function renderVotedButtons() {
    const component = renderIntoDocument(
      <Voting pair={["ErrorInterno","FreeWifi"]} hasVoted="FreeWifi" />
    );
    return scryRenderedDOMComponentsWithTag(component, 'button');
  }

  test('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Trainspotting"
              pair={["Trainspotting", "28 Days Later"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    assert.equal(buttons.length, 0);

    const winner = React.findDOMNode(component.refs.winner);
    assert.notEqual(winner, null);
    assert.include(winner.textContent, 'Trainspotting');
  });

  test('renders as a pure component', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    assert.equal(firstButton.getDOMNode().textContent, 'Trainspotting');

    pair[0] = 'Sunshine';
    component.setProps({pair: pair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    assert.equal(firstButton.getDOMNode().textContent, 'Trainspotting');
  });

  test('does update DOM when prop changes', () => {
   let pair = List.of('Trainspotting', '28 Days Later');
   let component = renderIntoDocument(
     <Voting pair={pair} />
   );

   let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
   assert.equal(firstButton.getDOMNode().textContent, 'Trainspotting');

   pair = pair.set(0, 'Sunshine');
   component.setProps({pair: pair});
   firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
   assert.equal(firstButton.getDOMNode().textContent, 'Sunshine');
 });
});
