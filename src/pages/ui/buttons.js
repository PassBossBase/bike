import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd'
import './style.less'


class Buttons extends Component {
    state = {
        iconLoaing: false
    }

    render() {
        return (
            <div>
                <Card className="wrap-card" title="基础按钮">
                    <Button type="primary">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="ghost">Imooc</Button>
                </Card>
                <Card className="wrap-card" title="图标按钮">
                    <Button type="primary"><Icon type="plus" />新建</Button>
                    <Button type="danger"><Icon type="delete" />删除</Button>
                    <Button type="dashed"><Icon type="edit" />编辑</Button>
                    <Button type="ghost"><Icon type="search" />搜索</Button>
                </Card>
                <Card className="wrap-card" title="Loading按钮">
                    <Button shape="round" type="primary" ><Icon type="smile" spin theme="filled" />确定</Button>
                    <Button type="danger" ><Icon type="loading" /></Button>
                    <Button shape="round" loading={this.state.iconLoaing} onClick={() => this.setState({ iconLoaing: true })}>点击加载</Button>
                    <Button type="danger" onClick={() => this.setState({ iconLoaing: false })}>over...</Button>
                </Card>
            </div>
        );
    }
}

export default Buttons;