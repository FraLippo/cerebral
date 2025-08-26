import React, { Component } from 'react';
import { message } from 'antd';
import { creerListeMessage } from './Logique';

export default class JeuDoigt extends Component {
    constructor(props) {
        super(props);
        this.tabQuestions = creerListeMessage();
        this.noQuestion = 0;
        this.state = {
            mouseX: 0,
            mouseY: 0,
            tempsHors: 0,
            enJeu: false,
            compteARebours: 3,
            jeuCommence: false,
            tremblementActif: false,
            question : this.tabQuestions[this.noQuestion].msg
        };
        this.tempsQuestion = 0;
        this.erreur = false;

        this.rayon = 40;
        this.vitesseX = 1;
        this.vitesseY = 1;
        
        this.canvasRef = React.createRef();
        this.dernierTemps = 0;
        this.animationFrame = null;
    
    }

    demarrerCompteARebours = () => {
          // Dessiner le cercle initial
    const canvas = this.canvasRef.current;
    this.x = canvas.width / 2;
    this.y = canvas.height / 4;
    this.dessiner();
      
        const interval = setInterval(() => {
            this.setState(prev => ({
                compteARebours: prev.compteARebours - 1
            }), () => {
                if (this.state.compteARebours === 0) {
                    clearInterval(interval);
                    this.setState({ jeuCommence: true }, () => this.demarrerJeu());
                
                }
            });
        }, 1000);
    }

      handleKeyDown = (event) => {  alert('t')
    if (event.code === "Space" || event.key === " ") {
      
      event.preventDefault(); // Empêche le scroll par défaut
       if (!this.tabQuestions[this.noQuestion].resultat)
       {
    
        this.changerQuestion();
       }
       
    }
  };

  changerQuestion = () =>
{ 
       this.tempsQuestion = setTimeout(() => this.changerQuestion(), 5000);
    this.noQuestion++;
    this.setState({
        question : this.tabQuestions[this.noQuestion].msg
    })
}



    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
            window.addEventListener('mousemove', this.suivreSouris);
            window.addEventListener('touchmove', this.suivreDoigt);
            window.addEventListener("keydown", this.handleKeyDown);
            // Démarrer le compte à rebours
           this.demarrerCompteARebours();
 
    }

    componentWillUnmount() {
        
        window.removeEventListener('mousemove', this.suivreSouris);
        window.removeEventListener('touchmove', this.suivreDoigt);
        window.removeEventListener("keydown", this.handleKeyDown);
        clearTimeout(this.tempsQuestion);
        cancelAnimationFrame(this.animationFrame);
    }

    suivreSouris = (e) => {
        const rect = this.canvasRef.current.getBoundingClientRect();
        this.setState({
            mouseX: e.clientX - rect.left,
            mouseY: e.clientY - rect.top
        });
    }

    suivreDoigt = (e) => {
        e.preventDefault();
        const rect = this.canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        this.setState({
            mouseX: touch.clientX - rect.left,
            mouseY: touch.clientY - rect.top
        });
    }

    demarrerJeu = () => {
        this.tempsQuestion = setTimeout(() => this.changerQuestion(), 5000);
          const canvas = this.canvasRef.current;
         
        this.x = canvas.width / 2;
        this.y = canvas.height / 4;
        this.dernierTemps = Date.now();
        this.setState({ enJeu: true, tempsHors: 0 }, this.boucleJeu);
    }

    boucleJeu = () => {
        const maintenant = Date.now();
        const deltaTemps = maintenant - this.dernierTemps;
        this.dernierTemps = maintenant;

        this.mettreAJourPosition(deltaTemps);
        this.dessiner();

        if (this.state.enJeu) {
            this.animationFrame = requestAnimationFrame(this.boucleJeu);
        }
    }

    nouveauDepart = () =>
    {
          this.erreur = false;
               this.dernierTemps = 0;
        this.setState({
            mouseX: 0,
            mouseY: 0,
            tempsHors: 0,
            enJeu: false,
            compteARebours: 3,
            jeuCommence: false,
            tremblementActif: false
        }, this.demarrerCompteARebours)
      
    }


    mettreAJourPosition = (deltaTemps) => {
        const canvas = this.canvasRef.current;
        
        // Mise à jour de la position
        this.x += this.vitesseX;
        this.y += this.vitesseY;

        // Rebonds sur les bords
        if (this.x <= this.rayon || this.x >= canvas.width - this.rayon) {
            this.vitesseX = -this.vitesseX * (0.8 + Math.random() * 0.4);
            this.x = this.x <= this.rayon ? this.rayon : canvas.width - this.rayon;
        }
        if (this.y <= this.rayon || this.y >= canvas.height - this.rayon) {
            this.vitesseY = -this.vitesseY * (0.8 + Math.random() * 0.4);
            this.y = this.y <= this.rayon ? this.rayon : canvas.height - this.rayon;
        }

        // Vérifier si la souris est hors du cercle
        const distance = Math.sqrt(
            Math.pow(this.state.mouseX - this.x, 2) + 
            Math.pow(this.state.mouseY - this.y, 2)
        );
        
        if (distance > this.rayon) {
            
            this.setState(state => ({
                tempsHors: state.tempsHors + deltaTemps / 1000,
                tremblementActif: true,
                enJeu: false
            }));
               cancelAnimationFrame(this.animationFrame);
               if (!this.erreur)
               {
             
               this.erreur = true;
               }
       
        } 
    }

    // demarrerTremblement = () => {
    //     if (!this.state.tremblementActif) return;
        
    //     const container = this.canvasRef.current.parentElement;
    //     container.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        
    //     setTimeout(() => {
    //         if (this.state.tremblementActif) {
    //             container.style.transform = 'none';
    //         }
    //     }, 50);
    // }

    dessiner = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner le cercle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
        ctx.closePath();
    }

    arreterJeu = () => {
        this.setState({ enJeu: false });
        cancelAnimationFrame(this.animationFrame);
        message.success(`Temps hors cible : ${this.state.tempsHors.toFixed(2)} secondes`);
    }

    render() {
      

        return (
            <React.Fragment>
                <div className='centre'>
                       <div>Appuie sur le mot (smartphone) ou tape sur la barre espace (PC) si l'affirmation est VRAIE.</div>
                    <div>{this.state.question}</div>
                 
                </div>
            <div className={this.state.tremblementActif ? 'erreurDoigt' : undefined} >
                <canvas
                    ref={this.canvasRef}
                    style={{
                        width: '100%',
                        height: '400px',
                        border: '2px solid #333'
                    }}
                />
                   {this.state.jeuCommence && (
                    <div style={{ margin: '20px' }}>
                        <p>Temps hors cible : {this.state.tempsHors.toFixed(2)} secondes</p>
                        <button onClick={this.arreterJeu}>Arrêter le jeu</button>
                    </div>
                )}
            </div>
         
            {!this.state.jeuCommence &&
            
               <div className="compte-rebours" style={{ 
                    textAlign: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px'
                }}>
                    <p>Place ton doigt ou la souris au centre du cercle et suis les mouvements</p>
                    <h2>Le jeu commence dans</h2>
                    <h1 style={{ fontSize: '48px' }}>{this.state.compteARebours}</h1>
                </div>
            }
            
            </React.Fragment>
        );
    }
}
