import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import Axios from './../../axios';
import Utils from '../../utils';

const FormItem = Form.Item
const { Option } = Select;

class City extends Component {

    state = {
        list: [],
        isShowOpenCity: false,
        formModal: []
    }
    params = {
        page: 1
    }
    //开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }
    //接口发送请求
    request = () => {
        let _this = this
        Axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res => {
            if (res.code === 0) {

                this.setState({
                    list: res.result.item_list.map((item, index) => {
                        item.key = index
                        return item
                    }),
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.request()
                    })
                })
            }
        }).catch(error => Modal.info(error.message))
    }

    componentDidMount() {
        this.request()
    }

    handleSubmit = () => {
        let form = this.cityForm.props.form.getFieldsValue()
        this.setState({
            formModal: form
        })
        // console.log(form);
        Axios.ajax({
            url: '/order/finishi_order',
            data: {
                params: form
            }
        }).then(res => {
            if (res.code === 0) {
                message.success('开通成功')
                this.setState({
                    isShowOpenCity: false,
                })
                this.request()
            }
        })



    }

    render() {

        const columns = [
            {
                title: "城市ID",
                dataIndex: "id",
                key: 'id'
                , width: 75
            }, {
                title: "城市名称",
                dataIndex: "name",
                key: 'name'
                , width: 100
            }, {
                title: "用车模式",
                dataIndex: "mode",
                key: 'mode'
                , width: 85,
                render(mode) {
                    return mode === 1 ? '停车点' : '禁停区'
                }
            }, {
                title: "运营模式",
                dataIndex: "op_mode",
                key: 'op_mode'
                , width: 85,
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟'
                }
            }, {
                title: '授权加盟商id',
                dataIndex: 'franchinese_id',
                key: 'franchinese_id'
                , width: 120
            }
            , {
                title: "授权加盟商",
                dataIndex: "franchinese_name",
                key: 'franchinese_name'
                , width: 105
            }, {
                title: "城市管理员",
                dataIndex: "city_admins",
                key: 'city_admins',
                render(arr) {
                    return arr.map(item => {
                        return item.user_name
                    }).join(',');
                }
                , width: 100
            }, {
                title: "城市开通时间",
                dataIndex: "open_time",
                key: 'open_time', width: 110
            }, {
                title: "操作时间",
                dataIndex: "update_time",
                key: 'update_time', width: 80,
                render: Utils.formateDate
            }, {
                title: "操作人",
                dataIndex: "sys_user_name",
                key: 'sys_user_name', width: 80
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        bordered
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onOk={this.handleSubmit}
                    onCancel={() => this.setState({ isShowOpenCity: false })}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => this.cityForm = inst} />
                </Modal>
            </div>
        );
    }
}

export default Form.create({})(City)


class FilterForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline">
                <FormItem label="城市" >
                    {
                        getFieldDecorator("city_id")(
                            <Select style={{ width: 100 }}>
                                <Option value="" >全部</Option>
                                <Option value="1" >北京</Option>
                                <Option value="2" >天津</Option>
                                <Option value="3" >深圳</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator("mode")(
                            <Select style={{ width: 140 }}>
                                <Option value="" >全部</Option>
                                <Option value="1" >指定停车模式</Option>
                                <Option value="2" >禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="运营模式">
                    {
                        getFieldDecorator("op_mode")(
                            <Select style={{ width: 100 }}>
                                <Option value="" >全部</Option>
                                <Option value="1" >自营</Option>
                                <Option value="2" >加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator("auth_status")(
                            <Select style={{ width: 100 }}>
                                <Option value="" >全部</Option>
                                <Option value="1" >已授权</Option>
                                <Option value="2" >未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm)

class OpenCityForm extends Component {
    render() {

        const { getFieldDecorator } = this.props.form
        //布局方式
        const formlayout = {
            labelCol: {
                xs: 2,
                sm: 4
            },
            wrapperCol: {
                xs: 6,
                sm: 8
            }
        }

        return (
            <div>
                {/* 开通城市 */}
                < Form layout="horizontal" >
                    <FormItem label="选择城市" {...formlayout}>
                        {
                            getFieldDecorator("city_open")(
                                <Select style={{ width: 100 }}>
                                    <Option value=""></Option>
                                    <Option value="北京" >北京</Option>
                                    <Option value="天津" >天津</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="运营模式" {...formlayout}>
                        {
                            getFieldDecorator("mode_open")(
                                <Select style={{ width: 100 }}>
                                    <Option value=""></Option>
                                    <Option value="自营" >自营</Option>
                                    <Option value="加盟" >加盟</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="用车模式" {...formlayout}>
                        {
                            getFieldDecorator("bike_open")(
                                <Select style={{ width: 100 }}>
                                    <Option value=""></Option>
                                    <Option value="指定停车点" >指定停车点</Option>
                                    <Option value="禁停区" >禁停区</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form >
            </div>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm)