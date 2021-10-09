import React, { Component } from 'react';
import { Card, Table, Badge,Modal, message,Button } from 'antd'
import Axios from '../../axios'


class High extends Component {

    state = {
        dataSource: [],
    }

    componentDidMount = () => {
        this.request()
    }

    request = () => {
        Axios.ajax({
            url: '/table/list',
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    dataSource: res.result.list
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log(sorter);
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (item) => {
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'确认么',
            onOk:()=>{
                message.success('删除成功')
                this.request()
            }
        })
    }

    render() {

        //列表标题
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 80
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 80
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 80
            }
            , {
                title: '爱好',
                dataIndex: 'like',
                key: 'like',
                width: 80
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width: 80
            },
            {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            },
            {
                title: '性格',
                dataIndex: 'warm',
                key: 'warm',
                width: 80
            },
        ];

        const columns2 = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 80,
                fixed: 'left'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 80,
                fixed: 'left'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 80,
                fixed: 'left'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 80
            }
            , {
                title: '爱好',
                dataIndex: 'like',
                key: 'like',
                width: 80
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width: 80
            },
            {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            },
            {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            }, {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80,
                fixed: 'right'
            },
            {
                title: '性格',
                dataIndex: 'warm',
                key: 'warm',
                width: 80,
                fixed: 'right'
            },
        ];

        const columns3 = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 80
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 80
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 80,
                sorter: (a, b) => a.age - b.age,
                sortOrder: this.state.sortOrder
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 80
            }
            , {
                title: '爱好',
                dataIndex: 'like',
                key: 'like',
                width: 80
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width: 80
            },
            {
                title: '工作',
                dataIndex: 'worker',
                key: 'worker',
                width: 80
            },
            {
                title: '性格',
                dataIndex: 'warm',
                key: 'warm',
                width: 80
            },
        ];

        const columns4 = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
            }
            , {
                title: '爱好',
                dataIndex: 'like',
                render(like) {
                    let config = {
                        '摄影': <Badge status="success" text="摄影" />,
                        '爬山': <Badge status="error" text="爬山" />,
                        '散步': <Badge status="processing" text="散步" />,
                        '跑步': <Badge status="success" text="跑步" />,
                        '健身': <Badge status="warning" text="健身" />,
                        '篮球': <Badge status="processing" text="篮球" />,
                    }
                    return config[like]
                },
            },
            {
                title: '住址',
                dataIndex: 'address',
            },
            {
                title: '工作',
                dataIndex: 'worker',
            },
            {
                title: '性格',
                dataIndex: 'warm',
            }, {
                title: '操作',
                render:(text, item)=> {
                    return <Button size="small" onClick={(item) => this.handleDelete(item)} >删除</Button>
                }
            }
        ];

        return (
            <div>
                <Card title="头部固定" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左侧固定-X" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns2}
                        pagination={false}
                        scroll={{ x: 2000 }}
                    />
                </Card>
                <Card title="年龄排序" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns3}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" className="wrap-card" >
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns4}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}

export default High;