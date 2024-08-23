import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReserveFormPage from './pages/ReserveFormPage';
import ReserveSlotPage from './pages/reserveSlotPage';
import Login from './Auth/component/Login';
import Signup from './Auth/component/Signup';
import { useDispatch,useSelector} from 'react-redux';
import {checkAuthAsync,selectUserChecked} from './Auth/authSlice'
import ProtectedRoute from './protect/protected';
import { useEffect } from 'react';
import ForgetPassword from './Auth/component/forgetPassword';
import ResetPassword from './Auth/component/resetPassword';

  const router=createBrowserRouter([
  {
      path:'/',
    element:
    <ProtectedRoute>
     <HomePage></HomePage>
    </ProtectedRoute>

  },
  {
    path:'/form',
  element:<ReserveFormPage></ReserveFormPage>
},
{
  path:'/reserve',
  element:
  <ProtectedRoute>
    <ReserveSlotPage></ReserveSlotPage>
  </ProtectedRoute>
 
},
{
  path:'/login',
  element:<Login></Login>
},
{
  path:'/signup',
  element:<Signup></Signup>
},{
  path:'/forget',
  element:<ForgetPassword></ForgetPassword>
},
{
  path:'/reset-password',
  element:<ResetPassword></ResetPassword>
}
  ])
  const App=()=>{
    const dispatch=useDispatch();
    const userChecked=useSelector(selectUserChecked);
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])
  return (
    <>
    {userChecked&&
   <RouterProvider router={router}/>
    }
    </>
  )
}
export default App;