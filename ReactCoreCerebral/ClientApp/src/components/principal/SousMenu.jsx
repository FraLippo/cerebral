
import DataAccess from '../../data/AccesDonnees';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Card } from 'antd';
import { readLocalStorage } from '../../components/commun/localStorage';
import '../../style/jeux.css';

export default class SousMenu extends Component {

    constructor(props) {
        super(props);
        this.nom = "";
        this.lien = "";

        this.state = { donnees: [], affiche: false }

    }

    componentDidMount() {
        let donnees = [];
        switch (this.props.type) {
            case 'compte':
                this.nom = 'jeuxcompte';
                this.lien = "jeuxcompte";
                break;
            case 'esp':
                this.nom = 'jeuxesp';
                this.lien = "jeuxesp";
                break;
            case 'ordre':
                this.nom = 'jeuxordre';
                this.lien = "jeuxordre";
                break;
            case 'puzzle':
                this.nom = 'jeuxpuzzle';
                this.lien = "jeuxpuzzle";
                break;
            case 'puzzleRotation':
                this.nom = 'jeuxpuzzlerotation';
                this.lien = "jeuxpuzzlerotation";
                break;
            case 'suite':
                this.nom = 'jeuxsuite';
                this.lien = "jeuxsuite";
                break;
            case 'tri':
                this.nom = 'jeuxtri';
                this.lien = "jeuxtri";
                break;
            case 'memoireDessin':
                this.nom = 'jeuxmemoiredessin';
                this.lien = "jeuxmemoiredessin";
                break;
            case 'memoireFamille':
                this.nom = 'jeuxfamille';
                this.lien = "jeuxfamille";
                break;
            case 'mahJong':
                this.nom = 'jeuxmahjong';
                this.lien = "jeuxmahjong";
                break;
            case 'bingo':
                this.nom = 'jeuxbingo';
                this.lien = "jeux-bingo";
                break;
            case 'pyramide':
                this.nom = 'jeuxpyramide';
                this.lien = "jeux-pyramide";
                break;
            case 'fubuki':
                this.nom = 'jeuxfubuki';
                this.lien = "jeux-fubuki";
                break;
            case 'math':
                this.nom = 'jeuxmath';
                this.lien = "calcul";
                break;
            case 'memoryGame':
                this.nom = 'jeuxmemorygame';
                this.lien = "jeux-memory"
                break;
            case 'defiCalcul':
                this.nom = 'deficalcul';
                this.lien = "defi";
                break;
            case 'defiCerebral':
                this.nom = 'deficerebral';
                this.lien = "defi";
                break;
            case 'defiMot':
                this.nom = 'defimot';
                this.lien = "defi";
                break;
            case "simon":
                this.nom = "jeuxsimon";
                this.lien = "jeux-simon";
                break;
            case "binero":
                this.nom = "binero";
                this.lien = "binero";
                break;
            case "picross":
                this.nom = "picross";
                this.lien = "picross";
                break;
            case "photo":
                this.nom = "photo";
                this.lien = "photo";
                break;
            default:
                break;
        }

        donnees = DataAccess.obtenirInfoJeux(this.nom);
        this.setState({ donnees, affiche: true });
    }


    render() {


        const dejaFait = readLocalStorage(this.nom.includes('defi') ? 'defi' : this.nom);
        return (this.state.affiche && <div> <Card title={<span style={{ whiteSpace: 'normal' }}>{this.props.titre}</span>}>
            <ul className="ulStyle">
                {this.state.donnees.map((v, i) => <React.Fragment key={i}>{(this.props.supprimer !== v.id && v.titre !== '') && <li> <span><Link reloadDocument to={'/' + this.lien + '/' + v.id}>{v.titre}</Link>
                    {v.hasOwnProperty('explication') && v.explication !== undefined && <span className="petiteLettre">{" " + v.explication}</span>}
                    {(dejaFait !== null && dejaFait.includes(v.id)) && <Tag color="magenta" className="tag">{"déjà fait"}</Tag>}</span></li>}</React.Fragment>)}
            </ul>
        </Card></div>)

    }
}

SousMenu.defaultProps = {
    supprimer: 'rien',
};



