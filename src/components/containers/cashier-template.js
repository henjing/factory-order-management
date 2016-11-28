import React from 'react';
import SearchInput from '../views/common-search-input';
import { Row, Col, DatePicker, Select, Table, Button, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
const RangePicker = DatePicker.RangePicker;
import { getCashierResult, applyAgain } from '../../api/cashier-api';

const TemplateContainer = React.createClass({
    commonSearch() {
        let config = this.getSearchState();
        config['page'] = 1;
        getCashierResult(config, this.getCashierResultSuccess, this.getCashierResultFail);
    },
    pageSearch(page) {
        let config = this.getSearchState();
        config['page'] = page;
        getCashierResult(config, this.getCashierResultSuccess, this.getCashierResultFail);
    },
    updateSearchState(key, value) {
        this.setState({[key] : value});
    },
    getSearchState() {
        let { search, goods_id, dateStart, dateEnd, page, type} = this.state;
        return { search, goods_id, dateStart, dateEnd, page, type};
    },
    getInitialState() {
        return {
            search : '',
            goods_id : 'all',
            dateStart : '',
            dateEnd : '',
            page : 1,
            limit : 5,
            dataSource : [],
            totalMoney : 0, // 总金额
            totalRows : 0, // 总数
            totalNumber : 0, // 商品数量
            columns : this.props.columns,
            type : this.props.type, // 3已结算 -2未结算 0审核中 1已通过 2已付款 -1已驳回
            textType : this.props.textType,
        }
    },
    onSelect(value) {
        this.setState({goods_id : value}, function () {
            this.commonSearch();
        }.bind(this));
    },
    onRangeChange(dates, dateStrings) {
        this.setState({ dateStart : dateStrings[0], dateEnd : dateStrings[1]}, function () {
            this.commonSearch();
        }.bind(this));
    },
    getCashierResultSuccess(info) {
       this.setState({
            dataSource : info.info,
            page : info.page,
            totalRows : info.totalRows,
            textType : this.state.textType || info.type,
            totalMoney : info.totalMoney,
            totalNumber : info.totalNumber,
            limit : info.limit || this.state.limit
        });
    },
    getCashierResultFail(info) {
        this.setState({dataSource : [], totalMoney : 0, totalRows : 0, totalNumber : 0});
    },
    componentDidMount() {
        getCashierResult({type : this.state.type}, this.getCashierResultSuccess);
    },
    componentWillUnmount() {
        this.setState({...this.getInitialState()});
    },
    submitCashier() {
        applyAgain({}, function (info) {
            message.success(info.info);
            this.componentDidMount();
        }.bind(this), function (info) {
            message.error(info.info);
        }.bind(this))
    },
    render() {
        let selectOptions = this.props.goods.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.goods_name}</Option>
            )
        });
        selectOptions.unshift(
            <Option key={'all'} value={'all'}>所有</Option>
        );
        const pagination = {
            current : parseInt(this.state.page),
            total : this.state.totalRows,
            onChange : this.pageSearch,
            defaultPageSize : this.state.limit
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
                                    search={this.commonSearch}
                                    updateSearchState={this.updateSearchState}
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
                                    onSelect={this.onSelect}
                                    style={{width : '284px', marginLeft : '8px', paddingTop : '10px'}}>
                                    {selectOptions}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row type="flex" align="middle" justify="space-around" style={{height : '114px'}}>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalNumber}</h3>
                                <p>商品数量</p>
                            </Col>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalRows}</h3>
                                <p>订单</p>
                            </Col>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalMoney} <span style={{fontSize : '12px'}}>元</span></h3>
                                <p>{this.state.textType}</p>
                                {this.state.totalMoney > 0 && this.props.type == -1 ? (
                                    <div>
                                        <Popconfirm title="是否重新申请结算" okText="确认" cancelText="取消" onConfirm={this.submitCashier}>
                                            <Button className="btn-warning">
                                                重新申请
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                ) : ''}
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