import { createContext, ReactNode,  useState, useEffect } from 'react'
import { firebase, auth } from '../services/firebase'

//dando os tipos para as informações
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType); //iniciando ele como um Obj vazio


export function AuthContextProvider(props: AuthContextProviderProps){

  const [user, setUser] = useState<User>(); //dizendo que a gente vai preencher com os dados do User
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { //event listner, que se ele conseguir dectar que um usuario logou antes ele retorna o usuario
      if (user) { //se o usuario tem informação 
        const { displayName, photoURL, uid} = user;

          if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
      }
    })

    return () => {
      unsubscribe();
    }

  }, [])

  async function signInWithGoogle(){

    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

            if(result.user){
              const { displayName, photoURL, uid} = result.user;

              if(!displayName || !photoURL){
                throw new Error('Missing information from Google Account.')
              }

              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              })
            }
  }

    return(
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>

    )
}