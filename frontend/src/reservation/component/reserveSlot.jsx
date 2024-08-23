import { getReserveDataAsync,dataReservation,selectStatus} from "../reserveSlice";
import { useDispatch,useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";
const ReserveSlot=()=>{
    const dispatch=useDispatch();
    const reservation=useSelector(dataReservation);
    const loading=useSelector(selectStatus);

    useEffect(()=>{
        dispatch(getReserveDataAsync());
      },[])
    return (
        <>
        <div className="container mt-4">
  <h1 className="text-center mb-4">Reservation Slots </h1>
  {loading=="loading"?
  <div className='d-flex justify-content-center'>
    <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
  :null}
<>
  <div className="row">
  {
  reservation.map((doc,index)=>(
    <div className="col-md-6 col-lg-4 mb-4"key={index}>
      <div className="card h-100" style={{ width: "18rem" }}>
  <div className="card-body">
    <h5 className="card-title">{doc.firstName+''+doc.lastName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{doc.email}</h6>
    <p className="card-text">
     These are Reserve Slots You can apply available Slot
    </p>
    <div className="d-flex justify-content-between">
    <p>{doc.date}</p>
        <p>{doc.time}</p>
    </div>

   
  </div>
</div>
      </div>
    

  ))
}
  </div>
  </>

</div>
        </>
    )
}
export default ReserveSlot;