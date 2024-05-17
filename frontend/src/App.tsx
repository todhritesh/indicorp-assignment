import { Route, Routes } from "react-router-dom"
import Register from "./screens/Register"
import Login from "./screens/Login"
import ToolsInventory from "./screens/ToolsInventory"
import AssignTool from "./screens/AssignTool"
import ProtectedRoutes from "./screens/ProtectedRoutes"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import Dashboard from "./screens/Dashboard"


export function getAccessTokenFromLocalStorage() {
  if(localStorage.getItem("accessToken")){
    return localStorage.getItem("accessToken")
  }
  return null
}

export function setAccessTokenInLocalStorage(token:string) {
  return localStorage.setItem("accessToken",JSON.stringify(token))
}

function App() {
  const [isChecking,setIsChecking] = useState(false)
  useEffect(()=>{

    async function handleChecking() {
      
    }

  },[])
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/inventory" element={<ToolsInventory/>} />
          <Route path="/assign-tools" element={<AssignTool/>} />
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App