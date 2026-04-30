import React from 'react';
import './intervalle.css';
import { Slider, Button} from 'antd';
import Resultat from '../commun/Resultat';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';

class JeuFrequenceRegle extends React.Component {
  constructor(props) {
    super(props);

    this.audioContext = null;

    this.state = {
      frequence: 440,
      result : '',
      score : 0,
      afficheResultat : false
    };
    this.frequenceToFind = 400;
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.frequenceToFind = Math.floor(Math.random() * (600) + 200);
    

  }

  playNoteToFind = () =>
  {
  
    this.playNote(this.frequenceToFind);
  
  }

  playNote = (frequence) => {
    const ctx = this.audioContext;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequence, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1);
  };

  handleChange = (value) => {
    this.setState({ frequence: value });
  };

  handleRelease = () => {
    this.playNote(this.state.frequence);
  };

  incrementFrequence = () => {
    this.setState(
      (prevState) => ({ frequence: Math.min(800, prevState.frequence + 1) }),
      () => this.playNote(this.state.frequence)
    );
  };

  decrementFrequence = () => {
    this.setState(
      (prevState) => ({ frequence: Math.max(200, prevState.frequence - 1) }),
      () => this.playNote(this.state.frequence)
    );
  };

  playMyNoteThenTarget = () => {
    this.playNote(this.state.frequence);
    setTimeout(() => {
      this.playNote(this.frequenceToFind);
    }, 500);
  };

  validate = () =>
  {
    let score = this.state.score;
    let f1 = this.frequenceToFind;
let f2 = this.state.frequence;

// éviter division par 0
if (f1 > 0 && f2 > 0) {
  let cents = 1200 * Math.log(f2 / f1) / Math.log(2);
  let diff = Math.abs(cents);

  let result = `La bonne fréquence était : ${this.frequenceToFind} Hz.</br> La différence est de ${diff.toFixed(2)} cents.
  <br/> ${this.getAppreciation(diff.toFixed(2))}`;
score += this.getScore(diff);
  this.setState({
    result,
    score
  });
}
  }

getAppreciation(cents) {

if (cents <= 2) return "Justesse parfaite - Tu possèdes l'oreille absolue. 🎯";
if (cents <= 5) return "Justesse irréprochable - Tu peux travailler dans le domaine musicale. 👌";
if (cents <= 10) return "Très grande précision. Tu as une oreille presque parfaite.🎶";
if (cents <= 20) return "Très juste - Tu peux accorder des guitares. 🎸";
if (cents <= 35) return "Bonne justesse 👍";
if (cents <= 50) return "Assez juste 🙂";
if (cents <= 75) return "Légèrement imprécis 😐";
if (cents <= 100) return "Légèrement faux 😕";
if (cents <= 150) return "Faux - écart audible 😬";
if (cents <= 300) return "Intonation imprécise 😬";
if (cents <= 600) return "Très faux - note instable 😵";
if (cents <= 1200)   return "Catastrophique 💀";
return "Complètement désaccordé 💀";

}

 getScore(cents) {
  let c = Math.abs(cents);

  if (c >= 30) return 0;

  return Math.round(80 * Math.exp(-Math.pow(c / 24, 2)));
}
finTimer = () => {
     
        this.setState({afficheResultat : true});
    }
nextNote = () =>
{
     this.frequenceToFind = Math.floor(Math.random() * (600) + 200);
  
     this.setState({frequence : 440,
      result : ''
     })
}


  render() {
    return (<React.Fragment>
      <Helmet>
                  <title>Test de l'oreille absolue</title>
                  <meta name="description" content="Possèdes-tu l'oreille absolue ? Es-tu capable de retrouver la bonne fréquence d'une note ?" />
              </Helmet>
     {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitesseintervalle'></Resultat>:
       
    <React.Fragment>
    <div className="container-inter" >
      <div className="container-jeu-inter">   
      <div className='space-slider-inter'>
              

    

        <p>{this.state.frequence} Hz</p>

        <Slider className='slider-inter' value={this.state.frequence} 
        onChange={this.handleChange} onAfterChange={this.handleRelease}  
        vertical   tooltip={{ formatter: null }}  min={200} max={800} step={1}  ></Slider>

        <div className='slider-controls-inter'>
          <button className='slider-control-button' onClick={this.decrementFrequence} aria-label='Diminuer la fréquence'>◀</button>
          <span className='frequency-label'>{this.state.frequence} Hz</span>
          <button className='slider-control-button' onClick={this.incrementFrequence} aria-label='Augmenter la fréquence'>▶</button>
        </div>

      
      </div> 
<div className='space-button-inter'>
         <button onClick={this.playNoteToFind} className='button-inter'>
          🔊 Écoute la note à retrouver
        </button>
        {this.state.result === '' && <Button className='marge10' type='primary' onClick={this.validate}>Je valide la note</Button>}
       <button  className='marge10 button-inter' onClick={this.playMyNoteThenTarget}>
          🔊 Écoute ta note puis la note à retrouver
        </button>
      </div>
   
      </div> 
      <div className='centre'>Score : {this.state.score}</div> 
       <CompteRebours finTimer={this.finTimer} temps={45}></CompteRebours>
       {this.state.result !== '' &&<div className='centre'>
       <div className='marge20' dangerouslySetInnerHTML={{__html: this.state.result}}></div>
       <div><Button onClick={this.nextNote}>Note suivante</Button></div>
       </div>}</div>
       <div className='titre couleurTitre'>L'oreille absolue</div>
     <p>Retrouve la bonne fréquence de la note jouée par l'ordinateur grâce au curseur. Les flèches permettent d'affiner les réglages. Le jeu est plus difficile que la reconnaissance d'une note avec un clavier de piano.</p>

<p>Un intervalle de 100 cents correspond à un demi-ton, c'est-à-dire l'intervalle entre une touche blanche et une touche noire situées côte à côte sur un piano. C'est le plus petit intervalle dans la musique occidentale.</p>

<p>Même avec de l'entraînement, une oreille humaine ne peut pas discerner une différence de 5 cents.</p>      </React.Fragment>  
  }</React.Fragment> );
  }
}

export default JeuFrequenceRegle;