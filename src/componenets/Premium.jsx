import axios from "axios";
import { BASE_URI, BASE_URL } from "../constants";
import useProfile from "../store/User";
import { useEffect } from "react";

const Premium = () => {
  const userData = useProfile((state) => state.userData);
  const setData = useProfile((state) => state.setData);
  const getProfile = async () => {
    const data = await axios.get(BASE_URL + "/profile", {
      withCredentials: true,
    });
    setData(data.data.data);
  };
  console.log(userData);

  const handleBuyClick = async () => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {},
      {
        withCredentials: true,
      },
    );
    const { keyId, amount, currency, notes, orderId } = order.data;

    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits.
      currency: currency,
      name: "UNOTIFY",
      description: "Be the Top 1%",
      order_id: orderId,
      callback_url: "https://unotify.tanishqsaxena.xyz/payment-success", // Your success URL
      prefill: {
        name: notes.name,
        email: notes.email,
        contact: "9354365302",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-bold mb-1">Premium</h2>
        <p className="text-sm opacity-80 mb-4">Unlock all features</p>

        <div className="text-4xl font-extrabold mb-4">
          ₹100 <span className="text-lg font-medium">/month</span>
        </div>

        <ul className="space-y-2 mb-6">
          <li>✅ Unlimited Notes Generation</li>
          <li>✅ Faster AI Processing</li>
          <li>✅ Priority Support</li>
          <li>✅ No Ads</li>
        </ul>

        <button
          onClick={() => handleBuyClick()}
          className="w-full bg-white text-purple-700 font-semibold py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Upgrade Now 🚀
        </button>
      </div>
    </div>
  );
};

export default Premium;
