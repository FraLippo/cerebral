import React, { Component } from 'react';
import { Row,Col } from 'antd';



export default class Choix extends Component {

    clicChoix = (event) => {
        const id = parseInt(event.target.id);
        this.props.clicChoix(id)
}


    render() {
        return <Row type="flex" justify="center" gutter={[16, 16]} className="fontMoyenne">{this.props.tabChoix.map((choix,i)=> <Col xs={3} sm={2} md={2} lg={1} key={i} > <div className="bordLettre pointeurMath"  id={i}  onClick={this.clicChoix}>{choix}</div></Col>)}</Row>
    }
}
