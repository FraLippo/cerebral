import React, { Component } from 'react';
import { Menu, Icon} from 'antd';
import { readGameNumber } from '../commun/localStorage';



export default  class MenuPrincipalFR extends Component {

  gameNumber = readGameNumber();
    render() {
      return (
        <div>
 
        <Menu
        mode="horizontal"
        theme='light'
        style={{borderBottom : 0}}
      >
        <Menu.Item key="home">    
        <a href="https://evalquiz.com"><Icon type="home" style={{ fontSize: 20}}/></a>
        </Menu.Item>
        <Menu.Item key="orthographe">
        <a href="https://orthographe.evalquiz.com">
          Orthographe
          </a>
        </Menu.Item>  
        <Menu.Item key="culture">
          <a href="https://evalquiz.com/tests/culture">
           Culture
          </a>
        </Menu.Item>
        
        <Menu.Item key="challenge">
        <a href="https://concours.evalquiz.com/presentation">
           Challenge
          </a>
        </Menu.Item>  
          <Menu.Item key="psycho">
        <a href="https://evalquiz.com/tests/psycho">
           Psycho
          </a>
        </Menu.Item> 
        <Menu.Item key="quizRoyal">
        <a href="https://quiz-royal.evalquiz.com">
           Quiz Royal
          </a>
        </Menu.Item> 
      <Menu.Item key="anglais">
          <a href="https://anglais.evalquiz.com">
           Anglais
          </a>
        </Menu.Item> 
         <Menu.Item key="qi">
          <a href="https://evalquiz.com/tests/logique">
           QI
          </a>
        </Menu.Item>    
      
        <Menu.Item key="math">
          <a href="https://evalquiz.com/tests/math">
           Calcul
          </a>
        </Menu.Item>
     <Menu.Item key="reflexion">
        <a href="https://cerebral.evalquiz.com">
           Cérébral
          </a>
        </Menu.Item> 
       
       
       
      
        
     
    </Menu>
          </div>
      
      );
    }
  }
