import { useState, useEffect, useContext } from "react";
import axios from "axios";
import useFetchQuery from "../../hooks/shared/useFetch";
import { AuthContext } from "@/hooks/AuthContextProvider";
import { useParams } from "next/navigation";


const AddReview = ({ userId, productId }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState(null);





    // const { user } = useContext(AuthContext);
    // const userId = user?.userId;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://our-bag-server.onrender.com/api/v1/products/${productId}`);
                setProduct(response.data.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    // console.log(userId, productId, rating, comment, "userid and productId at add review line 6")
    console.log(product, "product in add review line 34")
    // const { data, isLoading, isSuccess, refetch } = useFetchQuery('fgjhghj')

    // Fetch user info (name)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`https://our-bag-server.onrender.com/api/v1/users/${userId}`);
                // User name is fetched and will be used in the request
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        if (userId) fetchUserData();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(""); // Reset the message state

        if (!comment) {
            setMessage("Please fill out the comment.");
            setLoading(false);
            return;
        }

        try {
            // Post the review to the server
            await axios.post(
                "https://our-bag-server.onrender.com/api/v1/review",
                { userId, productId, rating, comment }, // Send userId, productId, rating, and comment
            );

            setMessage("Review added successfully!");
            setComment(""); // Clear the comment input
            setRating(5); // Reset the rating
        } catch (error) {
            setMessage("Failed to add review. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Add a Review</h1>

            <div className="max-w-2xl mx-auto bg-white p-8 ">
                {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">Rating</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num} Star{num > 1 ? "s" : ""}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            rows="4"
                            placeholder="Write your review here..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-lg text-white bg-black rounded-lg transition duration-200 ease-in-out"
                    >
                        {loading ? "Sending..." : "Add Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;
