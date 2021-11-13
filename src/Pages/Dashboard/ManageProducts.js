import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Product from "../Home/Product/Product";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  });

  const handleDeleteEvent = (id) => {
    const proceed = window.confirm("Sure to delete?");
    if (proceed) {
      const url = `http://localhost:5000/products/delete/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  };

  return (
    <div>
      <div className="py-5">
        <h1 className="text-heading pb-3">Check All Products</h1>
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-lg-5 g-4 mx-3 pt-3">
          {products.map((event) => (
            <div className="col">
              <Card style={{ width: "20rem", height: "420px" }}>
                <Card.Img
                  variant="top"
                  src={event.img}
                  style={{ width: "50%" }}
                  className="mx-auto"
                />
                <Card.Body>
                  <Card.Title className="text-custom fw-bold">
                    {event.name}
                  </Card.Title>
                  <Card.Text className="des">{event.description}</Card.Text>
                  <Card.Title className="text-custom fw-bold">
                    ${event.price}
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
    </div>
  );
};

export default ManageProducts;
