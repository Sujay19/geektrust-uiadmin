import React from 'react'

const Input = ({placeholder,type,value,handleChange}) => {

  return (
    // <div className='w-full'>
    <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={handleChange}
    className="my-2 rounded-sm w-full p-2 outline-none border-none bg-transparent text-black text-sm white-glassmorphism"
    />
    // </div>
  )
}

export default Input