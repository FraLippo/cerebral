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
        <title>Sport cérébral et jeux cognitifs gratuits</title>
        <meta name="description" content="Des jeux de réflexion pour faire travailler son cerveau tout en s'amusant. Tous les jeux sont accessibles en ligne gratuitement, ils peuvent être pratiqués aussi bien par les enfants que les adultes et les seniors." />
      </Helmet>
      <h1 className="titre centre couleurTitre">Sport cérébral et jeux cognitifs</h1>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <div className="centre"><img src={pres} width="200" height="176" alt="fleur"></img></div>
      <Row gutter={8} className="espaceHaut">
        <Col md={24}>
          <p>Nous vous proposons une série de tests simples et de petits jeux de réflexion pour faire travailler son cerveau en espérant améliorer ses capacités cognitives et son intelligence. Tous les jeux sont gratuits et ne nécessitent aucune inscription.</p>
          <p>Chaque série de tests stimule une partie du cerveau différente : la mémoire, la capacité de concentration, la vitesse de réaction, le discernement des couleurs et des formes...</p>
          <p>Les tests sont simples à comprendre et peuvent être réalisés par des juniors ou des seniors. Ils sont dans l'esprit des jeux que l'on retrouve sur les sites Luminosity ou Neuronation en version gratuite.</p>
          <p>Pour tous nos jeux cognitifs nous indiquons les compétences mises en oeuvre : mémoire, concentration, coordination...</p>
          <p>Les tests ne sont en aucun cas des tests scientifiques. Ce sont surtout des petits jeux de réflexion pour se divertir. À la fin de chaque jeu vous obtenez votre classement et votre position par rapport aux autres utilisateurs.</p>

          <Ad></Ad>
          <div className="centre"><img src={border} alt="bordure" width="100" height="41" ></img></div>

        </Col>
      </Row>
      <h2>Le podium du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois} </h2>
      <p>Le podium montre les 3 premiers du mois en cours, le podium peut changer à tout moment, tous les résultats des jeux de rapidité sur cette page sont pris en compte.</p>
      <Podium tabPrenoms={this.state.tabPrenoms}></Podium>
   
      <div className="titreClassement"><Link to='classementmois'>Tous les classements</Link></div>
     
          <h3>Les précédents gagnants</h3>
      <ul>
      <li>Juin : Gwendal</li>
      <li>Juillet : Meneleus</li>
      <li>Août - Septembre : Quentin</li>
      </ul>
      <div className="centre"><img  className="img-responsive" src={record} width="600" height="337" alt="record du jeu"></img></div>
      <Ad></Ad>
      <h1>Nos jeux cognitifs</h1>
      <p>Tous nos jeux en ligne sont gratuits et ne nécessitent pas d'inscription. Vous pouvez recommencer autant de fois que vous le désirez. Nous demandons simplement le prénom pour établir des classements. </p>
      <div className='jeuVitesse'>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >⊕<Link to='vitesseaddition'> L'addition XOR (nouveau)</Link></div>
        <p className="marge20">But du jeu : Faire la somme de deux grilles dans une troisième grille. L'addition se fait case par case comme une addition normale sauf que si vous additionnez deux cases bleues le résultat est une case blanche. Le terme XOR (ou exclusif) désigne un opérateur logique en informatique. Pour ceux qui veulent en savoir plus sur <a target='_blank' style={{all: 'revert'}} href="https://www.techno-science.net/definition/6742.html">l'opérateur XOR</a>. Si vous terminez une grille vous gagnez 3 points par bonne réponse. Le temps alloué est de 90 secondes. </p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la perception spatiale</li>
          <li>Stimule le cerveau</li>
          <li>Découverte de la logique booléenne</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseaddition'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🪙<Link to='vitessetresor'> La chasse au trésor</Link></div>
        <p className="marge20">But du jeu : Ramasser le plus rapidement possible les pièces disséminées dans une grille en indiquant la direction des pièces à votre personnage. Chaque pièce récoltée vous fait gagner 2 points. Ramasser toutes les pièces ajoute un bonus de 2 points. Il y a un malus de 5 points si vous n'arrivez pas à ramasser toutes les pièces sur la grille. Le temps alloué est de 60 secondes. </p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la perception spatiale</li>
          <li>Améliore la concentration</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessetresor'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🛑<Link to='vitessepanneaux'> Les panneaux routiers</Link></div>
        <p className="marge20">But du jeu : Reconnaitre les types de panneaux routiers le plus rapidement possible avant qu'ils ne disparaissent.
        Dans ce jeu on considère 4 types de panneaux routiers : Danger, Obligation, Interdiction et Obligation. Il faut se baser sur la forme et la couleur pour pouvoir facilement les distinguer. Vous pouvez trouver des informations utiles sur ce <a target='_blank' style={{all: 'revert'}} href="https://www.codedelaroute.fr/cours-code-auto/circulation/comprendre-la-signalisation/circulation-types-de-panneaux">site</a>. Le score maximum possible est de 58 points.</p>
        <div>Intêret du jeu :</div>
        <ul>
        <li>Apprentissage du code de la route</li>
          <li>Améliore la concentration et l'attention</li>
          <li>Améliore la coordination œil-main</li>
         

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessepanneaux'>Classement</Link></div>
      </div>


      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >📠 <Link to='vitesseecrire'>La dactylographie</Link></div>
        <p className="marge20">But du jeu : Taper une série de mots le plus vite possible au clavier. Le temps alloué est de 30 secondes pour 30 mots. Chaque mot correctement saisi augmente votre score de 2 points, il n'y a pas de pénalité si vous ne tapez pas la bonne lettre. Si vous réussissez à écrire les 30 mots avant la fin du temps (belle performance) vous obtenez un bonus de 50 points !
        Vous pouvez consulter ce <a target='_blank' style={{all: 'revert'}} href="https://fr.wikihow.com/apprendre-la-dactylographie">wiki</a> si vous désirez améliorer votre cadence de frappe. </p>
        <div>Intêret du jeu :</div>
        <ul>
        <li>Améliore la productivité</li>
          <li>Améliore la communication en ligne</li>
          <li>Réduction de la fatigue physique</li>
         

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseecrire'>Classement</Link></div>
      </div>


      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔵 <Link to='vitessememoire'>Se souvenir des cercles</Link></div>
        <p className="marge20">But du jeu : On vous montre un certain nombre de cercles dans une grille, vous devez mémoriser leurs emplacements et reproduire ce que vous venez de voir dans une nouvelle grille. Le temps alloué est de 90 secondes, chaque cercle trouvé rapporte 1 point, il n'y a pas de pénalité en cas d'erreur.</p>
        <div>Intêret du jeu :</div>
        <ul>
        <li>Améliore la concentration et la mémoire</li>
          <li>Améliore la mémoire spatiale</li>
          <li>Améliore la vitesse de traitement de l'information visuelle</li>
         

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessememoire'>Classement</Link></div>
      </div>
     
     
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >✍ <Link to='vitesselettres'>Les lettres manquantes</Link></div>
        <p className="marge20">But du jeu : Retrouver les lettres manquantes dans les mots. Les lettres sont cachées sous des carrés de couleur. L'ordre pour retrouver les lettres associées aux couleurs est toujours le même : bleu, rouge et jaune. Chaque bonne réponse rapporte 3 point puis 4 points quand il y a 2 lettres à retrouver. Chaque mauvaise réponse vous fait perdre 1 point, le fait de passer vous coûte 2 points. Le temps alloué est de 2 minutes. </p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Enrichissement du vocabulaire</li>
          <li>Développe la pensée logique </li>
          <li>Améliore les compétences linguistiques</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesselettres'>Classement</Link></div>
      </div>
     
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >♬ <Link to='vitessenotes'>L'oreille musicale</Link></div>
        <p className="marge20">But du jeu : Retrouver une note inconnue. L'ordinateur joue une note inconnue représentée par un point d'interrogation. Vous devez retrouver à quelle note elle correspond simplement avec votre oreille. Vous pouvez réécouter les notes autant de fois que vous le désirez. Vous n'avez pas besoin de connaissance musicale pour jouer, seule votre oreille est mise à contribution. Tout le monde a la capacité de reconnaitre les notes par contre certains doivent s'entrainer plus que d'autres.  Chaque note trouvée rapporte 7 points. Le temps alloué est de 90 secondes.</p>
        <div>Intêret du jeu :</div>
        <ul>
        <li>Développe l'oreille musicale</li>
          <li>Améliore la précision musicale </li>
          <li>Enrichi l'expérience musicale</li>
         

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessenotes'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🍔 <Link to='vitesseburger'>Préparer des burgers</Link></div>
        <p className="marge20">But du jeu : Créer des burger en plaçant les ingrédients de la recette dans l'ordre. Chaque burger créé rapporte 5 points. Le temps alloué pour obtenir le meilleur score est de 90 secondes.</p>
        <div>Intêret du jeu :</div>
        <ul>
        <li>Améliore la coordination œil-main</li>
          <li>Améliore la concentration et la mémoire</li>
          <li>Renforce les compétences en organisation</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseburger'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">⬆️ <Link to='vitessechemin'>Retrouver son chemin</Link></div>
        <p className="marge20">But du jeu : Trouver la sortie en suivant  les flèches, on vous indique le point de départ et vous devez trouver le point d'arrivée, le chemin est indiqué par une suite de flèches (haut, bas, droite, gauche). Vous avez 60 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Développe les compétence en résolution de problèmes</li>
          <li>Améliore la coordination œil-main</li>
          <li>Améliore la concentration</li>
          <li>Améliore la mémoire spatiale</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessechemin'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">➕ <Link to='vitesseoperation'>Les 4 opérations</Link></div>
        <p className="marge20">But du jeu : Le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Vous avez 90 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la vitesse de calcul</li>
          <li>Renforce la confiance en soi</li>
          <li>Améliore la concentration</li>
          <li>Renforce les compétences mathématiques de base</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseoperation'>Classement</Link></div>
      </div>
   
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🎨 <Link to='vitessecouleur'>Jeu de reconnaissance des couleurs</Link></div>
        <p className="marge20">But du jeu : Reconnaitre la couleur dans laquelle est écrit un mot. La difficulté provient du fait  que le mot affiché est une couleur.
          Par exemple si l'on écrit le mot "rouge" en vert. Le but est de reconnaitre la couleur verte. Rassurez-vous vous comprendrez très vite en jouant. Vous avez 40 s pour réaliser le meilleur score, vous gagnez un point par bonne réponse, chaque faute retranche 2 points à votre score.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Développe la perception des couleurs</li>
          <li>Améliore la mémoire</li>
          <li>Développe la coordination œil-main</li>
          <li>Améliore la vitesse de traitement de l'information visuelle </li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessecouleur'>Classement</Link></div>

      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🈂 <Link to='vitessesolitaire'>Jeu de la tuile solitaire</Link></div>
        <p className="marge20">But du jeu : Retrouver la tuile solitaire parmi un ensemble de tuiles. Vous avez 60 secondes pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée vous donne 2 points, la seconde 4 points, etc...   </p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Développe la perception des élements</li>
          <li>Améliore la concentration</li>
          <li>Améliore la vitesse de traitement de l'information visuelle</li>
          <li>Augmente la capacité d'analyse</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessesolitaire'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">👯 <Link to='vitesseintrus'>Repérer les différences</Link></div>
        <p className="marge20">But du jeu : Repérer tous les intrus dans une grille de 3x3 c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Vous avez 60 secondes pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la concentration et l'attention</li>
          <li>Développe les compétences visuelles</li>
          <li>Améliore la mémoire</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseintrus'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🔢 <Link to='vitesseordre'>Remettre des nombres dans l'ordre</Link></div>
        <p className="marge20">But du jeu : Remettre dans l'ordre des nombres entre 1 et 100. Vous avez 60 secondes pour réaliser le meilleur score, vous gagnez un point si vous placez un nombre dans le bon ordre.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la capacité de traitement de l'information</li>
          <li>Développe les compétences de prise de décision</li>
          <li>Développe les compétences en résolution de problèmes</li>
          <li>Renforce les compétences en mathématiques de base (comparaison de nombres)</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseordre'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🐈‍⬛ <Link to='vitessepaire'>Se souvenir de l'animal précédent</Link></div>
        <p className="marge20">But du jeu : On vous montre une suite d'images d'animaux, vous devez indiquer si l'animal que vous avez vu juste avant est le même que l'animal affiché. Vous avez 30 secondes pour obtenir le meilleur score, +1 point par bonne réponse, -3 points par mauvaise réponse.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la mémoire à court terme</li>
          <li>Améliore la concentration</li>
          <li>Développe les capacités cognitives</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessepaire'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🟰 <Link to='vitessecalcul'>La grille de calcul</Link></div>
        <p className="marge20">But du jeu : On vous donne 9 petits calculs (des additions et des soustractions) dans une grille, vous devez pointer les cases qui sont supérieures ou inférieures à un résultat donné. Vous avez 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>

        <ul>
          <li>Améliore les compétences en calcul mental</li>
          <li>Améliore la concentration</li>
          <li>Renforce la confiance en soi</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessecalcul'>Classement</Link></div>
      </div>
    </div>

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