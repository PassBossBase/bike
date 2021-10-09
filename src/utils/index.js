import React from 'react';
import {Select} from 'antd';
const Option = Select.Option;

export default {
    //日期格式化
    formateDate(time) {
        if (!time) return
        let date = new Date(time)
        return date.getFullYear() + '/' + (date.getMonth() + 1)+ '/' + date.getDate()+ "   " + date.getHours()+ ':' + date.getMinutes()+ ':' + date.getSeconds()
    },
    //分页器
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{
                return `共${data.result.total}条`
            },
            showQuickJumper:true
        }
    },
    // 表单封装工具
    getOptionList(data){
        if(!data) return [];
        let option = [] //<Option value="0" key="all_key">全部</Option>
        data.map(item=>{
            option.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return  option;

    },
    // 表格封装工具
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
        
    }
}