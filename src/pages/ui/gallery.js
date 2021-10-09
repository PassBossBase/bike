import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';


class Gallerys extends Component {
    render() {

        const imgs = [
            ['1.png','2.png','3.png','4.png'],
            ['5.png','6.png','7.png','8.png'],
            ['9.png','10.png','11.png','12.png'],
            ['13.png','14.png','15.png','16.png'],
            ['17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png'],
        ]

        const listpir = imgs.map(list=>list.map(item=>{
            {
                return  <Card 
                        style={{marginBottom:10}}
                        cover={<img src={'/gallery/'+item} />}
                        > Beautiful </Card>
            }
        }))
        return (
            <div>
                <Row gutter={10}>
                    <Col md={4}>
                    {
                        listpir[0]
                    }
                    </Col>
                    <Col md={4}>
                    {
                        listpir[1]
                    }
                    </Col><Col md={4}>
                    {
                        listpir[2]
                    }
                    </Col><Col md={4}>
                    {
                        listpir[3]
                    }
                    </Col><Col md={4}>
                    {
                        listpir[4]
                    }
                    </Col><Col md={4}>
                    {
                        listpir[5]
                    }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Gallerys;