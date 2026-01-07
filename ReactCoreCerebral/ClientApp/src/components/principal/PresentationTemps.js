
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
      <div className="centre"><img src={presete} width="200" height="140" alt="fleur"></img></div>
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
       <span className='champVitesse'>inconnu583 x6</span> <span className='champVitesse'>Lili55 x7</span><span className='champVitesse'>Fitness</span> <span className='champVitesse'>Lili55 x10</span>👑</p>
      <div className='centre'><b>🚩 Lili55 a survolé l'année 2025. Bravo ! 📅</b></div>
   
     
      
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
      <h1>Nos jeux cognitifs</h1>
      <p>Nous vous proposons une série de tests simples et de petits jeux de réflexion pour faire travailler son cerveau en espérant améliorer ses capacités cognitives et son intelligence. Tous les jeux sont gratuits et ne nécessitent aucune inscription.</p>
          <p>Chaque série de tests stimule une partie du cerveau différente : la mémoire, la capacité de concentration, la vitesse de réaction, le discernement des couleurs et des formes...</p>
          <p>Les tests sont simples à comprendre et peuvent être réalisés par des juniors ou des seniors. Ils sont dans l'esprit des jeux que l'on retrouve sur les sites Luminosity ou Neuronation en version gratuite.</p>
             
    <h2>Pourquoi pratiquer des jeux cognitifs ?</h2>
    <p>En participant régulièrement à des jeux cognitifs, tu améliores ton cerveau de manière amusante et stimulante. Ces activités contribuent à renforcer la mémoire, à améliorer la concentration et à affiner la résolution de problèmes. Que ce soit des puzzles, des énigmes ou des jeux de mémoire, chaque défi offre une opportunité d'explorer de nouvelles façons de penser.</p>

<p>De plus, les jeux cognitifs favorisent le développement des compétences cognitives essentielles telles que la logique, la créativité et la flexibilité mentale. En confrontant votre esprit à des situations variées, tu entraînes ta capacité à penser de manière critique et à trouver des solutions innovantes.</p>
<p>L'avantage de ces jeux ne se limite pas à l'amélioration des compétences cognitives. Des études ont montré que l'engagement régulier dans des activités cognitives peut contribuer à ralentir le déclin cognitif lié à l'âge et à promouvoir la santé mentale globale.</p>
<p>Ces jeux sont aussi disponibles en anglais <a href="https://brain-games.evalquiz.com">brain-games.evalquiz.com</a></p>
    

    <p>Notre X (twitter) : <a href="https://x.com/evalquiz">evalquiz</a></p>
          <p>Vous pouvez nous contacter si vous avez des remarques ou des propositions en consultant la page des <a href="https://evalquiz.com/home/faq">mentions légales.</a></p>
    </div>
  }
}