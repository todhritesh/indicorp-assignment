import { Route, Routes } from "react-router-dom"
import Register from "./screens/Register"
import Login from "./screens/Login"
import ToolsInventory from "./screens/ToolsInventory"
import AssignTool from "./screens/AssignTool"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/inventory" element={<ToolsInventory/>} />
      <Route path="/assign-tools" element={<AssignTool/>} />
    </Routes>
  )
}

export default App