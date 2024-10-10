import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "../CheckOut/CheckOutFrom";

const stripePromise = loadStripe(
  "pk_test_51PQ7GHJBliBBMOOO1LfUKjSh5TvaoypDNPXEUc8q2r7p1a02lvbglInEF97F9SfTaHMCCnrhkIt4meM3jy7pGAbT0046iv1xt3"
);

const Payment = () => {
  return (
    <div className=" w-[90%] mx-auto">
      <h2 className="mt-5 text-3xl my-5 font-bold text-center">Payment</h2>
      <div className="w-full  mx-auto">
        <Elements stripe={stripePromise}>
          <CheckOutFrom />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
