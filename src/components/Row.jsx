import React from 'react/addons';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    children: React.PropTypes.array
  },

  mixins: [React.addons.PureRenderMixin],

  render () {
    const classes = classNames('row', `row-${this.props.index}`);
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});
