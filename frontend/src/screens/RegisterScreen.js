import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const location  = useLocation()
    const history = useNavigate()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    

    const userRegister= useSelector(state => state.userRegister)

    const {error,loading,userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history(redirect)

        }
    }, [history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('пароли не совпадают')
        } else {
            dispatch(register(name,email,password))
        }
        
    }
    

  return (
    <FormContainer>
        <h1>Регистрация</h1>
        {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>
                Email адресс
            </Form.Label>
            <Form.Control
                required
                type='email'
                placeholder='введите email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>
    

        <Form.Group controlId='name'>
            <Form.Label>
                Имя
            </Form.Label>
            <Form.Control
                required
                type='name'
                placeholder='введите имя'
                value={name}
                onChange={(e) => setName(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>
                пароль
            </Form.Label>
            <Form.Control
                required
                type='password'
                placeholder='введите пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
            <Form.Label>
                подтвердите пароль
            </Form.Label>
            <Form.Control
                required
                type='password'
                placeholder='введите пароль еще раз'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>

            <div className='py-3'>
            <Button type='submit' varian='primary'>
                Регистрация
            </Button>
            </div>
        </Form.Group>
      </Form>
      <Row className='py-3'>
        <Col>
            уже есть аккаунт ?  
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Вход
            </Link>
        </Col>
      </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
