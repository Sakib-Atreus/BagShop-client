import { useState } from "react";
import CheckOutWrapper from "../../components/checkout/CheckoutWrapper";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import mCard from "../../assets/chekout-image/mCard.png";
import paypal from "../../assets/chekout-image/paypal.png";
import visa from "../../assets/chekout-image/visa.png";
import NewsletterSection from "../../components/closetProducts/NewsletterSection";
import Cookies from "js-cookie";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    saveDetails: false,
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardholderName: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("SSL");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const cardNumberElement = elements.getElement(CardNumberElement);

    // If SSL is selected, create payment method via Stripe
    let paymentMethodId;
    if (paymentMethod === "SSL") {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          address: { line1: formData.address },
        },
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }
      paymentMethodId = paymentMethod.id;
    } else {
      // If On-Arrival is selected, no card details are needed
      paymentMethodId = "On-Arrival"; // Just mark the payment method as On-Arrival
    }

    const response = await fetch(
      "https://our-bag-server.onrender.com/api/v1/user/makeAnOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("user")}`,
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethodId,
          ...formData,
        }),
      }
    );

    const data = await response.json();
    setProcessing(false);

    if (data.success) {
      toast("Payment Done");
    } else {
      toast("Payment Failed");
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cardElementStyles = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontFamily: "Arial, sans-serif",
        padding: "10px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="w-[1920px] bg-white">
      <div className="bg-gradient-to-r from-[#F1FBFF] via-[#F1EDEB] to-[#F8DAB0] h-[437px] flex flex-col items-center justify-center">
        <h1 className="text-[72px] font-bold">Checkout</h1>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Checkout</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <CheckOutWrapper>
        <div className="flex justify-between p-8 mt-14">
          {/* Left side - User Information Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium pb-4">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-xl "
                    placeholder="Sabbir"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium pb-4 ">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-xl"
                    placeholder="Rahman"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium pb-4 pt-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-xl"
                    placeholder="sabbir@example.com"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium pb-4 pt-3">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-xl"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col pb-4 pt-3">
                <label className="font-medium">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-xl"
                  placeholder="sabbir@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium pb-4 pt-3">Town/City *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handlePaymentChange}
                    className="border border-gray-300 p-2 rounded-xl text-[#5A5C5F]"
                    required
                  >
                    <option value="" className="text-[#5A5C5F]">
                      City Name
                    </option>
                    <option value="Dhaka" className="text-[#5A5C5F]">
                      Dhaka
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-medium pb-4 pt-3">
                    State/Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-xl  text-[#5A5C5F]"
                    required
                  >
                    <option value="" className="text-[#5A5C5F]">
                      Country Name
                    </option>
                    <option value="Dhaka" className="text-[#5A5C5F]">
                      Bangladesh
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-medium pb-4 pt-3">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-xl"
                  placeholder="1234"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="saveDetails"
                  checked={formData.saveDetails}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      saveDetails: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <span>Save your details for future order purpose</span>
              </div>
            </div>
          </form>

          {/* Right side - Order Summary and Payment */}
          <div className="w-[35%] h-[872px] bg-white p-6 rounded-lg shadow-md border-1 border-[#D9D9D9]">
            <h2 className="text-xl font-bold mb-4 text-center pt-2">
              Order Summary
            </h2>
            <hr className="mt-10 bg-[#C5C5C5]" />
            <div className="space-y-4 pt-8">
              <div className="flex justify-between">
                <span>Price</span>
                <span>$ 196.34</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>$ 196.34</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$ 196.34</span>
              </div>
              <hr className=" bg-[#C5C5C5]" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$ 196.34</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-16 text-center">Payment</h3>
            <div className="mt-4">
              <label htmlFor="paymentMethod" className="font-medium">
                Select Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-2 p-3 rounded-md border border-gray-300 w-full"
              >
                <option value="SSL">SSL</option>
                <option value="On-Arrival">On-Arrival</option>
              </select>
            </div>

            <hr className=" bg-[#C5C5C5] mt-6" />
            <div className="flex justify-between mt-8 mb-4">
              <span>Credit Card</span>
              <div className="flex space-x-2">
                <img src={visa} alt="Visa" className="w-8 h-8" />
                <img src={mCard} alt="MasterCard" className="w-8 h-8" />
                <img src={paypal} alt="PayPal" className="w-8 h-8" />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {paymentMethod === "SSL" && (
                <div>
                  <div className="space-y-4 mt-10">
                    <div>
                      <label className="font-medium pb-4 pt-3">
                        Card Number *
                      </label>
                      <CardNumberElement options={cardElementStyles} />
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <label className="font-medium pb-4 pt-3">
                          Expiration Date *
                        </label>
                        <CardExpiryElement options={cardElementStyles} />
                      </div>
                      <div>
                        <label className="font-medium pb-4 pt-3">CVC *</label>
                        <CardCvcElement options={cardElementStyles} />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handlePaymentChange}
                      placeholder="Cardholder name"
                      className="border border-gray-300 p-3 rounded-md w-full"
                    />
                  </div>
                </div>
              )}
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={processing || !stripe}
                className="bg-black text-white py-2 px-4 rounded-full w-full mt-10"
              >
                {processing ? "Processing..." : "Place Order Now"}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10">
          <NewsletterSection />
        </div>
      </CheckOutWrapper>
    </div>
  );
};

export default CheckoutForm;
