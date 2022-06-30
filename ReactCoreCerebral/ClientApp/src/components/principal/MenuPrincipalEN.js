import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { readGameNumber } from '../commun/localStorage';
const { SubMenu } = Menu;


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
        <a href="https://cerebral.evalquiz.com/en"><Icon type="home" style={{ fontSize: 20}}/></a>
        </Menu.Item>
        <SubMenu  title="Brain games">
            <Menu.Item key="brain-game-numbers"><a href="/brain-game-numbers/400">The count is good</a></Menu.Item>
            <Menu.Item key="brain-game-cards"><a href="/brain-game-cards/100">Cards</a></Menu.Item>
            <Menu.Item key="brain-game-order"><a href="/brain-game-order/0">Order</a></Menu.Item>
            <Menu.Item key="brain-game-puzzle"><a href="/brain-game-puzzle/18">Puzzle</a></Menu.Item>
            <Menu.Item key="brain-game-rotate"><a href="/brain-game-rotate/300">Rotation</a></Menu.Item>
            <Menu.Item key="brain-game-sequence"><a href="/brain-game-sequence/600">Sequence</a></Menu.Item>
            <Menu.Item key="brain-game-sorting"><a href="brain-game-sorting/200">Sorting</a></Menu.Item>
            <Menu.Item key="brain-game-drawing"><a href="/brain-game-drawing/500">Drawing</a></Menu.Item>
            <Menu.Item key="brain-game-family"><a href="/brain-game-family/700">Family</a></Menu.Item>
            <Menu.Item key="brain-game-solo"><a href="/brain-game-solo/800">Solo</a></Menu.Item>
         
        </SubMenu>
 
        </Menu>
       
          </div>
      
      );
    }
  }
