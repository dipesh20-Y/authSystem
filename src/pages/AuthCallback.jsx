import { useEffect, useContext } from "react" 
import { AuthContext } from "../context/AuthContext"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"


const AuthCallback = () => {
  const navigate = useNavigate()
  const {setUser} =  useContext(AuthContext)
  useEffect(()=>{
    const handleGithubAuth  = async ()=> {
      const {data, error} = await supabase.auth.getSession()

      if (data?.session){
        console.log("user data: ", data)
        
        navigate('/dashboard')
      }else{
        console.log("AuthError: ", error)
        navigate('/signin')
      }

    }
    handleGithubAuth()
  },[navigate])

  return (
    <div>authCallback</div>
  )
}

export default AuthCallback