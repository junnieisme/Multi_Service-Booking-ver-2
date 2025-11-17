"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const info = localStorage.getItem("paymentInfo");
    if (info) {
      try {
        setPaymentInfo(JSON.parse(info));
      } catch (error) {
        console.error("Error parsing paymentInfo:", error);
        alert("Thông tin thanh toán không hợp lệ, đang quay về trang chủ.");
        router.push("/");
      }
    } else {
      alert("Không tìm thấy thông tin thanh toán, đang quay về trang chủ.");
      router.push("/");
    }
  }, [router]);

  const handlePayment = (method = "test") => {
    if (!selectedMethod && method === "test") {
      setSelectedMethod("test");
    }

    setIsProcessing(true);

    // Mô phỏng xử lý thanh toán
    setTimeout(() => {
      console.log(`Xử lý thanh toán ${method} cho:`, paymentInfo);

      // Tạo bookingInfo hoàn chỉnh
      const bookingInfo = {
        ...paymentInfo,
        paymentMethod: method === "counter" ? "counter" : "online",
        bookingId: `BK${Date.now()}`,
        bookingDate: new Date().toISOString(),
      };

      // Lưu bookingInfo để trang success đọc
      try {
        localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        alert("Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại.");
        setIsProcessing(false);
        return;
      }

      setIsProcessing(false);
      router.push("/user/booking/success");
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "momo",
      name: "Ví MoMo",
      icon: "💜",
      description: "Thanh toán nhanh qua ví MoMo",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      icon: "💙",
      description: "Thanh toán qua ZaloPay",
    },
    {
      id: "test",
      name: "Thanh Toán Demo",
      icon: "🧪",
      description: "Mô phỏng thanh toán thành công",
    },
  ];

  if (!paymentInfo) {
    return (
      <MainContent>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "672px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            ></div>
            <p style={{ color: "#6b7280" }}>Đang tải thông tin thanh toán...</p>
          </div>

          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <div
        style={{
          minHeight: "80vh",
          backgroundColor: "#f9fafb",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <button
              onClick={() => router.back()}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#6b7280",
                background: "none",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                margin: "0 auto 24px",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#374151";
                e.target.style.backgroundColor = "#f3f4f6";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#6b7280";
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ marginRight: "8px" }}>←</span>
              Quay lại
            </button>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "16px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Xác Nhận Thanh Toán
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "18px",
                maxWidth: "672px",
                margin: "0 auto",
              }}
            >
              Hoàn tất đặt lịch bằng cách thanh toán an toàn và bảo mật
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "32px",
            }}
          >
            {/* Order Summary */}
            <div
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#dbeafe",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "12px",
                  }}
                >
                  💳
                </span>
                Thông Tin Đơn Hàng
              </h2>

              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "16px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "18px",
                      }}
                    >
                      {paymentInfo.service?.name || "N/A"}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginTop: "4px",
                      }}
                    >
                      Dịch vụ đặt lịch
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#6b7280",
                        marginTop: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ marginRight: "4px" }}>📅</span>
                      {paymentInfo.date} lúc {paymentInfo.time}
                    </div>
                  </div>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#1f2937",
                      fontSize: "18px",
                    }}
                  >
                    {paymentInfo.totalAmount?.toLocaleString() || "0"} VND
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "18px",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#374151" }}>
                    Tổng tiền:
                  </span>
                  <span style={{ fontWeight: "bold", color: "#1f2937" }}>
                    {paymentInfo.totalAmount?.toLocaleString() || "0"} VND
                  </span>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
                    border: "1px solid #fcd34d",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#dc2626",
                        fontSize: "20px",
                      }}
                    >
                      Số tiền thanh toán:
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#dc2626",
                        fontSize: "24px",
                      }}
                    >
                      {paymentInfo.amount?.toLocaleString() || "0"} VND
                    </span>
                  </div>

                  {paymentInfo.paymentType === "deposit" && (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#374151",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "16px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ marginRight: "4px" }}>⏰</span>
                        Đặt cọc trước
                      </div>
                      <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                        Số tiền còn lại{" "}
                        <span style={{ fontWeight: "600" }}>
                          {paymentInfo.remainingAmount?.toLocaleString() || "0"}{" "}
                          VND
                        </span>{" "}
                        sẽ được thanh toán tại quầy khi sử dụng dịch vụ.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#dcfce7",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "12px",
                  }}
                >
                  🛡️
                </span>
                Phương Thức Thanh Toán
              </h2>

              <div style={{ marginBottom: "32px" }}>
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedMethod(method.id);
                      if (method.id === "test") {
                        handlePayment("test");
                      }
                    }}
                    disabled={isProcessing}
                    style={{
                      width: "100%",
                      padding: "24px",
                      color: "white",
                      borderRadius: "12px",
                      fontWeight: "600",
                      border: "none",
                      cursor: isProcessing ? "not-allowed" : "pointer",
                      opacity: isProcessing ? 0.6 : 1,
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      background:
                        method.id === "momo"
                          ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                          : method.id === "zalopay"
                          ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                          : "linear-gradient(135deg, #6b7280, #4b5563)",
                    }}
                    onMouseOver={(e) => {
                      if (!isProcessing) {
                        e.target.style.transform = "translateY(-3px)";
                        e.target.style.boxShadow =
                          "0 10px 25px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isProcessing) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: "32px", marginRight: "16px" }}>
                        {method.icon}
                      </span>
                      <div style={{ textAlign: "left" }}>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {method.name}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            opacity: 0.9,
                            fontWeight: "normal",
                          }}
                        >
                          {method.description}
                        </div>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Security Notice */}
              <div
                style={{
                  background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                  borderRadius: "12px",
                  padding: "24px",
                  border: "1px solid #a7f3d0",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#dcfce7",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>🛡️</span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "18px",
                        marginBottom: "8px",
                      }}
                    >
                      Bảo mật giao dịch
                    </p>
                    <p
                      style={{
                        color: "#374151",
                        lineHeight: "1.5",
                      }}
                    >
                      Thông tin thanh toán của bạn được bảo mật và mã hóa theo
                      tiêu chuẩn PCI DSS. Chúng tôi không lưu trữ thông tin thẻ
                      ngân hàng của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Overlay */}
          {isProcessing && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "32px",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                  maxWidth: "400px",
                  width: "90%",
                  margin: "16px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    border: "4px solid #e5e7eb",
                    borderTop: "4px solid #2563eb",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 16px",
                  }}
                ></div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "8px",
                  }}
                >
                  Đang xử lý thanh toán...
                </h3>
                <p style={{ color: "#6b7280", marginBottom: "16px" }}>
                  Vui lòng không đóng trang này
                </p>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "9999px",
                    height: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#2563eb",
                      height: "8px",
                      borderRadius: "9999px",
                      animation: "pulse 2s infinite",
                    }}
                  ></div>
                </div>
              </div>

              <style jsx>{`
                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
                @keyframes pulse {
                  0%,
                  100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.5;
                  }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </MainContent>
  );
}
