import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react'
import { useAuth } from '../hoocks/useAuth';

import { Button } from '../components/Button'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { database } from '../services/firebase';

export function Home(){

    const history = useHistory();
    const {signInWithGoogle, user} = useAuth()
    const [roomCode, setRoomCode] = useState('');

   async function handleCreateRoom(){
       //se o usuario nao logou chama o metodo se estiver só redireciona
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if(!roomRef.exists()){
            alert('Room does not exists')
            return
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed')
            return
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
       <div id="page-auth">
           <aside>
               <img src={ilustrationImg}/>
               <strong>Crie salas de Q&amp;A ao-vivo</strong>
               <p>Tire as dúvidas da sua audiência em tempo-real</p>
           </aside>
           <main>
                <div className="main-container">
                    <img src={logoImg} />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={ event => setRoomCode(event.target.value)}
                            value={roomCode}
                            />
                            <Button type="submit">
                                Entrar na sala
                            </Button>
                    </form>
                </div>
           </main>
       </div>
    )
}