import React from 'react';

let FilterDropdownMenuWrapper = React.createClass({
  render() {
    const { onClick, children, className } = this.props;
    return <div className={className} onClick={onClick}>{children}</div>;
  }
});

export default FilterDropdownMenuWrapper;
