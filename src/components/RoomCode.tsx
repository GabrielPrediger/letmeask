
import copyImg from '../assets/images/copy.svg'
import '../styles/roomCode.scss'

type RoomCode = {
    code: string;
}

export function RoomCode(props: RoomCode){

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room"/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}