import Button from "@restart/ui/esm/Button";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const { _id, name, description, price, img } = props.event;
  return (
    <div>
      <div className="col">
        <Card
          style={{ width: "17rem", height: "430px" }}
          className="shadow-sm border-0"
        >
          <Card.Img
            variant="top"
            src={img}
            style={{ width: "50%" }}
            className="mx-auto"
          />
          <Card.Body>
            <Card.Title className="text-black fw-bold">{name}</Card.Title>
            <Card.Text className="des">{description}</Card.Text>
            <Card.Title className="text-custom fw-bold">${price}</Card.Title>
            <Link to={`/purchase/${_id}`}>
              <Button className="button">Buy Now</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Product;
