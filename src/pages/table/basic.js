import React, { Component } from 'react'
import { Table, Card, Modal, Button, message } from 'antd'
import Axios from '../../axios'
import Utils from '../../utils'

export default class BasicTable extends Component {

    state = {
        dataSource2: [],
        dataSource3: [],
        selectedRowKeys: []
    }
    params = {
        page: 1
    }

    //动态获取数据
    request = () => {
        let _this = this
        let { page } = this.params
        Axios.ajax({
            url: '/table/list',
            data: {
                params: { page }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    dataSource2: res.result.list
                    , dataSource3: res.result.list
                    , pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request()
                    })
                })
            }
        })
    }
    //通过componentDidMount进行表格数据初始化
    componentDidMount() {
        this.request()
    }

    //选择表格中一行的数据
    onRowClick = (record, index) => {
        console.log(record);
        let selectKey = [index + 1];
        Modal.info({
            title: '信息',
            content: `${record.warm}的${record.name} `
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
        })
    }
    //删除操作
    handleDelete = (e) => {
        let rows = this.state.selectedRowKeys
        let ids = []
        rows.map((item) => {
            ids.push(item.id)
            return item
        })
        Modal.confirm({
            title: '删除提示',
            content: '你确定删除么',
            onOk: () => {
                message.info('删除成功')
                //重新刷新数据
                this.request()
                //使多选框取消选中状态
                this.setState({
                    selectedRowKeys: []
                })
            }
        })
        //取消按钮选中状态
        e.target.blur()
    }
    render() {
        //静态数据
        const dataSource = [
            {
                key: '1',
                id: '1',
                name: '胡彦斌',
                age: 32,
                sex: '男',
                like: '跑步',
                address: '西湖区湖底公园1号',
                worker: '工程师',
                warm: '冷库'
            },
            {
                key: '2',
                id: '2',
                name: '胡彦祖',
                age: 42,
                sex: '男',
                like: '散步',
                address: '西湖区湖底公园2号',
                worker: '程序员',
                warm: '热情'
            },
            {
                key: '3',
                id: '3',
                name: '胡彦龙',
                sex: '男',
                age: 56,
                like: '相声',
                address: '西湖区湖底公园3号',
                worker: '程序员',
                warm: '随和'
            },
        ];
        //列表标题
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex'
            }
            , {
                title: '爱好',
                dataIndex: 'like',
                key: 'like'
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
            },
            {
                title: '性格',
                dataIndex: 'warm',
                key: 'warm',
            },

        ];

        //表格通过rowSelection添加单选按钮
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowSelection2 = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                //选中行的数据组成的对象
                console.log('selectedRows', selectedRows);
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        let { dataSource2, dataSource3 } = this.state
        return (
            <div>
                <Card title="基础表格" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false} />;
                </Card>
                <Card title="动态数据渲染表格" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={dataSource2}
                        columns={columns}
                        pagination={false} />
                </Card>
                <Card title="动态数据渲染表格-单选框" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={dataSource2}
                        columns={columns}
                        pagination={false}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        pagination={this.state.pagination}
                    />

                </Card>
                <Card title="动态数据渲染表格-复选框" className="wrap-card" >
                    <div>
                        <Button onClick={this.handleDelete}>删除用户</Button>
                    </div>
                    <Table
                        bordered
                        dataSource={dataSource3}
                        columns={columns}
                        pagination={false}
                        rowSelection={rowSelection2}
                        pagination={this.state.pagination}
                    />

                </Card>
            </div>
        )
    }
}
