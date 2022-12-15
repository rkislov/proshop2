import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

function ShippingScreen() {
  const history = useNavigate()
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [country, setCountry] = useState('')
  
  const submitHandler = () => ({

  })
  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
          <h1>Доставка</h1>
          <Form.Group controlId='address'>
            <Form.Label>
                Адрес доставки
            </Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='введите адрес доставки'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
        </Form.Group>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
