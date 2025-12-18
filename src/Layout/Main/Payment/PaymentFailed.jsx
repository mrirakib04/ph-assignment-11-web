import { HeadProvider, Title } from "react-head";
import { useNavigate } from "react-router";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20">
      <HeadProvider>
        <Title>Payment Failed || ScholarStream</Title>
      </HeadProvider>
      <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>

      <p className="mt-2">Your payment was not completed. Status: Unpaid</p>

      <button
        onClick={() => navigate("/")}
        className="btn mt-4 text-white bg-red-600 py-2 px-4 rounded-md hover:bg-red-800 duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default PaymentFailed;
