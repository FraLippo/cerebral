import React, { Component } from 'react';
import Case from './Case';
import formulePolitesse from './data';
import { message } from 'antd';
import Audio from './Audio';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';

export default class JeuLangue extends Component {

    constructor(props) {
        super(props);
        this.noLangue = 0;
        this.selLangue = false;
        this.selPolitesse = false;
        this.noQuestion = 0;

        this.tabLangueDepart = ["anglais", "espagnol", "allemand", "italien", "portugais", "russe", "chinois", "japonais", "arabe"];
        this.tabPolitesseDepart = ["bonjour", "merci", "s'il vous plaît", "au revoir", "excusez-moi"];
        this.tabAleatoire = this.tirageAleatoire(11);
        this.score = 0;
        this.fin = false;
        this.state = {
            tabLangue: [],
            tabPolitesse: [],
            question: '',
            no: 0,
            animation: 'depart',
            tabReponses: []
        }
    }

    tirageAleatoire = (max) => {
        let i = 0;
        let tabNbAleatoire = [];
        while (i < max) {
            let nbL = Math.floor(Math.random() * this.tabLangueDepart.length);
            let nbP = Math.floor(Math.random() * this.tabPolitesseDepart.length);
            let nb = nbL * 10 + nbP;
            if (tabNbAleatoire.indexOf(nb) === -1) {
                tabNbAleatoire.push(nb);
                i++;
            }

        }
        console.log(tabNbAleatoire);
        return tabNbAleatoire;
    }

    creerTableaux() {
        let tabLangue = this.tabLangueDepart.map((langue, i) => { return { id: i, langue: langue, etat: 'initial' } });
        let tabPolitesse = this.tabPolitesseDepart.map((politesse, i) => { return { id: i + 100, formule: politesse, etat: 'initial' } });
        return { tabLangue, tabPolitesse };
    }

    componentDidMount() {
        this.nouvelleQuestion();
    }

    choixQuestion() {
        this.noLangue = Math.floor(this.tabAleatoire[this.noQuestion] / 10);
        let noPolitesse = this.tabAleatoire[this.noQuestion] % 10;

        let question = formulePolitesse[this.noLangue].langue[noPolitesse];
        return { question, no: this.tabAleatoire[this.noQuestion] };
    }


    nouvelleQuestion = () => {
        console.log(this.noQuestion);
        if (this.noQuestion === 10) {
            if (this.score === 70) {
                message.success('Bravo ! bonus de 30 points', 2);
                this.score += 30;
            }
            this.setState({ afficheResultat: true });
        }

        let { tabLangue, tabPolitesse } = this.creerTableaux();
        this.selLangue = false;
        this.selPolitesse = false;
        let question = this.choixQuestion();
        this.fin = false;
        this.setState({ tabLangue, tabPolitesse, question: question.question, no: question.no }, () => { this.setState({ animation: 'depart' }) })
        this.noQuestion++;
    }

    finTimer = () => {
        this.setState({ afficheResultat: true });
    }


    clic = (no) => {
        if (this.fin) return;
        let tabLangue = [...this.state.tabLangue];
        let tabPolitesse = [...this.state.tabPolitesse];

        if (no >= 100) {
            /* politesse */
            let elementNo = tabPolitesse.findIndex((politesse) => politesse.etat === 'selection');
            if (elementNo !== -1 && elementNo !== no - 100) {
                tabPolitesse[elementNo].etat = 'initial';
            }

            tabPolitesse[no - 100].etat = tabPolitesse[no - 100].etat == 'selection' ? 'initial' : 'selection';
            if (tabPolitesse[no - 100].etat === 'selection') this.selPolitesse = true;
            else this.selPolitesse = false;
        } else {
            /* langue */
            let elementNo = tabLangue.findIndex((langue) => langue.etat === 'selection');
            if (elementNo !== -1 && elementNo !== no) tabLangue[elementNo].etat = 'initial';
            tabLangue[no].etat = tabLangue[no].etat == 'selection' ? 'initial' : 'selection';
            if (tabLangue[no].etat === 'selection') this.selLangue = true;
            else this.selLangue = false;
        }

        if (this.selLangue && this.selPolitesse) {
            let noPolitesse = tabPolitesse.findIndex((politesse) => politesse.etat === 'selection');
            let noLangue = tabLangue.findIndex((langue) => langue.etat === 'selection');
            this.fin = true;
            let reponse = { langue: this.tabLangueDepart[this.noLangue], politesse: this.state.question.reponse, formule: this.state.question.formule };
           if (noLangue === this.noLangue && tabPolitesse[noPolitesse].formule === this.state.question.reponse) {
                message.success('Bonne réponse', 2, this.nouvelleQuestion);
                this.score += 9;
                reponse = { ...reponse, resultat: '👌' };
            }
           else {
              message.error('Dommage', 3, this.nouvelleQuestion);
               if (score >= 3) this.score -= 3;
               reponse = { ...reponse, resultat: '❌' };
           }

           this.setState({ animation: 'fin', tabReponses: [...this.state.tabReponses, reponse] });

     }
       else {
            this.setState({ tabLangue: tabLangue, tabPolitesse: tabPolitesse });
        }

    }

    render() {
        return <div>
            {this.state.afficheResultat ? <Resultat score={this.score} typeExo='vitesselangue'></Resultat> :
                <React.Fragment>
                    <div className="questionLangue">
                        <div className={this.state.animation === 'depart' ? 'departLangue' : 'finLangue'}>
                            {this.state.no >= 40 ? <Audio numero={this.state.no}></Audio> : this.state.question.formule}
                        </div></div>
                    <Case tabLangue={this.state.tabLangue} tabPolitesse={this.state.tabPolitesse} clic={this.clic}></Case>
                    <table className="tableauLangue">
                        <thead>
                            <tr>
                            <th>No</th>
                                <th>Langue</th>
                                <th>Formule de politesse</th>
                                <th>Expression</th>
                                <th>Résultat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tabReponses.map((reponse, i) =>
                                <tr key={i + 10000}>
                                    <td>{i + 1}</td>
                                    <td>{reponse.langue}</td>
                                    <td>{reponse.politesse}</td>
                                    <td>{reponse.formule}</td>
                                    <td>{reponse.resultat}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="centre"> <CompteRebours temps={70} finTimer={this.finTimer}></CompteRebours></div>
                </React.Fragment>}
        </div>
    }
}