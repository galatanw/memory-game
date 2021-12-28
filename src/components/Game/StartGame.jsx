import React from 'react'

export default function StartGame({prop}) {
    return (
        <div className={prop.containerStyle}>
        <form onSubmit={prop.formHandle}>
            <label className={prop.labelStyle} htmlFor="intialSelect">LEVEL</label><br/>
            <select className={prop.inputStyle} name='intialSelect'><br/>
                <option value="3" key="98">Rookie</option>
                <option value="6" key="99">Expert</option>
                <option value="12" key="100">Lengendery</option>
            </select><br/>
            <input className={prop.inputStyle} type="submit" value={"start"} />
        </form>
            <span><h1 >Dragon Ball <br /> The Memory Game</h1></span>
    </div>
    )
}
