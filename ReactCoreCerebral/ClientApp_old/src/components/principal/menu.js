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
      key: 'jeucognitif'
    
    },

  
      {
        label: (  <a href="https://concours.evalquiz.com/presentation">
            Les challenges
            </a>
        ),
        key: 'nosjeux',
      },
        {
        label: (   <a href="https://evalquiz.com/tests/qi">
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