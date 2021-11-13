import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import useAuth from "../../Context/useAuth";

const ManageAllOrders = () => {
  const { isLoading } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const url = `https://lit-escarpment-35115.herokuapp.com/allorders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllOrders(data));
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

  const handleOrderStatus = (id) => {
    const status1 = "approved";
    const updateStatus = { status: status1 };
    setStatus(updateStatus);

    const url = `https://lit-escarpment-35115.herokuapp.com/status/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Click 2 time Approve Button for Status Update");
        }
      });
  };

  if (isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <h1 className="text-heading py-5">Ordered Product</h1>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-lg-5 g-4 mx-3 pt-3">
        {allOrders.map((event) => (
          <div className="col">
            <Card style={{ width: "20rem", height: "500px" }}>
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
                <Card.Title>
                  <small>
                    Status :
                    <span className="text-custom">
                      {" "}
                      "{event.productStatus}"
                    </span>
                  </small>
                </Card.Title>
                <Button
                  onClick={() => handleDeleteEvent(event._id)}
                  variant="primary"
                  className="bg-danger text-white px-3 py-1 fw-bold rounded"
                >
                  Cancel Order
                </Button>
                <Button
                  onClick={() => handleOrderStatus(event._id)}
                  variant="primary"
                  className="bg-success text-white px-3 py-1 mt-2 rounded"
                >
                  Approve Status
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAllOrders;
