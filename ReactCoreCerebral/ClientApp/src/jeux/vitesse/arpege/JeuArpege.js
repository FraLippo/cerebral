import React, { Component } from 'react';
import './JeuArpege.css';
import defaultArp from './data';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
class JeuArpege extends Component {
    constructor(props) {
        super(props);
        this.audioContext = null;
        this.fxBus = null;
        const arr = Array.from({ length: defaultArp.length }, (_, i) => i);
        this.dataLevels = this.buildDataGame();
        this.gameNb = 0;
        // no external samples used — use worklet/oscillator fallback
        this.state = {
            grid: Array.from({ length: 3 }, () => Array(16).fill(false)),
            currentStep: 0,
            isPlaying: false,
            bpm: this.dataLevels[this.gameNb].bpm,

            liveNote: null, // currently played live note label
            liveHits: Array.from({ length: 3 }, () => Array(16).fill(false)),
            metronomeOn: false,
            countdown: null,
            isMobile: false,
            muteNotes: false,
            endGame : false,
            
        };
        this.score = 0;
        //  this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.intervalId = null;
    }

    buildDataGame() {
        let arrayLevels = ['facile', 'moyen', 'difficile', 'hard'];
        let dataLevels = [];
        arrayLevels.forEach(f => {
            dataLevels.push(defaultArp[f][Math.floor(Math.random() * defaultArp[f].length)])

        });
      
   
        return dataLevels;
    }
    findArpeggio = () => {
        const arp = this.dataLevels[this.gameNb];
        if (arp.notes && Array.isArray(arp.notes) && arp.notes.length) {
            this.loadArpeggio(arp.notes);
        }
    }

    nextGame = () => {
        // advance to next game and reset runtime state
        this.gameNb++;
        if (this.gameNb === this.dataLevels.length) {
            this.unmountAll();
            this.score += 30;
            this.setState({endGame : true});
            return;
        }
        // stop any running intervals/sequence/metronome
        try { this.stopSequence(); } catch (e) {}
        try { this.stopMetronome(); } catch (e) {}
        // clear count-in timeouts
        if (this.countInTimeouts) { this.countInTimeouts.forEach(t => t && clearTimeout(t)); this.countInTimeouts = null; }
        // clear live hit timeouts
        if (this.liveHitTimeouts) { this.liveHitTimeouts.forEach(row => row.forEach(t => t && clearTimeout(t))); }
        // reset internal match tracking
        this.matchMatrix = Array.from({ length: 3 }, () => Array(16).fill(false));
        this.falseHit = false;
        this.setState(
            {
                currentStep: 0,
                isPlaying: false,
                bpm: this.dataLevels[this.gameNb].bpm,
                liveNote: null,
                liveHits: Array.from({ length: 3 }, () => Array(16).fill(false)),
                countdown: null
            }
        )
        // load next arpeggio
        this.findArpeggio();
    }
    unmountAll = () =>
    {
          this.stopSequence();
        if (this.metronomeIntervalId) {
            clearInterval(this.metronomeIntervalId);
            this.metronomeIntervalId = null;
        }
        if (this._handleResize) window.removeEventListener('resize', this._handleResize);
        // clear any count-in timeouts
        if (this.countInTimeouts) {
            this.countInTimeouts.forEach(t => t && clearTimeout(t));
            this.countInTimeouts = null;
        }
        if (this.audioContext && this.audioContext.close) {
            // Do not force-close; leave it for reuse
        }
        // remove keyboard listener
        if (this._handleKeyDown) window.removeEventListener('keydown', this._handleKeyDown);
        if (this.liveNoteTimeout) clearTimeout(this.liveNoteTimeout);
        // clear live hit timers
        if (this.liveHitTimeouts) {
            this.liveHitTimeouts.forEach(row => row.forEach(t => t && clearTimeout(t)));
        }
    
    }
    componentWillUnmount() {
      this.unmountAll();
    }

    componentDidMount = async () => {

        // Init une seule fois
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                latencyHint: "interactive"
            });

            this.fxBus = this.audioContext.createGain();
            this.fxBus.gain.value = 0.35;
            this.fxBus.connect(this.audioContext.destination);

            // Preload samples for Do / Mi / Sol (c2, e2, g2)
            this.buffers = {};
            const files = ['c2.wav', 'e2.wav', 'g2.wav'];
            for (let i = 0; i < files.length; i++) {
                const name = files[i];
                try {
                    const url = `${process.env.PUBLIC_URL || ''}/sons/${name}`;
                    const res = await fetch(url);
                    if (!res.ok) {
                        console.warn('Error loading sample', name, 'status:', res.status, url);
                        this.buffers[i] = null;
                        continue;
                    }
                    const arrayBuffer = await res.arrayBuffer();
                    try {
                        const decoded = await this.audioContext.decodeAudioData(arrayBuffer);
                        this.buffers[i] = decoded;
                    } catch (decErr) {
                        console.warn('decodeAudioData failed for', url, decErr);
                        this.buffers[i] = null;
                    }
                } catch (err) {
                    console.warn('Error fetching sample', name, err);
                    this.buffers[i] = null;
                }
            }
        }


        this.findArpeggio();


        // keyboard support: F = Do, G = Mi, H = Sol
        this._handleKeyDown = (e) => {
            if (!e || !e.key) return;
            const tag = e.target && e.target.tagName;
            const k = e.key.toLowerCase();
            if (k === 'f') this.handleLiveNoteByRow(0);
            if (k === 'g') this.handleLiveNoteByRow(1);
            if (k === 'h') this.handleLiveNoteByRow(2);
              if (k === "enter") {
    e.preventDefault(); 
    this.startStopSequence();
  }
        };
        window.addEventListener('keydown', this._handleKeyDown);
        // responsive layout detection
        this._handleResize = () => this.setState({ isMobile: window.innerWidth <= 700 });
        this._handleResize();
        window.addEventListener('resize', this._handleResize);
        // prepare structure to keep live-hit timeouts
        this.liveHitTimeouts = Array.from({ length: 3 }, () => Array(16).fill(null));
        // prepare match matrix for player reproduction detection
        this.matchMatrix = Array.from({ length: 3 }, () => Array(16).fill(false));
        // flag to track if player made any incorrect hit during the current pass
        this.falseHit = false;
    }

    playNoteByRow = async (row) => {


        // Déblocage audio navigateur (try to resume but don't await to avoid extra JS tick)
        if (this.audioContext.state !== "running") {
            this.audioContext.resume().catch(() => { });
        }

        const now = this.audioContext.currentTime;

        // Prefer sample playback of preloaded buffers for minimal latency and consistent sound
        const buffer = (this.buffers && this.buffers[row]) ? this.buffers[row] : null;
        if (buffer) {
            try {
                const src = this.audioContext.createBufferSource();
                src.buffer = buffer;
                // small per-trigger gain to avoid clicks and allow overlapping voices
                const g = this.audioContext.createGain();
                const startTime = this.audioContext.currentTime + 0.001;
                g.gain.setValueAtTime(0.0001, startTime);
                g.gain.linearRampToValueAtTime(0.9, startTime + 0.006);
                // connect and start
                src.connect(g);
                g.connect(this.fxBus);
                src.start(startTime);
                // stop slightly after buffer ends to ensure full playback
                src.stop(startTime + (buffer.duration || 0) + 0.05);
            } catch (err) {
                console.warn('Sample playback failed, falling back to oscillator', err);
                // fall through to oscillator fallback below
            }
            return;
        }

        // Fallback: play a short oscillator tone
        const freqs = [261.63, 329.63, 392.0];
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.value = freqs[row] || 261.63;
        const now2 = this.audioContext.currentTime;
        gain.gain.setValueAtTime(0.0001, now2);
        gain.gain.linearRampToValueAtTime(0.6, now2 + 0.005);
        gain.gain.linearRampToValueAtTime(0.0001, now2 + 0.18);
        osc.connect(gain);
        gain.connect(this.fxBus);
        osc.start(now2);
        osc.stop(now2 + 0.18 + 0.02);
    };


    handleLiveNoteByRow = (rowIndex) => {
        const labels = ['Kick', 'Hi-Hat', 'Snare'];
        // show live note label briefly
        this.setState({ liveNote: labels[rowIndex] });
        if (this.liveNoteTimeout) clearTimeout(this.liveNoteTimeout);
        this.liveNoteTimeout = setTimeout(() => this.setState({ liveNote: null }), 600);
        // if sequence is playing, flash the cell at the current step
        if (this.state.isPlaying) {
            const col = this.state.currentStep;
            // compute ms until end of measure (remaining steps * msPerStep)
            const msPerStep = (60 / this.state.bpm) * 1000 / 2; // eighth notes
            const remainingSteps = (16 - this.state.currentStep);
            const msUntilMeasureEnd = Math.max(0, remainingSteps * msPerStep);
            this.flashLiveHit(rowIndex, col, msUntilMeasureEnd);
            // mark match if player hit the active cell at the correct time
            if (this.state.grid && this.state.grid[rowIndex] && this.state.grid[rowIndex][col]) {
                if (!this.matchMatrix) this.matchMatrix = Array.from({ length: 3 }, () => Array(16).fill(false));
                this.matchMatrix[rowIndex][col] = true;
            } else {
                // incorrect hit on this step (player played a note where none was required)
                this.falseHit = true;
            }
        }
        // play sound unless muted
        if (!this.state.muteNotes) this.playNoteByRow(rowIndex);
    };

    playMetronomeClick = () => {
        // kept for backward compatibility; prefer playMetronomeClick(strength)
    };

    playMetronomeClick = (strength = 'normal') => {
        if (!this.audioContext) return;
        if (this.audioContext.state !== 'running') this.audioContext.resume().catch(() => { });
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const g = this.audioContext.createGain();
        osc.type = 'sine';
        // keep same timbre; only change amplitude/duration for accents
        osc.frequency.value = 1500;
        if (strength === 'strong') {
            g.gain.setValueAtTime(0.0001, now);
            g.gain.linearRampToValueAtTime(1.0, now + 0.001);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
            osc.connect(g);
            g.connect(this.fxBus);
            osc.start(now);
            osc.stop(now + 0.11);
        } else {
            g.gain.setValueAtTime(0.0001, now);
            g.gain.linearRampToValueAtTime(0.7, now + 0.001);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
            osc.connect(g);
            g.connect(this.fxBus);
            osc.start(now);
            osc.stop(now + 0.07);
        }
    };

    startMetronome = () => {
    
        if (this.metronomeIntervalId) return;
        const msPerBeat = (60 / this.state.bpm) * 1000; // quarter notes
        // If sequence is playing, rely on playStep to trigger metronome accents
        if (this.state.isPlaying) {
            // trigger immediate click corresponding to current step
            const cs = this.state.currentStep || 0;
            const isStrong = (cs === 0 || cs === 8);
            this.playMetronomeClick(isStrong ? 'strong' : 'normal');
            return;
        }

        //   this.metronomeIntervalId = setInterval(() => this.playMetronomeClick(), msPerBeat);
    };

    stopMetronome = () => {
     
        if (this.metronomeIntervalId) {
            clearInterval(this.metronomeIntervalId);
            this.metronomeIntervalId = null;
        }
    };

    toggleMetronome = () => {
        this.setState((prev) => ({ metronomeOn: !prev.metronomeOn }), () => {
            if (this.state.metronomeOn) this.startMetronome(); else this.stopMetronome();
        });
    };

    flashLiveHit = (row, col, duration = 400) => {
        if (row < 0 || row > 2 || col < 0 || col > 15) return;
        // set liveHits[row][col] = true
        this.setState((prev) => {
            const liveHits = prev.liveHits.map(r => r.slice());
            liveHits[row][col] = true;
            return { liveHits };
        });
        // clear any existing timeout
        if (!this.liveHitTimeouts) this.liveHitTimeouts = Array.from({ length: 3 }, () => Array(16).fill(null));
        if (this.liveHitTimeouts[row][col]) clearTimeout(this.liveHitTimeouts[row][col]);
        this.liveHitTimeouts[row][col] = setTimeout(() => {
            this.setState((prev) => {
                const liveHits = prev.liveHits.map(r => r.slice());
                liveHits[row][col] = false;
                return { liveHits };
            });
            this.liveHitTimeouts[row][col] = null;
        }, duration);
    };
    finTimer = () => {
      this.unmountAll();
        this.setState({endGame : true});
    }
  


    // Load an arpeggio array of objects like {note: 'c', place: 1}
    // Supports place 1..16 (direct step) or 1..8 (croche -> mapped to even columns)
    loadArpeggio = (arpArray) => {
        const newGrid = Array.from({ length: 3 }, () => Array(16).fill(false));
        arpArray.forEach((item) => {
            if (!item || typeof item.place !== 'number') return;
            const rawPlace = Math.floor(item.place);
            let col = null;
            if (rawPlace >= 1 && rawPlace <= 16) {
                col = rawPlace - 1; // direct mapping 1..16 -> 0..15
            } else if (rawPlace >= 1 && rawPlace <= 8) {
                col = (rawPlace - 1) * 2; // fallback mapping for 1..8
            }
            if (col === null) return;
            const note = (item.note || '').toLowerCase();
            const rowMap = { c: 0, do: 0, e: 1, mi: 1, g: 2, sol: 2 };
            const row = rowMap[note];
            if (row !== undefined) newGrid[row][col] = true;
        });
        this.setState({ grid: newGrid });
    };


    togglePad = (row, col) => {
        this.setState((prevState) => {
            const newGrid = prevState.grid.map((r) => r.slice());
            newGrid[row][col] = !newGrid[row][col];
            return { grid: newGrid };
        });
    };

    // Pointer/touch handling: use pointerdown to avoid delayed/touch->click offset issues
    handlePadPointer = (e, row, col) => {
        if (e && e.preventDefault) e.preventDefault();
        // suppress the following click event that some browsers emit after touch
        this._suppressNextClick = true;
        this.togglePad(row, col);
    };

    handlePadClick = (e, row, col) => {
        // ignore click if it follows a pointer/touch we already handled
        if (this._suppressNextClick) {
            this._suppressNextClick = false;
            return;
        }
        this.togglePad(row, col);
    };


    startStopSequence = () => {
        if (this.state.isPlaying) {
            this.stopSequence();
        } else {
            // resume audio context if suspended
            if (this.audioContext.state === 'suspended' && this.audioContext.resume) {
                this.audioContext.resume();
            }
            this.startSequence();
        }
    };

    startSequence = () => {
        // Each grid cell represents a croche (eighth note)
        const msPerStep = (60 / this.state.bpm) * 1000 / 2; // eighth notes
        // If metronome is on, perform a 4-beat count-in (4 3 2 1) at quarter-note tempo
        const startAfterCountIn = async () => {
            // if metronome enabled, run count-in; otherwise start immediately

            await this.startCountIn();

            this.setState({ isPlaying: true, currentStep: 15 }, () => {
                // if metronome interval exists (metronome running while not playing), stop it
                if (this.metronomeIntervalId) {
                    clearInterval(this.metronomeIntervalId);
                    this.metronomeIntervalId = null;
                }
                // reset match matrix at sequence start
                this.matchMatrix = Array.from({ length: 3 }, () => Array(16).fill(false));
                this.falseHit = false;
                this.playStep();
                this.intervalId = setInterval(this.playStep, msPerStep);
            });
        };
        startAfterCountIn();
    };

    startCountIn = () => {
        // returns a Promise resolving after 4 quarter-note clicks (showing 4..1)
        return new Promise((resolve) => {
            const beats = [4, 3, 2, 1];
            const msPerBeat = (60 / this.state.bpm) * 1000; // quarter notes
            this.countInTimeouts = [];
            beats.forEach((num, idx) => {
                const t = setTimeout(() => {
                    // show countdown number
                    this.setState({ countdown: num });
                    // play click; make the final '1' slightly stronger
                    const strength = (num === 1) ? 'strong' : 'normal';
                    this.playMetronomeClick(strength);
                }, idx * msPerBeat);
                this.countInTimeouts.push(t);
            });
            // finish after 4 beats
            const endTimeout = setTimeout(() => {
                this.setState({ countdown: null });
                this.countInTimeouts.forEach(t => t && clearTimeout(t));
                this.countInTimeouts = null;
                resolve();
            }, beats.length * msPerBeat);
            this.countInTimeouts.push(endTimeout);
        });
    };

    stopSequence = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.setState({ isPlaying: false });
    };

    playStep = () => {
        // Advance the playhead only. Do NOT play notes automatically.
        this.setState((prev) => ({ currentStep: (prev.currentStep + 1) % 16 }), () => {
            if (this.state.metronomeOn) {
                const cs = this.state.currentStep;
                // accent on start of measures (indices 0 and 8 for two 8-step measures)
                if (cs === 0 || cs === 8) {
                    this.playMetronomeClick('strong');
                } else if (cs % 2 === 0) {
                    // quarter-note positions (even indices) get normal click
                    this.playMetronomeClick('normal');
                }
            }
            // If we just wrapped to step 0, check if player matched all active cells in the previous pass
            if (this.state.currentStep === 0) {
                let allMatched = true;
                const grid = this.state.grid || Array.from({ length: 3 }, () => Array(16).fill(false));
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 16; c++) {
                        if (grid[r][c]) {
                            if (!this.matchMatrix || !this.matchMatrix[r] || !this.matchMatrix[r][c]) {
                                allMatched = false;
                                break;
                            }
                        }
                    }
                    if (!allMatched) break;
                }
                if (allMatched) {
                            // only win if no incorrect hits occurred during the pass
                            if (!this.falseHit) {
                                message.success(`Etape ${this.gameNb+1}/${this.dataLevels.length} passée`, 1);
                                this.score +=20;
                                this.nextGame();
                            }
                }
                // reset match matrix for next pass
                        this.matchMatrix = Array.from({ length: 3 }, () => Array(16).fill(false));
                        this.falseHit = false;
            }
        });
    };

    handleBpmChange = (e) => {
        const newBpm = Number(e.target.value);
        const wasPlaying = this.state.isPlaying;
        this.setState({ bpm: newBpm }, () => {
            if (wasPlaying) {
                // restart interval with new tempo
                this.stopSequence();
                this.startSequence();
            }
            // if metronome running, restart it with new tempo
            if (this.state.metronomeOn) {
                this.stopMetronome();
                this.startMetronome();
            }
        });
    };

    render() {
        const notes = ['Kick', 'Hi-Hat', 'Snare'];
        const { grid, currentStep, isPlaying, bpm} = this.state;

        return (
              this.state.endGame ?
                            <Resultat score={this.score} typeExo='vitessebar'></Resultat> :
            <div className="sequencer-wrapper">
                <div className="sequencer-box">
                    <div className="sequencer-grid">
                        {this.state.isMobile ? (
                            // Mobile: transpose layout -> rows are steps (16), columns are notes (3)
                            Array.from({ length: 16 }).map((_, stepIndex) => (
                                <div key={stepIndex} className="sequencer-row">
                                    <div className="row-label">{stepIndex + 1}</div>
                                    <div className="pads">
                                        {[0, 1, 2].map((rowIndex) => {
                                            const active = grid[rowIndex][stepIndex];
                                            const isLive = this.state.liveHits && this.state.liveHits[rowIndex] && this.state.liveHits[rowIndex][stepIndex];
                                            const padClass = `pad ${active ? 'active' : ''} ${isPlaying && currentStep === stepIndex ? 'current' : ''} ${isLive ? 'live-hit' : ''}`;
                                            return (
                                                <div
                                                    key={rowIndex}
                                                    className={padClass}
                                                >
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            grid.map((row, rowIndex) => (
                                <div key={rowIndex} className="sequencer-row">
                                    <div className="row-label">{notes[rowIndex]}</div>
                                    <div className="pads">
                                        {row.map((active, colIndex) => {
                                            const isLive = this.state.liveHits && this.state.liveHits[rowIndex] && this.state.liveHits[rowIndex][colIndex];
                                            const padClass = `pad ${active ? 'active' : ''} ${isPlaying && currentStep === colIndex ? 'current' : ''} ${isLive ? 'live-hit' : ''}`;
                                            return (
                                                <div
                                                    key={colIndex}
                                                    className={padClass}
                                                >
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>



                    <div className="live-controls" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <button className="btn pad-btn piano-key" onClick={() => this.handleLiveNoteByRow(0)}>Kick (F)</button>
                            <button className="btn pad-btn piano-key" onClick={() => this.handleLiveNoteByRow(1)}>Hi-Hat (G)</button>
                            <button className="btn pad-btn piano-key" onClick={() => this.handleLiveNoteByRow(2)}>Snare (H)</button>
                        </div>
                        {!this.state.isMobile && <div style={{ textAlign: 'center', color: '#475569' }}>Cliquez sur les boutons ou utilisez les touches <strong>f / g / h</strong> du clavier.</div>}

                    </div>
                    <div className="controls">
                        <button className="btn" onClick={this.startStopSequence}>{isPlaying ? 'Stop' : 'Start ↵'}</button>
                        {/* <label className="bpm">
                            BPM
                            <input type="range" min="30" max="200" value={bpm} onChange={this.handleBpmChange} />
                            <span className="bpm-value">{bpm}</span>
                        </label> */}

                        <button className="btn" onClick={this.toggleMetronome}>{this.state.metronomeOn ? 'Stop' : 'Métronome'}</button>
                        <button className="btn" onClick={() => this.setState((s) => ({ muteNotes: !s.muteNotes }))}>{this.state.muteNotes ? 'Activer sons' : 'Couper sons'}</button>
                    </div>
                    <div className='centre'>BPM : <strong>{this.state.bpm}</strong></div>
                    {this.state.countdown && <div className="countdown-display">{this.state.countdown}</div>}
            <div className='centre marginTop10'><CompteRebours temps={80} finTimer={this.finTimer}></CompteRebours></div>

                </div>
            </div>
                        
        );
    }
}

export default JeuArpege;