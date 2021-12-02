import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ExchangeForm from './components/ExchangeForm';
import CurrenciesContext from './currenciesContext';
const URL = 'http://localhost:3000/'

/** App
 *
 * Props:
 *  - none
 *
 * State:
 *  - currencies []
 *  - resultAmount ('')
 *  - data (null)
 *
 * App -> ExchangeForm
 */

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [resultAmount, setResultAmount] = useState('');
  const [data, setData] = useState(null)


  // Fetch available currencies from API on first render
  useEffect(() => {
    async function fetchCurrencies() {
      const result = await axios.get(`${URL}currencies`);
      const availCurr = result.data.map(curr => curr.symbol);
      setCurrencies(data => availCurr);
    }
    fetchCurrencies();
    return ()=> setCurrencies([])
  }, []);
  

  // calls API to convert currencies and fireup when data state changes;

  useEffect(() => {
    async function convertCurrencies() {
      const res = await axios({
        method: 'post',
        url: `${URL}exchange`,
        data
      });
      setResultAmount(amount => res.data.amount_exchanged)
    }
    convertCurrencies();
  },[data])

  // fn to set the results back to empty string
  const resetResults = () => setResultAmount("");
 

  return (
    <div className="App">
      <CurrenciesContext.Provider
        value={{
          currencies,
          setData,
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
