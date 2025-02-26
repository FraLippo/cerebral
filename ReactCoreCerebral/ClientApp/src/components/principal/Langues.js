import React,{Component} from 'react';
import {formulePolitesse, tabLangueDepart} from '../../jeux/vitesse/langue/data';
import {Link} from 'react-router-dom';
export default class Langues extends Component
{



  
    render()
    {
        return <div>
            <h1 className="titre centre">Formules de politesse dans différentes langues</h1>
            <p>Voici une liste de formules de politesse dans différentes langues. Cliquez sur le bouton audio pour écouter la prononciation. Le but du jeu <Link to='/vitesselangue'>La politesse</Link> est d'identifier 5 mots de politesse dans différentes langues. </p>
            <p>Si vous pensez qu'une expression n'est pas conforme ou mal utilisée, vous pouvez nous contacter sur <a href="https://x.com/evalquiz">X</a>. Nous sommes ouverts au débat car il nous a fallu faire des choix. Il faut aussi comprendre le excusez-moi comme un désolé. Por favor est le même mot en espagnol et en portugais. Dans notre jeu, la version portugaise est en audio, tandis que l'espagnol est écrite. </p>
           <table className="tableauLangue">
                <thead>
                    <tr>
                        <th>Langue</th>
                        <th>Formule de politesse</th>
                        <th>Expression</th>
                        <th>Audio</th>
                    </tr>
                </thead>
                <tbody>
                    {formulePolitesse.map((item, i) =>
                        <tr key={i}>
                            <td>{item.langue}</td>
                            <td>{item.reponse}</td>
                            <td>{item.formule}</td>
                            <td>
                                {item.audio && <audio class="audio-joueur"
                                    controls
                                    src={item.audio}
                                />}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p className='centre'><small>evalquiz</small></p>
        </div>
    }
}