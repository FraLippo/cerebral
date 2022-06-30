import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';
function BoutonDeNavigation( props )  {
 let p =  {...props};
  return <Button type="primary"  onClick={() => p.history.replace(p.href)}>{p.titre}</Button>
};

export default withRouter(BoutonDeNavigation);