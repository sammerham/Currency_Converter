import { React, useState, useContext } from 'react'
import CurrenciesContext from '../currenciesContext';

const INITIAL_DATA = {
  from: '',
  to: '',
  amount: '',
}
function ExchangeForm() {
  
  const {
    currencies,
    convertCurrencies,
    resultAmount,
    resetResults
  } = useContext(CurrenciesContext);
  const [formData, setFormData] = useState(INITIAL_DATA);

  
  // handle change for form inputs;
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  // handle submit takes form input and calls API to exchange amounts;
  const handleSubmit = e => {
    e.preventDefault();
    convertCurrencies(formData);
  };
 
  // handleResetresetResults -> clear form data initial state
  const handleReset = () => {
    setFormData(INITIAL_DATA);
    resetResults();
  }

  return (
    <div>
      <h3>Dash Currency Exchange</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">From</label>
        <br />
        <select
          name="from"
          id="from"
          value={formData.from}
          required
          onChange={handleChange}
        >
          <option>Currency</option>
          {currencies.map(c => <option value={c} key={c}>{c}</option>)}
        </select>
        <br />
        <label htmlFor="amount"></label>
        <input
          required
          type="number"
          min="1"
          id="amount"
          name="amount"
          value={formData.amount}
          placeholder="amount"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="to">To</label>
        <br />
        <select
          name="to"
          id="to"
          value={formData.to}
          required
          onChange={handleChange}
        >
          <option>Currency</option>
          {currencies.map(c => <option value={c} key={c}>{c}</option>)}
        </select>
        <br />
        <label htmlFor="result"></label>
        <input
          required
          type="result"
          min="0"
          id="result"
          name="result"
          defaultValue={resultAmount}
          placeholder="result"
          // onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit}>Convert</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default ExchangeForm
