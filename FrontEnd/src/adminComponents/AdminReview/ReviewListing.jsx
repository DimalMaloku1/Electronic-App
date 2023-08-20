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
<div className="grid grid-cols-5 gap-4">
  {reviews.map((review) => (
    <div key={review.id} className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="relative group">
        <img
          src={review.product.imageURL}
          alt={review.productId}
          className="w-full h-48 object-cover transition-transform duration-300 transform scale-100 group-hover:scale-105"
          // Set a fixed height (e.g., h-48) to ensure uniform size
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{review.product.name}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{review.product.name}</h2>
        <div className="h-32 overflow-y-auto">
          
          <p className="text-gray-700 text-base pb-8">
            <span className="text-xl font-semibold">Feedback: </span>
            {review.reviewText}
          </p>
        </div>
      </div>
      <div className="px-6 pt-2 pb-2">
        <span className="inline-block p-12 px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2">
          Rating: <StarRating rating={review.rating} />
        </span>
      </div>
    </div>
  ))}
</div>

  );
};

export default ReviewListingWithStars;
