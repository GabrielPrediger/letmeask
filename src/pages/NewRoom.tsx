import { useAuth } from '../hoocks/useAuth';
import { FormEvent, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import '../styles/auth.scss'
import { database } from '../services/firebase';

export function NewRoom(){

    const { user } = useAuth()
    const history = useHistory()

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) { //typei a prop
        event.preventDefault()

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms'); //aqui eu digo pro BD que dentro dele eu vou ter, uma categoria rooms
        
        const firebaseRoom = await roomRef.push({ //jogo uma informação pra dentro de rooms
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`) //key identificador de cada sala
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
                    <h2>Criar uma nova sala</h2>                 
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                            />
                            <Button type="submit">
                                Criar sala
                            </Button>
                    </form>
                    <p>Quer entrar em uma sala existe?
                        <Link to="/">clique aqui</Link>
                    </p>
                </div>
           </main>
       </div>
    )
}