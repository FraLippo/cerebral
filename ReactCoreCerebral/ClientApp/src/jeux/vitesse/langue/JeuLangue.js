import React, { Component } from 'react';
import Case from './Case';
import formulePolitesse from './data';

export default class JeuLangue extends Component {

    constructor(props) {
        super(props);
        let tabLangue = ["anglais", "espagnol", "allemand", "italien", "portugais", "russe", "chinois", "japonais", "arabe"];
        let tabPolitesse = ["bonjour", "merci", "s'il vous plaît", "au revoir", "excusez-moi"];
        tabLangue = tabLangue.map((langue, i) => { return { id: i, langue: langue, etat: 'initial' } });
        tabPolitesse = tabPolitesse.map((politesse, i) => { return { id: i +100, formule: politesse, etat: 'initial' } });
        this.nbSelection = 0;
        this.state = {
            tabLangue,
            tabPolitesse,
            question : this.choixQuestion()
        }
    }

choixQuestion()   {
    let noLangue = Math.floor(Math.random() * 9);
    let noPolitesse = Math.floor(Math.random() * 5);

    let question = formulePolitesse[noLangue].langue[noPolitesse];
    return question;;
}   


    clic = (no) => {  
        let tabLangue = [...this.state.tabLangue]; 
        let tabPolitesse = [...this.state.tabPolitesse]; 
        let selLangue = false;
        let selPolitesse = false;
            if (no >= 100) {
                /* politesse */
                let elementNo = tabPolitesse.findIndex((politesse) => politesse.etat === 'selection');
                if (elementNo !== -1 && elementNo !== no-100 )
                    { 
                        tabPolitesse[elementNo].etat = 'initial';
                    }

                tabPolitesse[no-100].etat = tabPolitesse[no-100].etat == 'selection' ? 'initial' : 'selection';
                if (tabPolitesse[no-100].etat === 'selection') selPolitesse = true;
                else selPolitesse = false;
            }else
            {
                /* langue */
                let elementNo = tabLangue.findIndex((langue) => langue.etat === 'selection');
                if (elementNo !== -1 && elementNo !== no ) tabLangue[elementNo].etat = 'initial';
                tabLangue[no].etat  = tabLangue[no].etat == 'selection' ? 'initial' : 'selection';
                if (tabLangue[no].etat === 'selection') selLangue = true;
                else selLangue= false;
            }

            if (selLangue && selPolitesse)
            {
                alert('bravo');
            }

            this.setState({tabLangue: tabLangue, tabPolitesse: tabPolitesse});

    }

    render() {
        return <div>
            <div className='centre grandeTaille'>{this.state.question.formule}</div>
            <Case tabLangue={this.state.tabLangue} tabPolitesse={this.state.tabPolitesse} clic={this.clic}></Case>
        </div>
    }
}