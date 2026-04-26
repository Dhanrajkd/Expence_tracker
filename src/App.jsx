import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Loginpage from './Pages/Loginpage'
import Dashboard from './Pages/Dashboard'
import { authcontext } from './Context/Context'
import { useContext } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"
import Transactions from './Pages/Transactions'
import Showtrans from './Pages/Showtrans'
import Budjectpage from './Pages/Budjectpage'
function App() {
  const {islogin}=useContext(authcontext)
  const {userauth}=useContext(authcontext)
  const {token}=useContext(authcontext)
  const {logout}=useContext(authcontext)
  const navigate=useNavigate()
  useEffect(()=>{
     if(!token){
      navigate("/")
    }
    else{
      navigate("/dashboard")
    }
  },[token])
 
  const showtransaction=()=>{
    console.log(islogin)
    if(!token){
     return alert("please login")
    }
    navigate("/transactions")
  }
  const showoverview=()=>{
     if(!token){
     return alert("please login")
    }
    navigate("/dashboard")
  }
  const showbudject=()=>{
     if(!token){
     return alert("please login")
    }
    navigate("/budjectpage")
  }
  return (
    <div className='flex flex-col lg:flex-row w-screen h-screen '>
      <div className="flex flex-row md:flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start w-full md:h-[100px] lg:h-screen lg:w-[25%]  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
            <h1 className="hidden lg:block text-3xl text-white font-bold">
              Finance
            </h1>
            <button className="flex flex-col lg:flex-row items-center gap-2 mt-2 hover:bg-black p-1 rounded" onClick={showoverview}>
              <i className=" md:block bi bi-house lg:text-2xl md:text-2xl text-white"></i>
              <p className="lg:text-2xl text-white font-bold">Overview</p>
            </button>

            <button className="flex flex-col lg:flex-row items-center gap-2 mt-2 hover:bg-black p-1 rounded" onClick={showtransaction}>
              <i className=" md:block bi bi-cash-stack lg:text-2xl md:text-2xl text-white"></i>
              <p className="lg:text-2xl text-white font-bold">Transactions</p>
            </button>

            <button className="flex flex-col lg:flex-row items-center gap-2 mt-2 hover:bg-black p-1 rounded" onClick={showbudject}>
              <i className=" md:block bi bi-receipt lg:text-2xl md:text-2xl text-white"></i>
              <p className="lg:text-2xl text-white font-bold">Budgets</p>
            </button>

            <button className="mt-5 text-[15px] lg:text-2xl " onClick={logout}>
              <i className={`bi ${token ? "bi-box-arrow-right" : "bi-box-arrow-in-right"} `}></i>
              {token ? "Logout" : "Login"}
            </button>
        </div>
        <div className='flex-1 h-screen'>
            <div className=' px-4 overflow-auto bg-gray-100 lg:h-full '>
              <Routes>
                <Route path='/' element={<Loginpage/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/transactions' element={<Transactions/>}/>
                <Route path='/budjectpage' element={<Budjectpage/>} />
              </Routes>
            </div>
        </div>
    </div>
  )
}

export default App
