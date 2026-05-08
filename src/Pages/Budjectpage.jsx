import React, { useState } from "react";
import {authcontext} from "../Context/Context"
import { useContext } from "react";
const Budget = () => {
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {budject,getbudject}=useContext(authcontext)

  const handleSave = async() => {
    if (!input) return;
    setInput("");
    setShowModal(false);
    setIsEditing(false);
      const token=localStorage.getItem("Auth_token")
    try{
       const response=await fetch("https://expence-tracker-backend-3.onrender.com/Addbudject",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({budject:input})
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
    <div className="w-full h-screen flex flex-col items-center p-6">
      <div className="w-full bg-white  flex flex-col items-center shadow-md p-4 rounded mb-4">
        <h2 className="text-lg font-semibold">Current Budget</h2>
        <p className="text-2xl font-bold text-green-600 mt-2">
          ₹ {budject}
        </p>
      </div>
      <div className="flex gap-3">
        <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
                setShowModal(true);
            }}
            >
            {budject ? "Edit budject" :"Add Budget"}
        </button>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">
              {budject ? "Edit Budget" : "Add Budget"}
            </h3>

            <input
              type="number"
              className="w-full border p-2 mb-3"
              placeholder="Enter budget"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              className="w-full bg-blue-500 text-white py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;