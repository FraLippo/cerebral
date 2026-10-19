
import { Column } from '@ant-design/plots';

function Graphic(props) {
    const config = {
        data: props.point,
        xField: 'xTemps',
        yField: 'yNbJoueurs',
        meta: {
            xTemps: { formatter: (val) => `${val}s` }
        },
        tooltip: {
            formatter: (datum) => ({
                name: "Nombre de joueurs",
                value: datum.yNbJoueurs
            }),
        },
        annotations: [
            {
                type: 'text',
                position: props.point,
                content: 'Votre temps',
                offsetY: -15,
                style: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fill: '#f5222d',
                },
            },
        ],
    };

    return <Column {...config} />;
}

export { Graphic };