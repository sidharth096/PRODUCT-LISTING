import { Outlet, useNavigate } from "react-router"
import Header from "./components/Header"
import { useEffect } from "react"


const App = () => {
const navigate = useNavigate()
  useEffect(() => {
    navigate("/product")
  })
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
