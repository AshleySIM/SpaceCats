import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Reviews = ({products, reviews, createReview, setReviews}) => {
    const [product, setProduct] = useState('');
    const [stars, setStars] = useState(1);
    const [comment, setComment] = useState('');

    const save = async (ev) => {
        await ev.preventDefault()
        const review = {
         product,
         stars,
         comment
        }; 
        console.log(reviews)
        await createReview(review);
        setProduct('');
        setStars(1);
        setComment('');
       
     }
    
    return (
        <div className='reviewsDiv'>
        
        <h1> Reviews </h1>
        <h2> Write a Review: </h2>
        <form onSubmit = {save}>
            <select value = {product} onChange = {ev => setProduct(ev.target.value)}>
                <option> Product </option>
                {
                    products.map(product => {
                        return <option key = {product.id}> { product.name }</option>
                    })
                }
            </select>
            <select value= {stars} onChange={ev => setStars(ev.target.value)}> 
                <option> Rating </option>
                <option type="number"> 1 </option>
                <option type="number"> 2 </option>
                <option type="number"> 3 </option>
                <option type="number"> 4 </option>
                <option type="number"> 5 </option>
            </select>
            <input type="text" placeholder="comments" value= {comment} onChange={ev => setComment(ev.target.value)}></input>
            <button type="submit" disabled={!product || !stars}> Submit </button>
        </form>
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