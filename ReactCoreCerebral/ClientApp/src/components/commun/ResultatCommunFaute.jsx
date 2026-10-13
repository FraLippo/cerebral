import React, { Component } from 'react';
import SousMenu from '../../components/principal/SousMenu';
import { LienMenuPrincipal } from '../../components/commun/SuiteJeux';
import { Row, Col,  Statistic } from 'antd';
import {Link} from 'react-router-dom';
import Ad from '../../components/commun/adSense';
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
                this.chemin = '/' + "jeuxesp" + '/';
                break;
            case 'suite':
                this.chemin = '/' + "jeuxsuite" + '/';
                break;
                case 'math':
                    this.chemin = '/' + "calcul" + '/';
                    break;
            default:
                return;
        }
    }

    componentDidMount() {

        let url = new URL(import.meta.env.VITE_URL_JEUXESP);
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
                alert("Désolé, il y a eu un problème, nous essayons de le résoudre.");
            });;
    }

    messageFelicitation() {
        if (this.state.nombreJoueurs > 12) {
            if ((this.state.classement === 1))
            {
                return <p><b>{"Fantastique ! Tu es le meilleur, le numéro 1."} </b></p>;
            }
            else if (this.state.classement <= 3) {
                return <p><b>{"Bravo ! Tu es parmi les trois meilleurs !"} </b></p>;
            }
            else if ((this.state.classement <= 10)) {
                return <p><b>{"Excellent ! Tu es dans les 10 premiers ! "} </b></p>;
            }
        }

    }
    messageAnalyse()
    {
        if (parseInt(this.props.nbFautes) > parseFloat(this.state.nombreFautesMoyen))
        {
            return <p>{"Tu as fait plus de fautes que la moyenne des joueurs."}</p>
        }
        else
        {
            return <p>{"C'est très bien, tu as fait moins de fautes que la moyenne des joueurs."}</p>
        }
    }

   
 


    render() {
     
        return (<div>{this.state.afficheResultat && <Row type="flex" justify="center"><Col xs={{ span: 20 }} md={{ span: 12 }} lg={{ span: 8 }}><div>
            <h1>{"Votre nombre de fautes : "}<span className="lettreRouge">{this.props.nbFautes}</span></h1>
            <div className="centre"> <Statistic title={"Classement"} value={this.state.classement} suffix={'/ ' + this.state.nombreJoueurs} /></div>
            {this.messageFelicitation()}
            <ul>
                <li>{"Nombre de fautes moyen : "} {this.state.nombreFautesMoyen}</li>
                <li>{"Nombre de sans-fautes : "} {this.state.sansFaute}</li>
            </ul>
            {this.messageAnalyse()}
     
           <div className="espaceHaut"><SousMenu type={this.props.type}  titre="Jeux de la même catégorie" supprimer={this.props.idTest}></SousMenu></div>
        </div>
        <Ad></Ad>
            <LienMenuPrincipal></LienMenuPrincipal>
        </Col></Row>
        }


        </div>);
    }
}

export default withRouter(Resultat);
