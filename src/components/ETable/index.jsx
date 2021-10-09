import React, { Component } from 'react';
import { Table } from 'antd'


class ETable extends Component {

    //单击表格某一行响应的事件
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection;
        if (rowSelection == 'checkbox') {
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            } else {
                selectedIds = [record.id]
                selectedRowKeys = [index]
                selectedItem = [record]
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem,selectedIds)
        } else {
            let selectedRowKeys = [index];  //某一行的索引
            let selectedItem = record;    //某一行对象内容
            this.props.updateSelectedItem(selectedRowKeys, selectedItem)
        }
    }

    tableInit = () => {

        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        // 判读表格按钮类型
        //如果为空说明不需要设置按钮
        if (row_selection === false || row_selection === null) {
            row_selection = false
            //如果为复选框类型，设置复选框
        } else if (row_selection == 'checkbox') {
            rowSelection.type = 'checkbox';
        } else {
            row_selection = 'radio';
        }

        return (
            <Table
                {...this.props}
                bordered
                rowSelection={rowSelection ? rowSelection : null}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            if (!rowSelection) {
                                return;
                            }
                            this.onRowClick(record, index)
                        }
                    }
                }}
            />
        )
    }


    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        );
    }
}

export default ETable;