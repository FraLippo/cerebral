import React from 'react';
import { Button } from 'antd';

export default function SuiteNotes(props) {
    return (
        <div className="containerSuiteNotes">
            <div className="suiteNotes">
                {props.sequence.map((note, i) => (
                    <div key={i} className="noteCarree">
                        {note}
                    </div>
                ))}
            </div>
            <div className="boutonsReponse">
                <Button onClick={props.rejouerSequence} disabled={props.disabledReplay}>Jouer</Button>
                <Button onClick={props.supprimerDerniere} disabled={props.sequence.length === 0}>Retour</Button>
                <Button type="primary" onClick={props.validerSequence} disabled={props.disabledValider}>
                    Valider
                </Button>
            </div>
        </div>
    );
}
