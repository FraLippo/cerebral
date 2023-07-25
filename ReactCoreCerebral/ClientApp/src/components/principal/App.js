import '../../style/jeux.css';
import React, { Component, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider} from 'antd';
import {router} from './router'
import { Helmet } from 'react-helmet';
import ReactGA4 from "react-ga4";
import intl from 'react-intl-universal';

// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/fr.js');


const locales = {
  "fr-FR": require('./locales/fr-FR.json'),
  "en-US": require('./locales/en-US.json'),
};



class App extends Component {
  constructor(props) {
    super(props);
      

   ReactGA4.initialize("G-916D7SW5D6");

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

 

  render() {
    return ( this.state.initDone &&  <div>   
       <Helmet>
          <title>{intl.get('TITRE_PRINCIPAL')}</title>
          <meta name="description" content={intl.get('META_PRINCIPAL')}/>
        </Helmet>
        <ConfigProvider
    theme={{
      token: {
         fontSize: '16px',
      },
      components: {
        Menu: {
          colorItemBg: '#afe4e2',
        }}
    }}
  >
  
        <Suspense fallback={<div>En cours de chargement...</div>}>
          <RouterProvider router={router} >
            </RouterProvider>
            </Suspense>

  </ConfigProvider>
        </div>)
    
    
  }
}

export default App;
