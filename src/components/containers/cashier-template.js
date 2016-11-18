import React from 'react';
import SearchInput from '../views/common-search-input';
import { Row, Col, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
const RangePicker = DatePicker.RangePicker;
import { getCashierResult } from '../../api/cashier-api';

const TemplateContainer = React.createClass({
    commonSearch() {

    },
    pageSearch() {

    },
    getInitialState() {
        return {
            search : '',
            goods_id : 'all',
            dateStart : '',
            dateEnd : '',
            page : 1,
            dataSource : [],
            totalMoney : 0, // 总金额
            totalRows : 0, // 总数
            columns : this.props.columns,
            type : this.props.type, // 3已结算 -2未结算 0审核中 1已通过 2已付款 -1已驳回
            textType : '',
        }
    },
    onRangeChange() {

    },
    componentDidMount() {
        getCashierResult({type : this.state.type}, function (info) {
            this.setState({
                dataSource : info.info,
                page : info.page,
                totalRows : info.totalRows,
                textType : info.type,
                totalMoney : info.totalMoney
            })
        }.bind(this))
    },
    componentWillUnmount() {
        this.setState({...this.getInitialState()});
    },
    render() {
        const selectOptions = this.props.goods.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.goods_name}</Option>
            )
        });
        const pagination = {
            current : parseInt(this.state.page),
            total : this.state.totalRows,
            onChange : this.pageSearch
        };

        return (
            <div>
                <Row style={{marginTop : '32px'}}>
                    <Col sm={14}>
                        <Row>
                            <Col>
                                <span className="spanWidth">搜索:</span>
                                <SearchInput
                                    placeholder="订单编号或社区空店名称"
                                    updateSearch={this.commonSearch}
                                    style={{width : '284px', marginLeft : '8px', paddingTop : '10px'}} />
                            </Col>
                            <Col>
                                <span className="spanWidth">日期:</span>
                                <RangePicker style={{width : '284px', marginLeft : '8px'}} onChange={this.onRangeChange} />
                            </Col>
                            <Col>
                                <span className="spanWidth">筛选:</span>
                                <Select
                                    placeholder="按在售商品种类筛选"
                                    style={{width : '284px', marginLeft : '8px', paddingTop : '10px'}}
                                    >
                                    {selectOptions}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row type="flex" align="middle" justify="space-around" style={{height : '114px'}}>
                            <Col style={{textAlign : 'center'}}>
                                <h3>45</h3>
                                <p>数量</p>
                            </Col>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalRows}</h3>
                                <p>订单</p>
                            </Col>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalMoney} <span style={{fontSize : '12px'}}>元</span></h3>
                                <p>未结算金额</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginTop : '32px'}}>
                        <Table pagination={pagination} columns={this.state.columns} dataSource={this.state.dataSource} />
                    </Col>
                </Row>
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        goods : store.orderStatState.goodsCategory.info
    }
};

export default connect(mapStateToProps)(TemplateContainer);