import copyImg from '../../assets/images/copy.svg';

import './styles.scss'

type RoomCodeProps = {
    code: any;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}