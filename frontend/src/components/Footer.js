import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

function Footer() {
  return (
    <div>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              Written by R.Kislov
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Footer
