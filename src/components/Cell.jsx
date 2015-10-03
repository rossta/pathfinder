import React from 'react/addons';
import classNames from 'classnames';

export default React.createClass({
  propTypes:    {
    row:        React.PropTypes.number,
    col:        React.PropTypes.number,

    role:       React.PropTypes.string,
    onFrontier: React.PropTypes.bool,
    wasVisited: React.PropTypes.bool,
    toggleCell: React.PropTypes.func
  },

  mixins: [React.addons.PureRenderMixin],

  onClick () {
    this.props.toggleCell(this.coordinates(), ['empty', 'wall']);
  },

  coordinates () {
    return [this.props.row, this.props.col];
  },

  render () {
    const {col, row, role, onFrontier, wasVisited} = this.props;
    const classes = classNames('cell', `cell-role-${role}`, `col-${col}`, `row-${row}`, {
      'cell-frontier': onFrontier,
      'cell-visited':  wasVisited
    });
    console.log('render cell', row, col);
    return (
      <div className={classes} onClick={this.onClick}></div>
    );
  }
});
