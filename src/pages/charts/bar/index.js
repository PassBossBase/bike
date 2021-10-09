import React, { Component } from 'react';
import { Card } from 'antd';
import echartsTheme from './../echartTheme'
import * as echarts from 'echarts/core';

//导入柱形图
import ReactEcharts from 'echarts-for-react';




class Bar extends Component {

    componentDidMount(){
        echarts.registerTheme('Imooc',echartsTheme)
    }

    getOption = () =>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name:"订单量",
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
              }
            ]
          };
          
          return option 
    }
    getOption2 = () =>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            // x轴信息
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
             // y轴信息
            yAxis: {
              type: 'value'
            },
            legend:{
                data:['小明','小蓝','小红']
            },
            // 数据源
            series: [
              {
                name:"小明",
                data: [200, 220, 150, 80, 70, 100, 130],
                type: 'bar'
              },
              {
                name:"小蓝",
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
              },
              {
                name:"小红",
                data: [130, 20, 50, 90, 70, 50, 200],
                type: 'bar'
              }
            ]
          };
          
          return option 
    }

    render() {
        return (
            <div>
                <Card title="基础柱形图一">
                <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="基础柱形图二">
                <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}

export default Bar;