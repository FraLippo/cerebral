import withRouter from './withRouter';
import { Button } from 'antd';
import React from 'react';
function BoutonDeNavigation( props )  {
 let p =  {...props};
 return <Button type="primary"  onClick={() => window.location.replace(p.href)}>{p.titre}</Button>
};

export default withRouter(BoutonDeNavigation);