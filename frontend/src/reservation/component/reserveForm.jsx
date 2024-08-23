import { useForm } from "react-hook-form"
import './reserve.css';
import { useDispatch,useSelector } from "react-redux";
import { createReserveFormAsync,reserveData,reserveError,resetMessager,resetError} from "../reserveSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const ReserveForm=()=>{
  const dispatch=useDispatch();
  const  messager =useSelector(reserveData);
  const  error =useSelector(reserveError);
  const { register, handleSubmit,formState: { errors },reset} = useForm();
  const d = new Date();
  let text = d.toDateString();
  const time=new Date().toLocaleTimeString();



  useEffect(()=>{
    if(messager)
    {
      toast.success(messager);
      dispatch(resetMessager());
    }
    else if(error)
    {
      toast.error(error);
      dispatch(resetError());
    
    }
  },[messager,error])

  const onSubmit = async (data) => {
    console.log(data);
    data.date=text;
    data.time=time;
    await dispatch(createReserveFormAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      time: data.time,
      date:data.date


    }));
    reset();
  }
  
    return (
        <>
        <Toaster/>
        <div className="bg-reserve">
          <h1 className="text-center mb-4 text-white">Reservation Form</h1>
        <div className="container-fluid" style={{maxWidth:'400px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
  {/* first Name */}
  <div data-mdb-input-init="" className="form-outline mb-4">
  <label className="form-label fw-bold" htmlFor="firstName">
      First Name
    </label>
    <input type="text" id="firstName"   
     {...register("firstName", {
      required: "Please enter your first name.",
      })} // custom message
    className="form-control" />
  </div>
    {/* last Name */}
  <div data-mdb-input-init="" className="form-outline mb-4">
  <label className="form-label fw-bold" htmlFor="lastName">
      Last Name
    </label>
    <input type="text" id="lastName"   
     {...register("lastName", {
      required: "Please enter your last name.",
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
  {/* phone Number */}
  <div data-mdb-input-init="" className="form-outline mb-4">
  <label className="form-label fw-bold" htmlFor="phone">
     Phone Number
    </label>
    <input type="text" id="phone"   
     {...register("phone", {
      required: "Please enter your  Phone Number.",
      maxLength: {
        value: 11,
        message: "The number must be exactly 11 digits"
      },
      minLength: {
        value: 11,
        message: "The number must be exactly 11 digits"
      },
      pattern: {
        value: /^\d{11}$/,
        message: "The number must be exactly 11 digits"
      }
      })} // custom message
      
    className="form-control" />
    {errors.phone&&<p className="text-white">{errors.phone.message}</p>}
  </div>
  
  {/* Submit button */}
  <button
    data-mdb-ripple-init=""
    type="submit"
    className="btn btn-primary btn-block"
  >
    Submit 
  </button>
</form>

        </div>
        </div>
       
        </>
    )
}
export default ReserveForm;