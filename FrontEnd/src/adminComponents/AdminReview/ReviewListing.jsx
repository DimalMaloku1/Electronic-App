import React, { useState, useEffect } from 'react';

const ReviewListingWithStars = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API when the component mounts
    fetch('https://localhost:7099/api/Reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const starElements = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starElements.push(<span key={`star-full-${i}`} className="text-yellow-400">★</span>);
    }

    // Add half stars
    if (halfStars === 1) {
      starElements.push(<span key="star-half" className="text-yellow-400">½</span>);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(<span key={`star-empty-${i}`} className="text-gray-300">☆</span>);
    }

    return <div>{starElements}</div>;
  };

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <h2 className="text-2xl font-semibold mb-4 col-span-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-8 text-center rounded-lg shadow-md">
          <h3 className="text-xl font-semibold p-8">{review.product.name}</h3>
          <p className="text-gray-600 pt-12 pb-12 bg-gray-200 rounded-lg"><span className="text-xl font-semibold">Feedback: </span>{review.reviewText}</p>
          <p className="text-yellow-400 text-2xl font-semibold">
            Rating: <StarRating rating={review.rating} />
          </p>
          <img
            src={review.product.imageURL} // Assuming review.product.imageURL is the image URL
            alt={review.productId} // Provide an appropriate alt text
            className="w-full h-auto mt-4" // Adjust width, height, and margin as needed
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewListingWithStars;
