import { useContext, useState } from "react"
import { authcontext } from "../Context/Context"
function BudgetCard() {
  const {budject}=useContext(authcontext)

  const savebudject=async()=>{
      const token=localStorage.getItem("Auth_token")
    try{
       const response=await fetch("http://localhost:4000/Addbudject",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({budject:addbudject})
    })
      const responsedata=await response.json()
      if(responsedata.success){
        alert(responsedata.message)
        getbudject()
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
    <div
      className="p-4 bg-white rounded-xl shadow-sm border border-gray-200"
      onClick={() => setOpen(true)}
    >
      <p className="text-xl text-gray-400">Budget</p>
      <h1 className="text-xl lg:text-2xl font-bold mt-2">${budject}</h1>
    </div>
  )
}
export default BudgetCard