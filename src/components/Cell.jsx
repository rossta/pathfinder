import React from 'react/addons';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    data: React.PropTypes.object,
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
    const {data, col, row} = this.props;
    const role = data.get('role');
    const classes = classNames('cell', `cell-role-${role}`, `col-${col}`, `row-${row}`, {
      'cell-frontier': data.has('frontier'),
      'cell-visited': data.has('visited')
    });
    return (
      <div className={classes} onClick={this.onClick}></div>
    );
  }
});
