import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, DatePicker, message } from 'antd'
import Axios from '../../axios';
import Utils from '../../utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';

const FormItem = Form.Item;
const { Option } = Select;

export default class Order extends Component {

    state = {
        list: [],
        pagination: "",
        isShow: false,
        orderInfo: ""
    }
    params = {
        page: 1
    }
    //数据项
    formList = [
        {
            type: "SELECT",
            label: "城市",
            field: "city",
            placeholder: "全部",
            initialValue: '0',
            width: 80,
            list: [
                { id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' },
            ]

        },
        // {
        //     type: "INPUT",
        //     label: "模式",
        //     field: "mode",
        //     placeholder: "请输入模式",
        //     width: 100,
        // },
        {
            type: "时间查询",

        },
        {
            type: "SELECT",
            label: "订单状态",
            field: "order_status",
            placeholder: "全部",
            initialValue: '0',
            width: 80,
            list: [
                { id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }
            ]
        }
    ]

    //请求接口
    request = () => {
        Axios.requestList(this,'/order/list',this.params)
        // Axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params: this.params
        //     }
        // }).then(res => {
        //     let list = res.result.item_list.map((item, index) => {
        //         item.key = index;
        //         return item;
        //     })
        //     this.setState({
        //         list,
        //         pagination: Utils.pagination(res, (current) => {
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // })
    }
    //生成真实dom之后请求接口
    componentDidMount() {
        this.request()
    }

    //结束订单按钮-》弹出modal框
    handleConfirm = () => {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: '提示',
                content: '请选择一个用户'
            })
            return;
        }
        Axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result,
                    isShow: true
                })
            }
        })

    }
    //Modal框-》ok按钮
    handleFinishOrder = () => {
        let item = this.state.selectedItem
        Axios.ajax({
            url: '/order/finishi_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then(res => {
            message.success('结束成功')
            if (res.code === 0) {
                this.setState({
                    isShow: false
                })
            }
        })

        this.request()


    }

    //选择表格中一行的数据
    onRowClick = (record, index) => {
        console.log(record);
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    //订单详情
    openOrderDetail = () => {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: '提示',
                content: '请选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank') 
    }

    handleFilter = (params) =>{
        this.params = params;
        this.request()
    }
    render() {

        const columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn",
                key: "order_sn"
            }, {
                title: "车辆编号",
                dataIndex: "bike_sn",
                key: "bike_sn"
            }, {
                title: "用户名",
                dataIndex: "user_name",
                key: "user_name"
            }, {
                title: "手机号码",
                dataIndex: "mobile",
                key: "mobile"
            }, {
                title: "里程",
                dataIndex: "distance",
                key: "distance",
                render(distance) {
                    return distance / 1000 + 'Km'
                }
            }, {
                title: "行驶时长",
                dataIndex: "total_time",
                key: "total_time"
            }, {
                title: "状态",
                dataIndex: "status",
                key: "status"
            }, {
                title: "开始时间",
                dataIndex: "start_time",
                key: "start_time"
            }, {
                title: "结束时间",
                dataIndex: "end_time",
                key: "end_time"
            }, {
                title: "订单金额",
                dataIndex: "total_fee",
                key: "total_fee"
            }, {
                title: "实付金额",
                dataIndex: "user_pay",
                key: "user_pay"
            },
        ]
        const formItemLayout = {
            labelCol: {
                xs: 6,
                sm: 6
            },
            wrapperCol: {
                xs: 18,
                sm: 18
            }
        }
        //表格通过rowSelection添加单选按钮
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card className="wrap-card">
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleConfirm}>订单结束</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                    updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedIds = {this.state.selectedIds}
                        selectedItem = {this.state.selectedItem}
                        rowSelection = 'checkbox'
                    />
                    
                </div>
                {/* <Table
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    /> */}
                <Modal title="结束订单"
                    visible={this.state.isShow}
                    width={600}
                    onCancel={() => {
                        this.setState({ isShow: false })
                    }}
                    onOk={this.handleFinishOrder}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

// class FilterForm extends Component {

//     render() {
//         const { getFieldDecorator } = this.props.form;

//         return (
//             <Form layout="inline">
//                 <FormItem label="城市" >
//                     {
//                         getFieldDecorator("city_id")(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="" >全部</Option>
//                                 <Option value="1" >北京</Option>
//                                 <Option value="2" >天津</Option>
//                                 <Option value="3" >深圳</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单时间">
//                     {
//                         getFieldDecorator("start_time")(
//                             <DatePicker showTime format="YYYY-MM-DD HH:MM:SS" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem >
//                     {
//                         getFieldDecorator("end_time")(
//                             <DatePicker style={{ marginLeft: 5 }} showTime format="YYYY-MM-DD HH:MM:SS" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单状态">
//                     {
//                         getFieldDecorator("order_status")(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="" >全部</Option>
//                                 <Option value="1" >进行中</Option>
//                                 <Option value="2" >已结束</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" >查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
// FilterForm = Form.create({})(FilterForm)