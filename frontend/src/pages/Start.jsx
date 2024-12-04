import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/white-logo.png"; // Update with the correct path to your logo
import { Row, Col, Image, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faCoins } from "@fortawesome/free-solid-svg-icons";

const Start = () => {
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleRegisterButton = () => {
    navigate("/register");
  };

  return (
    <div
      className="home-container px-5"
      style={{ backgroundColor: "#1e2b48", height: "100vh", width: "100vw" }}
    >
      <Row className="text-center align-items-center mt-4">
        <Col>
          <Image src={logo} alt="Logo" fluid className="logo-2" />
        </Col>
        <Col md={12} className="d-flex flex-column align-items-center">
          <Button
            className="mt-5 px-4"
            variant="secondary"
            onClick={handleLoginButton}
            style={{
              backgroundColor: "#5cc7a9",
              borderColor: "#5cc7a9",
              maxWidth: "200px",
              width: "100%",
            }}
          >
            Login
          </Button>
          <Button
            className="my-4"
            variant="secondary"
            onClick={handleRegisterButton}
            style={{
              backgroundColor: "#6c757d",
              borderColor: "#6c757d",
              maxWidth: "200px",
              width: "100%",
            }}
          >
            Registrar
          </Button>
        </Col>

        <Col>
          <FontAwesomeIcon icon={faCoins} className="icon-2 coins-icon" />
        </Col>
      </Row>
    </div>
  );
};

export default Start;
