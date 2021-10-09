import React, { Component } from 'react';
import { Card, Button, Icon, notification } from 'antd';
import './style.less';

class Notification extends Component {

    showTip1 = () => {
        notification.success({
            message:'Success',
            description:'Congratulations for you'
        })
    }
    showTip2 = () => {
        notification.info({
            message:'Info',
            description:'Let us to learning'
        })
    }
    showTip3 = () => {
        notification.error({
            message:'Error',
            description:'Throw new Error'
        })
    }
    showTip4 = () => {
        notification.warning({
            message:'Warning',
            description:'Take your self'
        })
    }

    //根据参数决定显示位置
    openTip = (placement) => {
        notification.info({
            message: `position:${placement}`,
            description: `you clicked the ${placement} window tips`,
            placement
        })
    }


    render() {
        return (
            <div>
                <Card title="通知提醒-图标" className="wrap-card">
                    <Button type="primary" onClick={this.showTip1} >success</Button>
                    <Button type="primary" onClick={this.showTip2} >info</Button>
                    <Button type="primary" onClick={this.showTip3} >error</Button>
                    <Button type="primary" onClick={this.showTip4} >warning</Button>
                </Card>
                <Card title="通知提醒-位置" className="wrap-card">
                    <Button type="primary" onClick={() => this.openTip("topLeft")} ><Icon type="radius-upleft" />Top-Left</Button>
                    <Button type="primary" onClick={() => this.openTip("topRight")} ><Icon type="radius-upright" />Top-Right</Button>
                    <Button type="primary" onClick={() => this.openTip("bottomLeft")} ><Icon type="radius-bottomleft" />Bottom-Left</Button>
                    <Button type="primary" onClick={() => this.openTip("bottomRight")} ><Icon type="radius-bottomright" />Bottom-Right</Button>
                </Card>
            </div>
        );
    }
}

export default Notification;