import React, { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/utility/Navbar";
import Breadcrumb from "../../components/utility/Breadcrumbs";
import BackButton from "../../components/utility/BackButton";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("01");
  const [expiryYear, setExpiryYear] = useState("2024");
  const [securityCode, setSecurityCode] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const appointmentId = location.state?.appointmentId;
  const price = location.state?.price;

  const handlePayment = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date();
    const paymentData = {
      paymentMethod,
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      securityCode,
      paymentDate: currentDateTime.toISOString(),
      appointmentId,
      price,
    };

    console.log("Payment Data:", paymentData);

    try {
      setLoading(true);
      const response = await fetch(
        "https://carenet-vercel.vercel.app/paymentRoute/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar("Payment successful!", { variant: "success" });
      } else {
        enqueueSnackbar(`Error: ${data.message}`, { variant: "error" });
      }
    } catch (error) {
      console.error("Payment Error:", error);
      enqueueSnackbar("An error occurred during payment.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [{ name: "Patient Details", href: "/patients/home" }];

  return (
    <SnackbarProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="flex flex-1">
          <div className="hidden sm:block w-1/6 md:w-1/5 lg:w-1/4">
            <SideBar />
          </div>
          <div className="w-full">
            <div className="flex flex-row items-center mb-0">
              <BackButton />
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="min-w-screen min-h-screen justify-center px-5 pt-0 border-black">
              <div
                className="w-full mx-auto rounded-lg bg-white border-black shadow-lg p-5"
                style={{
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="mb-8">
                  <h1 className="text-center font-bold text-xl uppercase">
                    Secure Payment Info
                  </h1>
                </div>

                {/* Display appointmentId and price */}
                <div className="mb-5">
                  <div className="flex flex-col mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Appointment ID
                    </label>
                    <input
                      type="text"
                      value={appointmentId}
                      readOnly
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-gray-100"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">Price</label>
                    <input
                      type="text"
                      value={`Rs.${price}`}
                      readOnly
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-gray-100"
                    />
                  </div>
                </div>

                <form onSubmit={handlePayment}>
                  {/* Existing Payment Form Structure */}
                  {/* Payment Method Selection */}
                  <div className="mb-5">
                    <h2 className="font-bold text-sm mb-2 ml-1">
                      Payment Method
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="credit"
                          checked={paymentMethod === "credit"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Credit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        PayPal
                      </label>
                    </div>
                  </div>

                  {/* Name on Card */}
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Name on Card
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="John Smith"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Card Number */}
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Card Number
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>

                  {/* Expiration Date */}
                  <div className="mb-3 -mx-2 flex items-end">
                    <div className="px-2 w-1/2">
                      <label className="font-bold text-sm mb-2 ml-1">
                        Expiration Date
                      </label>
                      <select
                        className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        required
                      >
                        {[...Array(12)].map((_, index) => (
                          <option
                            key={index}
                            value={String(index + 1).padStart(2, "0")}
                          >
                            {String(index + 1).padStart(2, "0")} -{" "}
                            {new Date(0, index).toLocaleString("default", {
                              month: "long",
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="px-2 w-1/2">
                      <select
                        className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        required
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index} value={2024 + index}>
                            {2024 + index}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Security Code */}
                  <div className="mb-5">
                    <label className="font-bold text-sm mb-0 ml-1">
                      Security Code
                    </label>
                    <input
                      className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="000"
                      type="text"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      required
                    />
                  </div>

                  {/* Payment Button */}
                  <div>
                    <button
                      type="submit"
                      className="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-4 py-3 font-semibold transition duration-300"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "PAY NOW"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default PaymentPage;
