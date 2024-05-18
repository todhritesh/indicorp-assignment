import { Link } from "react-router-dom"

function Dashboard() {
  return (
    <div className="flex flex-1 w-[100vw] h-[100vh] justify-center items-center" >
      <div className="flex flex-col gap-y-4">
        <Link to={'/register'} >Register</Link>
        <Link to={'/inventory'} >Inventory</Link>
        <Link to={'/assign-tools'} >Assign Tool</Link>
      </div>
    </div>
  )
}

export default Dashboard