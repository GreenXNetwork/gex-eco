import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import {
    Form,
    Input,
    Tooltip,
    Button,
    Icon,
    InputNumber,
    Upload,
    Cascader,
    Spin,
    message,
} from 'antd';
import { connect } from 'dva';
import styles from './ProfileEdit.less';

const FormItem = Form.Item;

const { TextArea } = Input;

function transformCountryListToOptionsData(countries) {
    const array = countries || [];
    const options = array.map(item => ({
        value: item.country_id,
        label: item.name,
    }));
    return options;
}

function filterCountry(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class ProfileEdit extends Component {
    state = {
        avatarLoading: false,
        imageUrl: undefined,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'country/fetchAll',
        });
    }

    componentWillReceiveProps(nextProps) {
        const { imageUrl } = nextProps;
        this.setState({ imageUrl });
    }

    handleAvatarChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ avatarLoading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    avatarLoading: false,
                })
            );
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form, current } = this.props;
        const { imageUrl } = this.state;

        form.validateFields((err, values) => {
            if (!err) {
                const { country, ...rest } = values;
                dispatch({
                    type: 'user/updateCurrent',
                    payload: {
                        id: current.id,
                        country_id: country[0],
                        avatar_url: imageUrl,
                        ...rest,
                    },
                });
            }
        });
    };

    render() {
        const { form, countries, loading } = this.props;
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

        const isLoading =
            loading.effects['country/fetchAll'] === undefined
                ? true
                : loading.effects['country/fetchAll'];
        if (isLoading) {
            return <Spin />;
        }

        const { avatarLoading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                <Icon type={avatarLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className={styles.container}>
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
                        {getFieldDecorator('name', {})(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Country">
                        {getFieldDecorator('country', {})(
                            <Cascader
                                options={transformCountryListToOptionsData(countries)}
                                placeholder="Please select country"
                                showSearch={{ filterCountry }}
                                autoComplete="false"
                            />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="City">
                        {getFieldDecorator('city', {})(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Postal Code">
                        {getFieldDecorator('zipcode', {})(<InputNumber />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Phone Number">
                        {getFieldDecorator('phone', {})(<Input style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Avatar"
                        extra="Please upload a png or jpg."
                    >
                        {getFieldDecorator('avatar', {})(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="/api/user/avatar"
                                beforeUpload={beforeUpload}
                                onChange={this.handleAvatarChange}
                            >
                                {imageUrl ? (
                                    <img className={styles.avatarImg} src={imageUrl} alt="avatar" />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label={<span>Headline&nbsp;</span>}>
                        {getFieldDecorator('headline', {})(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                Description&nbsp;
                                <Tooltip title="Maximum 500 characters">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('description', {})(
                            <TextArea rows={16} maxLength={500} />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button disabled={avatarLoading} type="primary" htmlType="submit">
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({ loading, user, country }) => ({
    loading,
    current: user.currentUser,
    countries: country.list || [],
});

function mapPropsToFields(props) {
    return {
        name: Form.createFormField({ value: props.current.name }),
        country: Form.createFormField({ value: [props.current.country_id] }),
        city: Form.createFormField({ value: props.current.city }),
        zipcode: Form.createFormField({ value: props.current.zipcode }),
        phone: Form.createFormField({ value: props.current.phone }),
    };
}

const WrappedProfileEditForm = Form.create({ mapPropsToFields })(ProfileEdit);

export default injectIntl(connect(mapStateToProps)(WrappedProfileEditForm), { withRef: true });
