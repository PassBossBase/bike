import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import Utils from '../../utils';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {


    //按钮查询
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue()
        this.props.filterSubmit(fieldsValue)

    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;

        const formList = this.props.formList;
        // 存放表单dom结构的数组
        const formItemList = [];
        //表单封装
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width
                if (item.type == '时间查询') {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time', {
                            })(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time)
                    const end_time = <FormItem label={'~'} colon={false} key={field}>
                        {
                            getFieldDecorator('end_time', {
                            })(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time)
                    // 时间控件
                } else if (item.type == 'DATE') {
                    const DatePickers = <FormItem label="入职时间" key={field}>
                        {
                            getFieldDecorator(field, {
                            })(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>
                    formItemList.push(DatePickers)
                }else if (item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Input type='text' placeholder={placeholder} />
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT)
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue
                            })(
                                <Select style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT)
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                valuePropName: 'checked',
                                initialValue
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList;
    }
    render() {
        return (
            <Form layout="inline">
                {
                    this.initFormList()
                }
                <FormItem>
                    <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }


}
export default Form.create({})(FilterForm)