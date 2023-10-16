import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Reviews = ({products, reviews}) => {
    console.log(reviews)
    return (
        <>
        <h2> Reviews </h2>
        <ul>
            { reviews.map ( review => {
                return (
                    <li key = {review.id}>
                        Product: {review.product}
                        <br/>
                        Stars: {review.stars}
                        <br/>
                        Comments: {review.comment}

                    </li>
                )
            })

            }
        </ul>
        
        </>
    )
};

export default Reviews;