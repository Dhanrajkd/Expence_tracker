import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {authcontext} from "../Context/Context.jsx"
import Upi from '../images/upi-2.jpg'
import Card from "../images/Mastercard.png"
import Cash from "../images/Cash.png"
import Food from "../images/Food.png"
import Rent from "../images/Rent.jpg"
import Travel from "../images/Travel.png"

const Showtrans = () => {
    const{transactions,fetchdata,pageincrease,pagedegrease,totalpage,page,month,monthfilter}=useContext(authcontext)
    console.log("transactions",transactions)
    const [filteredtrans,setfilteredtrans]=useState([])
    const [showedit,setshowedit]=useState(false)
    const [editid,seteditid]=useState(0)
    const [menuid,setmenuid]=useState(null)
    const [selectedmonth, setSelectedmonth] = useState(
        new Date().toISOString().slice(0, 7)
        );
    useEffect(()=>{
        console.log(selectedmonth)
    },[])
    console.log(transactions)
    const [payment,setpayment]=useState({
            amount:"",
            method:"",
            paymentfor:"",
        })
    const [category,setcategory]=useState("")
        const handlechange=(e)=>{
            const {name,value}=e.target
            setpayment((prev)=>({...prev,[name]:value}))
        }
     const deletetrans=async(id)=>{
        console.log(id)
        try{
            const responce=await fetch(`https://expence-tracker-backend-3.onrender.com/${id}`,{
                method:"DELETE",
                headers:{
                    accept:"application/json",
                    "Content-Type":"application/json"
                }
            })
            const responcedata=await responce.json()
            if(responcedata.success){
                alert(responcedata.message)
                fetchdata()
            }
        }
        catch(err) {
            console.log(err)
            alert("Something went wrong");
        }
     }
     const handleedit=async(id)=>{
        setshowedit(true)
        seteditid(id)
     }
     useEffect(() => {
        if (transactions.length > 0) {
            filtereddates()
            console.log(transactions)
        }
        if(transactions.length===0){
            setfilteredtrans([])
        }
        }, [transactions, selectedmonth,category])

        useEffect(()=>{
            console.log("category",category)
            console.log("filterdata",filteredtrans)
        },[category])
     const handlesubmit=async()=>{
        console.log(editid)
            if(payment.amount==="" || payment.method==="" || payment.paymentfor===""){
                return alert("enter all fields")
            }
         try{
        const responce=await fetch(`https://expence-tracker-backend-3.onrender.com/${editid}`,{
            method:"PATCH",
            headers:{
                accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payment)
        })
            const responcedata=await responce.json()
            if(responcedata.success){
                alert(responcedata.message)
                fetchdata()
            }
            else{
                alert(responcedata.message)
            }
        }
        catch(err){
            console.log(err)
        }
     }
    const filtereddates=()=>{
        let filtereddata=transactions
        console.log(filtereddata)
        if(category){
            filtereddata=filtereddata.filter((item)=>item.paymentfor===category)
       } 
       setfilteredtrans(filtereddata)
       console.log(filteredtrans)
     } 
     const methodImages = {
        Upi: Upi,
        Card:Card,
        Cash:Cash
        };
        const Categoryicons={
            Food:Food,
            Travel:Travel,
            Rent:Rent
        }
            
  return (
    <div className='w-full h-auto px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 min-h-[200px]'>
        <div className='w-full flex flex-col lg:flex-row justify-between lg:items-center p-4'>
            <div className='w-full text-center lg:text-start'>
                <h1 className='text-2xl font-bold mb-2'>Transactions</h1>
            </div>
            <div className='flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5 lg:items-center'>
              
                <select className='p-2 border h-[10]' onChange={(e)=>setcategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Rent">Rent</option>
                </select>
            </div>
        </div>
        <table className='w-full h-auto '>
            <thead className='bg-gray-50 text-gray-600 uppercase text-xs'>
                <tr className='p-4'>
                    <th className='p-4'>Method</th>
                    <th>Purpose</th>
                    <th>amount</th>
                    <th className='hidden lg:table-cell '>Date</th>
                    <th> 
                       Actions
                    </th>
                </tr>
            </thead>
             <tbody className=' border text-center'>
                {filteredtrans && filteredtrans.length > 0 ? (
                    filteredtrans.map((item)=>{
                const formattedDate = new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                });
                return (
                <tr key={item._id} className="hover:bg-gray-100 transition duration-150">
                    <td className="p-2">
                        <div className="flex justify-center">
                        <img
                            src={methodImages[item.method]}
                            alt="method"
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border shadow-sm"
                        />
                        </div>
                    </td>
                    <td className="p-2">
                        <div className="flex justify-center">
                        <img
                            src={Categoryicons[item.paymentfor]}
                            alt="category"
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border shadow-sm"
                        />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-1">
                        {item.paymentfor}
                        </p>
                    </td>
                    <td className="p-2 text-center font-semibold text-lg lg:text-xl">
                        ₹{item.amount}
                    </td>
                    <td className="hidden lg:table-cell p-2 text-center text-gray-600">
                        {formattedDate}
                    </td>
                    <td className="p-2">
                        <div className="flex justify-center items-center gap-3">
                        <button
                            className="hidden lg:block hover:text-red-500 transition"
                            onClick={() => deletetrans(item._id)}
                        >
                            <i className="bi bi-trash text-xl"></i>
                        </button>

                        <button
                            className="hidden lg:block hover:text-blue-500 transition"
                            onClick={() => handleedit(item._id)}
                        >
                            <i className="bi bi-pencil text-xl"></i>
                        </button>
                        <div className="relative lg:hidden">
                            <button
                            className="text-xl"
                            onClick={() =>
                                setmenuid(prev => (prev === item._id ? null : item._id))
                            }
                            >
                            <i className="bi bi-three-dots-vertical"></i>
                            </button>

                            {menuid === item._id && (
                            <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md border z-50">
                                <p
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleedit(item._id)}
                                >
                                Edit
                                </p>
                                <p
                                className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                onClick={() => deletetrans(item._id)}
                                >
                                Delete
                                </p>
                            </div>
                            )}
                        </div>

                        </div>
                    </td>
            </tr>
            )
        })
            ): <tr><td className='text-2xl p-4' colSpan={5}>No datas found</td></tr>}
            <tr className={`bg-gray-600 ${filteredtrans.length > 0 ? "" :"hidden"}`}>
                <td colSpan={5} className='text-center p-2 lg:p-4 space-x-5'>
                    <button disabled={page===1} type="button" className='px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:pointer-events-none
                        disabled:hover:bg-white'onClick={pagedegrease} >Prev</button>
                    <button disabled={page===totalpage} className='px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:pointer-events-none
                        disabled:hover:bg-white'onClick={pageincrease}>
                            Next
                    </button>
                </td>
            </tr>
            <tr >
                <td colSpan={5} className={`text-2xl p-4 text-green-500 ${filteredtrans.length > 0 ? "" :"hidden"} `}>page {page} of {totalpage}</td>
            </tr>
        </tbody>
        </table>
        <div className={`fixed top-0 left-0 inset-0 bg-black bg-opacity-50 z-50 items-center justify-center ${showedit ? "flex":"hidden"}`}onClick={(e)=>setshowedit(false)}>
            <div className='w-[350px] h-[350px] lg:w-[500px] lg:h-[350px] bg-white rounded-[10px] px-2' onClick={(e)=>e.stopPropagation()}>
                    <h1 className='text-center mt-2 text-2xl font-bold'>Edit Transactions</h1>
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
                    <button className='w-full mt-4 bg-blue-400 p-2 rounded font-bold' onClick={(e)=>handlesubmit()}>Add Transactions</button>
            </div>
        </div>
    </div>
  )
}
export default Showtrans
