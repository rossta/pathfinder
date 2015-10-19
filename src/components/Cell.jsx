import React from 'react/addons';
import classNames from 'classnames';

export default React.createClass({
  propTypes:    {
    row:        React.PropTypes.number,
    col:        React.PropTypes.number,

    onFrontier: React.PropTypes.bool,
    wasVisited: React.PropTypes.bool,
    isStart:    React.PropTypes.bool,
    isWall:     React.PropTypes.bool,
    toggleCell: React.PropTypes.func
  },

  mixins: [React.addons.PureRenderMixin],

  onClick () {
    this.props.toggleCell(this.coordinates());
  },

  coordinates () {
    return [this.props.row, this.props.col];
  },

  render () {
    const {col, row, onFrontier, wasVisited, isStart, isWall} = this.props;
    const classes = classNames('cell', `col-${col}`, `row-${row}`, {
      'cell-wall': isWall,
      'cell-start': isStart,
      'cell-frontier': onFrontier,
      'cell-visited':  wasVisited
    });
    return (
      <div
        className={classes}
        onClick={this.onClick}
        >
      </div>
    );
  }
});
