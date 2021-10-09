import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';
import './style.less';

class Modals extends Component {

    state = {
        one: false,
        two: false,
        three: false,
        four: false,
    }
    //基础模态框
    showOpen = () => {
        this.setState({ one: true })
    }
    showOwn = () => {
        this.setState({ two: true })
    }
    showTop20 = () => {
        this.setState({ three: true })
    }
    showCenter = () => {
        this.setState({ four: true })
    }

    //信息确认框
    success = () => {
        Modal.success({
            title:'支付成功',
            content:(
                <div>
                    您的订单正在处理中
                </div>
            )
        })
    }
    info = () => {
        Modal.info({
            title:'正在支付中',
            content:(
                <div>
                    正在打开支付界面，请稍等
                </div>
            )
        })
    }
    warning = () => {
        Modal.warning({
            title:'存在支付风险',
            content:(
                <div>
                    请检查您的账号
                </div>
            )
        })
    }
    error = () => {
        Modal.error({
            title:'支付失败',
            content:(
                <div>
                    请检查您的余额
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Card className="wrap-card" title="基础模态框">
                    <Button type="danger" onClick={this.showOpen} >Open</Button>
                    <Button type="danger" onClick={this.showOwn} >自定义弹框</Button>
                    <Button type="danger" onClick={this.showTop20} >顶部20px弹框</Button>
                    <Button type="danger" onClick={this.showCenter} >水平垂直居中</Button>
                    <Modal
                        title="open the demo1"
                        visible={this.state.one}
                        onOk={() => {
                            console.log('good');
                            this.setState({
                                one: false
                            })
                        }}
                        onCancel={() =>
                            this.setState({
                                one: false
                            })
                        }
                    >
                        This is one Modal
                    </Modal>
                    <Modal
                        title="open the demo2"
                        visible={this.state.two}
                        onOk={() => {
                            console.log('good');
                            this.setState({
                                two: false
                            })
                        }}
                        onCancel={() =>
                            this.setState({
                                two: false
                            })
                        }
                    >
                        This is two Modal
                    </Modal>
                    <Modal
                        title="open the demo3"
                        visible={this.state.three}
                        style={{ top: 20 }}
                        onOk={() => {
                            console.log('good');
                            this.setState({
                                three: false
                            })
                        }}
                        onCancel={() =>
                            this.setState({
                                three: false
                            })
                        }
                    >
                        距离顶部 20px Modal
                    </Modal>
                    <Modal
                        title="open the demo4"
                        centered   //水平垂直居中
                        visible={this.state.four}
                        onOk={() => {
                            console.log('good');
                            this.setState({
                                four: false
                            })
                        }}
                        onCancel={() =>
                            this.setState({
                                four: false
                            })
                        }
                    >
                        水平垂直居中 Modal
                    </Modal>
                </Card>
                <Card className="wrap-card" title="信息确认框">
                    <Button type="primary" onClick={this.success} >success</Button>
                    <Button type="primary" onClick={this.info} >info</Button>
                    <Button type="primary" onClick={this.warning} >warning</Button>
                    <Button type="primary" onClick={this.error} >error</Button>
                </Card>
            </div>
        );
    }
}

export default Modals;