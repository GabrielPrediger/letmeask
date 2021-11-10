import { useParams, useHistory } from 'react-router-dom'

import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hoocks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParms = {
    id: string;
}

export function AdminRoom(){

    const parms = useParams<RoomParms>(); //generic, tipo um parametro
    const history = useHistory()
    const roomId = parms.id;

    const { title, questions} = useRoom(roomId)

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswerd(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHighlighQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    async function handleEndRoom(){
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Let me Ask"/>
                    <div>
                        <RoomCode code={roomId} />
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >
                            Encerrar sala
                        </Button>
                    </div>

                </div>
            </header>
            
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span> {questions.length} pergunta(s)</span> }
                </div>
                <div className="question-list">
                    {questions.map(questions => {
                        return (
                            <Question
                                key={questions.id}
                                content={questions.content}
                                author={questions.author}
                                isAnswered={questions.isAnswered}
                                isHighlighted={questions.isHighlighted}
                            >
                                {!questions.isAnswered && (
                                    <>
                                        <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswerd(questions.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida"/>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighlighQuestion(questions.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta"/>
                                        </button>
                                    </>                                   
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(questions.id)}
                                >
                                    <img src={deleteImg} alt="Deletar a pergunta"/>
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}