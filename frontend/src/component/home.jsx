import { useEffect,useState } from 'react';
import { getDishDataAsync,selectDishes,selectStatus } from './homeSlice';
import { useDispatch,useSelector } from 'react-redux';
import {ThreeDots} from 'react-loader-spinner';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Home=()=>{
const dispatch=useDispatch();
const dishes=useSelector(selectDishes);
const loading=useSelector(selectStatus);
const[page,setPage]=useState(1);
const [filterSection,setFilterSection]=useState([]);
const totalSize = dishes?.totalItems || 0;
const itemPerPage=10;
const count=totalSize/itemPerPage;
const pageCount=Math.ceil(count);

const menuCategory=['Breakfast','Lunch','Dinner'];
useEffect(()=>{
dispatch(getDishDataAsync({page,filterSection}));
},[page,filterSection]);
const paginate=(event,value)=>{
setPage(value);
}
console.log("The select page",page);

const handleChange = ({currentTarget:input}) => {
            if(input.checked)
            {
              const state=[...filterSection,input.value];
              setFilterSection(state);
            }
            else{
              const state=filterSection.filter((val)=>val!=input.value);
              setFilterSection(state);
            }
};
console.log("filter Data",filterSection);
return(
  <>
  <div>
    <h2 className='text-center mb-4'>Our Menu</h2>
  </div>
  
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
  <div className="container">
      <div className="row">
        {/* Filter section */}
        <div className="col-lg-2 col-md-3 col-sm-12 mb-4">
          <div className="filter-section">
          <>
          <h4>MENU</h4>                 
  {/* Default checkbox */}
  {menuCategory.map((val)=>(
      <div className="form-check">
    <input
      className="form-check-input"
       value={val}
      type="checkbox"
      id="flexCheckDefault"
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="flexCheckDefault">
      {val}
    </label>
  </div>
  ))
  }
</>

          </div>
        </div>

        {/* Dishes section */}
        <div className="col-lg-10 col-md-8 col-sm-12">
          {/* sort button */}
          <div className="row">
            {dishes.dish && dishes.dish.length > 0 ? (
              dishes.dish.map((doc) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={doc.id}>
                  <div className="card h-100">
                    <img src={doc.image} className="card-img-top" alt={doc.title} height={120} />
                    <div className="card-body">
                      <p className="card-title" style={{ fontWeight: 500 }}>{doc.title}</p>
                      <p className="card-category">Available in {doc.category}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No dishes available</p>
            )}
          </div>

          {/* Pagination */}
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <Pagination count={pageCount} variant="outlined" shape="rounded" onChange={paginate} />
          </Stack>
        </div>
      </div>
    </div>
  </>


);
};

export default Home;
