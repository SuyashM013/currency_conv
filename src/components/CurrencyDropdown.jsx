import React from 'react'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title= ""
}) => {

 const isfavoriate = curr =>favorites.includes(curr)

  return (
    <div>
     <label
     className='block m-2 text-lg  font-medium text-gray-000'
      htmlFor={title}>
        {title}
      </label>

     <div className='mt-2 relative'>
      <select 
       value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className='w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-200'>

         {/* render fav? */}
         {favorites.map((currency) => {
        return (
          <option value={currency} key={currency} className='bg-gray-400'> {currency}</option>
        )
         })}
        
        

        {currencies?.map((currency) => {
          return(
            <option value={currency} key={currency}>{currency}</option>
          )
        })}
      </select>

      <button 
      onClick={() => handleFavorite(currency)}
       className='absolute inset-y-0 right-0 pr-6 flex items-center text-lg leading-5'> 
       
       {isfavoriate(currency) ? <FaStar /> : <CiStar  /> }
       
       
       </button>
     </div>


    </div>
  )
}

export default CurrencyDropdown
