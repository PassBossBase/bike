import React, { Component } from 'react';
import { Card, Button, Form } from 'antd';
import Axios from '../../axios';
import BaseForm from '../../components/BaseForm';

class BikeMap extends Component {

    state = {
        total_count: 0,
    }
    map = ''

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            initialValue: '0',
            width: 80,
            list: [
                { id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '杭州' }
            ]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            initialValue: '0',
            width: 80,
            list: [
                { id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '已完成' }
            ]
        },
    ]
    //查询表单
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.request()
    }
    //调用接口
    request = () => {
        Axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then(res => {
            if (res.code == 0) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res)
            }
        })
    }

    //渲染地图方法
    renderMap = (res) => {
        let list = res.result.route_list   //行驶路线
        // 使用挂载点生成map
        this.map = new window.BMapGL.Map('container');
        // 获取坐标
        let gps1 = list[0].split(',');
        let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        this.map.centerAndZoom(new window.BMapGL.Point(116.414, 39.915), 13);
        // this.map.setHeading(64.5);   //设置地图旋转角度
        // this.map.setTilt(73);       //设置地图的倾斜角度
        //起点图标
        let startPointIcon =  new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        //终点图标
        let endPointIcon =  new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        let bikeMarkerStart = new window.BMapGL.Marker(startPoint,{icon:startPointIcon})
        let bikeMarkerend = new window.BMapGL.Marker(endPoint,{icon:endPointIcon})
        //绘制图标
        this.map.addOverlay(bikeMarkerStart)
        this.map.addOverlay(bikeMarkerend)
        
        //绘制车辆行驶路线
        let routeList=[];

        list.forEach((item)=>{
            let p = item.split(',') //item 的样子： "116.356619,40.017782",
            routeList.push(new window.BMapGL.Point(p[0],p[1]))
        })        
        //绘制折线
        let polyLine = new window.BMapGL.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine)

        //绘制服务区
        let servicePointList = [];  //存放每个坐标
        let serviceList = res.result.service_list;  //获取坐标列表
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMapGL.Point(item.lon,item.lat))
        })

        let polygon  = new window.BMapGL.Polyline(servicePointList,{
            strokeColor:'blue',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polygon)

        //添加地图中的自行车
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg',new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        //遍历数据添加车辆图标
        bikeList.forEach((item=>{
            let p = item.split(',')
            let point = new window.BMapGL.Point(p[0],p[1])
            let bikeMarker = new window.BMapGL.Marker(point,{icon:bikeIcon})
            this.map.addOverlay(bikeMarker)
        }))

    }

    componentDidMount() {
        this.request()
    }
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList}
                        filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        );
    }
}

export default BikeMap;