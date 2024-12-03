import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RiHome2Fill, RiTrophyFill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';

const Pagination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container fluid className="pagination-container py-4">
      <Row>
        <Col className="icon-container">
          {location.pathname === '/transactions' && <div className="dash"></div>}
          <FaMoneyBillTransfer
            size={40}
            color="#1e2b48"
            onClick={() => navigate('/transactions')}
            style={{ cursor: 'pointer', margin: '0 10px' }}
          />
        </Col>
        <Col className="icon-container">
          {location.pathname === '/home' && <div className="dash"></div>}
          <RiHome2Fill
            size={40}
            color="#1e2b48"
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer', margin: '0 20px' }}
          />
        </Col>
        <Col className="icon-container">
          {location.pathname === '/ranking' && <div className="dash"></div>}
          <RiTrophyFill
            size={40}
            color="#1e2b48"
            onClick={() => navigate('/ranking')}
            style={{ cursor: 'pointer', margin: '0 10px' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Pagination;