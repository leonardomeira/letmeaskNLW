import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { database } from '../services/firebase';

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        } 
        navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Esta sala não existe');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Esta sala foi encerrada.');
            return;
        }

        navigate(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    {!user ?
                        <div className="unauthenticated">
                            <button onClick={handleCreateRoom} className="create-room">
                                <img src={googleIconImg} alt="Google Auth"/>
                                Crie sua conta com o Google
                            </button>
                            <div className="separator">ou entre em uma sala</div>
                        </div>
                    :
                        <div className="authenticated">
                            <h2>Olá, {user.name}.</h2>
                            <div className="separator">Entre em uma sala</div>
                        </div>
                    }
                    
                    <form>
                        <input
                            type="text"
                            placeholder="Código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit" onClick={handleJoinRoom}>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}