import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Avatar from "boring-avatars";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrophy, faCircle } from '@fortawesome/free-solid-svg-icons';
// import "bootstrap/dist/css/bootstrap.min.css";

const Ranking = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchRankings();
  }, [token]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/finance/users-ranking/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const UserCard = ({ user }) => {
    return (
      <Card className="text-center shadow-sm mb-3">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Avatar
                size={45}
                name={user.username}
                variant="beam"
                style={{ border: "2px solid #fcfcfc", borderRadius: "50%" }}
              />
              <Card.Title>{user.username}</Card.Title>
            </Col>
            <Col>
              <Card.Title># {user.ranking}</Card.Title>
            </Col>
            <Col>
              <Card.Text>
                <FontAwesomeIcon icon={faStar} /> <br /> Level: {user.level}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <FontAwesomeIcon icon={faCircle} /> <br />
                 XP: {user.xp}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <h1 className="text-center my-4">Ranking</h1>
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Row className="justify-content-center mt-3">
        {users.map((user) => (
          <Col sm={12} md={6} lg={4} className="mb-3" key={user.email}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Ranking;