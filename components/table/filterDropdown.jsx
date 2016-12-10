import React from 'react';
import Menu from 'rc-menu';
import Dropdown from '../dropdown';
import Icon from '../icon';
import FilterDropdownMenuWrapper from './FilterDropdownMenuWrapper';

let FilterMenu = React.createClass({
  getInitialState() {
    return {
      selectedKeys: this.props.selectedKeys,
      visible: false
    };
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      selectedKeys: nextProps.selectedKeys
    });
  },
  getDefaultProps() {
    return {
      handleFilter: function () {
      },
      column: null
    };
  },
  setSelectedKeys: function ({selectedKeys}) {
    this.setState({ selectedKeys });
  },
  handleClearFilters() {
    this.setState({
      selectedKeys: []
    }, this.handleConfirm);
  },
  handleConfirm() {
    this.setState({
      visible: false
    });
    this.props.confirmFilter(this.props.column, this.state.selectedKeys);
  },
  onVisibleChange(visible) {
    this.setState({
      visible: visible
    });
  },
  renderMenus(items) {
    let menuItems = items.map((item) => {
      return <Menu.Item key={item.value}>{item.text}</Menu.Item>;
    });
    return menuItems;
  },
  render() {
    let column = this.props.column;
    let prefixCls = 'ant-table-filter';
    // default multiple selection in filter dropdown
    let multiple = true;
    if ('filterMultiple' in column) {
      multiple = column.filterMultiple;
    }

    const menus = column.filterDropdown ? (
      <FilterDropdownMenuWrapper>
        {column.filterDropdown}
      </FilterDropdownMenuWrapper>
    ) : (
      <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
        <Menu
          multiple={multiple}
          prefixCls="ant-dropdown-menu"
          onSelect={this.setSelectedKeys}
          onDeselect={this.setSelectedKeys}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderMenus(column.filters)}
        </Menu>
        <div className={`${prefixCls}-dropdown-btns`}>
          <a className="ant-table-filter-dropdown-link confirm"
             style={{
               cursor: 'pointer',
               pointerEvents: 'visible'
             }}
             onClick={this.handleConfirm}>
            确定
          </a>
          <a className="ant-table-filter-dropdown-link clear"
             style={{
               cursor: 'pointer',
               pointerEvents: 'visible'
             }}
             onClick={this.handleClearFilters}>
            重置
          </a>
        </div>
      </FilterDropdownMenuWrapper>
    );

    let dropdownSelectedClass = '';
    if (this.props.selectedKeys.length > 0) {
      dropdownSelectedClass = 'ant-table-filter-selected';
    }

    return <Dropdown trigger={['click']}
                     overlay={menus}
                     visible={this.state.visible}
                     onVisibleChange={this.onVisibleChange}
                     closeOnSelect={false}>
      <Icon title="筛选" type="filter" className={dropdownSelectedClass} />
    </Dropdown>;
  }
});

export default FilterMenu;
