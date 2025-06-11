import { Radar } from '@ant-design/plots';
import React from 'react';



const RadarV = (props) => {

  const config = {
    data: props.tabScoreCategorie,
    xField: 'categorie',
    yField: 'score',
    area: {
      style: {
        fillOpacity: 0.2,
      },
    },
    meta : {
    score: {
      min: 0,
      max: 100, 
    },
  },
    scale: {
      x: {
        padding: 0.5,
        align: 0,
       
      },
      y: {
        nice: true,
      },
    },
    axis: {
      x: {
        title: false,
        grid: true,

      },
      y: {
        gridAreaFill: 'rgba(0, 0, 0, 0.04)',
        label: false,
        title: false,
      },
    },
  };
  return <Radar {...config} />;
};

export default RadarV;