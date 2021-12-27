import React, { Component } from 'react'
import MemoryGame from './MemoryGame'
import * as styles from './FullGame.module.css'
export default class FullGame extends Component {
    state={startGame:false,array:[]}
     PicsArray=[
     "https://i.ibb.co/4jgSrVq/Wallpaper-Dog-20382936.jpg",
"https://i.ibb.co/G9jBmbh/Wallpaper-Dog-20382939.jpg",
"https://i.ibb.co/Nr57G0K/Wallpaper-Dog-20377489.png",
"https://i.ibb.co/cyNLWr7/Wallpaper-Dog-20382950.png",
"https://i.ibb.co/SX986by/Goku-and-Shenron.png",
"https://i.ibb.co/vLsd3CS/Shenron-Shenlong-The-Holy-Dragon-by-Zackary-on-Deviant-Art.jpg",
"https://i.ibb.co/gZC15NG/Daizenshuu8-16.jpg",
"https://i.ibb.co/7zy7XdH/DBS-saga-de-Mirai-Trunks-o-de-Black-Como.jpg",
"https://i.ibb.co/NLGrB9H/6cdcf4f6-6889-4fb7-86fa-65d3a41b977a.jpg",
"https://i.ibb.co/HFHjxSP/Lord-Beerus-by-Nova-Sayajin-Goku-on-Deviant-Art.jpg",
"https://i.ibb.co/MMVsq9x/Goku.jpg",
"https://i.ibb.co/hCmqXv3/0581ad02-6f9e-48d3-add4-9209a95b838d.png",
"https://i.ibb.co/XDLs2df/61f422d4-d35d-41ab-a766-8245a4ea07a0.jpg",
"https://i.ibb.co/ngpwyTh/e6ebc012-4866-40c2-8fe3-47290909faf6.jpg"
    ]
    startMemoryGame=(e)=>{  
     e.preventDefault()
     let counter=0
      const temp=[]
      const used=[]
      while(counter!==Number(e.target.intialSelect.value)){
        let index=Math.floor(Math.random()*this.PicsArray.length)
        if(used.indexOf(index)===-1){
          used.push(index)
          temp.push(this.PicsArray[index])      
          counter++  
        }
      }
    this.setState({startGame:true,array:temp})
    }

      render(){
        return (
<div className={styles.container}>
  <div className={styles.gameControls}>
  {this.state.startGame?
  <div className={styles.landing}>
      <button className={styles.newGame} onClick={()=>this.setState({startGame:false})}>new Game</button>
    </div> :
    <div className={styles.initialiseGame}>
        <form onSubmit={this.startMemoryGame}>
            <label className={styles.initialiseGameLabel} htmlFor="intialSelect">LEVEL</label><br/>
            <select className={styles.initialiseGameInputs} name='intialSelect'><br/>
                <option value="3" key="98">Rookie</option>
                <option value="6" key="99">Expert</option>
                <option value="12" key="100">Lengendery</option>
            </select><br/>
            <input className={styles.initialiseGameInputs} type="submit" value={"start"} />
        </form>
            <span><h1 >Dragon Ball <br /> The Memory Game</h1></span>
    </div>}
  </div>
  {this.state.startGame?<div className={styles.game}><MemoryGame cards={this.state.array}/></div>:null}
</div> 
      );
    }
}

