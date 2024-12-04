import React from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Avatar from 'boring-avatars';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const xpPercentage = user ? (user.xp / (user.xp + user.xp_for_next_level)) * 100 : 0;

  return (
    <>
      <style>
        {`
          .custom-progress-bar .progress-bar {
            background-color: #20c997 !important;
          }
        `}
      </style>
      <Container fluid className="py-4" style={{ backgroundColor: '#1e2b48' }}>
        <Row className="align-items-center mb-2 mx-0 mb-3">
          <Col xs="auto" className="d-flex align-items-center">
            <Avatar
              size={50}
              name={user?.username || 'User'}
              variant="beam"
              style={{ border: '2px solid #fcfcfc', borderRadius: '50%' }}
            />
          </Col>
          <Col className="text-center">
            <div className="ms-3">
              <h5 className="mb-0" style={{ fontWeight: 'bold', color: '#fcfcfc' }}>{user?.username}</h5>
              <p className="mb-1" style={{ color: '#fcfcfc' }}>Level: {user?.level}</p>
            </div>
          </Col>
          <Col xs="auto" className="d-flex justify-content-end">
          <Button
              variant="outline-light"
              onClick={logout}
              style={{ borderColor: '#d3557d', color: '#d3557d' }}
            >
              Logout
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="12" md={6}>
            <ProgressBar
              now={xpPercentage}
              label={`${user?.xp} / ${user?.xp_for_next_level} XP`}
              style={{ backgroundColor: '#aaaaaa' }}
              variant="success"
              className="custom-progress-bar"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;