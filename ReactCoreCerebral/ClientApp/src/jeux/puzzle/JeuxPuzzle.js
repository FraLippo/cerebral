import React, { Component } from 'react';
import Piece from './Piece';
import PiecePuzzle from './PiecePuzzle';
import ImagePresentation from './ImagePresentation';
import LogiquePuzzle from './LogiquePuzzle';
import ResultatCommun from '../../components/commun/ResultatCommun';
import { withRouter, Redirect } from 'react-router-dom';
import { addGame } from '../../components/commun/localStorage';
import CompteRebours from '../../components/commun/CompteRebours';
import FinEtape from '../concours/FinEtape';
import { message, Button } from 'antd';

import '../../style/jeux.css';
import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';

class JeuxPuzzle extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(this.props.match.params.id);
        this.stop = false;
        this.logiquePuzzle = new LogiquePuzzle(this.id);
        if (isNaN(this.id) || this.logiquePuzzle.donnees === undefined) {
            this.stop = true;
        }
        else {
            let tabPieces = [];
            let tabPuzzle = [];
            let i = 1;
            this.clickEnCours = {
                piece: 0,
                puzzle: 0,
                nom: ""
            }
            this.dureeJeu = Date.now();
            this.temps =  this.logiquePuzzle.obtenirTemps();
            this.explication = this.logiquePuzzle.obtenirExplication();
            for (const info of this.logiquePuzzle.obtenirInfo()) {

                tabPieces.push({ nom: info, placePiece: i, bordure: '' });
                tabPuzzle.push({ nom: "", placePuzzle: i, bordure: '' });
                i++;
            }
            this.grandeImage = this.logiquePuzzle.obtenirImagePresentation();
            this.state = {
                tabPieces,
                tabPuzzle,
                afficheGrandeImage: true,
                afficheResultat: false,
                afficheRebours : true
            }
            this.finEnCours = false;
            this.nbPieces = this.logiquePuzzle.obtenirInfo().length;
            this.perdu = false;
   
            addGame('jeuxPuzzle', this.id);
        }
    }

    clickPuzzle = (id) => {
        if (this.finEnCours) return;
        if (this.clickEnCours.puzzle !== id) this.miseAJourBordure(id, [...this.state.tabPuzzle], 'puzzle');
        this.clickEnCours.puzzle = id;

        //cas du click pour revenir en arriere
        if (this.state.tabPuzzle[id - 1].nom !== "") {
            this.clickEnCours.nom = this.state.tabPuzzle[id - 1].nom;
            this.clickEnCours.puzzle = id;
            this.clickEnCours.piece = this.logiquePuzzle.obtenirInfo().indexOf(this.clickEnCours.nom) + 1;
            this.miseAJour();
        }

        if (this.clickEnCours.piece !== 0) {
            this.miseAJour();
        }
    }

    clickPiece = (id) => {
        if (this.finEnCours) return;
        if (this.state.tabPieces[id - 1].nom !== "") {
            this.miseAJourBordure(id, [...this.state.tabPieces], 'piece');
            //Suppression de la selection si on clique sur une piece deja selectionnée
            if (this.clickEnCours.piece === id) {
                this.clickEnCours.piece = 0;
                this.clickEnCours.nom = '';
            }
            else {
                this.clickEnCours.piece = id;
                this.clickEnCours.nom = this.state.tabPieces[id - 1].nom;
            }
            if (this.clickEnCours.puzzle !== 0) {
                this.miseAJour();
            }
        }
    }
    miseAJourBordure = (id, bordures, type) => {

        for (let index = 0; index < bordures.length; index++) {
            const element = bordures[index];

            if (index === id - 1 && element.bordure === '') {

                element.bordure = ' borderPiece';
            }
            else {
                element.bordure = '';
            }
        }
        if (type === 'piece') {
            this.setState({
                tabPieces: bordures,
            });
        } else {
            this.setState({
                tabPuzzle: bordures,
            });
        }
    }
    miseAJour() {
        let pieces = [...this.state.tabPieces];
        let puzzle = [...this.state.tabPuzzle];

        if (this.state.tabPieces[this.clickEnCours.piece - 1].nom !== '') {
            puzzle[this.clickEnCours.puzzle - 1].nom = this.clickEnCours.nom;
            pieces[this.clickEnCours.piece - 1].nom = '';
        }
        else {
            pieces[this.clickEnCours.piece - 1].nom = this.clickEnCours.nom;
            puzzle[this.clickEnCours.puzzle - 1].nom = '';

        }
        //reset border
        pieces.map(x => x.bordure = '');
        puzzle.map(y => y.bordure = '')
        this.setState({
            tabPieces: pieces,
            tabPuzzle: puzzle
        })
        this.clickEnCours = {
            piece: 0,
            puzzle: 0,
            nom: ""
        }
        if (this.estFinPuzzle(puzzle)) {
            if (this.verifierResultat(puzzle)) {
                this.setState({ afficheRebours : false });
                message.success(intl.get('BRAVO'), 1.2, this.afficheResultat);
                this.dureeJeu = Date.now() - this.dureeJeu - 5;
                this.finEnCours = true;

            }
            else {
                message.error(intl.get('PUZZLE_ERREUR'), 1.2);
            }
        }
    }
    afficheResultat = () => {
        this.setState({ afficheResultat: true })
    }

    estFinPuzzle = (puzzle) => {
        return puzzle.filter(x => x.nom !== '').length === this.logiquePuzzle.obtenirInfoResultat().length;
    }

    verifierResultat = (puzzle) => {
        const tabResult = this.logiquePuzzle.obtenirInfoResultat();
        for (let index = 0; index < puzzle.length; index++) {
            if (puzzle[index].nom !== tabResult[index]) {
                return false;
            }
        }
        return true;
    }

    clickBouton = () => {
        this.setState({ afficheGrandeImage: true });
    }
    finTimer = () => {
        this.setState({ afficheGrandeImage: false });
    }

    finJeu = () => {
        this.dureeJeu = this.logiquePuzzle.obtenirTemps();
        this.perdu = true;
        this.setState({ afficheResultat: true });
    }

    render() {
        if (this.stop) return (<Redirect to={intl.get('LIEN_HOME')}></Redirect>);

        return <div>
            <Helmet>
                <title>{intl.get('PUZZLE_TITLE')}</title>
                <meta name="description" content={intl.get('PUZZLE_META')} />
                <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxPuzzle/${this.id}`} />
                <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-puzzle/${this.id}`} />


            </Helmet>
            {this.state.afficheResultat ?
                           this.logiquePuzzle.concours ? <FinEtape donneesJeu={this.logiquePuzzle.donnees} perdu={this.perdu}></FinEtape> :<ResultatCommun type='puzzle' perdu={this.perdu} prochainJeu={this.logiquePuzzle.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={this.temps}></ResultatCommun> :
               <div>{this.state.afficheGrandeImage ? <div><ImagePresentation finTimer={this.finTimer} grandeImage={this.grandeImage}></ImagePresentation>
                    <div className="espaceHaut lienFinal centre">{`${intl.get('PUZZLE')} ${intl.get(this.explication)}`}</div></div>
                    : <div className="espaceHaut"><div className="gridMainPuzzle">
                        <div className={'gridPuzzle' + this.nbPieces}>{this.state.tabPuzzle.map((info, i) => <PiecePuzzle key={info.placePuzzle} bordure={info.bordure} clickPuzzle={this.clickPuzzle} placePuzzle={info.placePuzzle} nom={info.nom}></PiecePuzzle>)}</div>
                        <div className={'gridPiece' + this.nbPieces}>{this.state.tabPieces.map((info, i) => <Piece bordure={info.bordure} key={info.placePiece} placePiece={info.placePiece} clickPiece={this.clickPiece} nom={info.nom}></Piece>)}</div>
                    </div><div className="espaceHaut lienFinal centre">{`${intl.get('PUZZLE')} ${intl.get(this.explication)}`}</div><div className="centre"><Button className="espaceHaut" type="primary" onClick={this.clickBouton}>{intl.get('PUZZLE_BOUTON')}</Button>
                   </div> </div>}<div className={"centre " + (this.state.afficheGrandeImage ? "hideCount" : "showCount")}>   {this.state.afficheRebours && <CompteRebours temps={this.temps} finTimer={this.finJeu}></CompteRebours>}</div></div>}</div>

    }
}
export default withRouter(JeuxPuzzle);