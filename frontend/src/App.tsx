import { Route, Routes, useNavigate } from "react-router-dom"
import Register from "./screens/Register"
import Login from "./screens/Login"
import ToolsInventory from "./screens/ToolsInventory"
import AssignTool from "./screens/AssignTool"
import ProtectedRoutes from "./screens/ProtectedRoutes"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import Dashboard from "./screens/Dashboard"
import privateClient from "./config/api"
import { useAuthState } from "./zustand/authStore"
import Spinner from "./app-components/Spinner"


export function getAccessTokenFromLocalStorage() {
  if (localStorage.getItem("accessToken")) {
    return localStorage.getItem("accessToken")
  }
  return null
}

export function setAccessTokenInLocalStorage(token: string) {
  return localStorage.setItem("accessToken", JSON.stringify(token))
}

function App() {

  const setAccessToken = useAuthState(state => state.setAccessToken)
  const setIsAuthenticated = useAuthState(state => state.setIsAuthenticated)
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {

    async function handleChecking() {
      setIsChecking(true)
      try {
        if (!getAccessTokenFromLocalStorage()) {
          navigate('/login')
          return;
        }
        const response = await privateClient.post("/auth/check")
        setAccessToken(getAccessTokenFromLocalStorage() as string)
        setIsAuthenticated(true)
        navigate("/")
        toast.success("Logged in successfully")
      } catch (e) {
        toast.error("Something went wrong, Please login again")
        navigate('/login')
      } finally {
        setIsChecking(false)
      }
    }

    handleChecking()

  }, [])
  return (
    <>
      {
        isChecking && <Spinner />
      }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />} >
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<ToolsInventory />} />
          <Route path="/assign-tools" element={<AssignTool />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App