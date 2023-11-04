import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import useAuth from "../../Context/useAuth";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import loginImg from "../../img/Mobile login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { signInUsingGoogle, saveUser } = useAuth();
  const [error, setError] = useState("");

  const location = useLocation();
  const history = useHistory();
  const redirect_url = location.state?.from || "/home";

  const handleGoogleLogin = () => {
    signInUsingGoogle().then((result) => {
      const user = result.user;

      saveUser(user.email, user.displayName);
      history.push(redirect_url);
    });
  };

  const handleReload = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        const user = result.user;
        history.push(redirect_url);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    e.target.value = "";
  };

  const handlePass = (e) => {
    setPass(e.target.value);
    e.target.value = "";
  };
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <Col sm={12} md={7} className="mt-5">
        <h1 className="mx-auto w-50 text-heading mt-5">Login Form</h1>
        <br />
        <Form className="w-75 mx-auto text-start" onSubmit={handleReload}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-start">Email address</Form.Label>
            <Form.Control
              onBlur={handleEmail}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePass}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button
            onClick={handleLogin}
            className="mx-auto button"
            type="submit"
          >
            Login
          </Button>
        </Form>
        <br />
        <p className="text-danger text-center">{error}</p>
        <br />
        <div className="mx-auto w-50" style={{ marginBottom: "150px" }}>
          <button className="py-2 button" onClick={handleGoogleLogin}>
            Google Sign In
          </button>
          <Link to="/register">
            <p className="py-3 fs-6">New User? Register</p>
          </Link>
        </div>
      </Col>
      <Col sm={12} md={5} className="d-flex align-items-center pb-3">
        <img src={loginImg} alt="" style={{ width: "100%" }} />
      </Col>
    </div>
  );
};

export default Login;
