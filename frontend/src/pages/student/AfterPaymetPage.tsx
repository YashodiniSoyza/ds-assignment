import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import correct from "@/assets/images/check-mark.png";
import incorrect from "@/assets/images/incorrect.png";
import PageLoader from "@/components/shared/PageLoader";

const AfterPaymetPage = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user");
  const courseId = queryParams.get("course");
  const courseFee = queryParams.get("price");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordPaymentOnDB = async () => {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create",
        { userId, courseId, courseFee },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.message);
      if (data.status) {
        setLoading(false);
        setSuccess(true);
      }
    };
    recordPaymentOnDB();
  }, []);

  if (userId && courseId && loading) {
    return <PageLoader />;
  }
  return (
    <div className=" my-16 flex items-center justify-center pt-16">
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        {success === false ? (
          <div className="flex flex-col items-center">
            <img src={incorrect} alt="Unsuccessful" className="mb-3" />
            {/* Header */}
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-red-600 dark:text-red-400">
              Payment Unsuccessful !!
            </h5>
            <p className="mb-3 text-center font-normal text-gray-500 dark:text-gray-400">
              Your payment was unsuccessful. Please try again.
            </p>
            {/* Return */}
            <a href="/student/browse">return to home</a>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={correct} alt="Successful" className="mb-3" />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-green-600 dark:text-green-400">
              Payment Successful !!
            </h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Thank you for your payment.
            </p>
            <a href="/student/browse">return to home</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterPaymetPage;
