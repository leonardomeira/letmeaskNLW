import { useParams } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';

export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <a href="/">
                        <img src={logoImg} alt="letmeask" />
                    </a>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 ? <span>{questions.length} pergunta(s)</span> : <span>Nenhuma pergunta aqui</span>}
                </div>
                
                {questions.map(question => {
                    return (
                        <Question
                            key={question.id}
                            author={question.author}
                            content={question.content}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Excluir Pergunta" />
                            </button>
                        </Question>
                    )
                })}
            </main>
        </div>
    )
}