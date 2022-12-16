import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function CheckoutSteps({step1, step2, step3, step4}) {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
                    
                    <Nav.Link as={NavLink} to='/login'>Логин</Nav.Link>
                
        ) : (
            
            <Nav.Link as={NavLink} to='/login' disabled>Логин</Nav.Link>
        
        )}
        </Nav.Item>
        <Nav.Item>
        {step2 ? (
                    
                    <Nav.Link as={NavLink} to='/shipping'>Доставка</Nav.Link>
               
        ) : (
            
            <Nav.Link as={NavLink} to='/shipping' disabled>Доставка</Nav.Link>
        
        )}
        </Nav.Item>
        <Nav.Item>
        {step3 ? (
                    
                    <Nav.Link as={NavLink} to='/payment'>Оплата</Nav.Link>
                
        ) : (
            
            <Nav.Link as={NavLink} to='/payment' disabled>Оплата</Nav.Link>
       
        )}
        </Nav.Item>
        <Nav.Item>
        {step4 ? (
                    
                    <Nav.Link as={NavLink} to='/palceorder' >Заказ</Nav.Link>
                
        ) : (
            
            <Nav.Link as={NavLink} to='/placeorder' disabled>Заказ</Nav.Link>
        
        )}


      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
