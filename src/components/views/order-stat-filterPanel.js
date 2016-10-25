import React from 'react';
import { Row, Col, Button, Icon, Badge, Select } from 'antd';
import { connect } from 'react-redux';
import { getExpressedOrderFileUrl} from '../../appConstants/urlConfig';
const Option = Select.Option;
import store from '../../store';
import {updateOrderStatSearch} from '../../actions/order-stat-actions';

const FilterPanel = React.createClass({

    onSelect(value) {
        store.dispatch(updateOrderStatSearch({goods_id : value}));
        this.props.updateSearch('commit')();
    },

    render() {
        const { searchState, status } = this.props;
        let inputGroup = [];
        let finalInputGroup = '';
        let disabled = true;
        for (let i in searchState) {
            if (searchState[i]) {
                inputGroup.push(
                    <input type="hidden" name={i} value={searchState[i]} />
                )
            }
        }
        if (status != 0) {
            finalInputGroup = inputGroup;
            disabled = false;
        }

        const selectOptions = this.props.goods.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.goods_name}</Option>
            )
        });
        let wholeSelect = '';
        const value = this.props.value ? {value : this.props.value} : {};
        if (this.props.value) {
            wholeSelect = (
                <Select
                    placeholder="按在售商品种类筛选"
                    key={Math.random()}
                    style={{width : '305px'}}
                    onSelect={this.onSelect} {...value}>
                    {selectOptions}
                </Select>
            )
        } else {
            wholeSelect = (
                <Select
                    placeholder="按在售商品种类筛选"
                    key={Math.random()}
                    style={{width : '305px'}}
                    onSelect={this.onSelect} {...value}>
                    {selectOptions}
                </Select>
            )
        }

        return (
            <Row type="flex" align="middle" style={{ marginLeft : 88, height : 100 }}>
                <Col span={16} >
                    {wholeSelect}
                </Col>
                <Col span={4}/>
                <Col span={4}>
                    <Row type="flex" align="middle" justify="center">
                        <Col>
                            <form action={getExpressedOrderFileUrl} style={{display : 'inline-block'}}>
                                {finalInputGroup}
                                <Button disabled={disabled} htmlType="submit" icon="download">导出列表</Button>
                            </form>

                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        searchState : store.orderStatSearchState,
        status : store.orderStatState.orderStat.info.length,
        goods : store.orderStatState.goodsCategory.info,
        value : store.orderStatSearchState.goods_id
    }
};

export default connect(mapStateToProps)(FilterPanel);

