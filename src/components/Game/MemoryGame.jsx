import React, { Component,Fragment } from 'react'
import Card from './Card';
import * as styles from "./game.module.css"
import GameOver from './gameOver';
import Pause from './Pause';

export default class MemoryGame extends Component {
    state = {
        cards: this.props.cards, time: { hours: 0, minutes: 0, secondes: 0 }, pause:false, gameover:false
    }
    lastCliked = null
    flipped = false;
    gameEndCounter = 0
    triesCount = 0
    timer;
    bestTry;
    bestTime;
    startTime=()=>{
        this.timer = setInterval(() => {
            const time = {
                hours: this.state.time.hours
                , minutes: this.state.time.minutes,
                secondes: this.state.time.secondes + 1
            }
            if (time.secondes === 60) {
                time.secondes = 0
                time.minutes += 1
                if (time.minutes === 60) {
                    time.minutes = 0
                    time.hours += 1
                }
            }
            this.setState({ time: time })
        }
            , 1000)

    }


    startGame=()=>{
        this.startTime()
        const array = [...this.state.cards]
        const arraysecond = [...this.state.cards]
        const length = this.state.cards.length
        const shuffledArray = []
        for (let index = 0; index < length; index++) {
            const first = Math.floor(Math.random() * (Number(array.length)))
            const second = Math.floor(Math.random() * (Number(arraysecond.length)))
            shuffledArray.push({ value: array[first], revealed: false, found: false })
            shuffledArray.unshift({ value: arraysecond[second], revealed: false, found: false })
            array.splice(first, 1)
            arraysecond.splice(second, 1)
        }
        this.setState({ cards: shuffledArray })
    }
    gameWon=(array,index,secondIndex)=>{
        array[Number(index)].found = true
        array[secondIndex].found = true
        this.setLocalStorage()
        this.sortByBestTime()
        this.sortByMinimumTries()
        clearInterval(this.timer)
        return this.setState({
            gameover: true,
            cards: array
        })
        
    }

    matchedCards=(array,index,secondIndex)=>{
        this.gameEndCounter++
                array[Number(index)].revealed = true
                array[Number(secondIndex)].revealed = true
                this.lastCliked = null
                if (this.gameEndCounter === array.length / 2) {
                this.gameWon(array,index,secondIndex)
                return 
                }
                this.setState({ cards: array })
                setTimeout(() => {
                    array[Number(index)].found = true
                    array[Number(secondIndex)].found = true
                    this.setState({ cards: array })
                }, 1000)
                return
        
    }
    notMatched=(array,index,secondIndex)=>{
        this.flipped = true
        array[Number(index)].revealed = true
        this.setState({ cards: array })
        this.lastCliked = null;
        setTimeout(() => {
            this.flipped = false
            array[Number(index)].revealed = false
            array[secondIndex].revealed = false
            this.setState({ cards: array })
        }, 2000)
        return
    }
    startTryCard=(index)=>{
        const cardsArray=this.state.cards
        if (Number(index) === this.lastCliked 
        || this.flipped === true 
        || cardsArray[Number(index)].found === true) return true
    }
    setFirstCard=(index,array)=>{
        this.flipped = false
            array[Number(index)].revealed = true
            this.setState({ cards: array })
            this.lastCliked = Number(index)
    }
    tryCard = (e) => {
        let cardElement=e.currentTarget
        if(this.startTryCard(cardElement.id))return
        const cardsArray=this.state.cards
        const temp = [...cardsArray]
        if (this.lastCliked != null) {
            this.triesCount++
            const lastVal = this.lastCliked
            if (cardsArray[cardElement.id].value === cardsArray[this.lastCliked].value) {
                this.matchedCards(temp,cardElement.id,lastVal)
                return
            }
            this.notMatched(temp,cardElement.id,lastVal)
        }
        else {
            this.setFirstCard(cardElement.id,temp)
        }
    }
    pause = () => {
        clearInterval(this.timer)
        this.setState({ pause: true })
    }
    resume = () => {
        this.startTime()
        this.setState({ pause: false })
    }
    setLocalStorage=()=>{
        const game={time:this.state.time,tries:this.triesCount};
        if(localStorage.getItem('memoryGame')===null){
            const newGame=
            {
                six:[],
                twelve:[],
                twentyFour:[],
            }
            switch (this.state.cards.length){
                case 6:newGame.six=[game];break
                case 12:newGame.twelve=[game];break
                case 24:newGame.twenty=[game];break
                default:break
            }
            localStorage.setItem('memoryGame',JSON.stringify(newGame))
            return
        }
    const games=JSON.parse(localStorage.getItem('memoryGame'))
    switch (this.state.cards.length){
        case 6:games.six.push(game);break
        case 12:games.twelve.push(game);break
        case 24:games.twentyFour.push(game);break
        default:break
    }
    localStorage.setItem('memoryGame',JSON.stringify(games))

}
    sortByBestTime=()=>{
    const games=JSON.parse(localStorage.getItem('memoryGame'))
    switch (this.state.cards.length){
        case 6:games.six.sort((a,b)=>{
         return   a.time.hours*100+a.time.minutes*10+a.time.secondes-b.hours*100+b.minutes*10+b.secondes
        });
        console.log(games.six[0]);
        return this.bestTime=games.six[0]
        case 12:games.twelve.sort((a,b)=>{
         return   a.time.hours*100+a.time.minutes*10+a.time.secondes-b.hours*100+b.minutes*10+b.secondes
        })
        return this.bestTime=games.twelve[0]
        case 24:games.six.sort((a,b)=>{
           return a.time.hours*100+a.time.minutes*10+a.time.secondes-b.hours*100+b.minutes*10+b.secondes
        })
        return this.bestTime=games.twentyFour[0]
        default:console.error("local Best Time Error"); break
    }
    }
    sortByMinimumTries=()=>{
        const games=JSON.parse(localStorage.getItem('memoryGame'))
        switch (this.state.cards.length){
            case 6:games.six.sort((a,b)=>{
                return a.tries-b.tries
            });
            return this.bestTry=games.six[0]
            case 12:games.twelve.sort((a,b)=>{
                return    a.tries-b.tries
            })
            return this.bestTry=games.twelve[0]
            case 24:games.six.sort((a,b)=>{
                return  a.tries-b.tries
            })
            return this.bestTry= games.twentyFour[0]
            default:console.error("local Best tries Error"); break
        }
            
    }
    componentDidMount() {
        this.startGame()
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {

        let curtain=this.state.cards.length==6?styles.container:styles.container2

        return (
            <div className={styles.memoryGameContainer}>
                
                <button className={styles.pauseAndResume} onClick={this.pause} >⏸️</button>
                {this.state.pause ? <div className={styles.gameOver}>
                    <Pause time={this.state.time} resume={this.resume} gameEndCounter={this.gameEndCounter} style={styles.pauseAndResume}/>
                </div>:null
                }
                <h1>{this.state.time.hours}:{this.state.time.minutes}:{this.state.time.secondes}</h1>
                       
                {this.state.gameover ? <GameOver time={this.state.time} triesCount={this.triesCount} style={styles.gameOver} bestTry={this.bestTry.tries} bestTime={this.bestTime.time} />: null}
   
                
                <div className={styles.game}>
                    {this.state.cards.map((card, i) => {
                        return <Fragment key={i} >
                            <Card 
                            index={i}
                        style={{notFound:curtain ,found: curtain + " " + styles.found}}
                        style2={{notFound:styles.try, found: styles.try + " " + styles.revealed}}
                        card={card}
                         tryCard={this.tryCard}
                         buttonStyle={styles.card}
                         /> 
                          </Fragment>
                    })}
                </div>
            </div>
        )

    }
}
