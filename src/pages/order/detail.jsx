import React, { Component } from 'react';
import Axios from '../../axios'
import { Card } from 'antd'
import './detail.less'



export default class OrderDetail extends Component {

    state = {
        orderInfo: []
    }
    map = {}
    //获取orderId
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId)
        }

    }
    //调用接口
    getDetailInfo = (orderId) => {
        Axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId
                }
            }
        }).then(res => {
            console.log(res);
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
            }
            this.renderMap(res.result)
        })
    }
    //初始化地图
    renderMap = (result) => {
        // GL版命名空间为window.BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        this.map = new window.BMapGL.Map("orderDetailMap");    // 创建Map实例
        this.map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        this.map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加比例尺控件
        this.map.addControl(zoomCtrl);

        //调用路线图绘制方法
        this.drawBikeRoute(result.position_list)
        //调用服务区绘制方法
        this.drawServiceArea(result.area)
    }
    //绘制路线图
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = "";
        let endPoint = "";
        if (positionList.length > 0) {
            let arr = positionList[0];
            //起始坐标点
            startPoint = new window.BMapGL.Point(arr.lon, arr.lat);
            //起始坐标点图标
            let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42),
                {
                    imageSize: new window.BMapGL.Size(36, 42),   //图片大小
                    anchor: new window.BMapGL.Size(36, 42)        //停靠位置
                })
            let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon })

            let arr2 = positionList[positionList.length - 1];
            //终止坐标点
            endPoint = new window.BMapGL.Point(arr2.lon, arr2.lat);
            //终止坐标点图标
            let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42),
                {
                    imageSize: new window.BMapGL.Size(36, 42),   //图片大小
                    anchor: new window.BMapGL.Size(36, 42)        //停靠位置
                })
            let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon })
            //生成覆盖物图片
            this.map.addOverlay(startMarker)
            this.map.addOverlay(endMarker)

            //连接路线图
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i]
                trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
            }
            //绘制路线
            let polyline = new window.BMapGL.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeight: 3,
                strokeOpacity: 1,
            })
            this.map.addOverlay(polyline)
        }
        
    }

    drawServiceArea = (positionList) => {

         //连接路线图
         let trackPoint = [];
         for (let i = 0; i < positionList.length; i++) {
             let point = positionList[i]
             trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
         }
        //绘制服务区
        let polygon = new window.BMapGL.Polygon(trackPoint, {
            strokeColor: '#ce0000',
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polygon)
    }


    render() {
        let { orderInfo } = this.state
        return (
            <div>
                <Card>
                    {/* 地图 */}
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode == 1 ? '服务区' : '停车区'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行车轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance ? orderInfo.distance / 1000 + "Km" : ""}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}
