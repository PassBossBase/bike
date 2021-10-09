import React, { Component } from 'react';
import { Card } from 'antd';
import echartsTheme from './../echartTheme'
import * as echarts from 'echarts/core';

//导入柱形图
import ReactEcharts from 'echarts-for-react';




class Pie extends Component {

    componentDidMount() {
        echarts.registerTheme('Imooc', echartsTheme)
    }

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            emphasis: { //鼠标划入字体变大
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            label: {
                show: false,
                position: 'center'
            },
            tooltip: {
                trigger: 'item',  //鼠标划入显示数据
                formatter: '{a}<br/>{b}:{c}({d}%)'   //安装比例显示数据
            },
            legend: {
                orient: 'vertical',     //对齐方式垂直
                top: 20,
                right: 10,          //居右
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 300, name: 'Mon' },
                        { value: 400, name: 'Tue' },
                        { value: 150, name: 'Wed' },
                        { value: 400, name: 'Thu' },
                        { value: 500, name: 'Fri' },
                        { value: 200, name: 'Sat' },
                        { value: 350, name: 'Sun' }
                    ]
                }
            ]
        }
        return option
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'item',  //鼠标划入显示数据
                formatter: '{a}<br/>{b}:{c}({d}%)'   //安装比例显示数据
            },
            legend: {
                orient: 'vertical',//对齐方式垂直
                top: 20,
                right: 10,          //居右
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    data: [
                        { value: 300, name: 'Mon' },
                        { value: 400, name: 'Tue' },
                        { value: 150, name: 'Wed' },
                        { value: 400, name: 'Thu' },
                        { value: 500, name: 'Fri' },
                        { value: 200, name: 'Sat' },
                        { value: 350, name: 'Sun' }
                    ]
                }
            ]
        }
        return option
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
            tooltip: {
                trigger: 'item',  //鼠标划入显示数据
                formatter: '{a}<br/>{b}:{c}({d}%)'   //安装比例显示数据
            },
            legend: {
                orient: 'vertical',     //对齐方式垂直
                top: 20,
                right: 10,          //居右
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['10%','50%'],
                    roseType: 'area',
                   
                    data: [
                        { value: 600, name: 'Mon' },
                        { value: 550, name: 'Tue' },
                        { value: 500, name: 'Wed' },
                        { value: 450, name: 'Thu' },
                        { value: 400, name: 'Fri' },
                        { value: 350, name: 'Sat' },
                        { value: 300, name: 'Sun' }
                    ]
                }
            ]
        }
        return option
    }

    render() {
        return (
            <div>
                <Card title="饼图一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="饼图二">
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="饼图三">
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}

export default Pie;