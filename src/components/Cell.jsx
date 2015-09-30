import React from 'react';
import classNames from 'classnames';

export default class Cell extends React.Component {
  static propTypes = {
    role: React.PropTypes.number,
    coordinates: React.PropTypes.array,
    toggleCell:  React.PropTypes.func
  }

  constructor () {
    super();
  }

  onClick (e) {
    this.props.toggleCell(this.props.coordinates);
  }

  render () {
    const {coordinates, role} = this.props;
    const [row, col] = coordinates;
    const classes = classNames('col', 'cell', `cell-${role}`, `col-${col}`, `row-${row}`);
    return (
      <div className={classes} onClick={::this.onClick}></div>
    );
  }
}
