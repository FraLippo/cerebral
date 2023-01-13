import React, { Component } from 'react';
import SousMenu from '../../components/principal/SousMenu';
import { LienMenuPrincipal } from '../../components/commun/SuiteJeux';
import { Row, Col,  Statistic } from 'antd';
import {Link} from 'react-router-dom';
import Ad from '../../components/commun/adSense';
import intl from 'react-intl-universal';
import withRouter from './withRouter';

class Resultat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classement: 0,
            nombreFautesMoyen: 0,
            sansFaute: 0,
            nombreJoueurs: 0,
            afficheResultat: false
        };
        this.chemin ="";
        this.initChemin();
    }


    initChemin()
    {
        switch (this.props.type) {
            case 'esp':
                this.chemin = '/' + intl.get('NOM_ESP') + '/';
                break;
            case 'suite':
                this.chemin = '/' + intl.get('NOM_SUITE') + '/';
                break;
                case 'math':
                    this.chemin = '/' + intl.get('NOM_MATH') + '/';
                    break;
            default:
                return;
        }
    }

    componentDidMount() {

        let url = new URL(process.env.REACT_APP_URL_JEUXESP);
        var data = new FormData();
        data.append('idTest', this.props.idTest);
        data.append('nbFautes', this.props.nbFautes);
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    classement: res.classement,
                    nombreFautesMoyen: res.nombreFautesMoyen,
                    sansFaute: res.sansFaute,
                    nombreJoueurs: res.nombreJoueurs,
                    afficheResultat: true
                });
            }
            ).catch(function (error) {
                alert(intl.get('ERREUR_RESEAU'));
            });;
    }

    messageFelicitation() {
        if (this.state.nombreJoueurs > 12) {
            if ((this.state.classement === 1))
            {
                return <p><b>{intl.get('CLASSEMENT_1')} </b></p>;
            }
            else if (this.state.classement <= 3) {
                return <p><b>{intl.get('CLASSEMENT_3')} </b></p>;
            }
            else if ((this.state.classement <= 10)) {
                return <p><b>{intl.get('CLASSEMENT_10')} </b></p>;
            }
        }

    }
    messageAnalyse()
    {
        if (parseInt(this.props.nbFautes) > parseFloat(this.state.nombreFautesMoyen))
        {
            return <p>{intl.get('ESP_MSG_FAUTE1')}</p>
        }
        else
        {
            return <p>{intl.get('ESP_MSG_FAUTE2')}</p>
        }
    }

   
 


    render() {
     
        return (<div>{this.state.afficheResultat && <Row type="flex" justify="center"><Col xs={{ span: 20 }} md={{ span: 12 }} lg={{ span: 8 }}><div>
            <h1>{intl.get('ESP_NOMBREFAUTES')}<span className="lettreRouge">{this.props.nbFautes}</span></h1>
            <div className="centre"> <Statistic title={intl.get('CLASSEMENT')} value={this.state.classement} suffix={'/ ' + this.state.nombreJoueurs} /></div>
            {this.messageFelicitation()}
            <ul>
                <li>{intl.get('ESP_FAUTEMOYEN')} {this.state.nombreFautesMoyen}</li>
                <li>{intl.get('ESP_SANSFAUTE')} {this.state.sansFaute}</li>
            </ul>
            {this.messageAnalyse()}
     
           <div className="espaceHaut"><SousMenu type={this.props.type}  titre='TITRE_CATEGORIE' supprimer={this.props.idTest}></SousMenu></div>
        </div>
        <Ad></Ad>
            <LienMenuPrincipal></LienMenuPrincipal>
        </Col></Row>
        }


        </div>);
    }
}

export default withRouter(Resultat);

