import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom'
import { Button, Col, ListGroup, Image, Card, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'


function OrderScreen() {

    const params = useParams()
    const orderId = params.id
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order,error, loading} = orderDetails

    const dispatch = useDispatch()
    
    

    if(!loading && !error) {
        order.itemPrice = order.orderItems.reduce((acc, item) => acc + item.price*item.qty, 0).toFixed(2)
    }
    

    useEffect(() => {
        if(!order || order._id === Number(orderId)){
            dispatch(getOrderDetails(orderId))
        }
       
    },[dispatch, order, orderId])



  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ): (
    <div>
     <h1>Заказ: {order._id}</h1>
      <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Доставка</h2>
                        <p><starong>Имя: </starong> {order.user.name}</p>
                        <p><starong>Email: </starong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        
                        <p>
                           <strong>Доставка: </strong>
                           {order.shippingAddress.postalcode} {order.shippingAddress.country} {order.shippingAddress.city} {order.shippingAddress.address}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Доставлен {order.deleveredAt}</Message>
                        ) : (
                            <Message variant='warning'>Не доставлен</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Оплата</h2>
                        <p>
                           <strong>Способ: </strong>
                           {order.paymentMethod} 
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Оплачен {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Не оплачен</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Заказ</h2>
                        {order.orderItems.lenngth === 0 ? (<Message variant='info'>
                            Заказ отсутсвует
                        </Message>) : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) =>(
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
                                    ${order.itemPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Доставка:
                                </Col>
                                <Col>
                                    ${order.shippingPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Налоги:
                                </Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Итоговая стоимость:
                                </Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col> 
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                       

                    </ListGroup>
                </Card>
            </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
