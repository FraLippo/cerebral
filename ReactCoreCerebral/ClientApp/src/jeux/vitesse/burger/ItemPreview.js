import { usePreview } from 'react-dnd-multi-backend'

import React from 'react';


const ItemPreview = ({ item }) => {
  const { display, style } = usePreview();

  if (!display) {
    return null;
  }

  return (
    <div style={style} className="preview">    
    </div>
  );
};

export default ItemPreview;