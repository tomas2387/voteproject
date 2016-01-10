import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    "use strict";
    return this.props.pair || [];
  },
  getVotes: function(entry) {
    "use strict";
    if (this.props.score && this.props.score.has(entry)) {
      return this.props.score.get(entry);
    }
    return 0;
  },
  render: function() {
    "use strict";

    return this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} />
          :
            <div className="results">
              <div className="score">
                  {this.getPair().map(entry =>
                      <div key={entry} className="entry">
                          <h1>{entry}</h1>
                          <div className="voteCount">{this.getVotes(entry)}</div>
                      </div>
                  )}
              </div>
              <div className="management">
                <button ref="next" className="next" onClick={this.props.next}>Next</button>
              </div>
            </div>;

  }
});

function mapStateToProps(state) {
  "use strict";
  return {
    pair: state.getIn(['vote', 'pair']),
    score: state.getIn(['vote', 'score']),
    winner: state.get('winner')
  };
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
