import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import loginImg from "../../img/Mobile login.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { signInWithEmail } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const handleReload = (e) => {
    e.preventDefault();
  };
  const handleRegister = (e) => {
    signInWithEmail(email, pass, name, location, history);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  return (
    <Row>
      <Col md={7}>
        <div>
          <div style={{ marginTop: "150px" }}></div>
          <h1 className="mx-auto w-50 text-heading">Registration Form</h1>
          <br />
          <Form className="w-75 mx-auto text-start" onSubmit={handleReload}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onBlur={handleName}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onBlur={handleEmail}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={handlePass}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <p className="text-danger">{error}</p>
            <Button
              onClick={handleRegister}
              className="mx-auto button"
              type="submit"
            >
              Register
            </Button>
          </Form>
          <br />
          <div className="mx-auto w-50" style={{ marginBottom: "150px" }}>
            <Link to="/login">
              <p className="py-3 fs-6">Already Registered? Login</p>
            </Link>
          </div>
        </div>
      </Col>
      <Col md={5} className="d-flex align-items-center pb-3">
        <img src={loginImg} alt="" style={{ width: "100%" }} />
      </Col>
    </Row>
  );
};

export default Register;
