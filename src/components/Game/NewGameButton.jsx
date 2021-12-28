import React from 'react'

export default function NewGameButton({prop}) {
    return (
    <div className={prop.containerStyle}>
      <button className={prop.buttonStyle} onClick={prop.clickHandle}>new Game</button>
    </div>
    )
}
