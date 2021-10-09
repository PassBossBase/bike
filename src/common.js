import React from 'react';
import { Col, Row } from 'antd';
import Header from './components/Header';

import './style/common.less';
export default class Common extends React.Component {

    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Col span={24}>
                        <Header menuType='second' />
                    </Col>
                </Row>
                <Row className='content'>
                    <Col span={22} style={{ margin:'0 auto' }}>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
}