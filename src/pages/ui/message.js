import React, { Component } from 'react';
import { message, Card, Button } from 'antd';
import './style.less';

const key = 'update'
class Message extends Component {

    success = () => {
        message.success({
            content: '提交完成'
        })
    }
    error = () => {
        message.error({
            content: "提交失败"
        })
    }
    warning = () => {
        message.warning({
            content: '权限不足'
        })
    }
    loading = () => {
        message.loading({
            content:'loading...',
            key
        })
        setTimeout(()=>message.success({
            content:'loaded',
            duration:2,
            key
        }),2000)
    }
    render() {
        return (
            <div>
                <Card title="全局提示-类型" className="wrap-card">
                    <Button type="primary" onClick={this.success} >Success</Button>
                    <Button type="primary" onClick={this.error} >Error</Button>
                    <Button type="primary" onClick={this.warning} >Warning</Button>
                </Card>
                <Card title="全局提示-loading" className="wrap-card">
                    <Button type="primary" onClick={this.loading} >loading</Button>
                </Card>
            </div>
        );
    }
}

export default Message;