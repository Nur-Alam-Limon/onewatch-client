import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import useAuth from "../../Context/useAuth";

const MyOrders = () => {
  const { isLoading } = useAuth();

  const [myOrders, setMyOrders] = useState([]);
  const { mail } = useParams();

  useEffect(() => {
    const url = `https://lit-escarpment-35115.herokuapp.com/myorders/${mail}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  });

  const handleDeleteEvent = (id) => {
    const proceed = window.confirm("Sure to delete?");
    if (proceed) {
      const url = `https://lit-escarpment-35115.herokuapp.com/delete/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  };
  if (isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <h1 className="text-heading py-5">Your Orders</h1>
      <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1 mx-lg-5 g-4 mx-auto pt-3">
        {myOrders.map((event) => (
          <div className="col mx-3">
            <Card style={{ width: "20rem", height: "420px" }}>
              <Card.Img
                variant="top"
                src={event.productImg}
                style={{ width: "50%" }}
                className="mx-auto"
              />
              <Card.Body>
                <Card.Title className="text-custom fw-bold">
                  {event.productName}
                </Card.Title>
                <Card.Text className="des">{event.productDes}</Card.Text>
                <Card.Title className="text-custom fw-bold">
                  ${event.productPrice}
                </Card.Title>

                <Button
                  onClick={() => handleDeleteEvent(event._id)}
                  variant="primary"
                  className="bg-danger text-white px-5 py-1 fw-bold book-now"
                >
                  Cancel Order
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
