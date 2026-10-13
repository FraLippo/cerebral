import React, { Component } from 'react';




export default class Grille extends Component
{

    constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }

    render()
    {
        return <div className="grilleMah">{this.props.tabTuiles.map((info, i) =>
           info.etat !== 'trouve' &&  <div className={info.etat === 'initial' ? '' : 'caseSelectionMah'} onClick={() => this.props.clicTuile(i)} style={this.constructionEmplacement(info.pos, this.props.taille)} key={i}><img draggable="false" className='caseMah' src={info.img} alt='tuile mah jong'></img>
                </div>)}
               </div>
    }
}