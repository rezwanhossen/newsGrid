import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth/useAuth";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../Hook/useAxiosCommon";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckOutFrom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [pro, setpro] = useState(false);
  const [clientSecret, setclientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const axioscommon = useAxiosCommon();
  const price = parseInt(120);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      setclientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setpro(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setpro(false);
      return;
    } else {
      toast.success("Payment successful!");
    }

    const { error: confError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (confError) {
      toast.error(confError.message);
      setpro(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        price: price,
        transactionId: paymentIntent.id,
        date: new Date(),
        email: user?.email,
        name: user?.displayName,
      };

      try {
        await axioscommon.post("/payment", paymentInfo);
        toast.success("Payment data successfully saved on server");
        navigate("/dashbord/addnews");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  backgroundColor: "#F8F9FA",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="w-full py-3 bg-gradient-to-r from-[#004E5B] via-[#007E7E] to-[#3BAFDA] text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
          type="submit"
          disabled={!stripe || !clientSecret || pro}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutFrom;
