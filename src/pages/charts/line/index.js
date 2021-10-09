import React, { Component } from 'react';
import { Card } from 'antd';
import echartsTheme from './../echartTheme'
import * as echarts from 'echarts/core';

//导入柱形图
import ReactEcharts from 'echarts-for-react';




class Line extends Component {

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
                data: [
                    1000, 2000, 1500, 3000, 2500, 1200, 800
                ],
                type: 'line'
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
                data:['某宝订单量','某东订单量']
            },
            // 数据源
            series: [
                {
                    name: '某宝订单量',
                    type: 'line',
                    data: [
                        1200, 4000, 4500, 6000, 8000, 10000, 12000
                    ]
                },
                {
                    name: '某东订单量',
                    type: 'line',
                    data: [
                        1500, 4500, 6000, 6500, 8000, 13000, 16000
                    ]
                }
            ]
          };
          
          return option 
    }

    getOption3 = () =>{
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
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
             // y轴信息
            yAxis: {
              type: 'value'
            },
            // 数据源
            series: [
              {
                data: [
                    1000, 2000, 1500, 3000, 2500, 1200, 800
                ],
                type: 'line',
                areaStyle: {}
              },
            
            ]
          };
          
          return option 
    }

    render() {
        return (
            <div>
                <Card title="折线图一">
                <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="折线图二">
                <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="折线图二">
                <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}

export default Line;