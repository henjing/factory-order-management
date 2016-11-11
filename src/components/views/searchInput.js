import React from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../../store';
import { updateOrderListSearch, resetOrderListSearch } from '../../actions/order-list-actions';

const SearchInput = React.createClass({
  getInitialState() {
    return {
      focus: false
    };
  },

  componentWillMount() {
    // this.callDispatch = _.debounce(this.callDispatch, 1);
  },

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },

  callDispatch(value) {
      console.log('value', value);
      this.props.updateSearch('search')(value);
  },

  printChange(e) {
      this.callDispatch(e.target.value);
  },

  handleSearch() {
      store.dispatch(updateOrderListSearch({ page : 1 }));
      this.props.updateSearch('commmit')();
  },

  render() {
    const { style, placeholder, value } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.props.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper lineHeight" style={style}>
        <InputGroup className={searchCls}>
          <Input placeholder={placeholder} value={value} onChange={this.printChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  },
});

function mapStateToProps(store) {
    return {
        value : store.orderListSearchState.search
    }
}

export default connect(mapStateToProps)(SearchInput);