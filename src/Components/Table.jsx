import React from 'react'
import {RiDeleteBin4Line} from "react-icons/ri";
import {FaEdit} from "react-icons/fa";

function Table({tbodyData,theadData,setUserData,userData}) {
   
  const handleChange=(e)=>{
    const {name,checked}=e.target;
    if(name==="selectAll"){
        const checkedValue=userData.map((item)=>{return {...item,isChecked:checked}})
        setUserData(checkedValue);
    }else{
        const checkedValue=userData.map((user)=>user.name===name?{...user,isChecked:checked}:user)
        console.log()
        setUserData(checkedValue)
    }
  }
      
  return (
            <table className='w-full text-sm text-left text-black'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope="col" class="px-6 py-3" key="checkbox">
                            <div>
                                <input name="selectAll" onChange={handleChange} checked={!tbodyData.some((item)=>item?.isChecked!==true)} type='checkbox'/>
                            </div>
                        </th>
                       {
                           theadData.map((header)=>(
                            <th  scope="col" class="px-6 py-3" key={header}>{header}</th>
                           ))
                       }
                       <th scope="col" class="px-6 py-3" key="actions">
                            <div>
                                <p>Actions</p>
                            </div>
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    
                      {
                        tbodyData.map((row,index)=>{
                           return (
                            <tr className='border-b border-gray-50' key={index}>
                                    <td className="px-6 py-4" key="checkbox">
                                    <div>
                                       <input name={`${row.name}`} checked={row?.isChecked||false} onChange={handleChange} type='checkbox'/>
                                      </div>
                                    </td>
                                {
                                theadData.map((key,index)=>{
                                    return(
                                        <td className="px-6 py-4" key={row[key]}>{row[key]}</td>
                                    )
                                })
                            }
                                <td className="px-6 py-4" key="actions">
                                      <div className='flex justify-between items-center px-3'>
                                        <FaEdit/> <RiDeleteBin4Line/>
                                       </div>
                                    </td>
                            </tr>
                           )
                        })
                      }
                   
                </tbody>
               
            </table>
       
  )
}

export default Table