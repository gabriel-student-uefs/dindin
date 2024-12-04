import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import axios from "axios";
import logo from "../assets/images/primary-logo.svg"; // Update with the correct path to your logo
import { API_URL } from "../constants";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faCoins } from "@fortawesome/free-solid-svg-icons";
import { LoremIpsum } from "react-lorem-ipsum";
// import "./Home.css"; // Import the updated CSS file

function Home() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [ranking, setRanking] = useState(0);

  const { token } = useContext(AuthContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const fetchRankings = async () => {
    try {
      const response = await axios.get(`${API_URL}/finance/individual-ranking/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRanking(response.data.ranking);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
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
    fetchRankings();
  }, [token]);

  return (
    <div className="home-container">
      <Row className="text-center align-items-center mt-4">
        <Col>
          <Image src={logo} alt="Logo" fluid className="logo" />
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col>
          <FontAwesomeIcon icon={faTrophy} className="icon trophy-icon" />
          <h2 className="ranking-title">Sua Posição</h2>
          <h1 className="ranking-number"># {ranking}</h1>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col>
          <FontAwesomeIcon icon={faCoins} className="icon coins-icon" />
          <div className="balance-container">
            <h2>Saldo</h2>
            <p className={`balance-amount ${totalAmount >= 0 ? "positive" : "negative"}`}>
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="info-card shadow-sm">
            <Card.Body>
              <Card.Title className="info-card-title">Informative Card</Card.Title>
              <Card.Text>
                <LoremIpsum p={2} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
