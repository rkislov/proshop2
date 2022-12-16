import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'

function PaymentScreen() {
    const history = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
}

    if(!shippingAddress.address) {
        history('/shipping')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler} >
            <Form.Group>
                <Form.Label as='legend'>Выбор метода оплаты</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>

            <div className='py-3'>
            <Button type='submit' variant='primary' >
                Продолжить
            </Button>
            </div>
        </Form>
      
    </FormContainer>
  )
}

export default PaymentScreen
