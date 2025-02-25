import React, { useState, useEffect, useRef } from 'react';
import parcours from '../../../images/parcours.png'

const NUMBER_OF_PIPES = 4; // Nombre de pipes à afficher


export default function JeuParcours({nbPipes ,jeuReussi, espacePipe}) {
    const gameWidth = 360;
    const gameHeight = 400;
    const birdSize = 30;
    const pipeWidth = 60;
    const pipeGap = 140;
    const gravity = 0.5;
    const jumpStrength = -8;
    const moveSpeed = 5;
    const PIPE_SPACING = espacePipe; // Distance entre chaque pipe

    const [birdY, setBirdY] = useState(150);
    const [birdX, setBirdX] = useState(50);
    const [velocity, setVelocity] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [pipes, setPipes] = useState([]);
    const [pipesPassed, setPipesPassed] = useState(0);
    const [gameWon, setGameWon] = useState(false);

        const handleMouseDown = (e) => {
            setVelocity(jumpStrength);
        }
  
   
        useEffect(() => {
        if (isGameOver) return;


        const gameInterval = setInterval(() => {
            setBirdY((prevY) => prevY + velocity);
            setVelocity((prevVel) => prevVel + gravity);

              if (birdY >= gameHeight - birdSize || birdY <= 0) 
                {
                    setIsGameOver(true);
                    restartGame()
                }

            setPipes((prevPipes) =>
                prevPipes.map((pipe) => ({ ...pipe, x: pipe.x - 3 })).filter((pipe) => pipe.x + pipeWidth > 0)
            );


            pipes.forEach((pipe) => {
                if (
                    birdX < pipe.x + pipeWidth &&
                    birdX + birdSize > pipe.x &&
                    (birdY < pipe.height || birdY > pipe.height + pipeGap)
                ) {
                      setIsGameOver(true);
                     restartGame();
                }
            });

            // Vérifier les pipes passés
            pipes.forEach(pipe => {
                if (pipe.x + pipeWidth < birdX && !pipe.counted) {
                    setPipesPassed(prev => {
                        if (prev + 1 >= nbPipes) {
                            setGameWon(true);
                           jeuReussi();
                        }
                        return prev + 1;
                    });
                    pipe.counted = true;
                }
            });
        }, 30);

        return () => {
        
            clearInterval(gameInterval);
        };
    }, [birdY, birdX, velocity, isGameOver, pipes]);

    // Modifier la fonction generatePipes pour générer un seul nouveau pipe
    const generatePipe = () => {
        const pipeHeight = Math.floor(Math.random() * (gameHeight - pipeGap - 50)) + 20;
        return {
            x: gameWidth,
            height: pipeHeight
        };
    };

    // Dans useEffect pour la mise à jour des pipes
    useEffect(() => {
        if (pipes.length === 0) {
            // Générer le premier pipe
            setPipes([generatePipe()]);
        }
        
        // Si le dernier pipe a dépassé une certaine position, en ajouter un nouveau
        const lastPipe = pipes[pipes.length - 1];
        if (lastPipe && lastPipe.x <= gameWidth - PIPE_SPACING) {
            setPipes(prevPipes => [...prevPipes, generatePipe()]);
        }

        // Nettoyer les pipes qui sont sortis de l'écran
        if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
            setPipes(prevPipes => prevPipes.slice(1));
        }
    }, [pipes]);

    const restartGame = () => {
        setBirdY(150);
        setBirdX(50);
        setVelocity(0);
        setPipes([]);
        setIsGameOver(false);
        setPipesPassed(0);
        setGameWon(false);
    };

    return (
        <React.Fragment>
        <div className="game-container" onMouseDown={handleMouseDown} style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                color: 'white',
                fontSize: '24px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontWeight: 'bold'
            }}>
                Tuyaux passés : {pipesPassed}/{nbPipes}
            </div>
            
            {/* Message de fin */}
            {/* {isGameOver && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '20px',
                    borderRadius: '10px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <h2>{gameWon ? "Victoire !" : "Game Over!"}</h2>
                    <button onClick={restartGame}>Recommencer</button>
                </div>
            )} */}
            
            {/* ...existing game elements... */}
            <div className="bird" style={{ top: `${birdY}px`, left: `${birdX}px` }}></div>
            {pipes.map((pipe, index) => (
                <div key={index}>
                    <div className="pipe pipe-top" style={{ left: `${pipe.x}px`, height: `${pipe.height}px` }}></div>
                    <div className="pipe pipe-bottom" style={{ left: `${pipe.x}px`, top: `${pipe.height + pipeGap}px`, height: `${gameHeight - pipe.height - pipeGap}px` }}></div>
                </div>
            ))}
        </div>
        <div className='centre margeHaut'>Clique sur le bouton gauche ou tape sur l'écran de ton smartphone pour faire rebondir le ballon jaune et passer entre les tuyaux.</div>
        </React.Fragment>
    );
};
