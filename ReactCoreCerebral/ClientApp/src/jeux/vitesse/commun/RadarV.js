import { Radar } from '@ant-design/plots';
import React from 'react';
import { createRoot } from 'react-dom';

const data = [
  { name: 'G2', star: 10371 },
  { name: 'G6', star: 7380 },
  { name: 'F2', star: 7414 },
  { name: 'L7', star: 2140 },
  { name: 'X6', star: 660 },
  { name: 'AVA', star: 885 },
  { name: 'G2Plot', star: 1626 },
];

const RadarV = (props) => {
  console.log(props.tabScoreCategorie);
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
        domainMax: 100
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