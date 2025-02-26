
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QrtufChQ6de35ikc8rqZzrkkIekAgVi1l8OxuAM8LCytDFcOUoXoTYcCLfPSEeegjwsuxBFu3HY9V30HY7ypo7900dCQdhRjP");

const Checkout = () => {
 

  return (
    <div>
    <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>

    </div>
    
  );
};

export default Checkout;
