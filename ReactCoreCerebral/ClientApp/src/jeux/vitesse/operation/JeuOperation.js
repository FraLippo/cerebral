import React, { Component } from 'react';
import withRouter from '../../../components/commun/withRouter';
import Logique from './Logique';
import Saisie from './Saisie';
import '../../../style/jeux.css';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';



class JeuOperation extends Component {

    constructor() {
        super();

        this.logique = new Logique();
        this.calcul = this.choixOperation();
     
        this.state={
            operation: this.construireOperation(),
            afficheResultat: false,
            score: 0
        }
       
    }
    choixOperation = () => {
        let operation = Math.floor(Math.random() * 4);
        let calcul = {};
        switch (operation) {
            case 0:
                calcul = this.logique.creerAdditionAleatoire();
                calcul.operation = '+';
                break;
            case 1:
                calcul = this.logique.creerSoustractionAleatoire();
                calcul.operation = '-';
                break;
            case 2:
                calcul = this.logique.creerMultiplicationAleatoire();
                calcul.operation = 'x';
                break;
            case 3:
                calcul = this.logique.creerDivisionAleatoire();
                calcul.operation = '/';
                break;
            default:
                break;
        }
        return calcul;
    }

    construireOperation = () => {
        return `${this.calcul.a} ${this.calcul.operation} ${this.calcul.b} = ?`;
        
    }



    clickNombre = (nombre) => {
        let chaineResultat = this.calcul.resultat.toString();
        let chaineNombre = nombre.toString();
        if (chaineResultat.length > chaineNombre.length) {
            return "nonfini";
        }
        else if (chaineResultat === chaineNombre) {
            this.setState({
                score: this.state.score + 2
            });
            return "gagne";
        }
        else {
            return "perdu";
        }

}

nouveauNombre=()=>{
    this.calcul = this.choixOperation();
    this.setState({
        operation: this.construireOperation()
    });
}

finTimer = () => {
    this.setState({afficheResultat : true});
}
render() {
    return<React.Fragment>
          <Helmet>
                <title>Le jeu des 4 opérations</title>
                <meta name="description" content="Un jeu de calcul mental très simple, trouver le résultat d'une opération le plus vite possible, vous devez maîtriser les 4 opérations." />
               
            </Helmet>
        
         {this.state.afficheResultat ?  <Resultat score={this.state.score} typeExo='vitesseoperation'></Resultat>  : <div>

        <div className="calculOp">{this.state.operation}</div>
        <div><Saisie nouveauNombre={this.nouveauNombre} clickNombre={this.clickNombre}></Saisie></div>
        <div className="centre marge10"><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
        </div>}
</React.Fragment>

}
}
export default withRouter(JeuOperation);