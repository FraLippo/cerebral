import '../../style/App.css';
import React, { Component } from 'react';
import { Layout} from 'antd';
import MenuPrincipalFR from './MenuPrincipalFR';
import MenuPrincipalEN from './MenuPrincipalEN';
import Routeur from './Routeur';
import { Helmet } from 'react-helmet';

import intl from 'react-intl-universal';
// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/fr.js');


const locales = {
  "fr-FR": require('./locales/fr-FR.json'),
  "en-US": require('./locales/en-US.json'),
};


const { Header, Content} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
      


  this.currentLocale= this.determineLang();
  
  }
  
  state = { initDone: false };

  componentDidMount() {
    this.loadLocales();
  }
  determineLang = () =>
  {
    let en = /\/en$/;
    let brain = /brain|terms/;
    if (en.test(window.location.pathname) || brain.test(window.location.pathname))
    {
      return "en-US";
    }
    else
    {
      return "fr-FR";
    }
  }

  loadLocales = ()=> {
    intl.init({
      currentLocale : this.currentLocale,
      locales
    }).then(() => {
    // After loading CLDR locale data, start to render
    this.setState({ initDone: true });
  });
  }

  menuPrincipalLangue()
  {
    if (this.currentLocale === 'en-US')
    {
        return <MenuPrincipalEN></MenuPrincipalEN>
    }
    else
    {
      return <MenuPrincipalFR></MenuPrincipalFR>
    }
  }

  render() {
    return ( this.state.initDone &&  <div>   
       <Helmet>
          <title>{intl.get('TITRE_PRINCIPAL')}</title>
          <meta name="description" content={intl.get('META_PRINCIPAL')}/>
        </Helmet>
        <Layout>
      <Header>{this.menuPrincipalLangue()}</Header>
      <Content className="margePrincipale"><Routeur></Routeur></Content> 
    </Layout> 
  
        </div>)
    
    
  }
}

export default App;
