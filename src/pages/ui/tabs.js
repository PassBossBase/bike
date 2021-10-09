import React, { Component } from 'react';
import { Card, Tabs, Icon } from 'antd';
import './style.less'

const { TabPane } = Tabs


class Tab extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
                title: 'Tab 3',
                content: 'Content of Tab 3',
                key: '3',
                closable: false,
            },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }
    nextIndex = 0

    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };
    render() {
        return (
            <div>
                <Card title="Tab页面标签">
                    <Tabs defaultActiveKey='1' className="wrap-card" >
                        <TabPane key='1' tab="One">
                            React 是FaceBook官方用于实现单页面应用的一个js应用框架
                        </TabPane>
                        <TabPane key='2' tab="Two">
                            React 是FaceBook官方用于实现单页面应用的一个js应用框架
                        </TabPane>
                        <TabPane key='3' tab="Three">
                            React 是FaceBook官方用于实现单页面应用的一个js应用框架
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页面标签-图标" className="wrap-card" >
                    <Tabs defaultActiveKey='1'>
                        <TabPane key='1' tab={<span><Icon type="apple" />apple</span>}>
                            苹果-apple
                        </TabPane>
                        <TabPane key='2' tab={<span><Icon type="android" />android</span>}>
                            安卓-android
                        </TabPane>
                        <TabPane key='3' tab={<span><Icon type="windows" />windons</span>}>
                            微软-windows
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页面标签-增删" className="wrap-card">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit} >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default Tab;