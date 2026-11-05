import React, { Component } from 'react';
import './JeuMastermind.css';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { message } from 'antd';

const COLORS = [
  { id: 'coral', name: 'Corail' },
  { id: 'blue', name: 'Bleu' },
  { id: 'gold', name: 'Jaune' },
  { id: 'green', name: 'Vert' },
  { id: 'purple', name: 'Violet' },
  { id: 'pink', name: 'Rose' },
];

const TURN_LIMIT = 5;
const CODE_LENGTH = 4;

function createSecretCode() {
  return [...COLORS]
    .sort(() => Math.random() - 0.5)
    .slice(0, CODE_LENGTH)
    .map(color => color.id);
}

function getFeedback(secret, guess) {
  const feedback = Array(CODE_LENGTH).fill('absent');
  const remainingSecret = [];
  const remainingGuess = [];

  guess.forEach((color, index) => {
    if (color === secret[index]) {
      feedback[index] = 'exact';
    } else {
      remainingSecret.push(secret[index]);
      remainingGuess.push({ color, index });
    }
  });

  remainingGuess.forEach(({ color, index }) => {
    const matchIndex = remainingSecret.indexOf(color);
    if (matchIndex !== -1) {
      feedback[index] = 'misplaced';
      remainingSecret.splice(matchIndex, 1);
    }
  });

  return feedback;
}

function getUnavailableColors(guesses, activeGuess) {
  const absentColors = new Set();

  guesses.forEach(({ colors, feedback }) => {
    colors.forEach((color) => {
      const colorSlots = colors.reduce((slots, guessedColor, index) => {
        if (guessedColor === color) slots.push(index);
        return slots;
      }, []);

      if (colorSlots.every((index) => feedback[index] === 'absent')) {
        absentColors.add(color);
      }
    });
  });

  const unavailableColors = new Set(absentColors);
  activeGuess.forEach((color) => {
    if (color) unavailableColors.add(color);
  });

  return { absentColors, unavailableColors };
}

class FeedbackPegs extends Component {
  render() {
    const { feedback, index } = this.props;
    if (!feedback) return null;

    const symbols = {
      absent: '×',
      exact: '👍',
      misplaced: '👎',
    };

    return (
      <span
        className={`mastermind-feedback-mark is-${feedback}`}
        aria-hidden="true"
        style={{ animationDelay: `${index * 55}ms` }}
      >
        {symbols[feedback]}
      </span>
    );
  }
}

class GameRow extends Component {
  render() {
    const {
      attempt,
      colors,
      feedback,
      isActive,
      selectedSlot,
      onSelectSlot,
    } = this.props;

    return (
      <div className={`mastermind-row${isActive ? ' is-active' : ''}${feedback ? ' is-submitted' : ''}`}>
        <span className="mastermind-attempt-number" aria-label={`Tentative ${attempt}`}>
          {String(attempt).padStart(2, '0')}
        </span>
        <div className="mastermind-slots">
          {Array.from({ length: CODE_LENGTH }, (_, index) => {
            const color = colors[index];
            const colorName = COLORS.find((item) => item.id === color)?.name;

            return (
              <button
                className={`mastermind-slot${isActive && selectedSlot === index ? ' is-selected' : ''}${color ? ` color-${color}` : ''}`}
                key={index}
                type="button"
                onClick={() => isActive && onSelectSlot(index)}
                disabled={!isActive}
                aria-label={color
                  ? `Emplacement ${index + 1}${colorName ? `, ${colorName}` : ''}${feedback?.[index] === 'exact' ? ', bonne place' : feedback?.[index] === 'misplaced' ? ', bonne couleur, mauvaise place' : feedback?.[index] === 'absent' ? ', couleur absente' : isActive ? ', sélectionner pour modifier' : ''}`
                  : `Emplacement ${index + 1}${isActive ? ', vide, sélectionner' : ', vide'}`}
              >
                <FeedbackPegs feedback={feedback?.[index]} index={index} />
                {/* {isActive && color && selectedSlot === index && (
                  <span className="mastermind-slot-check" aria-hidden="true">✓</span>
                )} */}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

class GameBoard extends Component {
  render() {
    const { guesses, activeGuess, activeSlot, gameStatus, onSelectSlot } = this.props;
    const activeAttempt = guesses.length + 1;

    return (
      <div className="mastermind-board" aria-label="Plateau de jeu">
        <div className="mastermind-board-heading" aria-hidden="true">
          <span>ESSAI</span>
          <span>COMBINAISON</span>
        </div>
        {Array.from({ length: TURN_LIMIT }, (_, index) => {
          const guess = guesses[index];
          const attempt = index + 1;
          const isActive = !guess && attempt === activeAttempt && gameStatus === 'playing';

          return (
            <GameRow
              key={attempt}
              attempt={attempt}
              colors={guess ? guess.colors : isActive ? activeGuess : []}
              feedback={guess ? guess.feedback : null}
              isActive={isActive}
              selectedSlot={isActive ? activeSlot : -1}
              onSelectSlot={onSelectSlot}
            />
          );
        })}
      </div>
    );
  }
}

class ColorPalette extends Component {
  render() {
    const {
      selectedColor,
      absentColors,
      unavailableColors,
      onChooseColor,
      onClearSlot,
      canClear,
    } = this.props;

    return (
      <section className="mastermind-palette" aria-label="Palette de couleurs">
        <div className="mastermind-palette-heading">
          <div>
            <h2>Choisissez vos couleurs</h2>
       </div>
       
        </div>
        <div className="mastermind-color-options">
          {COLORS.map((color) => (
            <button
              className={`mastermind-color-option color-${color.id}${selectedColor === color.id ? ' is-chosen' : ''}`}
              key={color.id}
              type="button"
              onClick={() => onChooseColor(color.id)}
              disabled={unavailableColors.has(color.id)}
              aria-label={`Choisir la couleur ${color.name}${unavailableColors.has(color.id) ? ', indisponible' : ''}`}
              aria-pressed={selectedColor === color.id}
              title={absentColors.has(color.id)
                ? `${color.name} : couleur absente`
                : unavailableColors.has(color.id)
                  ? `${color.name} : déjà utilisée dans cette tentative`
                  : color.name}
            >
              {/* {selectedColor === color.id && <span aria-hidden="true">✓</span>} */}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

export default class JeuMastermind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretCode: createSecretCode(),
      guesses: [],
      activeGuess: Array(CODE_LENGTH).fill(null),
      activeSlot: 0,
      lastFilledSlot: null,
      selectedPaletteColor: null,
      gameStatus: 'playing',
      finJeu: false,
      victory : 0
    };
    this.score = 0;
   
  }

  selectSlot = (index) => {
    this.setState((state) => {
      const color = state.activeGuess[index];

      if (!color) {
        return {
          activeSlot: index,
          lastFilledSlot: null,
        };
      }

      const activeGuess = [...state.activeGuess];
      activeGuess[index] = null;

      return {
        activeGuess,
        activeSlot: index,
        lastFilledSlot: null,
        selectedPaletteColor: color,
      };
    });
  };

  chooseColor = (color) => {
    this.setState((state) => {
      if (state.gameStatus !== 'playing') return null;
      const { unavailableColors } = getUnavailableColors(
        state.guesses,
        state.activeGuess,
      );
      if (unavailableColors.has(color)) return null;

      const activeGuess = [...state.activeGuess];
      const selectedSlot = state.activeSlot;
      activeGuess[selectedSlot] = color;
      const nextEmptySlot = Array.from(
        { length: CODE_LENGTH },
        (_, offset) => (selectedSlot + offset + 1) % CODE_LENGTH,
      ).find((index) => activeGuess[index] === null);

      return {
        activeGuess,
        lastFilledSlot: selectedSlot,
        selectedPaletteColor: color,
        activeSlot: nextEmptySlot === undefined
          ? state.activeSlot
          : nextEmptySlot,
      };
    });
  };

  clearSlot = () => {
    this.setState((state) => {
      if (state.gameStatus !== 'playing') return null;

      const slotToClear = state.activeGuess[state.activeSlot]
        ? state.activeSlot
        : state.lastFilledSlot;
      if (slotToClear === null || !state.activeGuess[slotToClear]) return null;

      const activeGuess = [...state.activeGuess];
      activeGuess[slotToClear] = null;
      return {
        activeGuess,
        activeSlot: slotToClear,
        lastFilledSlot: null,
        selectedPaletteColor: null,
      };
    });
  };
  newGame = () =>
  {
    this.startNewGame();
  }

    endGame = () =>
  {
     this.setState({
            finJeu: true
        });
  }
  submitGuess = () => {
    this.setState((state) => {
      if (state.gameStatus !== 'playing' || state.activeGuess.some((color) => !color)) {
        return null;
      }

      const guess = [...state.activeGuess];
      const feedback = getFeedback(state.secretCode, guess);
      const guesses = [...state.guesses, { colors: guess, feedback }];
   
      const won = feedback.filter((peg) => peg === 'exact').length === CODE_LENGTH;
      const lost = !won && guesses.length === TURN_LIMIT;
    
      if (won) 
      {
          this.score += 30;
      
        if (this.state.victory === 3)
        {
            this.score += 30;
             message.success('Bravo, terminé !', 2, this.endGame);
        }else
        {
              message.success('Bravo !', 1.5, this.newGame);
        }
      }
       if (lost) message.success("Tu n'as pas trouvé !", 2.5, this.newGame);
      return {
        guesses,
        activeGuess: Array(CODE_LENGTH).fill(null),
        activeSlot: 0,
        lastFilledSlot: null,
        selectedPaletteColor: null,
        gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
        victory : won ? state.victory + 1 : state.victory,
    
      };
    });
  };

  startNewGame = () => {
    this.setState({
      secretCode: createSecretCode(),
      guesses: [],
      activeGuess: Array(CODE_LENGTH).fill(null),
      activeSlot: 0,
      lastFilledSlot: null,
      selectedPaletteColor: null,
      gameStatus: 'playing',
    });
  };

  renderSecretCode() {
    return (
      <div className="mastermind-revealed-code" aria-label="Combinaison secrète">
        {this.state.secretCode.map((color, index) => {
          const colorName = COLORS.find((item) => item.id === color)?.name;
          return (
            <span
              className={`mastermind-secret-peg color-${color}`}
              key={`${color}-${index}`}
              title={colorName}
              aria-label={colorName}
            />
          );
        })}
      </div>
    );
  }

    finTimer = () =>
    {
        this.setState({
            finJeu: true
        });
    }

  render() {
    const {
      guesses,
      activeGuess,
      activeSlot,
      lastFilledSlot,
      selectedPaletteColor,
      gameStatus,
    } = this.state;
    const { absentColors, unavailableColors } = getUnavailableColors(
      guesses,
      activeGuess,
    );
    const canSubmit = activeGuess.every(Boolean) && gameStatus === 'playing';

    return (<React.Fragment>
    { this.state.finJeu ? <Resultat score={this.score} typeExo='vitessemastermind'></Resultat> :
        
      <main className="mastermind-page">
        <section className="mastermind-card" aria-labelledby="mastermind-title"> 
            <h1 className="titreJeu centre">Mastermind</h1>

          <div className="mastermind-legend" aria-label="Règles des indices">
            <span className="mastermind-legend-item">
              <i className="mastermind-legend-mark is-absent" aria-hidden="true">×</i>
              Couleur absente
            </span>
            <span className="mastermind-legend-item">
              <i className="mastermind-legend-mark is-exact" aria-hidden="true">👍</i>
              Bonne place
            </span>
            <span className="mastermind-legend-item">
              <i className="mastermind-legend-mark is-misplaced" aria-hidden="true">👎</i>
              Mauvaise place
            </span>
          </div>

          <GameBoard
            guesses={guesses}
            activeGuess={activeGuess}
            activeSlot={activeSlot}
            gameStatus={gameStatus}
            onSelectSlot={this.selectSlot}
          />

          {gameStatus === 'playing' ? (
            <>
              <ColorPalette
                selectedColor={selectedPaletteColor}
                absentColors={absentColors}
                unavailableColors={unavailableColors}
                onChooseColor={this.chooseColor}
                onClearSlot={this.clearSlot}
                canClear={Boolean(
                  activeGuess[activeSlot]
                  || (lastFilledSlot !== null && activeGuess[lastFilledSlot]),
                )}
              />
              <div>Victoire : {this.state.victory} / 3</div>
              <div className="mastermind-actions centre">
                <button
                  className="mastermind-submit-button"
                  type="button"
                  onClick={this.submitGuess}
                  disabled={!canSubmit}
                >
                  Vérifier la combinaison
                  <span aria-hidden="true">→</span>
                </button>
                
              </div>
              
            </>
          ) : (
            <section
              className={`mastermind-result ${gameStatus === 'won' ? 'is-won' : 'is-lost'}`}
              aria-live="polite"
            >
              <div className="mastermind-result-copy">
                <span className="mastermind-result-icon" aria-hidden="true">
                  {gameStatus === 'won' ? '✦' : '↻'}
                </span>
                <div>
                  <h2>{gameStatus === 'won' ? 'Code déchiffré !' : 'La partie est terminée'}</h2>
                  <p>
                    {gameStatus === 'won'
                      ? `Bravo, vous avez trouvé en ${guesses.length} essai${guesses.length > 1 ? 's' : ''}.`
                      : 'La combinaison secrète était :'}
                  </p>
                </div>
              </div>
           
              {this.renderSecretCode()}
             {/*  <button className="mastermind-new-game-button" type="button" onClick={this.startNewGame}>
                Nouvelle partie
              </button> */}
            </section>
          )}
  <div className='centre marge20'><CompteRebours temps={75} finTimer={this.finTimer}></CompteRebours></div>
          <footer className="mastermind-footer">
            <span className="mastermind-footer-mark" aria-hidden="true">M</span>
          </footer>
        </section>
      </main>}
      </React.Fragment>
    );
  }
}
