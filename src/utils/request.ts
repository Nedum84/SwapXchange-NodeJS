import { ErrorResponse } from "../apiresponse/error.response";
import axios from "axios";
import config from "../config/config";

export const verifyReference = async (reference: string) => {
  try {
    const result = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${config.PAYSTACK_TEST_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result.data);
    console.log(result.headers);
    console.log(result);
    if (!result) {
      throw new ErrorResponse(
        "Payment verification error, try again or contact support"
      );
    }
    if (result.data.data?.status === "success") {
      return true;
    }
    return false;
  } catch (error: any) {
    return false;
    // throw new ErrorResponse(error?.response?.data?.message);
  }
};
