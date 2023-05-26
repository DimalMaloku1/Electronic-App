import React, {useState} from "react"
import Axios from "axios"
import { useState } from "react"

function ContactTwo(){
    const url = "https://localhost:7099/api/Contacts"
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    function submit(e){
     e.preventDefault();
     Axios.post(url,{
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
     })
     .then(res=>{
        console.log(res.data)
     })
    }

    function handle(e){
     const newdata = {...data}
     newdata[e.target.id] = e.target.value
     setData(newdata)
     console.log(newdata)
    }
    return(
        <div>
         <form onSubmit={(e)=> submit(e)}>
            <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="Name..." type="text" ></input>
            <input onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="Email..." type="text" ></input>
            <input onChange={(e)=>handle(e)} id="phone" value={data.phone} placeholder="Phone Number..." type="text" ></input>
            <input onChange={(e)=>handle(e)} id="message" value={data.message} placeholder="Message..." type="text" ></input>
            <button>Submit</button>
         </form>
        </div>
    )
}
export default ContactTwo