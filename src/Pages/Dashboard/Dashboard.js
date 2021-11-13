import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import AddProduct from "./AddProduct";
import MyOrders from "./MyOrders";
import Pay from "./Pay";
import GiveReview from "./GiveReview";
import MakeAdmin from "./MakeAdmin";
import ManageAllOrders from "./ManageAllOrders";
import ManageProducts from "./ManageProducts";
import AdminRoute from "../AdminRoute/AdminRoute";

const Dashboard = () => {
  const { user, logOut, admin } = useAuth();
  let { path, url } = useRouteMatch();
  console.log(url);
  return (
    <div>
      <Row style={{ minHeight: "100vh" }}>
        <Col md={2} className="bg-black py-5">
          <h2 className="text-heading text-center py-5">Dashboard</h2>
          {!admin ? (
            <div>
              <Link
                to={`${url}/pay`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                Pay
              </Link>
              <Link
                to={`${url}/myorders/${user.email}`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                My Orders
              </Link>
              <Link
                to={`${url}/review`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                Review
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={`${url}/manageallorders`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                Manage All Orders
              </Link>
              <Link
                to={`${url}/addproduct`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                Add a Product
              </Link>
              <Link
                to={`${url}/makeadmin`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                Make Admin
              </Link>
              <Link
                to={`${url}/manageproducts`}
                className="text-white mt-3"
                style={{ textDecoration: "none", display: "block" }}
              >
                Manage Products
              </Link>
            </div>
          )}

          <button
            className="btn btn-link text-start mt-3"
            style={{ textDecoration: "none", color: "white" }}
            onClick={logOut}
          >
            LogOut
          </button>
        </Col>
        <Col md={10}>
          <Switch>
            <Route path={`${path}/pay`}>
              <Pay></Pay>
            </Route>
            <Route exact path={`${path}`}>
              <Pay></Pay>
            </Route>
            <Route path={`${path}/myorders/:mail`}>
              <MyOrders></MyOrders>
            </Route>
            <Route path={`${path}/review`}>
              <GiveReview></GiveReview>
            </Route>
            <AdminRoute path={`${path}/addproduct`}>
              <AddProduct></AddProduct>
            </AdminRoute>
            <AdminRoute path={`${path}/makeadmin`}>
              <MakeAdmin></MakeAdmin>
            </AdminRoute>
            <AdminRoute path={`${path}/manageallorders`}>
              <ManageAllOrders></ManageAllOrders>
            </AdminRoute>
            <AdminRoute path={`${path}/manageproducts`}>
              <ManageProducts></ManageProducts>
            </AdminRoute>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
