import { ButtonHTMLAttributes } from 'react' //pega todos atributos que um button pode ter

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
} // aqui a gente "fala" que as props do button são todas htmlattributes

export function Button({isOutlined = false, ...props}: ButtonProps) {

    return (
        <button 
        className={`button ${isOutlined ? 'outlined' : ''}`} {...props} /> 
        // caso isOutlined exista eu bota uma classe a mais se nao nada    
        //usar spread para distribuir todas as propriedas que eu recebo como parametro
    )
}