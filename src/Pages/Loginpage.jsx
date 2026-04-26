import { useState } from 'react'
import { authcontext } from '../Context/Context'
import { useContext } from 'react'
const Loginpage = () => {
    const {islogin}=useContext(authcontext)
    const {checkuser}=useContext(authcontext)
    const {adduser}=useContext(authcontext)
    const {token}=useContext(authcontext)
    const [signin,setsignin]=useState(false)
    const [login,setlogin]=useState(false)
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [auth,setauth]=useState(false)
    const showsignin=()=>{
        setsignin(true)
        setlogin(false)
    }
    const showlogin=()=>{
        setlogin(true)
        setauth(true)
    }
    const checklogin=()=>{
        checkuser(email,password)
        setlogin(false)
    }
    const addsignin=()=>{
        adduser(email,password)
    }
  return (
    <div className='flex flex-col w-full justify-center items-center h-screen'>
        <div className={`flex-col gap-2 ${auth ? "hidden" :"flex"} justify-center items-center w-full h-screen`}>
            <h1 className=''>Login to continue app</h1>
            <button className='w-[100px] h-[50px] bg-green-500' onClick={(e)=>showlogin()}>Login</button>
        </div>
            <div className={`${login ? "flex" :"hidden"} flex-col w-[350px] bg-white px-2 py-2 gap-5 rounded`}>
                <h1 className='w-full text-center text-2xl'>Login</h1>
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className='w-full border p-3' placeholder='Enter Email'/>
                <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)}className='w-full border p-3' placeholder='Enter password' />
                <button className='w-full p-2 bg-green-400 rounded-lg' onClick={()=>checklogin()}>Login</button>
                <p className='text-center text-1xl'>no account signin</p>
                <button className='w-full p-2 bg-red-400 rounded-lg' onClick={(e)=>showsignin()}>Sign in</button>
            </div>
            <div className={`${signin ?"flex" :"hidden"} flex-col w-[350px] bg-white px-2 py-2 gap-5 rounded`}>
                <h1 className='w-full text-center text-2xl'>Sign in</h1>
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className='w-full border p-3' placeholder='Enter Email'/>
                <input type="text"  value={password} onChange={(e)=>setpassword(e.target.value)} className='w-full border p-3' placeholder='Enter password' />
                <button className='w-full p-2 bg-green-400 rounded-lg' onClick={(e)=>addsignin()}>Signin</button>
            </div>
    </div>
  )
}

export default Loginpage
