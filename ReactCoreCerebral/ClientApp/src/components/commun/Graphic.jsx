import React from 'react';
import { Column } from '@ant-design/plots';

function Graphic(props) {
    const data = props.statTemps;
  
    const config = {
        data,

        xField: 'xTemps',
        yField: 'yNbJoueurs',
        meta: {
            xTemps: { formatter: (val) => `${val}s` }
        },
        tooltip: {
            formatter: (datum) => {
              return { name: "Nombre de joueurs", value: datum.yNbJoueurs };
            },
          },
        annotations: [
            {
                type: 'dataMarker',
                position: props.point,
                text: {
                    content: "Votre temps",
                    style: { textAlign: 'left', fontWeight: 'bold' },
                },
                line: { length: 5 },
                point: {
                    style: {
                        fill: '#f5222d',
                        stroke: '#f5222d',
                    },
                },
                autoAdjust: true,
            },
        ],
    };
    return <Column {...config} />;
}

export { Graphic };