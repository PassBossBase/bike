import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Utils from '../../utils'
import axios from 'axios'
import { Avatar } from 'antd'
import { connect } from 'react-redux'

class Header extends Component {

    state = {
        userName: '',
    }


    componentDidMount() {
        this.setState({
            userName: '汤姆',
        })
        setInterval(() => {
            let sysTime = Utils.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherApi()
    }

    getWeatherApi = () => {
        axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=秦皇岛&key=10b98e4d564950ea5fefac5e87eb75f8')
            .then(res => {
                let data = res.data.lives[0];    //获取返回的数据
                let province = data.province;    //获取省
                let city = data.city;            //获取城市
                let weather = data.weather;      //获取天气
                this.setState({
                    province, city, weather      //存入数据
                })
            })
    }

    render() {
        const menuType = this.props.menuType
        let { userName, sysTime, province, city, weather } = this.state;

        return (
            <div className='header'>
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span={6} className='logo' >
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>IMooc 通用管理系统</span>
                            </Col>
                            : ''
                    }
                    <Col span={menuType ? 18 : 24} className="header-top">
                        <span>
                            欢迎、
                            {userName}
                        </span>
                        <Avatar size="large" icon="user" src="assets/tom.jpg" />
                        <a href="">退出</a>
                    </Col>

                </Row>
                {
                    menuType ? "" :

                        <Row className="breadcrumb">
                            <Col span={4} className='breadcrumb-title'>
                                {this.props.menuName}
                            </Col>
                            <Col span={20} className="dateweather" >
                                <span className="date">{sysTime}</span>
                                <span className="weather">
                                    {province + " " + city + " " + weather}
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        menuName: state.menuName
    }
}


export default connect(mapStateToProps)(Header)