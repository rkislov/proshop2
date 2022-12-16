import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Button, Col, ListGroup, Image, Card, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order,error,success} = orderCreate

    const dispatch = useDispatch()
    const history = useNavigate()
    const cart = useSelector(state => state.cart)

    cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price*item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() => {
        if(success){
            history(`/oreder/${order._id}`)
        }
    },[success.history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemPrice,
            shippingPrice: cart.shippingPrice
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,

        }))
    }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Доставка</h2>
                        <p>
                           <strong>Доставка: </strong>
                           {cart.shippingAddress.postalcode} {cart.shippingAddress.country} {cart.shippingAddress.city} {cart.shippingAddress.address}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Оплата</h2>
                        <p>
                           <strong>Способ: </strong>
                           {cart.paymentMethod} 
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Заказ</h2>
                        {cart.cartItems.lenngth === 0 ? (<Message variant='info'>
                            У вас пока нет заказов
                        </Message>) : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) =>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)} 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Итого:</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Товаров:
                                </Col>
                                <Col>
                                    ${cart.itemPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Доставка:
                                </Col>
                                <Col>
                                    ${cart.shippingPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Налоги:
                                </Col>
                                <Col>
                                    ${cart.taxPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Итоговая стоимость:
                                </Col>
                                <Col>
                                    ${cart.totalPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error.message}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}

                                >
                                    Купить
                                </Button>
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
