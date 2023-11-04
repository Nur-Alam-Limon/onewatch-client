import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://onewatch-server.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  });
  return (
    <div className="py-5">
      <h1 className="text-heading">Check our best watches</h1>
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mx-lg-5 g-4 mx-auto pt-5">
        {products.map((event) => (
          <Product key={event._id} event={event}></Product>
        ))}
      </div>
    </div>
  );
};

export default Products;
