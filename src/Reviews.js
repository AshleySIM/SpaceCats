import React, { useState } from "react";
import { Link } from "react-router-dom";

const Reviews = ({ products, reviews }) => {
  console.log(reviews);
  return (
    <div className="reviewsDiv">
      <h1> Reviews </h1>
      <div className="reviewsList">
        {reviews.map((review) => {
          return (
            <div key={review.id} className="review">
              <hr></hr>
              <h2>{review.product}</h2>
              <br />
              <p>Stars: {review.stars}</p>
              <br />
              <p>Comments: {review.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
