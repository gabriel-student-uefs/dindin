import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, ListGroup, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Avatar from 'boring-avatars';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/finance/transactions/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }
    };

    fetchTransactions();
  }, [token]);

  const xpPercentage = user ? (user.xp / (user.xp + user.xp_for_next_level)) * 100 : 0;

  return (
    <Container fluid className="p-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <Row className="justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
        <Col xs="auto">
          <Avatar
            size={50}
            name={user?.username || 'User'}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </Col>
        <Col className="text-center">
          <h5 className="mb-0" style={{ fontWeight: 'bold' }}>{user?.username}</h5>
          <p className="mb-1" style={{ color: '#6c757d' }}>Level: {user?.level}</p>
          <ProgressBar now={xpPercentage} label={`${user?.xp}/${user?.xp + user?.xp_for_next_level} XP`} />
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate('/register')} className="ms-2">
            Register
          </Button>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <h1 className="mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>DINDIN</h1>
          <ListGroup className="mt-4">
            {transactions.map((transaction) => (
              <ListGroup.Item key={transaction.id} className="text-start p-3 shadow-sm rounded mb-2">
                <div><strong>Type:</strong> {transaction.type}</div>
                <div><strong>Category:</strong> {transaction.category}</div>
                <div><strong>Amount:</strong> {transaction.amount}</div>
                <div><strong>Date:</strong> {transaction.date}</div>
                <div><strong>Description:</strong> {transaction.description}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;