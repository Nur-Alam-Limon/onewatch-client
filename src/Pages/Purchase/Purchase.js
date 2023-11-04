import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import useAuth from "../../Context/useAuth";

const Purchase = () => {
  const { user, isLoading } = useAuth();
  const { productid } = useParams();
  const [purchase, setPurchase] = useState({});
  const history = useHistory();

  useEffect(() => {
    const url = `https://onewatch-server.vercel.app/purchase/${productid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPurchase(data));
  });

  const confirmPurchase = (e) => {
    e.preventDefault();

    const email = user.email;
    const productName = purchase.name;
    const productDes = purchase.description;
    const productPrice = purchase.price;
    const productImg = purchase.img;
    const productStatus = "pending";

    const purchased = {
      email,
      productName,
      productDes,
      productPrice,
      productImg,
      productStatus,
    };

    fetch("https://onewatch-server.vercel.app/purchaseconfirm", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(purchased),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Purchase Confirmed");
        history.push("/home");
      });
  };
  if (isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  return (
    <div className="d-lg-flex justify-content-center align-items-center py-5">
      <div className="px-lg-5 mx-3">
        <Card style={{ width: "22rem" }} className="shadow-sm border-0">
          <Card.Img
            variant="top"
            src={purchase.img}
            style={{ width: "50%" }}
            className="mx-auto"
          />
          <Card.Body>
            <Card.Title className="text-custom fw-bold">
              {purchase.name}
            </Card.Title>
            <Card.Text>{purchase.description}</Card.Text>
            <Card.Title className="text-custom fw-bold">
              ${purchase.price}
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className="px-5 w-100">
        <h1 className="text-center text-heading my-5">Purchase Information</h1>
        <Form className="w-75 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control type="text" placeholder={user.displayName} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder={user.email} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control placeholder="Address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formcity">
            <Form.Control placeholder="City" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formcountry">
            <Form.Control placeholder="Country" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formnumber">
            <Form.Control type="number" placeholder="Phone Number" />
          </Form.Group>

          <Button
            onClick={confirmPurchase}
            className="my-3 button py-1"
            type="submit"
          >
            Confirm Booking
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Purchase;
