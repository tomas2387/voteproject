import React from 'react/addons';

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
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
    return <div className="results">
      {this.getPair().map(entry =>
        <div key={entry} className="entry">
          <h1>{entry}</h1>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
        </div>
      )}
    </div>;
  }
});
