import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';

import ProductScreen from './screens/ProductScreen';
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
            </Routes>
            </main>
          </Container>
          
       <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
