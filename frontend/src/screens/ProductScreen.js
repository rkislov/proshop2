import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

function ProductScreen() {
    const params = useParams()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(params.id))

  }, [params, dispatch])
  
  
    return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Назад</Link>
      {loading ?
        <Loader/>
        : error
        ? <Message variant='danger'>{error}</Message>
        : (
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name}/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} обзоров`} color={'#f8e825'} />
                </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
                    Цена: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                    Описание: {product.description}
            </ListGroup.Item>

        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Цена:
                            </Col>
                            <Col>
                                <strong>
                                    ${product.price}
                                </strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Количество:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'В наличии' : 'Нет на складе'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Добавить в корзину</Button>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>       
      </Row>
        )
      }
      
    </div>
  )
}

export default ProductScreen
