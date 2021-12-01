import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ExchangeForm from './components/ExchangeForm';
import CurrenciesContext from './currenciesContext';

import './App.css';
const URL = 'http://localhost:3000/'
function App() {
  const [currencies, setCurrencies] = useState([]);
  const [resultAmount, setResultAmount] = useState('');
  // get available currencies from server on first render
  useEffect(() => {
    async function fetchCurrencies() {
      const result = await axios.get(`${URL}currencies`);
      const availCurr = result.data.map(curr => curr.symbol);
      setCurrencies(data => availCurr);
    }
    fetchCurrencies();
  }, []);
 
// calls API to convert currencies
  const convertCurrencies = async data => {
    const res = await axios({
      method: 'post',
      url: `${URL}exchange`,
      data
    });
    setResultAmount(amount => res.data.amount_exchanged)
    return res.data;
  }
  const resetResults = () => setResultAmount("");

  return (
    <div className="App">
      <CurrenciesContext.Provider
        value={{
          currencies,
          convertCurrencies,
          resultAmount,
          resetResults
        }}
      >
      <ExchangeForm />
      </CurrenciesContext.Provider>
    </div>
  );
}

export default App;
