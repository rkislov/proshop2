import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'


function ShippingScreen() {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const history = useNavigate()
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode)
  const [country, setCountry] = useState(shippingAddress.country)
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalcode, country}))
    history('/payment')
  }
  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
          <CheckoutSteps  step1 step2 />
          <h1>Доставка</h1>
          <Form.Group controlId='address'>
            <Form.Label>
                Адрес доставки
            </Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='введите адрес доставки'
                value={address ? address : '' }
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>
                Город доставки
            </Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='введите город доставки'
                value={city ? city : '' }
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <Form.Group controlId='postalcode'>
            <Form.Label>
                Индекс
            </Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='введите индекс'
                value={postalcode ? postalcode : '' }
                onChange={(e) => setPostalcode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <Form.Group controlId='country'>
            <Form.Label>
                Страна доставки
            </Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='введите страну доставки'
                value={country ? country : '' }
                onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className='py-3'>
            <Button type='submit' varian='primary'>
                Продолжить
            </Button>
            </div>


        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
