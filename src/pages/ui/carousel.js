import React, { Component } from 'react';
import { Carousel, Card } from 'antd';
class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title='基础走马灯' className="wrap-card">
                    <Carousel autoplay>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title='图片走马灯' className="wrap-card">
                    <Carousel autoplay>
                        <div>
                            <h3><img src='carousel/走马1.jpg' alt="" /></h3>
                        </div>
                        <div>
                            <h3><img src='carousel/走马2.jpg' alt="" /></h3>
                        </div>
                        <div>
                            <h3><img src='carousel/走马3.jpg' alt="" /></h3>
                        </div>
                        <div>
                            <h3><img src='carousel/走马4.jpg' alt="" /></h3>
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

export default Carousels;