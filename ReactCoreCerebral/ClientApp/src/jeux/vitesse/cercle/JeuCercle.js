import React, { Component } from 'react';
import flecheGauche from '../../../images/flecheGauche.png';
import flecheDroite from '../../../images/flecheDroite.png';

export default class JeuCercle extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
           

        }
       

    }

   
    render() {

        return <div> <div className="plateauCercle">

      <div className='colonneCercle'>
            <div className='parentCercle'>
                 <div className='lettreCercle1'>a</div>
                 <div className='lettreCercle2'>n</div>
                 <div className='lettreCercle3'>i</div>
                 <div className='lettreCercle4'>m</div>
                 <div className='lettreCercle5'>a</div>
                 <div className='lettreCercle6'>l</div>
                 <div className='lettreCercle7'>é</div>
                 <div className='lettreCercle8'>i</div>


        


         <svg class="svgCercle" width="100" height="100"  xmlns="http://www.w3.org/2000/svg">
         <path d="M 50 0 A 50 50 0 0 1  85 15 L 50 50 L 50 0 Z" class='type0'/>
         <path d="M 85 15 A 50 50 0 0 1 100 50 L 50 50 L 85 15 Z" class='type0'/>
         <path d="M 100 50 A 50 50 0 0 1  85 85 L 50 50 L 100 50 Z" class='type0'/>
         <path d="M 85 85 A 50 50 0 0 1  50 100 L 50 50 L 85 85 Z" class='type0'/>
         <path d="M 50 100 A 50 50 0 0 1 15 85 L 50 50 L 50 100 Z" class='type0'/>
         <path d="M 15 85 A 50 50 0 0 1 0 50 L 50 50 L 15 85 Z" class='type0'/>
         <path d="M 0 50 A 50 50 0 0 1 15 15 L 50 50 L 0 50 Z" class='type0'/>
         <path d="M 15 15 A 50 50 0 0 1 50 0 L 50 50 L 15 15 Z" class='type0'/>
  
       
</svg> 
  </div>
  <div className="flechesCercle">
<img src={flecheGauche} alt="fleche gauche" className="fleche gauche" ></img>
<img src={flecheDroite} alt="fleche droite" className="fleche droite" ></img>
</div>
 </div>
 <div className='parentCercle'>
                 <div className='lettreCercle1'>a</div>
                 <div className='lettreCercle2'>n</div>
                 <div className='lettreCercle3'>i</div>
                 <div className='lettreCercle4'>m</div>
                 <div className='lettreCercle5'>a</div>
                 <div className='lettreCercle6'>l</div>
                 <div className='lettreCercle7'>é</div>
                 <div className='lettreCercle8'>i</div>


         <svg class="svgCercle" width="200" height="200"  xmlns="http://www.w3.org/2000/svg">
         <path d="M 50 0 A 50 50 0 0 1  85 15 L 50 50 L 50 0 Z" class='type0'/>
         <path d="M 85 15 A 50 50 0 0 1 100 50 L 50 50 L 85 15 Z" class='type0'/>
         <path d="M 100 50 A 50 50 0 0 1  85 85 L 50 50 L 100 50 Z" class='type0'/>
         <path d="M 85 85 A 50 50 0 0 1  50 100 L 50 50 L 85 85 Z" class='type0'/>
         <path d="M 50 100 A 50 50 0 0 1 15 85 L 50 50 L 50 100 Z" class='type0'/>
         <path d="M 15 85 A 50 50 0 0 1 0 50 L 50 50 L 15 85 Z" class='type0'/>
         <path d="M 0 50 A 50 50 0 0 1 15 15 L 50 50 L 0 50 Z" class='type0'/>
         <path d="M 15 15 A 50 50 0 0 1 50 0 L 50 50 L 15 15 Z" class='type0'/>
  
       
</svg>    
 </div>
        </div>
        
        
        </div>
    }


}
