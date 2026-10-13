import React, { Component } from 'react';
import withRouter from './withRouter';
import { Row, Col, Card, Avatar } from 'antd';
import borderHonneur from '../../images/borderHonneur.png';
import laurier from '../../images/laurier.png';

const { Meta } = Card;
class Tableau extends Component {

  constructor(props) {
    super(props);
    this.state = { resultats: [] }
  }



  componentDidMount() {

    let url = new URL(import.meta.env.VITE_URL_QUIZLIRETABLEAU);
    var data = new FormData();
    fetch(url, {
      method: "POST",
      body: data
    }).then(res => res.json())
      .then(res => {
        this.setState({ resultats: res });
      }
      );


  }
  render() {
    return <div className="espaceHaut" >
      <div className="centre espaceTitreBas">
      
      <h1>{"Le tableau d'honneur"}</h1>
      <p>{"Bravo à eux, ils ont réussi un défi à leur premiere tentative."}</p>
            <div className="centre espaceTitreBas"><img src={borderHonneur} alt="bordure" width="100" height="32" ></img></div>
  </div>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {this.state.resultats.map((info, i) => <Col key={i} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}  xl={{ span: 6 }}><Card className="hauteurCarte">
          <Meta
            avatar={<Avatar src={laurier} alt="laurier de la victoire" />}
            title={<span className="couleurHonneur">{info.prenom.includes('@') ? info.prenom.split('@')[0].slice(0, 15)  : info.prenom.slice(0, 15)}</span>}
          />
          <p>{"0 faute"} </p>
          <p>{info.titre}</p>
          <p>{info.date}</p>
        </Card> </Col>)}
      </Row>
    </div>
  }
}

export default withRouter(Tableau);
