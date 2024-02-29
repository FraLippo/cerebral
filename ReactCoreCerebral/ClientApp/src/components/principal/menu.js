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
      children: [ {
              label: (  <a href="https://cerebral.evalquiz.com/defi">
              Les défis de l'analyse
              </a>
          ),
              key: 'defiCo',
            },
        {
          label: (  <a href="https://concours.evalquiz.com/presentationcerebral">
          Les JO de la logique</a>
      ),
          key: 'logiqueCo',
        },
        {
          label: (  <a href="https://concours.evalquiz.com/presreflexion">
           Le royaume de la réflexion</a>
      ),
          key: 'reflexionCo',
        },
       
            {
              label: (  <a href="/">
              Concours du mois
              </a>
          ),
              key: 'coco',
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
                La joute des lettres de des mots
                </a>
            ),
                key: 'motsCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presorthographe">
                Le défi de l'orthographe
                </a>
            ),
                key: 'orthographeCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presvocabulaire">
                Les JO du vocabulaire 
                </a>
            ),
            
                key: 'vocabulaireCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presconjugaison">
                Le royaume de la conjugaison
                </a>
            ),
                  key: 'conjugagaisonCo',
              },  
             
              {
                label: (  <a href="https://concours.evalquiz.com/presgeographie">
                Le défi ultime des géographes </a>
            ),
                key: 'geographieCo',
              },
              {
                label: (  <a href="https://concours.evalquiz.com/presculture">
                Le grand jeu de la culture générale</a>
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