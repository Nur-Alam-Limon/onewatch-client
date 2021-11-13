import React from "react";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const Review = (props) => {
  const { name, description, rating, img } = props.event;
  return (
    <div>
      <div className="col">
        <Card style={{ width: "22rem", height: "400px", border: "none" }}>
          <Card.Img
            variant="top"
            src={img}
            style={{ borderRadius: "50%", width: "50%" }}
            className="mx-auto py-3"
          />
          <Card.Body>
            <Card.Title className="text-black fw-bold">{name}</Card.Title>
            <div className="d-flex justify-content-center">
              <ReactStars
                count={5}
                size={25}
                value={rating}
                activeColor="#ffd700"
              />
            </div>
            <Card.Text className="fw-light">{description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Review;
