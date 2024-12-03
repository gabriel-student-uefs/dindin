import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/images/primary-logo.svg'; // Update with the correct path to your logo
import { API_URL } from "../constants";
import AuthContext from '../context/AuthContext';

function Home() {
  const [totalAmount, setTotalAmount] = useState(0);
  const { token } = useContext(AuthContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const fetchTotalAmount = async () => {
    try {
      const response = await axios.get(`${API_URL}/finance/total-amount/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalAmount(response.data.total_amount);
    } catch (error) {
      console.error("Error fetching total amount:", error);
    }
  };

  useEffect(() => {
    fetchTotalAmount();
  }, [token]);

  const amountStyle = {
    color: totalAmount >= 0 ? '#5cc7a9' : '#d3557d',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  return (
    <div>
      <Row className="text-center">
        <Col>
          <Image src={logo} alt="Black Logo" fluid style={{ width: '150px', height: '150px' }} />
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <div style={amountStyle}>
            Saldo Total: {formatCurrency(totalAmount)}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;