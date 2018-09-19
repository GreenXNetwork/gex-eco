import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Form, Input, Tooltip, Button, Icon, InputNumber, Upload } from 'antd';

const FormItem = Form.Item;

class ProfileEdit extends Component {
    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('nickname', {})(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Country">
                        {getFieldDecorator('country', {})(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="City">
                        {getFieldDecorator('city', {})(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Postal Code">
                        {getFieldDecorator('postal_code', {})(<InputNumber />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Phone Number">
                        {getFieldDecorator('phone', {})(<Input style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Avatar"
                        extra="Please upload a png or jpg."
                    >
                        {getFieldDecorator('avatar', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button>
                                    <Icon type="upload" /> Change avatar
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedProfileEditForm = Form.create()(ProfileEdit);

export default injectIntl(WrappedProfileEditForm, { withRef: true });
