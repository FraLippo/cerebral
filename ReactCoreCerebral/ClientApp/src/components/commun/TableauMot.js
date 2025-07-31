import React, { Component } from 'react';
import withRouter from './withRouter';
import { Row, Col, Card, Avatar, Table } from 'antd';
import borderHonneur from '../../images/borderHonneur.png';
import laurier from '../../images/laurier.png';


const { Meta } = Card;
class TableauMot extends Component {

  constructor(props) {
    super(props);
    this.state = { resultats: [],
      classement : []
     }
      this.columns = [
            {
                title: 'Rang',
                dataIndex: 'cle',
                key: 'cle',

            },
            {
                title: 'Prénom',
                dataIndex: 'prenom',
                key: 'prenom',
                render: (prenom) => {
                    return <span>{prenom.includes('@') ? prenom.split('@')[0] : prenom}</span>;
                }

            },
            {
                title: 'Score',
                dataIndex: 'score',
                key: 'score',
            }

        ]


    
  }

  nomNiveau(niveau) 
  {
    if (niveau < 5) {
      return <span>Débutant</span>;
  } else if (niveau < 8) {
      return <span>Avancé</span>
  }
  else if (niveau < 12) {
      return <span>Confirmé</span>
  }
  else if (niveau < 15) {
      return <span>Expert</span>
  }
  else if (niveau < 19) {
    return <span>Champion</span>
}
  else {
      return <span>Légende &#127942;</span>
  }
  }

  componentDidMount() {

    let url = new URL(process.env.REACT_APP_URL_QUIZLIRETABLEAUMOT);
    var data = new FormData();
    fetch(url, {
      method: "POST",
      body: data
    }).then(res => res.json())
      .then(res => {
        this.setState({ resultats: res.honneur,
          classement : res.classement
         });
      }
      );


  }
  render() {
    return <div className="espaceHaut" >
      <div className="espaceTitreBas">
      <h2>Le classement du mois</h2>
<p>Le classement commence à partir du 1er du mois et se termine à la fin du mois. Toutes les parties présentes sur le tableau d'honneur sont comptabilisées. Plus le niveau est difficile, plus vous marquez de points. Le compteur est remis à 0 en début de mois. Le classement affiche les 20 meilleurs.</p>
    <p>Les précédents gagnants : <span className='badgeV'>mivanche x1</span> (aussi 4e à notre jeu du scrabble solitaire)</p>
                   <Row justify="center">
                        <Col xs={24} sm={24} md={16}><Table pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.classement} rowKey='cle' />
                        </Col></Row>
      <h1>Les meilleurs au jeu du Mot le plus long</h1>
      <p>Les 8 derniers à avoir gagné une partie de niveau avancé au moins.</p>
            <div className="centre espaceTitreBas"><img src={borderHonneur} alt="bordure" width="100" height="32" ></img></div>
  </div>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {this.state.resultats.map((info, i) => <Col key={i} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}  xl={{ span: 6 }}><Card className="hauteurCarte2">
          <Meta
            avatar={<Avatar src={laurier} alt="laurier de la victoire" />}
            title={<span className="couleurHonneur">{info.prenom.includes('@') ? info.prenom.split('@')[0].slice(0, 15)  : info.prenom.slice(0, 15)}</span>}
          />
        
          <p>Niveau {this.nomNiveau(info.niveau)}</p>
          <p>{info.date}</p>
        </Card> </Col>)}
      </Row>
    </div>
  }
}

export default withRouter(TableauMot);
