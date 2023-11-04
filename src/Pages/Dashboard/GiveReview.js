import Button from "@restart/ui/esm/Button";
import React, { useRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const GiveReview = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const ratingRef = useRef();
  const imgRef = useRef();

  const addEvent = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const rating = ratingRef.current.value;
    const img = imgRef.current.value;
    const newEvent = { name, description, rating, img };

    fetch("https://onewatch-server.vercel.app/addreview", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Review Added Successfully");
      });
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    ratingRef.current.value = "";
    imgRef.current.value = "";
  };
  return (
    <div>
      <div className="py-5" style={{ minHeight: "100vh" }}>
        <h1 className="text-heading mb-5 text-center">Add Review</h1>
        <Form className="w-75 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control type="text" placeholder="Your Name" ref={nameRef} />
          </Form.Group>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Your Review"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Review"
              ref={descriptionRef}
              style={{ height: "200px" }}
            />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Control
              type="number"
              placeholder="Rating in 5"
              ref={ratingRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImg">
            <Form.Control
              type="text"
              placeholder="User Image URL"
              ref={imgRef}
            />
          </Form.Group>

          <Button
            onClick={addEvent}
            className="my-3 button border-none px-3 py-1"
            type="submit"
          >
            Submit Review
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default GiveReview;
