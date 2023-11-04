import Button from "@restart/ui/esm/Button";
import React, { useRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const MakeAdmin = () => {
  const mailRef = useRef();

  const addAdmin = (e) => {
    e.preventDefault();
    const mail = mailRef.current.value;
    const newEvent = { email: mail };

    fetch("https://onewatch-server.vercel.app/makeadmin", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Admin Added");
      });
    mailRef.current.value = "";
  };
  return (
    <div>
      <div className="py-5" style={{ minHeight: "100vh" }}>
        <h1 className="text-custom mb-5 text-center">Add New Admin</h1>
        <Form className="w-50 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicmail">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              ref={mailRef}
            />
          </Form.Group>

          <Button
            onClick={addAdmin}
            className="my-3 button border-none px-3 py-1"
            type="submit"
          >
            Make Admin
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MakeAdmin;
