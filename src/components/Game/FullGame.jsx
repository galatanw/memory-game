import React, { Component } from 'react'
import MemoryGame from './MemoryGame'
import * as styles from './FullGame.module.css'
import NewGameButton from './NewGameButton'
import StartGame from './StartGame'
import PicsArray from './pictures'
export default class FullGame extends Component {
    state={startGame:false,array:[]}
     
    startMemoryGame=(e)=>{  
     e.preventDefault()
     let counter=0
      const temp=[]
      const usedIndexes=[]
      while(counter!==Number(e.target.intialSelect.value)){
        let index=Math.floor(Math.random()*PicsArray.length)
        if(usedIndexes.indexOf(index)===-1){
          usedIndexes.push(index)
          temp.push(PicsArray[index])      
          counter++  
        }
      }
    this.setState({startGame:true,array:temp})
  }
  newGameHandle=()=>this.setState({startGame:false})
  startGameProps={containerStyle:styles.initialiseGame,formHandle:this.startMemoryGame,labelStyle:styles.initialiseGameLabel,inputStyle:styles.initialiseGameInputs}
  NewGameButtonProp={containerStyle:styles.landing, buttonStyle:styles.newGame, clickHandle:this.newGameHandle}
      render(){
        return (
<div className={styles.container}>
  <div className={styles.gameControls}>
  
  {this.state.startGame?
  <NewGameButton prop={this.NewGameButtonProp}/> :
   <StartGame prop={this.startGameProps}/>}
  </div>
  
  {this.state.startGame?
  <div className={styles.game}>
    <MemoryGame cards={this.state.array}/>
  </div>:null}
</div> 
      );
    }
}
