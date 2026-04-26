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
    const{transactions,fetchdata,pageincrease,pagedegrease,totalpage,page}=useContext(authcontext)
    const [filteredtrans,setfilteredtrans]=useState([])
    const [showedit,setshowedit]=useState(false)
    const [editid,seteditid]=useState(0)
    const [menuid,setmenuid]=useState(null)
    const [selectedmonth, setSelectedmonth] = useState(
        new Date().toISOString().slice(0, 7)
        );
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
            const responce=await fetch(`http://localhost:4000/deletedata/${id}`,{
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
        }
        }, [transactions, selectedmonth,category])

        useEffect(()=>{
            console.log("category",category)
        },[category])
     const handlesubmit=async()=>{
        console.log(editid)
            if(payment.amount==="" || payment.method==="" || payment.paymentfor===""){
                return alert("enter all fields")
            }
         try{
        const responce=await fetch(`http://localhost:4000/editdata/${editid}`,{
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
        if(selectedmonth){
            filtereddata=filtereddata.filter((item)=>item.createdAt.slice(0,7)===selectedmonth)
        }
        if(category){
            filtereddata=filtereddata.filter((item)=>item.paymentfor===category)
       }
       setfilteredtrans(filtereddata)
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
                <input
                    type="month"
                    className="border p-2 h-[10] "
                    value={selectedmonth}
                    onChange={(e) => setSelectedmonth(e.target.value)}
            />
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
                        <tr key={item._id} className='hover:bg-gray-300 '>
                            <td className='lg:p-2 p-2'>
                                <div className='flex items-center justify-center'>
                                    <img src={methodImages[item.method]} alt="upi" 
                                    className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full border "/>
                                </div>
                            </td>
                            <td className='p-2'>
                                <div className='flex items-center justify-center'>
                                    <img src={Categoryicons[item.paymentfor]} alt="" 
                                        className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px]  rounded-full border'
                                    />
                                </div>
                            </td>
                            <td className='p-2 lg:text-2xl font-bold'>${item.amount}</td>
                            <td className='hidden lg:table-cell p-2 lg:text-2xl font-bold '>{formattedDate}</td>
                            <td className='align-middle p-2'>
                                <div className="flex gap-2 justify-center items-center p-4">
                                    <div className='flex space-x-5'>
                                        <button className='hidden lg:block ' onClick={()=>deletetrans(item._id)}>
                                          <i className="bi bi-trash text-2xl lg:text-3xl"></i>
                                        </button>
                                        <button className='hidden lg:table-cell'  onClick={()=>handleedit(item._id)}>
                                            <i className="bi bi-pencil text-2xl lg:text-3xl"></i>
                                        </button>
                                    </div>
                                    
                                    <div className="relative inline-block p-4">
                                        <button
                                            className="text-2xl lg:hidden"
                                            onClick={() => setmenuid(prev => (prev===item._id ? null :item._id))}
                                            >
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <div
                                            className={`absolute z-50 w-[120px] lg:hidden bg-white shadow-md rounded top-full space-x-5 right-0 mt-2 ${
                                                menuid ===item._id ? "block" : "hidden"
                                            }`}
                                            >
                                            <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>handleedit(item._id)}>Edit</p>
                                            <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>deletetrans(item._id)}>Delete</p>
                                        </div>
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
