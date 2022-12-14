import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location  = useLocation()
    const history = useNavigate()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    

    const userLogin = useSelector(state => state.userLogin)

    const {error,loading,userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            history(redirect)

        }
    }, [history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    
    
    return (
    <FormContainer>
      <h1>Вход</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>
                Email адресс
            </Form.Label>
            <Form.Control
                type='email'
                placeholder='введите email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>
                пароль
            </Form.Label>
            <Form.Control
                type='password'
                placeholder='введите пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <div className='py-3'>
            <Button type='submit' varian='primary'>
                Вход
            </Button>
            </div>
        </Form.Group>
      </Form>
      <Row className='py-3'>
        <Col>
            Новый пользователь? 
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Пройти регистрацию
            </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
