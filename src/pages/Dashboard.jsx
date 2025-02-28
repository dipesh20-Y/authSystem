import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Dashboard = () => {
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <div className="text-center font-bold text-3xl">Welcome, {user[0].fullName}</div>
  )
}

export default Dashboard