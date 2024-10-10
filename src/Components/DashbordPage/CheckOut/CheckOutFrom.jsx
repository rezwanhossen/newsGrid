import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
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
  console.log(price);
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data.clientSecret);
      setclientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      console.log("[error]", error);
      toast.error(error.message);
      setpro(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      toast.success("Pay successfully");
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
      console.log(confError);
      toast.error(confError.message);
      setpro(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const paymentinfo = {
        price: price,
        transactionId: paymentIntent.id,
        data: new Date(),
        email: user?.email,
        name: user?.displayName,
      };

      delete paymentinfo._id;

      try {
        await axioscommon.post("/payment", paymentinfo);
        toast.success("succesfully data save on server");
        navigate("/dashbord/addnews");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
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
        <button
          className="btn btn-outline btn-primary my-6"
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
