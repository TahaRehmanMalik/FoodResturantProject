import { useState } from 'react'
import './forget.css'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { resetPasswordRequestAysnc,selectMail } from '../authSlice';
import toast, { Toaster } from "react-hot-toast";
const  ForgetPassword=()=>{
    const [data,setData]=useState(null);
    const dispatch=useDispatch();
    const mail=useSelector(selectMail);
    const handleEmail=()=>{
        console.log("The target value is",data);
        dispatch(resetPasswordRequestAysnc({email:data}));
    }
    return (
        <>
        <Toaster/>
          <div className="root-container">
            <div className="email">
            <label>Email</label>
            <input type="text" placeholder="Email" className="form-control" onChange={(e)=>setData(e.target.value)} />
            {mail&&<p className='text-success font-weight-bold'>Mail Sent</p>}          
            </div>
        <div className='btn'>
            <button className="text-center px-3 py-2 bg-primary text-white border rounded fs-5" onClick={()=>handleEmail()}>Sent Mail</button>
        </div>
        <div>
            <p> Send me back to{' '}<Link to='/login'>Login</Link></p>
        </div>
        </div>
        
        </>
    )
}
export default ForgetPassword;