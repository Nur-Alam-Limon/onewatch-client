import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Review from "../Review/Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://onewatch-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  });
  return (
    <div className="py-5">
      <h1 className="text-heading">See What Customers Say</h1>
      <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-1 mx-lg-5 mx-auto pt-5 px-lg-5">
        {reviews.map((event) => (
          <Review key={event._id} event={event}></Review>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
