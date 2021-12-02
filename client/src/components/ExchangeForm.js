import { React, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CurrenciesContext from '../currenciesContext';
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

/*
 * ExchangeForm
 *
 * This is the page where you rednder the form for exchange currencies
 * State: formData : 
                        {
                          from: '',
                          to: '',
                          amount: '',
                        }
 *        
 * props: none
 * App ---->> ExchangeForm
 */

function ExchangeForm() {
  const INITIAL_DATA = {
    from: '',
    to: '',
    amount: '',
  }

  const {
    currencies,
    setData,
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
    setData(formData);
  };
 
  // handleResetresetResults -> clear form data initial state
  const handleReset = () => {
    setFormData(INITIAL_DATA);
    resetResults();
  }

  return (
    <Container className="d-inline-block ">
      <Row className="mt-5" xs={1} md={2}>
        <Col >
          <h2>Dash Currency Exchange</h2>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit} className="mt-4">
        
        <Row className="mb-3" xs={2} md={4} lg={6}>
          <Form.Group as={Col}>
            <Form.Label htmlFor="from">From</Form.Label>
            <Form.Select
              name="from"
              id="from"
              value={formData.from}
              required
              onChange={handleChange}
            >
              <option value="">Currency</option>
              {currencies.map(c => <option value={c} key={c}>{c}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              required
              type="number"
              min="1"
              id="amount"
              name="amount"
              value={formData.amount}
              placeholder="amount"
              onChange={handleChange}
              style={{marginTop:32}}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3" xs={2} md={4} lg={6}>
          <Form.Group as={Col}>
            <Form.Label htmlFor="to">To</Form.Label>
            <br />
            <Form.Select
              name="to"
              id="to"
              value={formData.to}
              required
              onChange={handleChange}
            >
              <option value="">Currency</option>
              {currencies.map(c => <option value={c} key={c}>{c}</option>)}
            </Form.Select>
          </Form.Group>
          
          <Form.Group as={Col}>
            <br />
            <Form.Control
              required
              type="result"
              min="0"
              id="result"
              name="result"
              defaultValue={resultAmount}
              placeholder="Converted amount"
              style={{ marginTop: 8 }}
            />
          </Form.Group>
        </Row>
        <br />
        <Stack direction="horizontal" gap={3}>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Convert
          </Button>
          <Button
            variant="outline-danger"
            onClick={handleReset} >
            Reset
          </Button>
        </Stack >
      </Form>
    </Container>
  )
}

export default ExchangeForm

