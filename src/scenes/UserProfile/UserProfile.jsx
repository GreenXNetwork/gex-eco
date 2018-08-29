import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

import styles from './UserProfile.less';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
    pageTitle: {
        id: 'UserProfile.page.title',
        defaultMessage: 'Profile',
    },
});

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 8,
            offset: 0,
        },
        sm: {
            span: 8,
            offset: 0,
        },
    },
};

const FormItem = Form.Item;
export default class UserProfile extends Component {
    async doAjaxGetUserProfile() {}
    render() {
        //   const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
        return (
            <div>
                <div>
                    <h1>Profile</h1>
                </div>

                <div>
                    <Form layout="vertical">
                        <FormItem {...formItemLayout} label="E-mail">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Name">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Date of Birth">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Phone">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Mobile">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="ERC20 address">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Language">
                            <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Physical Address">
                            <Input />
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button size="large" icon="save" type="primary" htmlType="button">
                                Save
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
