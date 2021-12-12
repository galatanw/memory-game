
export default function Pause (props){
        return (
            <>
            <h1>matched:{props.gameEndCounter}</h1>
            <h1>time past:{props.time.hours}:{props.time.minutes}:{props.time.secondes}</h1>
            <button onClick={props.resume}className={props.style} >▶️ </button>
            </>

        )
    }
