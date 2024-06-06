import React, { Component } from 'react';
import withRouter from './withRouter';
import { Row, Col, Card, Avatar } from 'antd';
import borderHonneur from '../../images/borderHonneur.png';
import laurier from '../../images/laurier.png';


const { Meta } = Card;
class TableauMot extends Component {

  constructor(props) {
    super(props);
    this.state = { resultats: [] }
  }



  componentDidMount() {

    let url = new URL(process.env.REACT_APP_URL_QUIZLIRETABLEAUMOT);
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
      
      <h1>Les meilleurs au jeu du Mot le plus long</h1>
      <p>Les 8 derniers a avoir gagné une partie de niveau supérieur à 5. Le niveau va de 0 (débutant) à 21 (expert).</p>
            <div className="centre espaceTitreBas"><img src={borderHonneur} alt="bordure" width="100" height="41" ></img></div>
  </div>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {this.state.resultats.map((info, i) => <Col key={i} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}  xl={{ span: 6 }}><Card className="hauteurCarte2">
          <Meta
            avatar={<Avatar src={laurier} alt="laurier de la victoire" />}
            title={<span className="couleurHonneur">{info.prenom.includes('@') ? info.prenom.split('@')[0].slice(0, 15)  : info.prenom.slice(0, 15)}</span>}
          />
        
          <p>Niveau {info.niveau}</p>
          <p>{info.date}</p>
        </Card> </Col>)}
      </Row>
    </div>
  }
}

export default withRouter(TableauMot);
