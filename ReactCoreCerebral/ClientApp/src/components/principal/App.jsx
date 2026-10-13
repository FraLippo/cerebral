import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import {router}  from './router';
import ReactGA4 from "react-ga4";
import '../../style/jeux.css'
import '../../style/vitesse.css'

ReactGA4.initialize("G-916D7SW5D6", { legacyDimensionMetric: false, gtagOptions: { send_page_view: true } })

function App() {

  return (
    <>
       <Suspense fallback={<div>Chargement... Merci de patienter.</div>}>
          <RouterProvider router={router} >  
           
            </RouterProvider>
            </Suspense>
   
    </>
  )
}

export default App
