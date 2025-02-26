import React, { useEffect, useState } from 'react';
import CommonWrapper from '../CommonWrapper';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Pagination } from '@heroui/react';
import axios from 'axios';

const Review = ({ productId }) => {
    const [reviews, setReviews] = useState([]); // Initialize reviews as an empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [currentPage, setCurrentPage] = useState(1); // State for pagination
    const [totalReviews, setTotalReviews] = useState(0); // State for total reviews count
    const reviewsPerPage = 5; // Set the number of reviews per page

    useEffect(() => {
        if (!productId) {
            setError('Product ID is missing.');
            setLoading(false);
            return;
        }

        // Fetch reviews from the API using Axios
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://our-bag-server.onrender.com/api/v1/review/${productId}`,
                    {
                        params: { page: currentPage, limit: reviewsPerPage },
                    }
                );

                console.log(response.data); // Inspect the structure of the response

                // Check if the data is available
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setReviews(response.data.data); // Reviews data is now directly accessible
                    setTotalReviews(response.data.data.length); // Set the total number of reviews
                } else {
                    setError('No reviews available for this product.');
                }
            } catch (err) {
                setError('Failed to fetch reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        fetchReviews();
    }, [currentPage, productId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <CommonWrapper>
                <div className="mt-10">
                    <div className="pt-5 flex flex-col gap-3">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="flex gap-4">
                                    <img
                                        src={review.userId.avatar || "/src/assets/product-details/person.png"} // Fallback if no avatar
                                        width={100}
                                        height={100}
                                        alt="Customer"
                                    />
                                    <div>
                                        <p className="text-sm text-[#141414]">{review.userId.email}</p>
                                        <div className="flex gap-2">
                                            {Array(5)
                                                .fill(null)
                                                .map((_, index) => (
                                                    <StarFilledIcon
                                                        key={index}
                                                        color={index < review.rating ? '#FF9000' : '#E0E0E0'}
                                                    />
                                                ))}
                                        </div>
                                        <p className="text-xs text-[#5A5C5]">{review.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews found.</p>
                        )}
                    </div>


                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center mt-4">
                        <Pagination
                            total={totalPages} // Total number of pages
                            page={currentPage} // Current page
                            onChange={handlePageChange} // Handle page change
                            showControls
                        />
                    </div>
                </div>
            </CommonWrapper>
        </div>
    );
};

export default Review;
