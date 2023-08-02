import React, { Component } from 'react';
import LogiqueEsp from './LogiqueEsp';
import withRouter from '../../components/commun/withRouter';
import ListeCarte from './ListeCarte';
import CompteRebours from './CompteRebours';
import FinEtape from '../concours/FinEtape';
import ResultatCommunFaute from '../../components/commun/ResultatCommunFaute';
import { addGame } from '../../components/commun/localStorage';
import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';




class JeuEsp extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(this.props.params.id);
        this.LogiqueEsp = new LogiqueEsp(this.id);
       
            this.state = ({
                tabCarte: [],
                affichageCarte: true,
                messageCarte: "",
                affichageJeu: true
            })
            this.cartes = this.LogiqueEsp.cartes;
            this.nbFautes = 0;

            addGame('jeuxesp', this.id);

        
    }



    clickCarte = (event) => {
        const id = parseInt(event.target.id);
        if (isNaN(id)) {
            alert("Error");
            return;
        }

        let nouveauTabCarte = [...this.state.tabCarte];
        nouveauTabCarte.push(id);
        this.setState({ tabCarte: nouveauTabCarte });
        let reponse = intl.get('ESP_OUI');
        if (this.cartes[nouveauTabCarte.length - 1] !== id) {
            reponse = intl.get('ESP_NON');
            this.nbFautes++;
        }
        this.setState({
            messageCarte: reponse
        })



        if (this.cartes.length === nouveauTabCarte.length) {
            this.setState({
                affichageJeu: false
            })
        }

    }

    affichageCarte = () => {
        this.setState({
            affichageCarte: false
        })
    }
    render() {
            return <div>
                <Helmet>
                    <title>{intl.get('ESP_TITLE')}(</title>
                    <meta name="description" content={intl.get('ESP_META')} />
                    <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxesp/${this.id}`} />
                    <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-cards/${this.id}`} />
                </Helmet>
                {this.state.affichageCarte ? <div className="espaceJeu espaceHaut">
                    <CompteRebours affichageCarte={this.affichageCarte} temps={this.LogiqueEsp.temps}></CompteRebours>
                    <ListeCarte cartes={this.cartes}></ListeCarte>
                </div> : <div>
                        <div className="espaceJeu"><div className="centreBloc espaceHaut">{this.state.tabCarte.map((carte, i) => <img key={i} src={LogiqueEsp.construireCarte(carte)} alt="carte" className="carteEsp" />)}</div>
                            <div className="resultatEsp centre grandeLettre" style={{ color: this.state.messageCarte === intl.get('ESP_OUI') ? "green" : "red" }}>{this.state.messageCarte}</div></div>
                        {this.state.affichageJeu ? <div><div className="centre grandeLettre">{intl.get('ESP_EXPLICATION')}</div><div className="centreGrille"><div className="gridJoueur espaceHaut">
                            <img className="col1" id="1" src={LogiqueEsp.construireCarte(1)} alt="esp1" onClick={this.clickCarte} />
                            <img className="col2" id="2" src={LogiqueEsp.construireCarte(2)} alt="esp2" onClick={this.clickCarte} />
                            <img className="col3" id="3" src={LogiqueEsp.construireCarte(3)} alt="esp3" onClick={this.clickCarte} />
                            <img className="col4" id="4" src={LogiqueEsp.construireCarte(4)} alt="esp4" onClick={this.clickCarte} />
                            <img className="col5" id="5" src={LogiqueEsp.construireCarte(5)} alt="esp5" onClick={this.clickCarte} />
                        </div>
                        </div></div> : this.LogiqueEsp.concours ? <FinEtape donneesJeu={this.LogiqueEsp.donnees} nbFautes={this.nbFautes}></FinEtape> : <ResultatCommunFaute prochainJeu={this.LogiqueEsp.obtenirProchainJeu()} type='esp' idTest={this.id} nbFautes={this.nbFautes}></ResultatCommunFaute>}
                    </div>
                }
            </div>
        
    }
}

export default withRouter(JeuEsp);