
import DataAccess from '../../data/AccesDonnees';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Card } from 'antd';
import { readLocalStorage } from '../../components/commun/localStorage';
import '../../style/jeux.css';
import intl from 'react-intl-universal';

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
                this.lien = 'NOM_COMPTE';
                break;
            case 'esp':
                this.nom = 'jeuxesp';
                this.lien = 'NOM_ESP';
                break;
            case 'ordre':
                this.nom = 'jeuxordre';
                this.lien = 'NOM_ORDRE';
                break;
            case 'puzzle':
                this.nom = 'jeuxpuzzle';
                this.lien = 'NOM_PUZZLE';
                break;
            case 'puzzleRotation':
                this.nom = 'jeuxpuzzlerotation';
                this.lien = 'NOM_ROTATION';
                break;
            case 'suite':
                this.nom = 'jeuxsuite';
                this.lien = "NOM_SUITE";
                break;
            case 'tri':
                this.nom = 'jeuxtri';
                this.lien = 'NOM_TRI';
                break;
            case 'memoireDessin':
                this.nom = 'jeuxmemoiredessin';
                this.lien = 'NOM_DESSIN';
                break;
            case 'memoireFamille':
                this.nom = 'jeuxfamille';
                this.lien = 'NOM_FAMILLE';
                break;
            case 'mahJong':
                this.nom = 'jeuxmahjong';
                this.lien = 'NOM_MAH';
                break;
            case 'bingo':
                this.nom = 'jeuxbingo';
                this.lien = 'NOM_BINGO';
                break;
            case 'pyramide':
                this.nom = 'jeuxpyramide';
                this.lien = 'NOM_PYRAMIDE';
                break;
            case 'fubuki':
                this.nom = 'jeuxfubuki';
                this.lien = 'NOM_FUBUKI';
                break;
            case 'math':
                this.nom = 'jeuxmath';
                this.lien = 'NOM_MATH';
                break;
            case 'memoryGame':
                this.nom = 'jeuxmemorygame';
                this.lien = 'NOM_MEMORY'
                break;
            case 'defiCalcul':
                this.nom = 'deficalcul';
                this.lien = 'NOM_DEFI';
                break;
            case 'defiCerebral':
                this.nom = 'deficerebral';
                this.lien = 'NOM_DEFI';
                break;
            case 'defiMot':
                this.nom = 'defimot';
                this.lien = 'NOM_DEFI';
                break;
            case "simon":
                this.nom = "jeuxsimon";
                this.lien = "NOM_SIMON";
                break;
            case "binero":
                this.nom = "binero";
                this.lien = "NOM_BINERO";
                break;
            case "picross":
                this.nom = "picross";
                this.lien = "NOM_PICROSS";
                break;
            default:
                break;
        }

        donnees = DataAccess.obtenirInfoJeux(this.nom);
        this.setState({ donnees, affiche: true });
    }


    render() {


        const dejaFait = readLocalStorage(this.nom.includes('defi') ? 'defi' : this.nom);
        return (this.state.affiche && <div> <Card title={<span style={{ whiteSpace: 'normal' }}>{intl.get(this.props.titre)}</span>}>
            <ul className="ulStyle">
                {this.state.donnees.map((v, i) => <React.Fragment key={i}>{(this.props.supprimer !== v.id && intl.get(v.titre) !== '') && <li> <span><Link reloadDocument to={'/' + intl.get(this.lien) + '/' + v.id}>{intl.get(v.titre)}</Link>
                    {v.hasOwnProperty('explication') && v.explication !== undefined && <span className="petiteLettre">{" " + intl.get(v.explication)}</span>}
                    {(dejaFait !== null && dejaFait.includes(v.id)) && <Tag color="magenta" className="tag">{intl.get('DEJA_FAIT')}</Tag>}</span></li>}</React.Fragment>)}
            </ul>
        </Card></div>)

    }
}

SousMenu.defaultProps = {
    supprimer: 'rien',
};



