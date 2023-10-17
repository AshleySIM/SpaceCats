import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Reviews = ({products, reviews}) => {
    console.log(reviews)
    return (
        <div className='reviewsDiv'>
        <h1> Reviews </h1>
        <ul className='reviewsList'>
            { reviews.map ( review => {
                return (
                    <li key = {review.id} className='review'>
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
        
        </div>
    )
};

export default Reviews;