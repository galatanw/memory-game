export default function Card (props) {
        return (
            <div className={!props.card.found? props.style.notFound :props.style.found}>
            <div id={props.index} onClick={props.tryCard} className={props.card.revealed === false ?props.style2.notFound :props.style2.found}>
            </div>
            <button className={props.buttonStyle} disabled={props.card.found}  >
                  <img src={props.card.value} alt="" /> <span> </span>
            </button>
        </div>
        )
}
