import { useForm} from "react-hook-form"
import { Link,Navigate } from "react-router-dom";
import {createSignupAsync,selectAccessToken} from '../authSlice';
import { useDispatch,useSelector } from "react-redux";
import toast,{Toaster} from "react-hot-toast";
import { useState } from "react";
const Signup=()=>{
  const [show,setShow]=useState(false);
  const [expose,setExpose]=useState(false);
    const { register, handleSubmit, watch,formState: { errors },reset} = useForm();
   const dispatch=useDispatch();
  const user=useSelector(selectAccessToken)
  
   const onSubmit=async(data)=>{
    console.log("hello",data);
    await dispatch(createSignupAsync({
      name:data.name,
      email:data.email,
      password:data.password,
    }));
   
      reset();
   } 
   const showPassword=()=>{
    setShow(!show);
   }
   const showExposed=()=>{
    setExpose(!expose);
   }
    return (
        <>
        <Toaster/>
        {user&& <Navigate to='/' replace={true}/>}
        <div className="bg-reserve">
          <h1 className="text-center mb-4 text-white">Signup Form</h1>
        <div className="container-fluid" style={{maxWidth:'400px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
  {/* first Name */}
  <div data-mdb-input-init="" className="form-outline mb-4">
  <label className="form-label fw-bold" htmlFor="name">
      Name
    </label>
    <input type="text" id="name"   
     {...register("name", {
      required: "Please enter your first name.",
      })} // custom message
    className="form-control" />
  </div>
    {/* Email */}
    <div data-mdb-input-init="" className="form-outline mb-4">
    <label className="form-label fw-bold" htmlFor="email">
     Email Address
    </label>
    <input type="text" id="email"  
     {...register("email", {
      required: "Please enter your  email.",
      pattern:{
        value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
        message: "email is invalid",
      },
      
      })} // custom message
      
    className="form-control" />
     {errors.email&&<p className="text-white">{errors.email.message}</p>}
  </div>
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
  </div>
  
  {/* Submit button */}
  <div className="d-flex justify-content-center mb-4">
  <button
    data-mdb-ripple-init=""
    type="submit"
    className="btn btn-primary btn-block"
  >
    Signup  
  </button>
  </div>
</form>
<p className="text-white">Have you already an Account<Link to='/login'> Login</Link></p>
        </div>
        </div>

        </>
    )
}
export default Signup;