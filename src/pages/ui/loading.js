import React, { Component } from 'react';
import { Card, Spin, Alert, Switch, Icon } from 'antd';
import './style.less';

class Loading extends Component {
    state = {
        load: false
    }

    handleChange = () => {
        let { load } = this.state
        this.setState({
            load: !load
        })
    }
    render() {
        return (
            <div>
                <Card title="spin用法" className="wrap-card">
                    <Spin size="small" className='spin' />
                    <Spin size="default" className="spin" />
                    <Spin size="large" />
                </Card>
                <Card title="spin遮罩内容" className="wrap-card">
                    <Alert
                        style={{ marginBottom: 10 }}
                        message="生活..."
                        description="其乐融融"
                        type="success"
                    />
                    <Spin tip="loading...">
                        <Alert
                            style={{ marginBottom: 10 }}
                            message="学习..."
                            description="持之以恒"
                            type="info"
                        />
                    </Spin>
                    <Spin
                        indicator={<Icon type="dribbble" spin />}
                        spinning={this.state.load}
                        tip="加载中..." size="large"
                    >
                        <Alert
                            style={{ marginBottom: 10 }}
                            message="兴趣..."
                            description="良师益友"
                            type="warning"
                        />
                    </Spin>
                    <Switch onChange={this.handleChange} />
                </Card>
            </div>
        );
    }
}

export default Loading;