import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/vitesse.css';
import border from '../../images/border.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import pres from '../../images/pres.png';
import record from '../../images/record.png';
import Podium from '../../jeux/vitesse/commun/Podium';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';
import { moisEnFrancais } from '../commun/utilitaire';
import { Rate } from 'antd';

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
   
      <div className="titreClassement"><Link to='classementmois'><b>Mes résultats</b></Link></div>
     
          <h3>Les précédents gagnants</h3>
      <p className='fontMoyenne'>👑 Félicitations aux précédents champions du mois : <b>Gwendal</b>, <b>Meneleus</b>, <b>Quentin</b> (2 fois),  <b>rvteo (2 fois)</b>, <b>inconnu583</b> vient à nouveau de remporter le concours du mois 👑</p>
      <h3 className='centre'>🚩 Qui peut battre l'inconnu583 ? 📅</h3>
      <Ad></Ad>
      <h1>Nos jeux cognitifs</h1>
      <p>Nous vous proposons une série de tests simples et de petits jeux de réflexion pour faire travailler son cerveau en espérant améliorer ses capacités cognitives et son intelligence. Tous les jeux sont gratuits et ne nécessitent aucune inscription.</p>
          <p>Chaque série de tests stimule une partie du cerveau différente : la mémoire, la capacité de concentration, la vitesse de réaction, le discernement des couleurs et des formes...</p>
          <p>Les tests sont simples à comprendre et peuvent être réalisés par des juniors ou des seniors. Ils sont dans l'esprit des jeux que l'on retrouve sur les sites Luminosity ou Neuronation en version gratuite.</p>
              <h2>Tests de la  mémoire</h2>
              <div className='jeuVitesse'>



                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >✅ <Link to='vitessenombre'> Mémoire des nombres 🆕</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Mémoriser une série de chiffres pour pouvoir la restituer plus tard. La suite de chiffres augmente à chaque fois d'un chiffre jusqu'à 8 ensuite elle redescend pour revenir à 1 chiffre. Chaque nombre trouvé rapporte 5 points. Si vous réussissez à revenir à 1 chiffre en moins de 60 secondes vous obtenez un bonus de 50 points.</p>
     
        <div className="centre"><Link to='classement/vitessenombre'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔺<Link to='vitesseforme'> Mémoire des formes</Link></div>
          <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
           <p className="marge20">But du jeu : Se souvenir des formes et de la couleur des éléments présentés sur des cartes. Une fois les cartes mémorisées, elles sont retournées puis c'est à vous de les retrouver. Chaque bonne réponse rapporte 2 points puis 4 points, une mauvaise réponse vous fait perdre 3 points. Le temps alloué est de 60 secondes.</p>
     
        <div className="centre "><Link to='classement/vitesseforme'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔵 <Link to='vitessememoire'>Se souvenir des cercles</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
        <p className="marge20">But du jeu : On vous montre un certain nombre de cercles dans une grille, vous devez mémoriser leurs emplacements et reproduire ce que vous venez de voir dans une nouvelle grille. Le temps alloué est de 90 secondes, chaque cercle trouvé rapporte 1 point, il n'y a pas de pénalité en cas d'erreur.</p>
       
        <div className="centre"><Link to='classement/vitessememoire'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🐈‍⬛ <Link to='vitessepaire'>L'animal précédent</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div>
        <p className="marge20">But du jeu : On vous montre une suite d'images d'animaux, vous devez indiquer si l'animal que vous avez vu juste avant est le même que l'animal affiché. Vous avez 30 secondes pour obtenir le meilleur score, +1 point par bonne réponse, -3 points par mauvaise réponse.</p>
       
        <div className="centre"><Link to='classement/vitessepaire'>Classement</Link></div>
      </div>


                </div>  <h2>Tests de vocabulaire</h2>
                <div className='jeuVitesse'>
              
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >✍ <Link to='vitesselettres'>Les lettres manquantes</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
        <p className="marge20">But du jeu : Retrouver les lettres manquantes dans les mots. Les lettres sont cachées sous des carrés de couleur. L'ordre pour retrouver les lettres associées aux couleurs est toujours le même : bleu, rouge et jaune. Chaque bonne réponse rapporte 3 point puis 4 points quand il y a 2 lettres à retrouver. Chaque mauvaise réponse vous fait perdre 1 point, le fait de passer vous coûte 2 points. Le temps alloué est de 2 minutes. </p>
       
        <div className="centre"><Link to='classement/vitesselettres'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >⭕ <Link to='vitessecercle'> Cercles de mots</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div> 
          <p className="marge20">But du jeu : Retrouver des mots de 8 lettres à partir de lettres mélangées. Les lettres du mot sont placées autour d'un cercle. Vous devez indiquer la première lettre du mot puis un sens de rotation pour retrouver le mot caché. Chaque mot trouvé rapporte 10 points, -10 en cas d'erreur. Si vous trouvez les 6 mots en moins de 60 secondes vous avez un bonus de 50 points. Le score maximal est donc de (6 x 10) + 50 = 110.  </p>
     
        <div className="centre"><Link to='classement/vitessecercle'>Classement</Link></div>
      </div>
                
                
                
                </div>
                <h2>Tests de calcul</h2>
                <div className='jeuVitesse'>
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse">➕ <Link to='vitesseoperation'>Les 4 opérations</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div>
        <p className="marge20">But du jeu : Le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Vous avez 90 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
       
        <div className="centre"><Link to='classement/vitesseoperation'>Classement</Link></div>
 </div>
        <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🟰 <Link to='vitessecalcul'>La grille de calcul</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div>
        <p className="marge20">But du jeu : On vous donne 9 petits calculs (des additions et des soustractions) dans une grille, vous devez pointer les cases qui sont supérieures ou inférieures à un résultat donné. Vous avez 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>

    
        <div className="centre"><Link to='classement/vitessecalcul'>Classement</Link></div>
      </div>

     
                </div>
<h2>Tests de rapidité et de concentration</h2>
                <div className='jeuVitesse'>
                


              
                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🚦 <Link to='vitessepanneauroutier'> Le code de la route</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={2} /></div> 
          <p className="marge20">But du jeu : Une grille est affichée avec des panneaux routiers, il suffit de retrouver le panneau routier indiqué par la question. Vous avez 120 secondes pour essayer de trouver tous les panneaux. Vous gagnez 2 points par panneau trouvé, -4 points en cas d'erreur. Si vous terminez la grille bonus de 50 points ! Le maximum est de (36 x 2) + 50 = 122 points. </p>
     
        <div className="centre"><Link to='classement/vitessepanneauroutier'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔍 <Link to='vitesserecensement'> Le recensement</Link></div>
         <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div> 
          <p className="marge20">But du jeu : Une grille est affichée avec des symboles, il suffit de répondre aux questions concernant l'emplacement de certains symboles ou le nombre de symboles. Attention aux négations dans les questions. Le jeu dure 90 secondes. Une bonne réponse rapporte 5 points et une mauvaise vous fait perdre 6 points.</p>
     
        <div className="centre"><Link to='classement/vitesserecensement'>Classement</Link></div>
      </div>


      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🐒 <Link to='vitessematch'> Former des paires</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div> 
         <p className="marge20">But du jeu : Un jeu très simple, reconstituer des paires à partir des éléments qui sont présents sur la page. Le temps alloué est de 60 secondes. Chaque paire trouvée rapporte 1 point. Des bonus vous sont alloués à la fin de chaque tableau (5, 10 et 15 points).</p>
      
        <div className="centre "><Link to='classement/vitessematch'>Classement</Link></div>
      </div>


      
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >⊕<Link to='vitesseaddition'> L'addition XOR</Link></div>
       <div className='centre'>Difficulté : <Rate disabled defaultValue={4} /></div> 
         <p className="marge20">But du jeu : Faire la somme de deux grilles dans une troisième grille. L'addition se fait case par case comme une addition normale sauf que si vous additionnez deux cases bleues le résultat est une case blanche. Le terme XOR (ou exclusif) désigne un opérateur logique en informatique. Pour ceux qui veulent en savoir plus sur <a target='_blank' style={{all: 'revert'}} href="https://www.techno-science.net/definition/6742.html">l'opérateur XOR</a>. Si vous terminez une grille vous gagnez 3 points par bonne réponse. Le temps alloué est de 90 secondes. </p>
      
        <div className="centre"><Link to='classement/vitesseaddition'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🪙<Link to='vitessetresor'> La chasse au trésor</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div> 
        <p className="marge20">But du jeu : Ramasser le plus rapidement possible les pièces disséminées dans une grille en indiquant la direction des pièces à votre personnage. Chaque pièce récoltée vous fait gagner 2 points. Ramasser toutes les pièces ajoute un bonus de 2 points. Il y a un malus de 5 points si vous n'arrivez pas à ramasser toutes les pièces sur la grille. Le temps alloué est de 60 secondes. </p>
       
        <div className="centre"><Link to='classement/vitessetresor'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🛑<Link to='vitessepanneaux'> Les panneaux routiers</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div>
        <p className="marge20">But du jeu : Reconnaitre les types de panneaux routiers le plus rapidement possible avant qu'ils ne disparaissent.
        Dans ce jeu on considère 4 types de panneaux routiers : Danger, Obligation, Interdiction et Obligation. Il faut se baser sur la forme et la couleur pour pouvoir facilement les distinguer. Vous pouvez trouver des informations utiles sur ce <a target='_blank' style={{all: 'revert'}} href="https://www.codedelaroute.fr/cours-code-auto/circulation/comprendre-la-signalisation/circulation-types-de-panneaux">site</a>. Le score maximum possible est de 58 points.</p>
      
        <div className="centre"><Link to='classement/vitessepanneaux'>Classement</Link></div>
      </div>


      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >📠 <Link to='vitesseecrire'>La dactylographie</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={5} /></div>
        <p className="marge20">But du jeu : Taper une série de mots le plus vite possible au clavier. Le temps alloué est de 30 secondes pour 30 mots. Chaque mot correctement saisi augmente votre score de 2 points, il n'y a pas de pénalité si vous ne tapez pas la bonne lettre. Si vous réussissez à écrire les 30 mots avant la fin du temps (belle performance) vous obtenez un bonus de 50 points !
        Vous pouvez consulter ce <a target='_blank' style={{all: 'revert'}} href="https://fr.wikihow.com/apprendre-la-dactylographie">wiki</a> si vous désirez améliorer votre cadence de frappe. </p>
       
        <div className="centre"><Link to='classement/vitesseecrire'>Classement</Link></div>
      </div>


    
     
     
      
     
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >♬ <Link to='vitessenotes'>L'oreille musicale</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={5} /></div>
        <p className="marge20">But du jeu : Retrouver une note inconnue. L'ordinateur joue une note inconnue représentée par un point d'interrogation. Vous devez retrouver à quelle note elle correspond simplement avec votre oreille. Vous pouvez réécouter les notes autant de fois que vous le désirez. Vous n'avez pas besoin de connaissance musicale pour jouer, seule votre oreille est mise à contribution. Tout le monde a la capacité de reconnaitre les notes par contre certains doivent s'entrainer plus que d'autres.  Chaque note trouvée rapporte 7 points. Le temps alloué est de 90 secondes.</p>
      
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
        <p className="marge20">But du jeu : Trouver la sortie en suivant  les flèches, on vous indique le point de départ et vous devez trouver le point d'arrivée, le chemin est indiqué par une suite de flèches (haut, bas, droite, gauche). Vous avez 60 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
        
        <div className="centre"><Link to='classement/vitessechemin'>Classement</Link></div>
      </div>
   
   
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🎨 <Link to='vitessecouleur'>Reconnaitre les couleurs</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={5} /></div>
        <p className="marge20">But du jeu : Reconnaitre la couleur dans laquelle est écrit un mot. La difficulté provient du fait  que le mot affiché est une couleur.
          Par exemple si l'on écrit le mot "rouge" en vert. Le but est de reconnaitre la couleur verte. Rassurez-vous vous comprendrez très vite en jouant. Vous avez 40 s pour réaliser le meilleur score, vous gagnez un point par bonne réponse, chaque faute retranche 2 points à votre score.</p>
       
        <div className="centre"><Link to='classement/vitessecouleur'>Classement</Link></div>

      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🈂 <Link to='vitessesolitaire'>La tuile solitaire</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div>
        <p className="marge20">But du jeu : Retrouver la tuile solitaire parmi un ensemble de tuiles. Vous avez 60 secondes pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée vous donne 2 points, la seconde 4 points, etc...   </p>
       
        <div className="centre"><Link to='classement/vitessesolitaire'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">👯 <Link to='vitesseintrus'>Repérer les différences</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={3} /></div>
        <p className="marge20">But du jeu : Repérer tous les intrus dans une grille de 3x3 c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Vous avez 60 secondes pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse.</p>
       
        <div className="centre"><Link to='classement/vitesseintrus'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🔢 <Link to='vitesseordre'>Remettre dans l'ordre</Link></div>
        <div className='centre'>Difficulté : <Rate disabled defaultValue={1} /></div>
        <p className="marge20">But du jeu : Remettre dans l'ordre des nombres entre 1 et 100. Vous avez 60 secondes pour réaliser le meilleur score, vous gagnez un point si vous placez un nombre dans le bon ordre.</p>
       
        <div className="centre"><Link to='classement/vitesseordre'>Classement</Link></div>
      </div>

    
    
    </div>
    <h2>Pourquoi pratiquer des jeux cognitifs ?</h2>
    <p>En participant régulièrement à des jeux cognitifs, vous défiez votre cerveau de manière amusante et stimulante. Ces activités contribuent à renforcer la mémoire, à améliorer la concentration et à affiner la résolution de problèmes. Que ce soit des puzzles, des énigmes ou des jeux de mémoire, chaque défi offre une opportunité d'explorer de nouvelles façons de penser.</p>

<p>De plus, les jeux cognitifs favorisent le développement des compétences cognitives essentielles telles que la logique, la créativité et la flexibilité mentale. En confrontant votre esprit à des situations variées, vous entraînez votre capacité à penser de manière critique et à trouver des solutions innovantes.</p>
<p>L'avantage de ces jeux ne se limite pas à l'amélioration des compétences cognitives. Des études ont montré que l'engagement régulier dans des activités cognitives peut contribuer à ralentir le déclin cognitif lié à l'âge et à promouvoir la santé mentale globale.</p>
<Ad></Ad>
      <h2>Nos autres jeux</h2>
      <p>Dans nos défis vous pouvez trouver des autres séries de petits jeux cérebraux.</p>
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