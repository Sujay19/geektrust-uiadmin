import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {BsChevronLeft,BsChevronRight} from "react-icons/bs";

import Input from './Input';
import Table from './Table';


const MainBody = () => {
    const [tablerowData, setTableRowData] = useState([]);
    const [tablecolData, setTablecolData] = useState([]);
    const [search, setSearch] = useState("");
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(10);
    // No of pages to be displayed
    const [pageCount, setPageCount] = useState(0);
   //No of records recived through api
   const [userData, setUserData] = useState(0);
   
   let indexOfLastRecord = currentPage*recordsPerPage;
   let indexOfFirstRecord = indexOfLastRecord-recordsPerPage;
   const currentRecords = tablerowData.slice(indexOfFirstRecord,indexOfLastRecord);

    useEffect(()=>{
        const getTableData=async()=>{
            const response=await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            const data=response.data;
            return data;
         }
         getTableData().then((res)=>{
            const nPages = Math.ceil(res.length / recordsPerPage);
            setPageCount(nPages);
            setUserData(res)
            // Records to be displayed on the current page
            setTableRowData(res);
            setTablecolData(Object.keys(res[0]));
        }
        );

    },[])

     
    
    const handleSearchChange=(e)=>{
        setSearch(e.target.value)
    }
  
    
   
    const filter=()=>{
            const filteredRow= tablerowData.filter((Obj)=>Object.keys(Obj).some((key)=>Obj[key].toLowerCase().includes(search.toLowerCase())))
            const extractedData=[...filteredRow];
            console.log(extractedData)
            const data= search.toLowerCase() ===""? currentRecords : extractedData;
            return data;
    }
   
  
   
  return (
    <div className='bg-gray w-full flex flex-col justify-center items-center p-2'>
      <div className=' bg-gray-200 rounded-lg flex flex-col w-3/4 mt-8 shadow-md shadow-gray-400'>
      <div className='flex justify-start items-center mx-10 p-3'>
        <h1 className='font-semibold text-2xl'>User Data</h1>
      </div>

       <div className='flex justify-start flex-col mx-10 p-3'>
       <div className='flex justify-start items-center w-full border border-gray-50 rounded-md mb-2'>
                <Input placeholder="Search by Name ,Email or ID" type="text" handleChange={handleSearchChange} />
       </div>  
         <div className='flex-1 px-1  flex-col justify-start items-center rounded-lg overflow-scroll h-80'>
           {tablerowData && <Table tbodyData={filter()} theadData={tablecolData} setUserData={setTableRowData} userData={userData}/>}    
         </div>
        
         <div className='flex px-1  flex-row justify-start items-center '>
           <div className='flex justify-center items-center cursor-pointer rounded-md w-40 mr-2 mt-3'>
            <button className=' bg-red-500 rounded-md p-2'>Delete Selected</button>
           </div>
           <div className='flex justify-center items-center w-full'>
         <ReactPaginate
        breakLabel={
            <span className='mr-4'>
                ...
            </span>
        }
        nextLabel={
            <span className='w-10 h-10 cursor-pointer flex items-center justify-center bg-gray-50 rounded-md ml-4'>
                <BsChevronRight/>
            </span>
        }
        onPageChange={(e)=>setCurrentPage(e.selected+1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
            <span className='w-10 h-10 cursor-pointer flex items-center justify-center bg-gray-50 rounded-md mr-4'>
                <BsChevronLeft/>
            </span>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName='block border-solid border-gray-50 hover:bg-gray-50 flex justify-center items-center rounded-full mr-2 w-10 h-10'
        activeClassName='bg-purple text-white'
      />
      </div>
         </div>
       </div>
      
      </div>
    </div>
  )
}

export default MainBody