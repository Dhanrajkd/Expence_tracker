import React, { useEffect, useState } from 'react'
import Showtrans from './Showtrans'
import BudgetCard from "../Components/Budject.jsx"
import { useContext } from 'react'
import { authcontext } from '../Context/Context.jsx'
import Charts from '../charts/Charts.jsx'
import BarChart from '../charts/Barchart.jsx'
const Dashboard = () => {
  const {expences} =useContext(authcontext)
  const {budject,transactions,chart,month,monthfilter}=useContext(authcontext)
  const balance=Number(budject) - Number(expences)
  const [maxcategory,setmaxcategory]=useState("")
  const [maxcount,setmaxcount]=useState(0)
  const [mincategory,setmincategory]=useState("")
  const [mincount,setmincount]=useState(1)
  const progress=Math.round(
   (Number(expences)/Number(budject))*100,100
  )
  useEffect(()=>{
     console.log(progress)
  },[expences])
  useEffect(()=>{
    const category={}

    let maxcount=1
    let maxcategory=""
    let mincount=Infinity
    let mincategory=""
    chart.forEach((item)=>{
      category[item.paymentfor]=item.totalamount
    })
    for (let payments in category){
      if(category[payments]>maxcount){
        maxcount=category[payments]
        maxcategory=payments
      }
      if(category[payments]<mincount){
          mincount=category[payments]
          mincategory=payments
      }
    }
    setmaxcategory(maxcategory)
    setmaxcount(maxcount)
    setmincategory(mincategory)
    setmincount(mincount)
    console.log(category)
    console.log("maxcount",maxcount)
    console.log("maxcategory",maxcategory)
    console.log("mincount",mincount)
    console.log("mincategory",mincategory)
  },[transactions])
  return (
    <div className='w-full h-auto'>
      <div className='w-full flex justify-between  text-3xl font-bold mt-2'>
          Overview
          <input type="month" 
            className='border p-2 text-2xl rounded-lg'
            value={month} 
            onChange={(e)=> monthfilter(e.target.value)}
          />
      </div>
      <div className='grid grid-cols-3 gap-2 w-full mt-2'>
          <BudgetCard />
          <div className='p-4 bg-white rounded-xl shadow-sm border border-gray-200'>
            <p className='text-xl text-gray-400'>Balance</p>
            <h1 className={`text-xl lg:text-2xl ${expences>budject ? "text-red-400":""} font-bold mt-2`}>${balance}</h1>
          </div>
          <div className='p-4 bg-white rounded-xl shadow-sm border border-gray-200'>
            <p className='text-xl text-gray-400'>Expences</p>
            <h1 className={`text-xl lg:text-2xl font-bold mt-2`}>${expences}</h1>
          </div>
      </div>
      <div className='w-full p-4 bg-white shadow-lg mt-2 rounded-lg'>
          <h1 className='font-bold p-2 text-2xl'>Budget Used</h1>
          <div className='flex w-full h-[30px] border rounded-full '>
              <div className={`h-full rounded-full ${progress > 80? "bg-red-500": progress > 50? "bg-yellow-400": "bg-green-500"} p-1`} style={{width:`${progress}%`}}>
               {progress}%
              </div>
          </div>
      </div>
    <div className="w-full grid grid-cols-2 gap-5 p-4 bg-gray-100 rounded-lg mt-2">
      <div className="p-4 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-sm text-gray-500">Max Spending</h2>
        <p className="text-lg font-semibold text-red-500 mt-1">
          {maxcategory || "N/A"}
        </p>
        <p className="text-2xl font-bold mt-2">
          ₹{maxcount}
        </p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-sm text-gray-500">Min Spending</h2>
        <p className="text-lg font-semibold text-green-500 mt-1">
          {mincategory || "N/A"}
        </p>
        <p className="text-2xl font-bold mt-2">
          ₹{mincount === Infinity ? 0 : mincount}
        </p>
      </div>
    </div>
       <div className='w-full h-auto mt-2'>
            <Showtrans/>
      </div>
      <div className='w-full mt-2 space-y-5' >
        <Charts />
        <BarChart transactions={transactions}/>
      </div>
    </div>
  )
}

export default Dashboard
