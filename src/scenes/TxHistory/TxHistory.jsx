import React, { Component } from 'react';
// import { connect } from 'dva';
import {
    Table,
    Form,
    DatePicker,
    Input,
    Select,
    // Icon,
    // InputNumber,
    // AutoComplete,
    // Cascader,
    Button,
} from 'antd';
import classNames from 'classnames';
import styles from './TxHistory.less';

const dataSource = [
    {
        date: '2018-09-15 23:06:11',
        pair: 'GEXPA/GEXPB',
        type: 'Exchange',
        price: '0.024237',
        filled: 1320.29,
        total: 32,
    },
    {
        date: '2018-09-16 23:06:11',
        pair: 'GEXPA/GEX',
        type: 'Exchange',
        price: 0.021088,
        filled: 1375.19,
        total: 29,
    },
    {
        date: '2018-09-17 23:06:11',
        pair: 'GEXPA/GEXPC',
        type: 'Exchange',
        price: 0.021088,
        filled: 1375.19,
        total: 29,
    },
    {
        date: '2018-09-18 23:06:11',
        pair: 'GEXPB/GEXPC',
        type: 'Exchange',
        price: 0.021088,
        filled: 1375.19,
        total: 29,
    },
    {
        date: '2018-09-19 23:06:11',
        pair: 'GEXPA/GEX',
        type: 'Exchange',
        price: 0.021088,
        filled: 1375.19,
        total: 29,
    },
    {
        date: '2018-09-20 23:06:11',
        pair: 'GEXPB/GEX',
        type: 'Exchange',
        price: 0.021088,
        filled: 1375.19,
        total: 29,
    },
    {
        date: '2018-09-22 23:06:11',
        pair: 'GEXPC/GEX',
        type: 'Exchange',
        price: 0.021088,
        filled: 1375.19,
        total: 29,
    },
];

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Pair',
        dataIndex: 'pair',
        key: 'pair',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Filled',
        dataIndex: 'filled',
        key: 'filled',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },
];

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;
const { Option } = Select;

// const certs = [
//     {
//         value: 'gex',
//         label: 'GEX',
//     },
//     {
//         value: 'gexpa',
//         label: 'GEXPA',
//     },
//     {
//         value: 'gexpb',
//         label: 'GEXPB',
//     },
//     {
//         value: 'gexpc',
//         label: 'GEXPC',
//     },
// ];

// const types = [
//     {
//         value: 'all',
//         label: 'All',
//     },
//     {
//         value: 'exchange',
//         label: 'Exchange',
//     },
//     {
//         value: 'transfer',
//         label: 'Transfer',
//     },
// ];

class TxHistory extends Component {
    handleReset = () => {
        const { form } = this.props;
        form.resetFields();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            // Should format date value before submit.
            const rangeValue = fieldsValue['range-picker'];
            const values = {
                ...fieldsValue,
                'range-picker': [
                    rangeValue[0].format('YYYY-MM-DD'),
                    rangeValue[1].format('YYYY-MM-DD'),
                ],
            };
            console.log('Received values of form: ', values);
        });
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        // const config = {
        //     rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        // };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        return (
            <div className={styles.container}>
                <div className={styles.itemBox}>
                    <div className={styles.itemTitle}>Trade History</div>

                    <div className={styles.filters}>
                        <Form layout="inline" onSubmit={this.handleSumbit} id="filtersForm">
                            <input type="text" name="page" value="1" style={{ display: 'none' }} />
                            <input type="text" name="rows" value="10" style={{ display: 'none' }} />
                            <FormItem className={styles.filed} label="Date:">
                                {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
                            </FormItem>
                            <FormItem className={styles.filed} label="Pair:">
                                <InputGroup compact>
                                    <Select name="baseAsset" defaultValue="gex">
                                        <Option value="gex">GEX</Option>
                                        <Option value="gexpa">GEXPA</Option>
                                        <Option value="gexpb">GEXPB</Option>
                                        <Option value="gexpc">GEXPC</Option>
                                    </Select>
                                    <Select
                                        name="quoteAsset"
                                        defaultValue="gex"
                                        style={{ marginLeft: 3 }}
                                    >
                                        <Option value="gex">GEX</Option>
                                        <Option value="gexpa">GEXPA</Option>
                                        <Option value="gexpb">GEXPB</Option>
                                        <Option value="gexpc">GEXPC</Option>
                                    </Select>
                                </InputGroup>
                            </FormItem>
                            <FormItem className={styles.filed} label="Type: ">
                                <InputGroup name="type" compact>
                                    <Select defaultValue="all" style={{ width: 85 }}>
                                        <Option value="all">All</Option>
                                        <Option value="transfer">Transfer</Option>
                                        <Option value="exchange">Exchange</Option>
                                    </Select>
                                </InputGroup>
                            </FormItem>
                            <FormItem className={styles.filed}>
                                <Button
                                    className={classNames(styles.btn, styles['btn-green'])}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Search
                                </Button>
                                <Button
                                    className={styles.btn}
                                    style={{ marginLeft: 8 }}
                                    onClick={this.handleReset}
                                >
                                    Reset
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}

const WrappedTxHistoryForm = Form.create()(TxHistory);

export default WrappedTxHistoryForm;
