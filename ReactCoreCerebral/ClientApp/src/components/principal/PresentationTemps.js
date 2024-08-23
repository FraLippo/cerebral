import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/vitesse.css';
import border from '../../images/border.png';
import x6 from '../../images/x6.jpg';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import pres from '../../images/pres.png';
import fondmemoire from '../../images/fondmemoire.png';
import fondcalcul from '../../images/fondcalcul.png';
import fondlettres from '../../images/fondlettre.png';
import fondplanification from '../../images/fondplanification.png';
import fondrapidite from '../../images/fondrapidite.png';
import Podium from '../../jeux/vitesse/commun/Podium';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';
import { moisEnFrancais } from '../commun/utilitaire';
import { Rate} from 'antd';

export default class PresentationTemps extends Component {


  constructor()
  {
    super();

  
  const d = new Date();
this.nomMois = moisEnFrancais[d.getMonth()];
    this.state={
      tabPrenoms :['','','']
    }
  }
  async componentDidMount() { 
    let url = new URL(process.env.REACT_APP_URL_RAPIDITECLASSEMENTPODIUM);

   
    const reponse = await fetch(url);
    if (!verifierStatus(reponse.status))
    {
        return;
    }
    if(reponse.ok) {
        const res = await reponse.json();
        this.setState({
        tabPrenoms : res
    })
    }
    else 
    {
        alert("Désolé, il y a un problème.")
        window.location.href = "/"
    }
    
}


  render() {
    return <div>
      <Helmet>
        <title>Jeux cognitifs gratuits en ligne pour adultes</title>
        <meta name="description" content="Des jeux cognitifs simples pour faire travailler son cerveau tout en s'amusant. Tous les jeux sont accessibles en ligne et sont gratuits, ils peuvent être pratiqués aussi bien par les enfants que les adultes et les seniors." />
      </Helmet>
      <h1 className="titre centre couleurTitre">Sport cérébral et jeux cognitifs</h1>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <div className="centre"><img src={pres} width="200" height="176" alt="fleur"></img></div>
      <Row gutter={8} className="espaceHaut">
        <Col md={24}>
        <h2>Développez votre intelligence avec les jeux cognitifs</h2>
        <p>À l'ère numérique actuelle, où nos esprits sont constamment sollicités par une multitude d'informations, la pratique de jeux cognitifs apparait comme une stratégie intelligente pour stimuler et développer notre cerveau. Ces jeux, conçus pour engager activement les processus mentaux, offrent bien plus qu'une simple distraction ludique.</p>
          <Ad></Ad>
          <div className="centre"><img src={border} alt="bordure" width="100" height="41" ></img></div>

        </Col>
      </Row>
      <h2>Le podium du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois} </h2>
      <p>Le podium montre les 3 premiers du mois en cours, le podium peut changer à tout moment, tous les résultats des jeux de rapidité sur cette page sont pris en compte.</p>
      <Podium tabPrenoms={this.state.tabPrenoms}></Podium>
   
      <div className="titreClassement"><Link to='classementmois'><b>Résultats détaillés</b></Link></div>
  
          <h3>Les précédents champions</h3>
      <p className='fontMoyenne'>👑 <span className='champVitesse'>Gwendal x2</span>  <span className='champVitesse'>Meneleus</span> <span className='champVitesse'>Quentin x2</span> <span className='champVitesse'>rvteo x2</span> <span className='champVitesse'>waïra x2</span>
       <span className='champVitesse'>inconnu583 x6</span> <span className='champVitesse'>Lili55 (champion du mois)</span>👑</p>
      <h3 className='centre'>🚩 Première victoire pour Lili55 ! 📅</h3>
     

      <Ad></Ad>
      <div className='plateauCategorie'>
      <Link to='test-memoire'> <div className='categorieVitesse'>
    <div className='titreCategorie'>Mémoire</div>
    <div className='imageCategorie'><img src={fondmemoire} alt="catégorie memoire"></img></div>
        </div>
        </Link>
        
        
        <Link to='test-calcul'>   <div className='categorieVitesse'>
    <div className='titreCategorie'>Calcul</div>
    <div className='imageCategorie'><img src={fondcalcul} alt="catégorie calcul"></img></div>
        </div>
        </Link>
        <Link to='test-lettres'><div className='categorieVitesse'>
    <div className='titreCategorie'>Lettres et mots</div>
    <div className='imageCategorie'><img src={fondlettres} alt="catégorie lettre"></img></div>   
        </div>
        </Link>
        <Link to='test-planification'> <div className='categorieVitesse'>
    <div className='titreCategorie'>Planification</div>
    <div className='imageCategorie'><img src={fondplanification} alt="catégorie planification"></img></div>   
        </div>
      </Link>
      <Link to='test-concentration'> <div className='categorieVitesse'>
    <div className='titreCategorie'>Rapidité et concentration</div>
    <div className='imageCategorie'><img src={fondrapidite} alt="catégorie rapidité"></img></div>   
        </div>
</Link>
</div>


      <h1>Nos jeux cognitifs</h1>
      <p>Nous vous proposons une série de tests simples et de petits jeux de réflexion pour faire travailler son cerveau en espérant améliorer ses capacités cognitives et son intelligence. Tous les jeux sont gratuits et ne nécessitent aucune inscription.</p>
          <p>Chaque série de tests stimule une partie du cerveau différente : la mémoire, la capacité de concentration, la vitesse de réaction, le discernement des couleurs et des formes...</p>
          <p>Les tests sont simples à comprendre et peuvent être réalisés par des juniors ou des seniors. Ils sont dans l'esprit des jeux que l'on retrouve sur les sites Luminosity ou Neuronation en version gratuite.</p>
              <h2>Tests de la  mémoire</h2>
              <div className='jeuVitesse'>
              <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🎩 <Link to='vitessememory'> Le jeu du memory</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div> 
          <p className="marge20">But du jeu : Trouver toutes les paires comme dans le classique jeu du Memory. Une différence avec le jeu classique : tu découvres les paires à ton rythme. Elles ne disparaissent pas au bout d'un certain temps. Le temps alloué est de 60 secondes pour tenter de trouver toutes les paires, un bonus de 30 points est alloué si tu finis le jeu.</p>
     
        <div className="centre"><Link to='classement/vitessememory'>Classement</Link></div>
      </div>


                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >✅ <Link to='vitessenombre'> Mémoire des nombres</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Mémoriser une série de chiffres pour pouvoir la restituer plus tard. La suite de chiffres augmente à chaque fois d'un chiffre jusqu'à 8 ensuite elle redescend pour revenir à 1 chiffre. Chaque nombre trouvé rapporte 5 points. Si tu réussis à revenir à 1 chiffre en moins de 75 secondes tu obtiens un bonus de 50 points.</p>
     
        <div className="centre"><Link to='classement/vitessenombre'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔺<Link to='vitesseforme'> Mémoire des formes</Link></div>
          <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
           <p className="marge20">But du jeu : Se souvenir des formes et de la couleur des éléments présentés sur des cartes. Une fois les cartes mémorisées, elles sont retournées puis c'est à toi de les retrouver. Chaque bonne réponse rapporte 2 points puis 4 points, une mauvaise réponse te fait perdre 3 points. Le temps alloué est de 60 secondes.</p>
     
        <div className="centre "><Link to='classement/vitesseforme'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔵 <Link to='vitessememoire'>Se souvenir des cercles</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
        <p className="marge20">But du jeu : On te montre un certain nombre de cercles dans une grille, tu dois mémoriser leurs emplacements et reproduire ce que tu viens de voir dans une nouvelle grille. Le temps alloué est de 90 secondes, chaque cercle trouvé rapporte 1 point, il n'y a pas de pénalité en cas d'erreur.</p>
       
        <div className="centre"><Link to='classement/vitessememoire'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🐈‍⬛ <Link to='vitessepaire'>L'animal précédent</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div>
        <p className="marge20">But du jeu : On te montre une suite d'images d'animaux, tu dois indiquer si l'animal que tu as vu juste avant est le même que l'animal affiché. Tu as 30 secondes pour obtenir le meilleur score, +1 point par bonne réponse, -3 points par mauvaise réponse.</p>
       
        <div className="centre"><Link to='classement/vitessepaire'>Classement</Link></div>
      </div>


                </div>  <h2>Tests sur les lettres et les mots</h2>
                <div className='jeuVitesse'>
              
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >✍ <Link to='vitesselettres'>Les lettres manquantes</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
        <p className="marge20">But du jeu : Retrouver les lettres manquantes dans les mots. Les lettres sont cachées sous des carrés de couleur. L'ordre pour retrouver les lettres associées aux couleurs est toujours le même : bleu, rouge et jaune. Chaque bonne réponse rapporte 3 point puis 4 points quand il y a 2 lettres à retrouver. Chaque mauvaise réponse te fait perdre 1 point, le fait de passer te coûte 2 points. Le temps alloué est de 2 minutes. </p>
       
        <div className="centre"><Link to='classement/vitesselettres'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >⭕ <Link to='vitessecercle'> Cercles de mots</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div> 
          <p className="marge20">But du jeu : Retrouver des mots de 8 lettres à partir de lettres mélangées. Les lettres du mot sont placées autour d'un cercle. Tu dois indiquer la première lettre du mot puis un sens de rotation pour retrouver le mot caché. Chaque mot trouvé rapporte 10 points, -10 en cas d'erreur. Si tu trouves les 6 mots en moins de 55 secondes tu as un bonus de 50 points. Le score maximal est donc de (6 x 10) + 50 = 110.  </p>
     
        <div className="centre"><Link to='classement/vitessecercle'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🖋️ <Link to='vitesseboogle'> Le Boogle</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div> 
          <p className="marge20">But du jeu : Créer des mots à partir de lettres. La lettre centrale est obligatoire dans les mots. Les mots acceptés sont ceux du Scrabble. Chaque mot de 3 ou 4 lettres rapporte 3 ou 4 points. Les points sont ensuite doublés pour les mots plus longs. Si te trouves 6 mots en moins de 90 s tu obtiens un bonus de 20 points. </p>
     
        <div className="centre"><Link to='classement/vitesseboogle'>Classement</Link></div>
      </div>
    
                
                
                </div>
                <h2>Tests de calcul</h2>
                <div className='jeuVitesse'>
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse">➕ <Link to='vitesseoperation'>Les 4 opérations</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div>
        <p className="marge20">But du jeu : Le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Tu as 90 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
       
        <div className="centre"><Link to='classement/vitesseoperation'>Classement</Link></div>
 </div>
        <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🟰 <Link to='vitessecalcul'>La grille de calcul</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
        <p className="marge20">But du jeu : On te donne 9 petits calculs (des additions et des soustractions) dans une grille, tu dois pointer les cases qui sont supérieures ou inférieures à un résultat donné. Tu as 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>

    
        <div className="centre"><Link to='classement/vitessecalcul'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔀 <Link to='vitessearithmetique'> Nombres en désordre</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Retrouve la bonne opération. Des nombres sont affichés dans le désordre tu dois les remettre en ordre pour reconstituer une opération. Tu as 60 secondes, chaque bonne réponse rapporte 6 points.  </p>
     
        <div className="centre"><Link to='classement/vitessearithmetique'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >💵 <Link to='vitessemonnaie'> La monnaie 🆕</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Tu dois rendre la monnaie au client en cliquant sur les pièces pour faire l'appoint. Tu dois gérer le maximum de clients en 60 s. Tu gagnes des points à chaque client content.   </p>
     
        <div className="centre"><Link to='classement/vitessemonnaie'>Classement</Link></div>
      </div>

     
                </div>
<h2>Tests de rapidité et de concentration</h2>

                <div className='jeuVitesse'>

                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔄 <Link to='vitessetaquin'> Le taquin</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Dans ce classique du jeu de réflexion, tu dois déplacer des tuiles pour créer une ligne puis une colonne. Tu as 90 secondes pour construire la ligne et la colonne. 50 points te sont donnés après la ligne et 100 points après la colonne.  </p>
     
        <div className="centre"><Link to='classement/vitessetaquin'>Classement</Link></div>
      </div>

                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🧩 <Link to='vitessecomplet'> Pièce du puzzle</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Retrouvez la bonne pièce du puzzle qui s'encastre parfaitement dans une autre pièce. Un bonus peut t'être accordé si tu réussis à trouver 10 pièces.   </p>
     
        <div className="centre"><Link to='classement/vitessecomplet'>Classement</Link></div>
      </div>
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🎨 <Link to='vitessetresse'> Le jeu du peintre</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Tu dois refaire le dessin qui est affiché en cliquant sur les pinceaux de couleur. Les pinceaux colorient une ligne ou une colonne entière. Une nouvelle couleur efface les autres. Il suffit de trouver le bon ordre dans lequelle le dessin a été colorié. Tu as 50 secondes pour terminer les 10 figures (+50 points).</p>
     
        <div className="centre"><Link to='classement/vitessetresse'>Classement</Link></div>
      </div>

              
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🚦 <Link to='vitessepanneauroutier'> Le code de la route</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Une grille est affichée avec des panneaux routiers, il suffit de retrouver le panneau routier indiqué par la question. Tu as 120 secondes pour essayer de trouver tous les panneaux. Tu gagnes 2 points par panneau trouvé, -4 points en cas d'erreur. Si tu termines la grille, bonus de 50 points ! Le maximum est de (36 x 2) + 50 = 122 points. </p>
     
        <div className="centre"><Link to='classement/vitessepanneauroutier'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔍 <Link to='vitesserecensement'> Le recensement</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div> 
          <p className="marge20">But du jeu : Une grille est affichée avec des symboles, il suffit de répondre aux questions concernant l'emplacement de certains symboles ou le nombre de symboles. Attention aux négations dans les questions. Le jeu dure 90 secondes. Une bonne réponse rapporte 5 points et une mauvaise te fait perdre 6 points.</p>
     
        <div className="centre"><Link to='classement/vitesserecensement'>Classement</Link></div>
      </div>


      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🐒 <Link to='vitessematch'> Former des paires</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div> 
         <p className="marge20">But du jeu : Un jeu très simple, reconstituer des paires à partir des éléments qui sont présents sur la page. Le temps alloué est de 60 secondes. Chaque paire trouvée rapporte 1 point. Des bonus te sont alloués à la fin de chaque tableau (5, 10 et 15 points).</p>
      
        <div className="centre "><Link to='classement/vitessematch'>Classement</Link></div>
      </div>


      
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >⊕<Link to='vitesseaddition'> L'addition XOR</Link></div>
       <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div> 
         <p className="marge20">But du jeu : Faire la somme de deux grilles dans une troisième grille. L'addition se fait case par case comme une addition normale sauf que si tu additionnes deux cases bleues le résultat est une case blanche. Le terme XOR (ou exclusif) désigne un opérateur logique en informatique. Pour ceux qui veulent en savoir plus sur <a target='_blank' style={{all: 'revert'}} href="https://www.techno-science.net/definition/6742.html">l'opérateur XOR</a>. Si tu termines une grille tu gagnes 3 points par bonne réponse. Le temps alloué est de 90 secondes. </p>
      
        <div className="centre"><Link to='classement/vitesseaddition'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🪙<Link to='vitessetresor'> La chasse au trésor</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div> 
        <p className="marge20">But du jeu : Ramasser le plus rapidement possible les pièces disséminées dans une grille en indiquant la direction des pièces à votre personnage. Chaque pièce récoltée te fait gagner 2 points. Ramasser toutes les pièces ajoute un bonus de 2 points. Il y a un malus de 5 points si tu n'arrives pas à ramasser toutes les pièces sur la grille. Le temps alloué est de 60 secondes. </p>
       
        <div className="centre"><Link to='classement/vitessetresor'>Classement</Link></div>
      </div>
{/* 
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🛑<Link to='vitessezoo'> Le zoo 🆕</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div>
        <p className="marge20">But du jeu : Cliquer le plus vite possible sur les animaux qui apparaissent, 1 point pour chaque animal trouvé, -3 pour chaque erreur. Le but du jeu est d'arriver à faire un sans-faute avec un bonus de 40 points.Les icônes proviennent de Loritas Medina  <a href="https://thenounproject.com/browse/icons/term/bird/" target="_blank" title="Bird Icons">Noun Project</a> (CC BY 3.0)</p>
      
        <div className="centre"><Link to='classement/vitessezoo'>Classement</Link></div>
      </div> */}


      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >📠 <Link to='vitesseecrire'>La dactylographie</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={5} /></div>
        <p className="marge20">But du jeu : Taper une série de mots le plus vite possible au clavier. Le temps alloué est de 30 secondes pour 19 mots. Chaque mot correctement saisi augmente votre score de 3 points, il n'y a pas de pénalité si tu ne tapes pas la bonne lettre. Si tu réussis à écrire les 19 mots tu obtiens un bonus de 50 points !
        Tu peux consulter ce <a target='_blank' style={{all: 'revert'}} href="https://fr.wikihow.com/apprendre-la-dactylographie">wiki</a> si tu désires améliorer ta cadence de frappe. </p>
       
        <div className="centre"><Link to='classement/vitesseecrire'>Classement</Link></div>
      </div>


    
     
     
      
     
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >♬ <Link to='vitessenotes'>L'oreille musicale</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={5} /></div>
        <p className="marge20">But du jeu : Retrouver une note inconnue. L'ordinateur joue une note inconnue représentée par un point d'interrogation. Tu dois retrouver à quelle note elle correspond, simplement avec votre oreille. Tu peux réécouter les notes autant de fois que tu le désires. Vous n'avez pas besoin de connaissance musicale pour jouer, seule ton oreille est mise à contribution. Tout le monde a la capacité de reconnaitre les notes par contre certains doivent s'entrainer plus que d'autres.  Chaque note trouvée rapporte 7 points. Le temps alloué est de 90 secondes.</p>
      
        <div className="centre"><Link to='classement/vitessenotes'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🍔 <Link to='vitesseburger'>Préparer des burgers</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div>
        <p className="marge20">But du jeu : Créer des burger en plaçant les ingrédients de la recette dans l'ordre. Chaque burger créé rapporte 5 points. Le temps alloué pour obtenir le meilleur score est de 90 secondes.</p>
       
        <div className="centre"><Link to='classement/vitesseburger'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">⬆️ <Link to='vitessechemin'>Retrouver son chemin</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div>
        <p className="marge20">But du jeu : Trouver la sortie en suivant  les flèches, on t'indique le point de départ et tu dois trouver le point d'arrivée, le chemin est indiqué par une suite de flèches (haut, bas, droite, gauche). tu as 60 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
        
        <div className="centre"><Link to='classement/vitessechemin'>Classement</Link></div>
      </div>
   
   
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🎨 <Link to='vitessecouleur'>Reconnaitre les couleurs</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={5} /></div>
        <p className="marge20">But du jeu : Reconnaitre la couleur dans laquelle est écrit un mot. La difficulté provient du fait  que le mot affiché est une couleur.
          Par exemple si l'on écrit le mot "rouge" en vert. Le but est de reconnaitre la couleur verte et pas le mot rouge. Rassure-toi on comprend très vite en jouant. Tu as 40 s pour réaliser le meilleur score, tu gagnes un point par bonne réponse, chaque faute retranche 2 points à ton score.</p>
       
        <div className="centre"><Link to='classement/vitessecouleur'>Classement</Link></div>

      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🈂 <Link to='vitessesolitaire'>La tuile solitaire</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div>
        <p className="marge20">But du jeu : Retrouver la tuile solitaire parmi un ensemble de tuiles. Tu as 60 secondes pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée te donne 2 points, la seconde 4 points, etc...   </p>
       
        <div className="centre"><Link to='classement/vitessesolitaire'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">👯 <Link to='vitesseintrus'>Repérer les différences</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div>
        <p className="marge20">But du jeu : Repérer tous les intrus dans une grille de 3x3 c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Tu as 60 secondes pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse.</p>
       
        <div className="centre"><Link to='classement/vitesseintrus'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🔢 <Link to='vitesseordre'>Remettre dans l'ordre</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div>
        <p className="marge20">But du jeu : Remettre dans l'ordre des nombres entre 1 et 100. Tu as 60 secondes pour réaliser le meilleur score, tu gagnes un point si tu places un nombre dans le bon ordre.</p>
       
        <div className="centre"><Link to='classement/vitesseordre'>Classement</Link></div>
      </div>

    
    
    </div>
    <h2>Pourquoi pratiquer des jeux cognitifs ?</h2>
    <p>En participant régulièrement à des jeux cognitifs, tu améliores ton cerveau de manière amusante et stimulante. Ces activités contribuent à renforcer la mémoire, à améliorer la concentration et à affiner la résolution de problèmes. Que ce soit des puzzles, des énigmes ou des jeux de mémoire, chaque défi offre une opportunité d'explorer de nouvelles façons de penser.</p>

<p>De plus, les jeux cognitifs favorisent le développement des compétences cognitives essentielles telles que la logique, la créativité et la flexibilité mentale. En confrontant votre esprit à des situations variées, tu entraînes ta capacité à penser de manière critique et à trouver des solutions innovantes.</p>
<p>L'avantage de ces jeux ne se limite pas à l'amélioration des compétences cognitives. Des études ont montré que l'engagement régulier dans des activités cognitives peut contribuer à ralentir le déclin cognitif lié à l'âge et à promouvoir la santé mentale globale.</p>
<Ad></Ad>
      <h2>Nos autres jeux</h2>
      <p>Dans nos défis tu peux trouver des autres séries de petits jeux cérebraux.</p>
      <div  className="margeHaut defiVitesse">
        <div  className="carteVitesse">
          <h3>Les défis de la logique</h3>
          <ul>
            <li> <span><Link className="espaceVitesseUl" to="/defi/14">Défi puzzle - difficile</Link></span></li>
            <li> <span><Link to="/defi/35">Défi Binero - facile</Link></span></li>
            <li> <span><Link to="/defi/36">Défi Picross - facile </Link></span></li>
            <li> <span><Link to="/defi/37">Défi Binero et Picross</Link></span></li>
            <li> <span><Link to="/defi/38">Défi Binero - moyen</Link></span></li>
            <li> <span><Link to="/defi/39">Défi Picross - difficile</Link></span></li>
          </ul>
        </div>
        <div className="carteVitesse">
          <h3>Les défis du calcul mental</h3>
          <ul>
            <li> <span><Link to="/defi/19">Défi calcul - facile</Link></span></li>
            <li> <span><Link to="/defi/20">Défi calcul - intermédiaire</Link></span></li>
            <li> <span><Link to="/defi/21">Défi calcul mental rapide - facile</Link></span></li>
            <li> <span><Link to="/defi/22">Défi calcul mental rapide - intermédiaire</Link></span></li>
            <li> <span><Link to="/defi/23">Pour les amateurs de maths mentales - facile</Link></span></li>
            <li> <span><Link to="/defi/24">Pour les amateurs de maths mentales - intermédiaire</Link></span></li>
            <li> <span><Link to="/defi/34">Exercices de calcul mental - intermédiaire</Link></span></li>
            <li> <span><Link to="/defi/11">Défi compte est bon - simple</Link></span></li>
          </ul>
        </div>
      </div>

      <div className="margeHaut ">
        <div className="fontMoyenne centre autreVitesse"><Link to="/defi">Tous les autres défis et jeux cérébraux</Link></div>
    </div>
    <Ad></Ad>
      <p>Le respect de votre vie privée est notre priorité : <a href="https://evalquiz.com/home/choisir">Choisir ses cookies</a></p>
      <h2>Crédits</h2>
      <p>Les icônes de bordure sont l'oeuvre d'<a href="https://thenounproject.com/zzyzz/">Olena Panasovska.</a></p>
      <p>Les cartes Zener sont issues du travail de <a href="https://commons.wikimedia.org/w/index.php?curid=31927664">Mikhail Ryazanov</a></p>
      <p>Les images des animaux et des peintures pour les puzzles proviennent de <a href="https://commons.wikimedia.org/">Wikimedia Commons</a> license:  Creative Commons Attribution 2.0 Generic</p>
      <p>Images puzzle défi : Photo by Tim Gouw, julie aagaard,  Vanessa GarciaP, Pham Hoang Kha, cottonbro,  Julius Silver, Pixabay, Matheus Cenali,  Polina Tankilevitch, Michael Block from Pexels</p>
      <p>L'image de fin pour la victoire (Photo par Andrea Piacquadio from Pexels)</p>
      <p>Les tuiles du mah-jong <a href="http://www.martinpersson.org/">Martin Persson</a></p>
      <p>Les icônes pour le jeu Retrouver son chemin : Arrow Down by Kartika Sholehatin from <a href="https://thenounproject.com/browse/icons/term/arrow-down/" target="_blank" title="Arrow Down Icons">Noun Project</a> </p>
      <p>Vous pouvez nous contacter si vous avez des remarques ou des propositions en consultant la page des <a href="https://evalquiz.com/home/faq">mentions légales.</a></p>
    </div>
  }
}