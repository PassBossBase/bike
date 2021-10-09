import React, { Component } from 'react';
import { Card, Icon, Button, Input, Form, message,Checkbox } from 'antd';


const FormItem = Form.Item

class FormLogin extends Component {

    handleSubmit = () => {
        let form = this.props.form;
        console.warn(form);
        //校验字段
        form.validateFields((err, value) => {
            if (value.username === 'tom' && value.password === 123) {
                message.success(`${value.username}恭喜你，已通过表单验证，当前密码为${value.password}`)
            } else {
                message.error('用户名或密码错误')
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单" className="wrap-card" >
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入账户" />
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">Login</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="wrap-card" >
                    <Form layout="horizontal" style={{ width: 250 }}>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账户" />
                                )
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Checkbox style={{float:'left'}}>Remember me</Checkbox>
                            <a style={{ display: 'block',float:'right' }} href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormLogin);