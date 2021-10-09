import React, { Component } from 'react';
import { Card, Button, Modal, message, Form, Input, Select, DatePicker,Radio } from 'antd';
import Axios from '../../axios';
import Utils from '../../utils'
import ETable from '../../components/ETable'
import BaseForm from '../../components/BaseForm';
import moment from 'moment'

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option
class User extends Component {

    state = {
        isVisible: false //模态框是否显示
    }

    params = {
        page: 1
    }
    // 表单配置项
    formList = [
        {
            type: "INPUT",
            label: "用户名",
            field: "user_name",
            placeholder: "请输入用户名",
            width: 100,
        },
        {
            type: "INPUT",
            label: "手机号",
            field: "user_mobile",
            placeholder: "请输入手机号",
            width: 100,
        },
        {
            type: "DATE",
            label: "入职日期",
            field: "datepicker",
            placeholder: "请选择日期",
            width: 100,
        },
    ]

    handleFilter = (params) => {
        this.params = params
        this.request()
    }
    //请求接口
    request = () => {
        Axios.requestList(this, '/user/list', this.params);
    }

    componentDidMount() {
        this.request()
    }

    // 功能区操作
    handleOperate = (type) => {
        let item  = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        }else if(type=='edit'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }else{
                this.setState({
                    type,
                    isVisible: true,
                    title: '编辑员工',
                    userInfo:item
                })
            }
        }else if (type=='detail'){
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title:'确认删除',
                onOk:()=>{
                    Axios.ajax({
                        url:'/order/finishi_order',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code==0){
                            this.setState({ isVisible: false})
                            this.request()
                        }
                    })
                }
            })
        }
    }

    // 创建员工提交方法
    handleSubmit = () =>{
        let type = this.state.type;
        // 获取子组件中表单dom的数据
        let data = this.userForm.props.form.getFieldsValue()
        Axios.ajax({
            url:'/order/finishi_order',
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code==0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible:false
                })
                this.request()
            }
        })
    }

    render() {
        // 列头
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == '1' ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
            },
            {
                title: '爱好',
                dataIndex: 'interest',
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '联系地址',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
            },
        ]

        let footer ={};
        if(this.state.type=='detail'){
            footer={
                footer:null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm
                        formList={this.formList}
                        filterSubmit={this.handleFilter}
                    />
                </Card>
                <Card className="wrap-card">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" icon="snippets" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        pagination={this.state.pagination}
                    />
                </div>
                {/* 模态框 */}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() =>{
                        this.setState({ isVisible: false })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm
                        type={this.state.type}
                        wrappedComponentRef={(inst)=>this.userForm = inst}
                        userInfo={this.state.userInfo}
                    />
                </Modal>
            </div>
        );
    }
}
export default User;

class UserForm extends Component {

    render() {

        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
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
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type=="detail" ?userInfo.username :
                        getFieldDecorator('username',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type=="detail" ?userInfo.sex? '男':'女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <Radio.Group>
                                <Radio value={1} >男</Radio>
                                <Radio value={2} >女</Radio>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type=="detail" ?userInfo.state :
                        getFieldDecorator('state',{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value="开心">开心</Option>
                                <Option value="桑心">桑心</Option>
                                <Option value="愉悦">愉悦</Option>
                                <Option value="失落">失落</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type=="detail" ?userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type=="detail" ?userInfo.address :
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea 
                            />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm)