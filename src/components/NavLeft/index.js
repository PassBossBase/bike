import React, { Component } from 'react'
import menuList from '../../config/menuConfig'
import { Menu } from 'antd';
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
import './index.less'
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

class NavLeft extends Component {
    state = {
        menuTreeNode: '',
        currentKey: ''
    }

    //组件渲染完毕之后即可显示列表
    componentDidMount() {
        //用变量存储获取后的导航元素列表
        const menuTreeNode = this.renderMenu(menuList)

        let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
        //将数据存储
        this.setState({
            currentKey,
            menuTreeNode
        })
    }

    //递归遍历列表显示导航栏
    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title} >
                <NavLink to={item.key} >{item.title}</NavLink>
            </Menu.Item>
        })
    }
    // 
    handleClick = (item) => {
        console.log(item);
        const { dispatch } = this.props

        dispatch(switchMenu(item.item.props.title))

        this.setState({
            currentKey: item.key
        })
    }

    render() {
        return (
            <div >
                <div className="logo">
                    <img src="assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.currentKey]}
                        theme='dark'
                    >
                        {this.state.menuTreeNode}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default connect()(NavLeft)