import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Transactions = () => {
    const [payment,setpayment]=useState({
        amount:"",
        method:"",
        paymentfor:"",
    })
    const handlechange=(e)=>{
        const {name,value}=e.target
        setpayment((prev)=>({...prev,[name]:value}))
    }
    const navigate=useNavigate()
    const handlesubmit=async()=>{
      const token=localStorage.getItem("Auth_token")
      try{
        const response=await fetch("http://localhost:4000/addtransaction",{
          method:"POST",
          headers:{
            accept:"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },
          body:JSON.stringify(payment)
        })
        const responsedata=await response.json()
        if(responsedata.success){
          alert(responsedata.message)
          navigate("/dashboard")
        }
        else{
          alert(responsedata.message)
        }
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div className='flex  w-full h-screen justify-center items-center '>
      <div className='w-[350px] h-[350px] lg:w-[500px] lg:h-[350px] bg-white border rounded-[10px] px-2'>
            <h1 className='text-center mt-2 text-2xl font-bold'>Add Transactions</h1>
            <input type="number" name="amount" className='w-full p-2 border mt-4' placeholder='Enter amount' value={payment.amount} onChange={(e)=>handlechange(e)}  />
            <select name="method" id="" className='w-full mt-2 border p-2 text-gray-400' onChange={handlechange}>
                <option value="">Enter payment Method</option>
                <option value="Upi">Upi</option>
                 <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
            </select>
             <select name="paymentfor" id="" className='w-full mt-4 border p-2 text-gray-400' onChange={handlechange}>
                <option value="">Payment for</option>
                <option value="Rent">Rent</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Gym">Gym</option>
            </select>
            <button className='w-full mt-4 bg-blue-400 p-2 mt-5 rounded font-bold' onClick={(e)=>handlesubmit()}>Add Transactions</button>
      </div>
    </div>
  )
}

export default Transactions
