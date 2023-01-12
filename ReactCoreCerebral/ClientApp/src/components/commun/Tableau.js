import React, { Component } from 'react';
import withRouter from './withRouter';
import { Row, Col, Card, Avatar } from 'antd';
import borderHonneur from '../../images/borderHonneur.png';
import laurier from '../../images/laurier.png';
import intl from 'react-intl-universal';

const { Meta } = Card;
class Tableau extends Component {

  constructor(props) {
    super(props);
    this.state = { resultats: [] }
  }



  componentDidMount() {

    let url = new URL(process.env.REACT_APP_URL_QUIZLIRETABLEAU);
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
      
      <h1>{intl.get('TABLEAU_TITRE')}</h1>
      <p>{intl.get('TABLEAU_MSG')}</p>
            <div className="centre espaceTitreBas"><img src={borderHonneur} alt="bordure" width="100" height="41" ></img></div>
  </div>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {this.state.resultats.map((info, i) => <Col key={i} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}  xl={{ span: 6 }}><Card className="hauteurCarte">
          <Meta
            avatar={<Avatar src={laurier} alt="laurier de la victoire" />}
            title={<span className="couleurHonneur">{info.prenom.length > 15 ? info.prenom.slice(0, 15) : info.prenom}</span>}
          />
          <p>{intl.get('TABLEAU_FAUTE')} </p>
          <p>{info.titre}</p>
          <p>{info.date}</p>
        </Card> </Col>)}
      </Row>
    </div>
  }
}

export default withRouter(Tableau);
