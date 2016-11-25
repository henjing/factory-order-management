import React from 'react';
import CashierTemplate from './cashier-template';
const type = '0'; // 3已结算 -2未结算 0审核中 1已通过 2已付款 -1已驳回

const BalanceOrderContainer = React.createClass({
    getInitialState() {
        return {
            type : type
        }
    },
    getColumns() {
        return [{
            title : '订单号',
            key : 'record_sn',
            dataIndex : 'record_sn'
        }, {
            title : '商品名称',
            key : 'goods_names',
            render(text, record, index) {
                let result = [];
                const dataSource = record.goods_names;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '数量',
            key : 'goods_nums',
            render(text, record, index) {
                let result = [];
                const dataSource = record.goods_nums;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '社区空店',
            key : 'store_name',
            dataIndex : 'store_name'
        }, {
            title : '结算单价',
            key : 'factory_accounts',
            render(text, record, index) {
                let result = [];
                const dataSource = record.factory_accounts;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '结算总价',
            key : 'total',
            dataIndex : 'total'
        }, {
            title : '是否结算',
            render() {
                return '审核中';
            }
        }, {
            title : '结算时间',
            key : 'account_time',
            dataIndex : 'account_time'
        }]
    },
    render() {
        const columns = this.getColumns();
        return (
            <div>
                <CashierTemplate columns={columns} type={type} textType="待审核金额" />
            </div>
        )
    }
});

export default BalanceOrderContainer;