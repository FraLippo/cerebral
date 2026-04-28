import React from 'react';
import './intervalle.css';
import { Slider } from 'antd';


class JeuFrequenceRegle extends React.Component {
  constructor(props) {
    super(props);

    this.audioContext = null;

    this.state = {
      frequence: 440
    };
    this.frequence = 400;
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.frequence = Math.floor(Math.random() * (600) + 200);

  }

  playNote = () =>
  {
  
    this.jouerSon(this.frequence);
    console.log(this.frequence);
  }

  jouerSon = (frequence) => {
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
    console.log('change');
    this.setState({ frequence: value });
  };

  handleRelease = (value) => {
    console.log('release');
    this.jouerSon(this.state.frequence);
  };

  renderGraduations = () => {
    const graduations = [];

    for (let i = 100; i <= 1000; i += 50) {
      graduations.push(
        <div key={i} className="graduation">
          <span>{i}</span>
        </div>
      );
    }

    return graduations;
  };

  render() {
    return (
      <div className="container">

         <button onClick={this.playNote}>
          🔊 Jouer une fréquence aléatoire
        </button>
        <h3>🎯 Ajuste la fréquence</h3>

        <div className="regle">
          {this.renderGraduations()}
        </div>

        <input
          type="range"
          min="100"
          max="1000"
          step="1"
          value={this.state.frequence}
          onChange={this.handleChange}
        
          className="slider"
        />

        <p>{this.state.frequence} Hz</p>

<Slider className='slider' onChange={this.handleChange} onAfterChange={this.handleRelease}  onMouseUp={this.handleRelease}
          onTouchEnd={this.handleRelease} vertical defaultValue={440} min={200} max={800} step={1} tooltip={{ open: true }} ></Slider>
       
      </div>
    );
  }
}

export default JeuFrequenceRegle;