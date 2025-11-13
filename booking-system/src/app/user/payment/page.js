// src/app/user/payment/page.js
"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const [paymentMethod, setPaymentMethod] = useState("momo");

  const handlePayment = async () => {
    // TODO: Call payment API
    console.log("Processing payment for:", appointmentId);
    alert("Thanh toán thành công!");
    window.location.href = "/user/my-appointments";
  };

  return (
    <div>
      <h1>Thanh toán</h1>

      <div className="payment-methods">
        <label>
          <input
            type="radio"
            value="momo"
            checked={paymentMethod === "momo"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Ví MoMo
        </label>
        <label>
          <input
            type="radio"
            value="zalopay"
            checked={paymentMethod === "zalopay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          ZaloPay
        </label>
        <label>
          <input
            type="radio"
            value="banking"
            checked={paymentMethod === "banking"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Chuyển khoản ngân hàng
        </label>
      </div>

      <button onClick={handlePayment}>Thanh toán ngay</button>
    </div>
  );
}
