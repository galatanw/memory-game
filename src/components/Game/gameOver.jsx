
export default function GameOver(props) {
 
    console.log(props);
        return (
            <div className={props.style}>
            <h1>Matching King</h1>
            <h4>stats</h4>
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>tries</td>
                        <td>{props.triesCount} tried matches</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>total-Time</td>
                            <td>{props.time.hours}:{props.time.minutes}:{props.time.secondes} to complete the game </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <th>best time</th>
                        <th>{props.bestTime.hours}:{props.bestTime.minutes}:{props.bestTime.secondes}</th>
                        </tr>
                        <tr>
                        <th>minimum tries yet</th>
                        <th>{props.bestTry}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        )
    }
