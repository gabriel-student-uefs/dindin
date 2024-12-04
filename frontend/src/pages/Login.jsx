import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Stack,
  FloatingLabel,
  Alert,
  Image,
} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import logo from "../assets/images/primary-logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(
        err.response?.data?.detail || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#fdfdfd" }}
    >
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <FloatingLabel
                controlId="formBasicEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <Button
                variant="secondary"
                style={{
                  backgroundColor: "#5cc7a9",
                  borderColor: "#5cc7a9",
                }}
                type="submit"
                className="mt-3 w-100"
              >
                Login
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
