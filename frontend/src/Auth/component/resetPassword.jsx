import { useForm} from "react-hook-form"
import { useDispatch,useSelector } from "react-redux";
import { resetPasswordAsync,selectResetPassword } from "../authSlice";
import { Link } from "react-router-dom";
import './forget.css';
import { useState } from "react";
const query =new URLSearchParams(window.location.search);
const token=query.get('token');
const email=query.get('email');
const ResetPassword=()=>{
  const [show,setShow]=useState(false);
  const [expose,setExpose]=useState(false);
    const { register, handleSubmit, watch,formState: { errors },reset} = useForm();
   const dispatch=useDispatch();
   console.log("The token and email is",token,email)
   const  resetPassword=useSelector(selectResetPassword);
    const onSubmit=async(data)=>{
      console.log("The data is",data);
    await dispatch(resetPasswordAsync({token:token,email:email,password:data.password}));
    }
    const showPassword=()=>{
      setShow(!show);
     }
     const showExposed=()=>{
      setExpose(!expose);
     }
    return(

        <div> 

            {(token&&email)?
        <div className="bg-reset">
        <h1 className="text-center mb-4 text-white">Enter New Password</h1>
        <div className="container" style={{maxWidth:'400px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
  {/* password */}
  <div data-mdb-input-init="" className="form-outline mb-4">
  <label className="form-label fw-bold" htmlFor="password">
     Password
    </label>
    <div className="position-relative">
    <input type={show?"text":"password"} id="password"   
     {...register("password", {
      required: "Please enter your  Password.",
      pattern: {
        value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        message: "The  min 8 letter password, with at least a symbol, upper and lower case letters and a number"
      }
      })} // custom message
      
    className="form-control" />
        <span className="position-absolute top-50 end-0 translate-middle-y cursor-pointer fs-4 me-2 "><i className="bi bi-eye text-primary font-weight-bold"onClick={showPassword}></i></span>
     </div>
    {errors.password&&<p className="text-white">{errors.password.message}</p>}
  </div>


   {/* Confirm Password */}
   <div data-mdb-input-init="" className="form-outline mb-4">
  <label className="form-label fw-bold" htmlFor="confirmPassword">
    Confirm Password
    </label>
    <div className="position-relative">
    <input type={expose?"text":"password"} id="confirmPassword"   
     {...register("confirmPassword", {
      required: "Please enter your  Confirm Password.",
      validate: (val) => {
        if (watch('password') !== val) {
          return "Your passwords do not match";
        }
      },
      })} // custom message
      
    className="form-control" />
    <span className="position-absolute top-50 end-0 translate-middle-y cursor-pointer fs-4 me-2 "><i className="bi bi-eye text-primary font-weight-bold"onClick={showExposed}></i></span>
    </div>
    {errors.confirmPassword&&<p className="text-white">{errors.confirmPassword.message}</p>}
    {resetPassword&&<p className="text-white font-weight-bold">Password Reset Successfully</p>}
  </div>
  
  {/* Submit button */}
  <div className="d-flex justify-content-center mb-4">
  <button
    data-mdb-ripple-init=""
    type="submit"
    className="btn btn-primary btn-block"
  >
    Reset Password
  </button>
  </div>
</form>
<p className="text-white">Have you already an Account<Link to='/login'> Login</Link></p>
        </div>
        </div>:<p className="text-center mt-4">Incorrect Link</p>
        }
        </div>

       
        
    )
}
export default ResetPassword;