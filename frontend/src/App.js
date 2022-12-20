import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

import { Fragment } from 'react';


function App() {
  return (
    <Router>
      <Fragment>
        <Header />  
          <Container>
            <main className='py-3'>
            <Routes>
              <Route path='/' element={<HomeScreen/>} exact />
              <Route path='/products/:id' element={<ProductScreen />} exact />
              <Route path='/cart/:id' element={<CartScreen />} exact />
              <Route path='/cart/' element={<CartScreen />} exact />
              <Route path='/login/' element={<LoginScreen />} exact />
              <Route path='/register/' element={<RegisterScreen />} exact />
              <Route path='/profile/' element={<ProfileScreen />} exact />
              <Route path='/shipping/' element={<ShippingScreen />} exact />
              <Route path='/payment/' element={<PaymentScreen />} exact />
              <Route path='/placeorder/' element={<PlaceOrderScreen />} exact />
              <Route path='/order/' element={<OrderScreen />} exact />
              <Route path='/order/:id' element={<OrderScreen />} exact />
            </Routes>
            </main>
          </Container>
          
       <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
