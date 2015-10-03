import React from 'react/addons';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    frontier: React.PropTypes.bool,
    visited: React.PropTypes.bool,
    role: React.PropTypes.string,
    row: React.PropTypes.number,
    col: React.PropTypes.number,
    toggleCell:  React.PropTypes.func
  },

  mixins: [React.addons.PureRenderMixin],

  onClick () {
    this.props.toggleCell(this.coordinates(), ['empty', 'wall']);
  },

  coordinates () {
    return [this.props.row, this.props.col];
  },

  render () {
    const {col, row, frontier, visited, role} = this.props;
    const classes = classNames('cell', `cell-role-${role}`, `col-${col}`, `row-${row}`, {
      'cell-frontier': frontier,
      'cell-visited': visited
    });
    return (
      <div className={classes} onClick={this.onClick}></div>
    );
  }
});
