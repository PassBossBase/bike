import React, { Component } from 'react';
import { Card, Icon, Button, message, Upload, DatePicker, Checkbox, Input, Form, Switch, Select, Radio } from 'antd';

const FormItem = Form.Item; //表单项
const { Option } = Select;  //多选项
const { TextArea } = Input; //文本域

//存储数据方便遍历显示
const states = [
    { id: 1, value: '欢快童年' },
    { id: 2, value: '正值年少' },
    { id: 3, value: '初入中年' },
    { id: 4, value: '步入老年' }
]
const liketodos = [
    { id: 1, value: '游泳' },
    { id: 2, value: '篮球' },
    { id: 3, value: '足球' },
    { id: 4, value: '爬山' },
    { id: 5, value: '象棋' },
    { id: 6, value: '跑步' },
    { id: 7, value: '游戏' },
    { id: 8, value: '阅读' },
    { id: 9, value: '旅行' },
    { id: 10, value: '摄影' },
]


class Register extends Component {

    state = {
        value: '',
        checked:false
    }
    //单选框选择
    onChange = (e, value) => {
        this.setState({ value: e.target.value })
    }
    //遍历数组的函数，渲染数据
    mapStates = (list) => {
        return list.map(item => (
            <Option value={item.value} key={item.id}>
                {item.value}
            </Option>
        ))
    }
    //注册按钮
    handleSubmit = () => {
        let form = this.props.form
        console.log(form.getFieldsValue());
        form.validateFields((err, value) => {
            // console.log('value ', value);
            if (value.username === undefined || value.password === undefined) {
                message.error('请输入账户或密码')
            }
        })
    }

    render() {
        //实现双向数据绑定
        const { getFieldDecorator } = this.props.form
        //对表单项的布局方式
        const formItemLayout = {
            labelCol: {     //form中label布局
                xs: 4,
                sm: 4
            },
            wrapperCol: {   //form中组件的布局
                xs: 6,
                sm: 6
            }
        }
        //布局偏移-注册按钮布局
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        let  {checked} = this.state
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal" >
                        <FormItem {...formItemLayout} label="账户">
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Input placeholder="请输入您的账户" />
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入您的密码" />
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别">
                            {
                                getFieldDecorator('sex', {

                                })(
                                    <Radio.Group onChange={this.onChange} >
                                        <Radio value={'男'} >男</Radio>
                                        <Radio value={'女'} >女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="年龄" >
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <Input type="number" style={{ width: 130 }} placeholder="18" />
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="状态">
                            {
                                getFieldDecorator('state')(
                                    <Select placeholder="请输入您的状态">
                                        {this.mapStates(states)}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="爱好">
                            {
                                getFieldDecorator('like')(
                                    <Select
                                        mode="multiple"
                                        placeholder="请输入您的爱好"
                                    >
                                        {this.mapStates(liketodos)}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="婚否">
                            {
                                getFieldDecorator('isMarry', {
                                })(

                                    <Switch
                                        checked={this.state.checked}
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="close" />}
                                        onChange={()=>this.setState({checked:!checked})}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem  {...formItemLayout} label="生日">
                            {
                                getFieldDecorator('birthday')(
                                    <DatePicker />
                                )
                            }
                        </FormItem>
                        <FormItem  {...formItemLayout} label="地址">
                            {
                                getFieldDecorator('address')(
                                    <TextArea />
                                )
                            }
                        </FormItem>
                        <FormItem  {...formItemLayout} label="头像">
                            <Avatar  />
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            {
                                getFieldDecorator('ischeckbox', {
                                    rules: [
                                        { required: true }
                                    ]
                                }
                                )(
                                    <Checkbox>我已阅读<a>管理员</a>协议</Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Register);



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}