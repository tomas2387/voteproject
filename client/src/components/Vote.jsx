import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    "use strict";
    return this.props.pair || [];
  },
  isDisabled: function() {
    "use strict";
    return !!this.props.hasVoted;
  },
  hasVotedFor: function(entry) {
    "use strict";
    return this.props.hasVoted === entry;
  },
  render: function() {
    "use strict";
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}
          disabled={this.isDisabled()}
          onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {
            (this.hasVotedFor(entry)) ?
              <div className="label">Voted</div>
              :
              null
          }
            </button>
          )}
        </div>;
  }
});
