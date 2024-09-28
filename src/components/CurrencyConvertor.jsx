import React, { useEffect, useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown';
import { MdSwapHoriz } from "react-icons/md";


const CurrencyConvertor = () => {

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");

  const [convertedamount, setconvertedamount] = useState(null)
  const [converting, setconverting] = useState(null)

  const [ favorites, setfavorites] = useState(
    JSON.parse(localStorage.getItem("favorites" )) || ["INR"]
  )

  const fetCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data))
    } catch (error) {
      console.error("Error Fetchig", error)
    }
  }

  useEffect(() => {
    fetCurrencies();
  }, [])

  console.log(currencies)

  // Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

  const convertCurrency = async () => {
    if (!amount) return;
    setconverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setconvertedamount(data.rates[toCurrency] + " " + toCurrency)
    } catch (error) {
      console.error("Error Fetchig", error)
    } finally { setconverting(false) }

  }



const handleFavorite = (currency) => {

  let updatedfav = [...favorites];
  if(favorites.includes(currency)){
    updatedfav = updatedfav.filter((fav)=> fav !== currency)
  } else{
    updatedfav.push(currency)
  }

  setfavorites(updatedfav)
  localStorage.setItem("favoriates", JSON.stringify(updatedfav))

}

const swapCurrency = () => {
  setFromCurrency(toCurrency);
  settoCurrency(fromCurrency);
}

return (
  <div className='max-w-xl mx-auto my-10 p-5 backdrop-blur-lg bg-white/40  rounded-2xl shadow-xl shadow-white/40  '>
    <h2 className='mb-5 p-2 text-3xl font-bold text-black-700 rounded-lg border border-slate-500'>
      Currency Convertor
    </h2>

    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end '>
      <CurrencyDropdown
      favorites={favorites}
        currencies={currencies}
        title="From"
        currency={fromCurrency}
        setCurrency={setFromCurrency}
        handleFavorite={handleFavorite} />

      <div className='flex items-center justify-center m-3 '>
        <button onClick={swapCurrency} className='p-2 border rounded-3xl cursor-pointer hover:bg-gray-300'>
          <MdSwapHoriz className='text-lg ' />
        </button>
      </div>

      <CurrencyDropdown
      favorites={favorites}
        currencies={currencies}
        title="To"
        currency={toCurrency}
        setCurrency={settoCurrency}
        handleFavorite={handleFavorite} />


    </div>

    <div className='mt-4 flex gap-4 items-center'>
      <label 
      htmlFor='amount' 
      className='block text-lg font-semibold text-gray-900'> Amount:  </label>

      <input
      value={amount}
        onChange={(e) => { setAmount(e.target.value) }}
        type='number'
        className='w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' />

    </div>

    <div className='flex justify-end mt-6'>
      <button
        onClick={convertCurrency}
        className={`text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 *
          ${converting ? "animate-bounce" : ""}`}  >
        Convert
      </button>

    </div>

    {convertedamount && (<div className='mt-4 text-lg font-medium text-right text-green-500'>
      Converted Amount: {convertedamount}
    </div>
  )}

  </div>
);
};

export default CurrencyConvertor

