import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const authcontext=createContext()
const Context = ({children}) => {
  const [islogin,setislogin]=useState(false)
  const [userauth,setuserauth]=useState(false)
  const [token,settoken]=useState(false)
  const [budject,setbudject]=useState("")
  const [transactions,settransactions]=useState([])
  const [expences,setexpences]=useState("")
  const [balance,setbalance]=useState("")
  const [chart,setpiechart]=useState([])
  const [page,setpage]=useState(1)
  const [limit,setlimit]=useState(5)
  const [totalpage,settotalpage]=useState(0)
  useEffect(()=>{
    const token=localStorage.getItem("Auth_token")
    if(token){
      settoken(true)
    }
  },[token])
  useEffect(()=>{
    getbudject()
    fetchdata()
    setbalance(Number(budject) - Number(expences))
  },[])
  useEffect(()=>{
    console.log(chart)
  },[chart])

  useEffect(()=>{
    fetchdata()
  },[page])
 
  const getbudject=async()=>{
    const token=localStorage.getItem("Auth_token")
    console.log(token)
    try{
      const response=await fetch("http://localhost:4000/getbudject",{
        method:"GET",
        headers:{
          accept:"application/json",
          Authorization:`Bearer ${token}`
        },
      })
      const responsedata=await response.json()
      if(responsedata.success){
        console.log(responsedata.budject_data)
        setbudject(responsedata.budject_data)
      }
      console.log(responsedata.message)
    }
    catch(err){
      console.log(err)
    }
  }
  const authcheck=()=>{
    setislogin((prev)=>!prev)
  }
  const pageincrease=()=>{
    setpage(page+1)
  }
  const pagedegrease=()=>{
    setpage(page-1)
  }
  const logout=()=>{
    console.log("working")
    localStorage.removeItem("Auth_token")
    settoken(false)
  }
    const checkuser=async(email,password)=>{
      try{
        const response=await fetch("http://localhost:4000/checkuser",{
          method:"POST",
          headers:{
            accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,password})
        })
        const responsedata=await response.json()
        if(responsedata.success){
          localStorage.setItem("Auth_token",responsedata.token)
          setislogin(true)
         setuserauth(true)
         settoken(true)
         alert(responsedata.message)
        }
        else{
          alert("failed")
        }
      }
      catch(err){
        console.log(err)
      }
    }
    const adduser=async(email,password)=>{
      try{
        console.log(email)
         console.log(password)
         const response=await fetch("http://localhost:4000/adduser",{
          method:"POST",
          headers:{
            accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,password})
        })
        const responsedata=await response.json()
        if(responsedata.success){
          alert(responsedata.message)
        }
        else{
           alert(responsedata.message)  
        }
      }
      catch(err){
        console.log(err)
      }
    }
      const fetchdata=async()=>{
        const token=localStorage.getItem("Auth_token")
        try{
            console.log(token)
            const response=await fetch(`http://localhost:4000/get_transaction?page=${page}&limit=${limit}`,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            const responsedata=await response.json()
            if(responsedata.success){
                console.log(responsedata.data)
                settransactions(responsedata.data)
                setexpences(responsedata.totalexpences)
                setpiechart(responsedata.piedata)
                settotalpage(responsedata.totalpages)
            }
            else{
                console.log(responsedata.message)
            }
        }
        catch(err){
            console.log("error",err)
        }
        }
  return (
   <authcontext.Provider value={{islogin,checkuser,adduser,authcheck,userauth,token,logout,getbudject,budject,transactions,expences,balance,chart,fetchdata,pageincrease,pagedegrease,totalpage,page}}>
    {children}
   </authcontext.Provider>
  )
}

export default Context
