import { Link,Navigate} from "react-router-dom";
import { useForm} from "react-hook-form"
import { loginUserAsync,selectAccessToken} from "../authSlice";
import { useDispatch,useSelector } from "react-redux";
import toast,{Toaster} from "react-hot-toast";
import {  useState } from "react";
const Login=()=>{
    const { register, handleSubmit,formState: { errors },reset} = useForm();
    const dispatch=useDispatch();
  const [show,setShow]=useState(false);
    const user=useSelector(selectAccessToken);
    
    const onSubmit=async(data)=>{
        console.log("hello",data);
        await dispatch(loginUserAsync({
          email:data.email,
          password:data.password
        }))
        reset();
       } 
       const showPassword=()=>{
        setShow(!show);
       }
       const googleButton=()=>{
        // console.log("hello world");
        // window.location.href = 'http://localhost:5000/auth/google';
        window.open("http://localhost:5000/google/callback",'_self')
       }
    return (
        <>
        <Toaster/>
        {user&&<Navigate to='/'replace={true}/>}
        <section className="vh-100 gradient-custom">
  <div className="container py-2 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your Email and password!</p>

              <div data-mdb-input-init className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email"  
                {...register("email", {
                required: "Please enter your  email.",
                pattern:{
                    value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "email is invalid",
                },
                
               })} // custom message
              className="form-control form-control-lg" />
                  {errors.email&&<p className="text-white">{errors.email.message}</p>}
              </div>

              <div data-mdb-input-init className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="position-relative">
              <input type={show?"text":"password"} id="password"   
                {...register("password", {
                required: "Please enter your  Password.",
                // pattern: {
                //     value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                //     message: "The  min 8 letter password, with at least a symbol, upper and lower case letters and a number"
                // }
                })} // custom message
      
                className="form-control form-control-lg" />
                <span className="position-absolute top-50 end-0 translate-middle-y cursor-pointer fs-4 me-2 "><i className="bi bi-eye text-primary font-weight-bold"onClick={showPassword}></i></span>
              </div>
                {errors.password&&<p className="text-white">{errors.password.message}</p>}
              </div>

              <p className="small mb-5 pb-lg-2"><Link className="text-white-50" to="/forget">Forgot password?</Link></p>

              <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5 m-auto" type="submit">Login</button>

              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <button className="btn btn-link text-white" aria-label="Sign in with Google" onClick={googleButton}>
  <i className="fab fa-google fa-lg"></i>
</button>
              </div>

            </div>
            </form>

            <div>
              <p className="mb-0">Don't have an account? <Link to='/signup' className="text-white-50 fw-bold">Sign Up</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
      </section>
        </>
    )
}
export default Login;