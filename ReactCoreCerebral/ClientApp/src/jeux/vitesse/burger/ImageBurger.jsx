import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemType.js';
import ItemPreview from './ItemPreview';

const images = {
    1: 'meat.jpg',
    2: 'ketchup1.jpg',
    3: 'cheese.jpg',
    4: 'salad.jpg',
    5: 'bacon.jpg',
    6: 'bread1.jpg',
    7: 'bread2.jpg',
    8: 'tomate.jpg',
    9: 'cornichon.jpg',
    10: 'oignon.jpg'
};

export const ImageBurger = ({ type }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { type },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }),
        [type]
    );

    const image = `${import.meta.env.BASE_URL}burger/${images[type]}`;

    return (
        <div ref={drag}>
            <ItemPreview />
            <img
                src={image}
                style={{ opacity: isDragging ? 0.5 : 1 }}
                alt={images[type]?.replace('.jpg', '') || 'ingredient'}
            />
        </div>
    );
};
