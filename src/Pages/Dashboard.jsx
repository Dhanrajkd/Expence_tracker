import React, { useEffect, useState } from 'react'
import Showtrans from './Showtrans'
import BudgetCard from "../Components/Budject.jsx"
import { useContext } from 'react'
import { authcontext } from '../Context/Context.jsx'
import Charts from '../charts/Charts.jsx'
const Dashboard = () => {
  const {expences} =useContext(authcontext)
  const {budject}=useContext(authcontext)
  const balance=Number(budject) - Number(expences)
  return (
    <div className='w-full h-auto'>
      <div className='w-full  text-3xl font-bold'>
          Overview
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
       <div className='w-full h-auto mt-2'>
            <Showtrans/>
      </div>
      <div className='mt-2' >
        <Charts />
      </div>
    </div>
  )
}

export default Dashboard
