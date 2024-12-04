import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Stack,
  FloatingLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Os campos de senha não podem estar vazios");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register/`, {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        // After successful registration, navigate to login page
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Display error messages from the response
        alert(
          `Erro: ${
            error.response.data.message ||
            "Falha no registro. Por favor, tente novamente."
          }`
        );
      } else {
        alert("Falha no registro. Por favor, tente novamente.");
      }
      console.error("Erro durante o registro:", error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4">Registrar</h2>
          <Form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <FloatingLabel
                controlId="formBasicUsername"
                label="Nome de usuário"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicPassword"
                label="Senha"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formBasicConfirmPassword"
                label="Confirme a Senha"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirme a Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>

              {error && <p className="text-danger">{error}</p>}

              <Button
                variant="secondary"
                style={{
                  backgroundColor: "#5cc7a9",
                  borderColor: "#5cc7a9",
                }}
                type="submit"
                className="mt-3 w-100"
              >
                Registrar
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
