
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
                this.nom = 'jeuxCompte';
                this.lien = 'NOM_COMPTE';
                break;
            case 'esp':
                this.nom = 'jeuxEsp';
                this.lien = 'NOM_ESP';
                break;
            case 'ordre':
                this.nom = 'jeuxOrdre';
                this.lien = 'NOM_ORDRE';
                break;
            case 'puzzle':
                this.nom = 'jeuxPuzzle';
                this.lien = 'NOM_PUZZLE';
                break;
            case 'puzzleRotation':
                this.nom = 'jeuxPuzzleRotation';
                this.lien = 'NOM_ROTATION';
                break;
            case 'suite':
                this.nom = 'jeuxSuite';
                this.lien = "NOM_SUITE";
                break;
            case 'tri':
                this.nom = 'jeuxTri';
                this.lien = 'NOM_TRI';
                break;
            case 'memoireDessin':
                this.nom = 'jeuxMemoireDessin';
                this.lien = 'NOM_DESSIN';
                break;
            case 'memoireFamille':
                this.nom = 'jeuxFamille';
                this.lien = 'NOM_FAMILLE';
                break;
            case 'mahJong':
                this.nom = 'jeuxMahJong';
                this.lien = 'NOM_MAH';
                break;
            case 'bingo':
                this.nom = 'jeuxBingo';
                this.lien = 'NOM_BINGO';
                break;
            case 'pyramide':
                this.nom = 'jeuxPyramide';
                this.lien = 'NOM_PYRAMIDE';
                break;
            case 'fubuki':
                this.nom = 'jeuxFubuki';
                this.lien = 'NOM_FUBUKI';
                break;
            case 'math':
                this.nom = 'jeuxMath';
                this.lien = 'NOM_MATH';
                break;
            case 'memoryGame':
                this.nom = 'jeuxMemoryGame';
                this.lien = 'NOM_MEMORY'
                break;
            case 'defiCalcul':
                this.nom = 'defiCalcul';
                this.lien = 'NOM_DEFI';
                break;
            case 'defiCerebral':
                this.nom = 'defiCerebral';
                this.lien = 'NOM_DEFI';
                break;
            case 'defiMot':
                this.nom = 'defiMot';
                this.lien = 'NOM_DEFI';
                break;
            case "simon":
                this.nom = "jeuxSimon";
                this.lien = "NOM_SIMON";
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
            <ul>
                {this.state.donnees.map((v, i) => <React.Fragment key={i}>{(this.props.supprimer !== v.id && intl.get(v.titre) !== '') && <li> <span><Link to={'/' + intl.get(this.lien) + '/' + v.id}>{intl.get(v.titre)}</Link>
                    {v.hasOwnProperty('explication') && v.explication !== undefined && <span className="petiteLettre">{" " + intl.get(v.explication)}</span>}
                    {(dejaFait !== null && dejaFait.includes(v.id)) && <Tag color="magenta" className="tag">{intl.get('DEJA_FAIT')}</Tag>}</span></li>}</React.Fragment>)}
            </ul>
        </Card></div>)

    }
}

SousMenu.defaultProps = {
    supprimer: 'rien',
};



