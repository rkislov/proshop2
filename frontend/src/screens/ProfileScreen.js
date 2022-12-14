import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

   // const location  = useLocation()
    const history = useNavigate()

    const dispatch = useDispatch()

    

    const userDetails = useSelector(state => state.userDetails)

    const {error,loading,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo){
            history('/login')

        } else {
            if(!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)

            }
        }
    }, [dispatch,history,userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('пароли не совпадают')
        } else {
            console.log('updating')
        }
        
    }
    


  return (
    <Row>
        <Col md={3}>
            <h2>Профиль</h2>
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
                type='password'
                placeholder='введите пароль еще раз'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>

            <div className='py-3'>
            <Button type='submit' varian='primary'>
                Обновить
            </Button>
            </div>
        </Form.Group>
      </Form>
        </Col>
        <Col md={9}>
            <h2>Заказы</h2>
        </Col>
      
    </Row>
  )
}

export default ProfileScreen
