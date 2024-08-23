import { Link } from 'react-router-dom';
import './navbar.css'
import { useDispatch } from 'react-redux';
import { signOutAsync } from '../Auth/authSlice';
const Navbar=()=>{
const dispatch=useDispatch();
  const Logout=()=>{
     dispatch(signOutAsync());
  }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{padding:'0 100px'}}>
  <div className="container-fluid m-auto">
    <a className="navbar-brand text-warning fs-3" href="#">Foodies</a>
    <button className="navbar-toggler navbar-toggler-custom" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  d-md-flex justify-content-md-evenly  fs-4"style={{width:'100%'}}>
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/">Our Menu</Link>
        </li>
        <li className="nav-item">
       <Link className="nav-link text-white" to="/form">Reservation</Link>
        </li>
        <li className="nav-item">
       <Link className="nav-link text-white" to="/reserve">Reserve</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Contact Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Level Up</a>
        </li>
       
      </ul>
       <div className='mt-2'>
        <button className='p-2 border rounded'onClick={Logout}>Logout</button>
       </div>
    </div>
  </div>
</nav>
        </>
    )
}
export default Navbar;