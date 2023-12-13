import { HomeFilled} from '@ant-design/icons';
const itemsMenu = [
    {
      label: (<a href="https://evalquiz.com"> evalquiz</a>
      ),
      key: 'evalquiz',
     icon: <HomeFilled />,
    },
    {
      label: (  <a href="/">
          Jeux cognitifs
          </a>
      ),
      key: 'jeucognitif',
      children: [
       
            {
              label: (  <a href="/">
              Concours du mois
              </a>
          ),
              key: 'coco',
            },
            {
              label: (  <a href="https://cerebral.evalquiz.com/defi">
              Les défis
              </a>
          ),
              key: 'defiCo',
            },
          

      ],
    },

  
      {
        label: (  <a href="https://concours.evalquiz.com/presentation">
            Nos challenges
            </a>
        ),
        key: 'nosjeux',
        children: [
         
              {
                label: (  <a href="https://concours.evalquiz.com/presmot">
                Jeux de lettres de de mots
                </a>
            ),
                key: 'motsCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presorthographe">
                Jeux sur l'orthographe
                </a>
            ),
                key: 'orthographeCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presvocabulaire">
                Jeux sur le vocabulaire 
                </a>
            ),
                key: 'vocabulaireCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presentationcerebral">
                Jeux de logique</a>
            ),
                key: 'logiqueCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presreflexion">
                Jeux de réflexion</a>
            ),
                key: 'reflexionCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presgeographie">
                Jeux sur la géographie</a>
            ),
                key: 'geographieCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presculture">
                Jeux sur la culture générale</a>
            ),
                key: 'cultureCo',
              },



        
         
        ],
      },
        {
        label: (   <a href="https://evalquiz.com/tests/logique">
        QI
       </a>
        ),
        key: 'logique'
      }, 
      {
        label: ( <a href="https://evalquiz.com/tests/culture">
        Quiz
       </a>
        ),
        key: 'culture'
      },
    
      
    
     
  ];

  export {itemsMenu}