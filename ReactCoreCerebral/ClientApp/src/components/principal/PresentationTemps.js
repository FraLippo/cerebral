
import { Component } from 'react';
import Ad from '../commun/adSense';
import '../../style/vitesse.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import fondmemoire from '../../images/fondmemoire.png';
import fondcalcul from '../../images/fondcalcul.png';
import fondlettres from '../../images/fondlettre.png';
import fondplanification from '../../images/fondplanification.png';
import fondculture from '../../images/fondculture.png';
import fondrapidite from '../../images/fondrapidite.png';
import fondcerveau from '../../images/fondcerveau.png';
import genscrable from '../../images/genscrable.png'
import Podium from '../../jeux/vitesse/commun/Podium';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';
import { moisEnFrancais } from '../commun/utilitaire';
import metiers from '../../images/metiers.jpg';
import presete from '../../images/automne.png';

export default class PresentationTemps extends Component {


  constructor()
  {
    super();

  
  const d = new Date();
this.nomMois = moisEnFrancais[d.getMonth()];
    this.state={
      tabPodium :[]
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
        tabPodium : res
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
        <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com" />
<link rel="alternate" hreflang="x-default" href="https://cerebral.evalquiz.com" />
      </Helmet>
      <h1 className="titre centre couleurTitre">Sport cérébral et jeux cognitifs</h1>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <div className="centre"><img src={presete} width="200" height="216" alt="fleur"></img></div>
      <Ad></Ad>
      <div gutter={8} className="espaceHaut">
       
        <h2>Développe ton intelligence avec les jeux cognitifs</h2>
        <p>À l'ère numérique actuelle, où nos esprits sont constamment sollicités par une multitude d'informations, la pratique de jeux cognitifs apparait comme une stratégie intelligente pour stimuler et développer notre cerveau. Ces jeux, conçus pour engager activement les processus mentaux, offrent bien plus qu'une simple distraction ludique.</p>
      <h2>Détermine ta personnalité</h2>
      {/* <p>Plus besoin d'orientation, nous pouvons désormais déterminer les métiers qui te conviennent le mieux. À partir des résultats de nos tests, ChatGPT te donne désormais les métiers pour lesquels tu es le plus qualifié. Seras-tu chercheur ou artiste de rue ?</p> */}
   <p>À partir des résultats de nos jeux, on peut dégager quelques traits de personnalité qui dessinent ton style, tes forces ou tes faiblesses. Rien de scientifique ici, juste un portrait franc, parfois piquant, mais toujours bienveillant. Découvre ce que tes scores laissent entrevoir de ta façon d'apprendre, de penser et d'aborder le monde.</p>
    </div>
    <p className="centre fontMoyenne">Pratique un jeu par jour pendant un mois, c'est bon pour le cerveau, et à la fin, on te dit tout de ta personnalité !</p>
      <h2>Le podium du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois} </h2>
      <p>Le podium montre les 3 premiers du mois en cours, le podium peut changer à tout moment, tous les résultats des jeux de rapidité sur cette page sont pris en compte.</p>
      <Podium tabPodium={this.state.tabPodium}></Podium>
   
      <div className="titreClassement"><Link to='classementmois'><div><b>Analyse de tes résultats</b></div>
      <div>Découvre ta personnalité</div></Link></div>
  
          <h3>Les précédents champions</h3>
      <p className='fontMoyenne'>👑 <span className='champVitesse'>Gwendal x2</span>  <span className='champVitesse'>Meneleus</span> <span className='champVitesse'>Quentin x2</span> <span className='champVitesse'>rvteo x2</span> <span className='champVitesse'>waïra x2</span>
       <span className='champVitesse'>inconnu583 x6</span> <span className='champVitesse'>Lili55 x7</span><span className='champVitesse'>Fitness</span> <span className='champVitesse'>Lili55 x11</span><span className='champVitesse'>Soso x1</span><span className='champVitesse'>LoloLaReine x1</span>👑</p>
      <div className='centre'><b>🚩LoloLaReine est la reine du mois pour la première fois ! 📅</b></div>
   
     
      
      <div className='plateauCategorie'>
      <Link to='test-memoire'> <div className='categorieVitesse'>
    <div className='titreCategorie'>Mémoire</div>
    <div className='imageCategorie'><img src={fondmemoire} alt="catégorie memoire"></img></div>
        </div>
        </Link>
        
        
        <Link to='test-calcul'>   <div className='categorieVitesse'>
    <div className='titreCategorie'>Calcul</div>
                <div className='imageCategorie'><img src={fondcalcul} alt="catégorie calcul21lmù
'"></img></div>
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
<Link to='test-culture'> <div className='categorieVitesse'>
    <div className='titreCategorie'>Culture</div>
    <div className='imageCategorie'><img src={fondculture} alt="catégorie culture"></img></div>   
        </div>
</Link>
</div>

      <div>
        <h2>Nos autres jeux de réflexion</h2>
<Link to='/defi'> <div className='categorieAutres'>
    <div className='titreAutres'>Les défis cérébraux</div>
        <div className='imageCategorie'><img src={fondcerveau} alt="catégorie autres jeux"></img></div>   
 </div>
</Link>
<a href='https://concours.evalquiz.com/pres-jeux-du-jour'> <div className='categorieAutres'>
    <div className='titreAutres'>Autres jeux sur les mots</div>
        <div className='imageCategorie'><img src={genscrable} width={105} height={100} alt="catégorie jeux de lettres et de mots"></img></div>   
 </div>
</a>
</div>
<Ad></Ad>
    <div>
    <h2 className='couleurTitre'>FAQ - Jeux cognitifs, jeux cérébraux et entraînement du cerveau</h2>

    <h3>Qu'est-ce qu'un jeu cérébral ou un jeu cognitif ?</h3>
    <p>
        Un jeu cérébral (ou jeu cognitif) est un exercice conçu pour stimuler les capacités mentales :
        mémoire, attention, logique, rapidité, perception visuelle ou concentration. Ces jeux permettent
        d'entraîner le cerveau de manière ludique, rapide et accessible, directement en ligne et sans inscription.
    </p>

    <h3>Quels sont les bienfaits des jeux cognitifs ?</h3>
    <p>
        Les jeux cognitifs peuvent aider à améliorer la mémoire, renforcer la concentration, développer la logique,
        augmenter la rapidité de réaction, stimuler la flexibilité mentale et entretenir les capacités intellectuelles
        au quotidien. Une pratique régulière contribue aussi à maintenir un cerveau actif.
    </p>
     <h3>Les jeux cérébraux sont-ils vraiment utiles ?</h3>
  <p> Les jeux cognitifs ne transforment pas votre intelligence, mais ils peuvent réellement aider à mieux utiliser vos capacités. En jouant régulièrement, vous entraînez votre attention, votre rapidité de réflexion et votre capacité à rester concentré. C'est un peu comme une petite séance de sport pour le cerveau&nbsp;: ce n'est pas magique, mais cela renforce des habitudes mentales utiles au quotidien. </p>

    <h3>Les jeux cérébraux sont-ils adaptés aux seniors ?</h3>
    <p>
        Oui. Les jeux cognitifs conviennent parfaitement aux seniors, car ils sont simples, rapides et accessibles.
        Ils permettent de stimuler la mémoire, l'attention et la vivacité d'esprit, tout en offrant une activité
        agréable et non stressante.
    </p>

    <h3>Combien de temps faut-il jouer pour entraîner son cerveau ?</h3>
    <p>
        Quelques minutes par jour suffisent. L'idéal est de jouer un petit jeu par jour pour créer une habitude
        régulière et maintenir une stimulation cognitive continue.
    </p>

    <h3>Les jeux cognitifs sont-ils scientifiques ?</h3>
    <p>
        Non, ils ne sont pas présentés comme des tests médicaux ou scientifiques. Ils s'inspirent de l'esprit des jeux
        cognitifs populaires, mais leur objectif est avant tout le divertissement intelligent et la stimulation mentale.
    </p>

    <h3>Les jeux sont-ils vraiment gratuits ?</h3>
    <p>
        Oui. Tous les jeux cognitifs proposés sont entièrement gratuits et ne nécessitent aucune inscription.
        Vous pouvez jouer autant que vous le souhaitez, directement depuis votre navigateur.
    </p>

    <h3>Puis-je jouer aux jeux cognitifs sur smartphone ?</h3>
    <p>
        Oui. Les jeux fonctionnent aussi bien sur ordinateur que sur smartphone. Ils sont conçus pour être rapides,
        simples et compatibles avec tous les appareils.
    </p>

    <h3>Quels types de jeux cognitifs proposez-vous ?</h3>
    <p>
        La page propose plusieurs catégories de jeux : mémoire, calcul, lettres et mots, planification, rapidité,
        concentration et culture générale. Chaque catégorie stimule une zone cognitive différente.
    </p>

    <h3>Comment fonctionne le podium du mois ?</h3>
    <p>
        Le podium affiche les trois meilleurs joueurs du mois en cours. Il se met à jour automatiquement en fonction
        des résultats obtenus dans les jeux de rapidité présents sur la page.
    </p>

    <h3>Comment fonctionne l'analyse de personnalité ?</h3>
    <p>
        L'analyse de personnalité se base uniquement sur vos résultats aux jeux cognitifs. Elle dresse un portrait
        amusant et bienveillant de votre façon de jouer, de vous concentrer et de résoudre les problèmes.
    </p>

    <h3>Existe-t-il une version anglaise des jeux cognitifs ?</h3>
    <p>
        Oui. Une version anglaise est disponible sur notre site dédié aux jeux cognitifs en anglais <a href="https://brain-games.evalquiz.com">brain-games.evalquiz.com</a>.
    </p>

    <h3>Comment vous contacter ?</h3>
    <p>
        Vous pouvez nous écrire via <a href="https://evalquiz.com/home/faq">la page des mentions légales</a> si vous avez des remarques, idées ou suggestions d'amélioration.
    </p>
</div>
   </div>
  }
}