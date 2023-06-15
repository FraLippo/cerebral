import meat from '../../../images/meat.jpg';
import ketchup from '../../../images/ketchup1.jpg';
import bread1 from '../../../images/bread1.jpg';
import bread2 from '../../../images/bread2.jpg';
import salad from '../../../images/salad.jpg';
import bacon from '../../../images/bacon.jpg';
import cheese from '../../../images/cheese.jpg';
import tomate from  '../../../images/tomate.jpg';
import cornichon from  '../../../images/cornichon.jpg';
import oignon from  '../../../images/oignon.jpg';
import {useDrag } from 'react-dnd'
import { ItemTypes } from './ItemType.js';
import ItemPreview from './ItemPreview';





export const ImageBurger = ({type}) => {
  
    const [{ isDragging }, drag] = useDrag(
        () => ({
          type: ItemTypes.BOX,
          item: { type},
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
          }),
        }),
        [],
      )
     


    return <div ref={drag}>
          <ItemPreview  />
      <img  style={{

        opacity: isDragging ? 0.5 : 1,
      }}  src={type ===1 ? meat : type === 2 ? ketchup : type === 3 ? cheese : type ===4 ? salad : type === 5 ? bacon : type === 6 ? bread1 : type === 7 ? bread2 : type === 8 ? tomate : type ===9 ? cornichon :oignon  }  alt='meat'></img>
</div>
}