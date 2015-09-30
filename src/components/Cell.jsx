import React from 'react/addons';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    role: React.PropTypes.string,
    row: React.PropTypes.number,
    col: React.PropTypes.number,
    toggleCell:  React.PropTypes.func
  },

  mixins: [React.addons.PureRenderMixin],

  onClick (e) {
    this.props.toggleCell(this.coordinates(), ['empty', 'wall']);
  },

  coordinates () {
    return [this.props.row, this.props.col];
  },

  render () {
    const {role, col, row} = this.props;
    const classes = classNames('cell', `cell-role-${role}`, `col-${col}`, `row-${row}`);
    return (
      <div className={classes} onClick={this.onClick}></div>
    );
  }
});
