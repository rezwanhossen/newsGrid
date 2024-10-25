import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "../CheckOut/CheckOutFrom";

// Load Stripe public key
const stripePromise = loadStripe(
  "pk_test_51PQ7GHJBliBBMOOO1LfUKjSh5TvaoypDNPXEUc8q2r7p1a02lvbglInEF97F9SfTaHMCCnrhkIt4meM3jy7pGAbT0046iv1xt3"
);

const Payment = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#F5F5F5] text-gray-800">
      {/* Heading */}
      <h2 className="mt-10 text-4xl font-extrabold text-[#004E5B] text-center">
        Secure Payment
      </h2>
      <p className="text-gray-600 mt-3 mb-8 text-center">
        Complete your payment with confidence using our secure gateway.
      </p>

      {/* Payment form container */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-auto transition-all duration-300 transform hover:scale-105">
        <Elements stripe={stripePromise}>
          <CheckOutFrom />
        </Elements>
      </div>

      {/* Information about payment security */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Your payment is protected by{" "}
          <span className="font-bold text-[#007E7E]">256-bit encryption</span> to
          ensure your information is safe.
        </p>
        <p className="mt-2">
          For assistance,{" "}
          <a
            href="/contact"
            className="text-[#3BAFDA] underline hover:text-[#007E7E]"
          >
            contact us
          </a>.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-600 text-center">
        <p>© 2024 News Grid. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Payment;
