import A1b from './fichiers/A1b.png';
import A1c from './fichiers/A1c.png';
import A1d from './fichiers/A1d.png';
import A2a from './fichiers/A2a.png';
import A2b from './fichiers/A2b.png';
import A3 from './fichiers/A3.png';
import A13a from './fichiers/A13a.png';
import A13b from './fichiers/A13b.png';
import A14 from './fichiers/A14.png';
import A15 from './fichiers/A15b.png';
import A17 from './fichiers/A17.png';
import A18 from './fichiers/A18.png';
import A21a from './fichiers/A21a.png';
import AB1 from './fichiers/AB1.png';
import AB6 from './fichiers/AB6.png';
import AB3a from './fichiers/AB3a.png';
import AB4 from './fichiers/AB4.png';

import AB7 from './fichiers/AB7.png';
import AB25 from './fichiers/AB25.png';
import B0 from './fichiers/B0.png';
import B2a from './fichiers/B2a.png';
import B2c from './fichiers/B2c.png';
import B3 from './fichiers/B3.png';
import B3a from './fichiers/B3a.png';
import B6a1 from './fichiers/B6a1.png';
import B6a3 from './fichiers/B6a3.png';
import B6a2 from './fichiers/B6a2.png';
import B6d from './fichiers/B6d.png';
import B7a from './fichiers/B7a.png';
import B9b from './fichiers/B9b.png';
import B9f from './fichiers/B9f.png';
import B15 from './fichiers/B15.png';
import B211 from './fichiers/B211.png';
import B212 from './fichiers/B212.png';
import B21a1 from './fichiers/B21a1.png';
import B21a2 from './fichiers/B21a2.png';
import B21b from './fichiers/B21b.png';
import B21c1 from './fichiers/B21c1.png';
import B21d1 from './fichiers/B21d1.png';
import B21d2 from './fichiers/B21d2.png';
import B21e from './fichiers/B21e.png';
import B22a from './fichiers/B22a.png';
import B27a from './fichiers/B27a.png';
import B40 from './fichiers/B40.png';
import B43 from './fichiers/B43.png';
import B45a from './fichiers/B45a.png';
import C1b from './fichiers/C1b.png';
import C1c from './fichiers/C1c.png';
import C13b from './fichiers/C13b.png';
import C18 from './fichiers/C18.png';
import C62 from './fichiers/C62.png';
import C64b from './fichiers/C64b.png';
import CE12 from './fichiers/CE12.png';
import CE16 from './fichiers/CE16.png';
import CE21 from './fichiers/CE21.png';
import CE27 from './fichiers/CE27.png';
import CE30b from './fichiers/CE30b.png';
import C107 from './fichiers/C107.png';
import C113 from './fichiers/C113.png';
import C8 from './fichiers/C8.png';
import C12 from './fichiers/C12.png';
import C64d1 from './fichiers/C64d1.png';
import B1430 from './fichiers/B1430.png';
import B25 from './fichiers/B25.png';


const tabPanneaux =
    [
        {
            id: A1b,
            nom: "Virage dangereux à gauche."
        },
        {
            id: A1c,
            nom: "Succession de virages dont le premier est à droite"
        },
        {
            id: A1d,
            nom: "Succession de virages dont le premier est à gauche"
        },
        {
            id: A2a,
            nom: "Proximité d'un cassis ou dos d'âne"
        },
        {
            id: A2b,
            nom: "Proximité d'un ralentisseur de type dos-d'âne situé à une distance de 50 mètres du panneau"
        },
        {
            id: A3,
            nom: "Proximité d'une chaussée rétrécie"
        },
        {
            id: A13a,
            nom: "Proximité d'un endroit fréquenté par les enfants"
        },
        {
            id: A13b,
            nom: "Proximité de passage(s) pour piétons"
        },
        {
            id: A14,
            nom: "Proximité d'un danger situé à une distance d'environ 150 mètres en rase campagne et 50 mètres en agglomération"
        },
        {
            id: A15,
            nom: "Proximité de passage d'animaux sauvages situé à une distance d'environ 150 mètres en rase campagne et 50 mètres en agglomération"
        },
        {
            id: A17,
            nom: "Proximité de feux tricolores situés à une distance d'environ 150 mètres en rase campagne et 50 mètres en agglomération"
        },
        {
            id: A18,
            nom: "Début d'une circulation à double sens"
        },
        {
            id: A21a,
            nom: "Proximité de débouché de cyclistes situé à une distance d'environ 150 mètres en rase campagne et 50 mètres en agglomération."
        },
        {
            id: AB1,
            nom: "Annonce d'une intersection où le conducteur est tenu de céder le passage aux véhicules débouchant de la ou des routes situées à sa droite"
        },
        {
            id: AB6,
            nom: "Annonce ou rappel du début d'une route à caractère prioritaire"
        },
        {
            id: AB3a,
            nom: "Annonce d'une intersection où le conducteur est tenu de céder le passage aux usagers de l'autre route sans avoir à marquer obligatoirement l'arrêt"
        },
        {
            id: AB4,
            nom: "Annonce d'une intersection où le conducteur est tenu de marquer un temps d'arrêt et céder le passage aux usagers de la route rencontrée"
        },

        {
            id: AB7,
            nom: "Annonce ou rappel de fin d'une route à caractère prioritaire"
        },
        {
            id: AB25,
            nom: "Annonce d'une intersection où le conducteur est tenu de céder le passage aux véhicules débouchant de l'anneau central par sa gauche."
        },

        {
            id: B0,
            nom: "Toute circulation de véhicules est interdite dans les deux sens à compter de l'implantation du panneau"
        },
        {
            id: B2a,
            nom: "Annonce d'une intersection où le conducteur ne peut tourner à gauche"
        },
        {
            id: B2c,
            nom: "Interdiction de faire demi-tour sur la route suivie jusqu'à la prochaine intersection incluse"
        },
        {
            id: B3,
            nom: "Interdiction de dépasser les véhicules à moteur autres que ceux à deux roues sans side-car"
        },
        {
            id: B3a,
            nom: "Interdiction aux véhicules affectés au transport de marchandises de dépasser"
        },
        {
            id: B6a3,
            nom: "Stationnement interdit du 16 à la fin du mois"
        },
        {
            id: B6a1,
            nom: "Stationnement interdit"
        },
        {
            id: B6a2,
            nom: "Stationnement interdit du 1er au 15 du mois"
        },
        {
            id: B6d,
            nom: "Arrêt et stationnement interdits"
        },
        {
            id: B7a,
            nom: "Accès interdit aux véhicules à moteur à l'exception des cyclomoteurs"
        },
        {
            id: B9b,
            nom: "Accès interdit aux cycles"
        },
        {
            id: B9f,
            nom: "Accès interdit aux véhicules de transport en commun de personnes"
        },
        {
            id: B15,
            nom: "Cédez le passage à la circulation venant en sens inverse"
        },
        {
            id: B211,
            nom: "Obligation de tourner à droite avant le panneau"
        },
        {
            id: B212,
            nom: "Obligation de tourner à gauche avant le panneau"
        },
        {
            id: B21a1,
            nom: "Contournement obligatoire par la droite"
        },
        {
            id: B21a2,
            nom: "Contournement obligatoire par la gauche"
        },
        {
            id: B21b,
            nom: "Direction obligatoire à la prochaine intersection : tout droit"
        },
        {
            id: B21c1,
            nom: "Direction obligatoire à la prochaine intersection : à droite"
        },
        {
            id: B21d1,
            nom: "Directions obligatoires à la prochaine intersection : tout droit ou à droite"
        },
        {
            id: B21d2,
            nom: "Directions obligatoires à la prochaine intersection : tout droit ou à gauche"
        },
        {
            id: B21e,
            nom: "Directions obligatoires à la prochaine intersection : à droite ou à gauche"
        },
        {
            id: B22a,
            nom: "Piste ou bande obligatoire pour les cycles sans side-car ou remorque"
        },
        {
            id: B27a,
            nom: "Voie réservée aux véhicules des services réguliers de transport en commun"
        },
        {
            id: B40,
            nom: "Fin de piste ou bande obligatoire pour cycle"
        },
        {
            id: B43,
            nom: "Fin de vitesse minimale obligatoire à 30km/h"
        },
        {
            id: B45a,
            nom: "Fin de voie réservée aux véhicules des services réguliers de transport en commun"
        },
        {
            id: C1b,
            nom: "Lieu aménagé pour le stationnement gratuit à durée limitée avec contrôle par disque"
        }
        ,
        {
            id: C1c,
            nom: "Lieu aménagé pour le stationnement payant"
        },
        {
            id: C13b,
            nom: "Présignalisation d'une impasse"
        },
        {
            id: C18,
            nom: "Indication de priorité par rapport à la circulation venant en sens inverse"
        },
        {
            id: C62,
            nom: "Présignalisation d'une borne de retrait de ticket de péage"
        },
        {
            id: C64b,
            nom: "Paiement par carte bancaire"
        },
        {
            id: CE12,
            nom: "Toilettes ouvertes au public"
        },
        {
            id: CE16,
            nom: "Restaurant ouvert 7 jours sur 7"
        },
        {
            id: CE21,
            nom: "Point de vue"
        },
        {
            id: CE27,
            nom: "Point de détente"
        },
        {
            id: CE30b,
            nom: "Issue de secours vers la gauche"
        }
        ,
        {
            id: C107,
            nom: "Route à accès réglementé (anciennement voie express)"
        },
        {
            id: C113,
            nom: "Piste ou bande cyclable conseillée et réservée aux cycles à deux ou trois roues"
        }
        ,
        {
            id: C8,
            nom: "Emplacement d'arrêt d'urgence"
        },
        {
            id: C12,
            nom: "Circulation à sens unique"
        },
        {
            id: C64d1,
            nom: "Paiement par abonnement. La voie est réservée aux usagers abonnés"
        },
        {
            id: B1430,
            nom: "Limitation de vitesse à 30km/h"
        },
        {
            id: B25,
            nom: "Vitesse minimale obligatoire à 30km/h"
        }
    ]

function listePanneaux() {

    let choixPanneaux = [];
    const liste = new Set();
    let i = 0;
    do {

        let nbHasard = Math.floor(Math.random()* tabPanneaux.length);

        if (!liste.has(nbHasard)) {
            i++;
            liste.add(nbHasard);
        }


    } while (i < 36);

    liste.forEach(element => {
        tabPanneaux[element].etat = 'fade-outRece'; 
        choixPanneaux.push(tabPanneaux[element]);
    });

    return choixPanneaux;
}

function choixQuestions()
{
   
    let choixNombre = [];
    let listeQuestions = [];

    for (let i = 0; i < 36; i++) {
        choixNombre.push(i);
    }

    for (let index = 0; index < 36; index++) {
        let nombre = Math.floor(Math.random() * choixNombre.length);
        listeQuestions.push(choixNombre[nombre]);
        choixNombre.splice(nombre, 1);

    }
    return listeQuestions;
}

export {listePanneaux, choixQuestions}