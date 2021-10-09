import React, { Component } from 'react';
import { Card, Button, Modal, Input, Select, Form, Tree, Transfer } from 'antd';
import ETable from '../../components/ETable';
import Utils from '../../utils';
import Axios from '../../axios';
import menuConfig from '../../config/menuConfig';

const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

class PermissionUser extends Component {

    state = {
        isRoleVisible: false,   //
        isPermVisible: false, //设置未选择用户弹框显示
        isUserVisible: false
    }
    // 初始化接口
    componentDidMount() {
        this.request()
    }
    // 调用接口
    request = () => {
        Axios.requestList(this, '/role/list', {})
    }
    // 按钮ok
    handleRoleSubmit = () => {
        let form = this.roleForm.props.form.getFieldsValue();
        console.log(form);
        Axios.ajax({
            url: '/order/finishi_order',
            data: {
                params: form
            }
        }).then(res => {
            if (res.code == 0) {
                this.setState({
                    isRoleVisible: false
                })
                this.roleForm.props.form.resetFields()
                this.request()
            }
        })


    }
    //创建角色
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    // 权限设置
    handlePermission = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info('请选择一个角色')
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }

    //权限弹框ok按钮
    handlePermEditSubmit = () => {
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        Axios.ajax({
            url: "/order/finishi_order",
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if (res) {
                this.setState({
                    isPermVisible: false
                })
                this.request()
            }
        })
    }
    // 用户授权
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info('请选择一个角色')
            return;
        }
        this.getRoleUserList(item.id)
    }

    // 获得用户列表
    getRoleUserList = (id) => {
        let item = this.state.selectedItem;
        Axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then(res => {
            if (res) {
                this.setState({
                    isUserVisible: true,
                    detailInfo: item
                })
                this.getAuthUserList(res.result);
            }
        })
    }

    //筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];    //mock数据源
        const targetKeys = [];      //目标源
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,    //用户id
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if (data.status == 1) {
                    targetKeys.push(data.key)
                }
                mockData.push(data)
            }
            this.setState({
                targetKeys,
                mockData
            })
        }

    }

    //穿梭框模态框
    handleUserSubmit = () => {
        let data = {}
        data.user_ids = this.setState.targetKeys;
        data.role_id = this.state.selectedItem.id;
        Axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if (res) {
                this.setState({
                    isUserVisible: false
                })
                this.request()
            }
        })
    }


    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    return status == 1 ? '启用' : '关闭'
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole} >创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission} >设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({ isRoleVisible: false });
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst}></RoleForm>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        wrappedComponentRef={(inst) => this.permForm = inst}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => this.userAuthForm = inst}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                    />

                </Modal>
            </div>
        )
    }
}

export default PermissionUser;

class RoleForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form
        //表单布局
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                        })(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>

                <FormItem label="角色状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                        })(
                            <Select>
                                <Option value={0}>关闭</Option>
                                <Option value={1}>启用</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
RoleForm = Form.create()(RoleForm)

class PermEditForm extends Component {
    //渲染树节点
    renderTreeNodes = (data) => {
        return data.map(item => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key} >
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode {...item} />
            }
        })
    }
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        //表单布局
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            }
        }
        const detail_info = this.props.detailInfo
        const menuInfo = this.props.menuInfo
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                        })(
                            <Input type="text" disabled placeholder={detail_info.role_name} />
                        )
                    }
                </FormItem>

                <FormItem label="角色状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                        })(
                            <Select>
                                <Option value={0}>关闭</Option>
                                <Option value={1}>启用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable   //指定是否出现复选框
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {
                            this.renderTreeNodes(menuConfig)
                        }
                    </TreeNode>
                </Tree>
            </Form>
        )
    }

}
PermEditForm = Form.create()(PermEditForm)

class RoleAuthForm extends Component {

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    // 过滤
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    // 调用父组件中的回调函数修改targetKeys
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        //表单布局
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            }
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;


        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                        })(
                            <Input type="text" disabled placeholder={detail_info.role_name} />
                        )
                    }
                </FormItem>
                <FormItem label="选择角色"  {...formItemLayout} >
                    <Transfer
                        listStyle={{ width: 200, height: 400 }}
                        targetKeys={this.props.targetKeys}
                        dataSource={this.props.mockData}
                        titles={['待选用户', '已选用户']}
                        showSearch
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        render={item => item.title}
                        onChange={this.handleChange}
                    />
                </FormItem>

            </Form>
        )
    }

}
RoleAuthForm = Form.create()(RoleAuthForm)