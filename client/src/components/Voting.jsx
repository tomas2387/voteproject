import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

console.log('rendering voting component');

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    "use strict";
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
});

function mapStateToProps(state) {
  "use strict";
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}
export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
