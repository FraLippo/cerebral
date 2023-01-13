// import donneesJeuxConcours from '../../data/donneesJeuxConcours';
import donneesConcoursCerebral from '../../data/donneesConcoursCerebral';
import donneesConcoursCalcul from '../../data/donneesConcoursCalcul';
import donneesConcoursMot from '../../data/donneesConcoursMot';
import React from 'react';
import puzzle from '../../images/puzzle.webp';
import puzzleRotation from '../../images/puzzleRotation.webp';
import compte from '../../images/compte.webp';
import motLong from '../../images/motLong.webp';
import ordre from '../../images/ordre.webp';
import esp from '../../images/esp.webp';
import dessin from '../../images/dessin.webp';
import famille from '../../images/famille.webp';
import imagePre from '../../images/imagePre.webp';
import tri from '../../images/tri.webp';
import solitaire from '../../images/solitaire.webp';
import pyramide from '../../images/pyramide.webp';
import fubuki from '../../images/fubuki.webp';
import calcul from '../../images/calcul.webp';
import memory from '../../images/memory.webp';
import bingo from '../../images/bingo.webp';
import simon from '../../images/simon.webp';
import border from '../../images/border.png';
import intl from 'react-intl-universal';
let donneesJeuxConcours = [...donneesConcoursCerebral, ...donneesConcoursCalcul, donneesConcoursMot];

function prochainObjectif(id) {
    if (id === -1) return '';
    const jeu = donneesJeuxConcours.find(x => x.id === id);
    if (jeu !== undefined && jeu.qualifFaute !== undefined) return jeu.qualifFaute === 0 ? intl.get('DEFI_FAUTE1') : intl.get('DEFI_FAUTE2') + (jeu.qualifFaute + 1) + intl.get('DEFI_FAUTE3')
    if (jeu !== undefined && jeu.qualifTemps !== undefined) return intl.get('DEFI_TEMPS1') + jeu.qualifTemps + intl.get('DEFI_TEMPS2');
    return intl.get('DEFI_VICTOIRE');
}


function imageJeu(titre) {
    let image = null;
    switch (titre) {
        case 'suite':
            image = imagePre;
            break;
        case 'intrus':
            image = solitaire;
            break;
        case 'famille':
            image = famille;
            break;
        case 'ordre':
            image = ordre;
            break;
        case 'tri':
            image = tri;
            break;
        case 'dessin':
            image = dessin;
            break;
        case 'carte':
            image = esp;
            break;
        case 'compte':
            image = compte;
            break;
        case 'mot':
            image = motLong;
            break;
        case 'rotation':
            image = puzzleRotation;
            break;
        case 'puzzle':
            image = puzzle;
            break;
        case 'pyramide':
            image = pyramide;
            break;
        case 'fubuki':
            image = fubuki;
            break;
        case 'calcul':
            image = calcul;
            break;
        case 'memory':
            image = memory;
            break;
        case 'bingo':
            image = bingo;
            break;
            case 'simon':
                image = simon;
                break;
        default:
            image = border;
            break;

    }
    return <div className="centre"><img className="img-responsive" width="150" src={image} alt="titre"></img></div>
}

function titreJeu(titre) {
    return intl.get(titre)

}

function creerEtape(liste)
{
   let tabItem = [];
   let i;
  for (i = 0; i < liste.length; i++) {

       tabItem.push({ description: titreJeu(liste[i].titre)})
    }
    tabItem.push({ description: intl.get('DEFI_FIN')})


    
    return tabItem;
}


export { prochainObjectif, imageJeu, titreJeu, creerEtape }