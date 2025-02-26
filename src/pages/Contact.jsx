import React from "react";
import MessageSend from "../components/Contact/MessageSend";
import NewsletterSection from "../components/closetProducts/NewsletterSection";
import AddReview from "../components/product-details/AddReview";
import Review from "../components/product-details/Review";

const Contact = () => {
  return (
    <div className="bg-white">
      <MessageSend />
      <NewsletterSection />
    </div>
  );
};

export default Contact;
