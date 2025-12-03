"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm validate dữ liệu từ API
  const validatePaymentData = (data) => {
    if (!data) {
      return { isValid: false, message: "Không có dữ liệu thanh toán" };
    }

    // Kiểm tra các trường bắt buộc
    const requiredFields = [
      "ten_san_pham",
      "tong_tien_thanh_toan",
      "tong_tien_da_tra",
      "ngay_dat_lich",
      "thoi_gian",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return {
        isValid: false,
        message: `Thiếu thông tin bắt buộc: ${missingFields.join(", ")}`,
      };
    }

    // Kiểm tra kiểu dữ liệu
    if (
      typeof data.tong_tien_thanh_toan !== "number" ||
      data.tong_tien_thanh_toan <= 0
    ) {
      return { isValid: false, message: "Tổng tiền thanh toán không hợp lệ" };
    }

    if (
      typeof data.tong_tien_da_tra !== "number" ||
      data.tong_tien_da_tra < 0
    ) {
      return { isValid: false, message: "Số tiền đã trả không hợp lệ" };
    }

    if (data.tong_tien_da_tra > data.tong_tien_thanh_toan) {
      return {
        isValid: false,
        message: "Số tiền đã trả không được lớn hơn tổng tiền",
      };
    }

    // Kiểm tra ngày đặt lịch
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(data.ngay_dat_lich);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return {
        isValid: false,
        message: "Ngày đặt lịch không hợp lệ (không được ở quá khứ)",
      };
    }

    return { isValid: true, message: "Dữ liệu hợp lệ" };
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Lấy token từ localStorage
        const token =
          localStorage.getItem("authToken") ||
          localStorage.getItem("token") ||
          sessionStorage.getItem("authToken") ||
          sessionStorage.getItem("token");

        if (!token) {
          setError("Vui lòng đăng nhập để tiếp tục thanh toán");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          setIsLoading(false);
          return;
        }

        // Gọi API THẬT từ server của bạn
        const response = await fetch(
          "http://127.0.0.1:8000/api/dat-lich/lich-moi-dat",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Xử lý response
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", response.status, errorText);

          // Xử lý các mã lỗi HTTP
          if (response.status === 401) {
            setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
            localStorage.removeItem("authToken");
            localStorage.removeItem("token");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else if (response.status === 404) {
            setError(
              "Không tìm thấy thông tin thanh toán. Vui lòng đặt lịch trước."
            );
            setTimeout(() => {
              router.push("/user");
            }, 3000);
          } else if (response.status >= 500) {
            setError("Lỗi máy chủ. Vui lòng thử lại sau");
          } else {
            setError(`Lỗi ${response.status}: Không thể kết nối đến hệ thống`);
          }

          setIsLoading(false);
          return;
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status === true && result.data) {
          const validation = validatePaymentData(result.data);

          if (validation.isValid) {
            console.log("Dữ liệu thanh toán hợp lệ:", result.data);
            setPaymentInfo(result.data);
          } else {
            setError(validation.message);
            console.warn("Dữ liệu không hợp lệ:", validation.message);
          }
        } else {
          setError(
            result.message || "Không tìm thấy thông tin thanh toán hợp lệ"
          );

          // Nếu không có booking mới, kiểm tra xem có booking cũ không
          if (result.message && result.message.includes("không có")) {
            setTimeout(() => {
              router.push("/user/my-appointments");
            }, 3000);
          }
        }
      } catch (err) {
        console.error("Lỗi kết nối:", err);

        if (err.name === "TypeError" && err.message.includes("fetch")) {
          setError(
            "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng"
          );
        } else if (err.name === "SyntaxError") {
          setError("Dữ liệu trả về không hợp lệ");
        } else {
          setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [router]);

  const handlePayment = (method = "test") => {
    if (!selectedMethod && method === "test") {
      setSelectedMethod("test");
    }

    // Validate trước khi thanh toán
    if (!paymentInfo) {
      setError("Không có thông tin thanh toán để xử lý");
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Mô phỏng xử lý thanh toán
    setTimeout(() => {
      console.log(`Xử lý thanh toán ${method} cho:`, paymentInfo);

      // Tạo bookingInfo hoàn chỉnh
      const bookingInfo = {
        ...paymentInfo,
        paymentMethod: method === "counter" ? "counter" : "online",
        bookingId: `BK${Date.now()}`,
        bookingDate: new Date().toISOString(),
        paymentStatus: method === "test" ? "completed" : "pending",
        transactionId: `TX${Date.now().toString().slice(-8)}`,
      };

      // Lưu bookingInfo để trang success đọc
      try {
        localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
        localStorage.setItem("lastPaymentInfo", JSON.stringify(paymentInfo));
        console.log("Đã lưu thông tin booking:", bookingInfo);

        // Nếu là thanh toán thật, gọi API để xác nhận thanh toán
        if (method !== "test") {
          // Gọi API xác nhận thanh toán thật ở đây
          console.log("Gọi API xác nhận thanh toán thật cho method:", method);
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        setError("Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại.");
        setIsProcessing(false);
        return;
      }

      setIsProcessing(false);

      // Chuyển hướng đến trang thành công
      // if (method === "test") {
      //   // Demo: alert thành công trước khi redirect
      //   alert("Thanh toán demo thành công! Đang chuyển hướng...");
      // }

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

  // Hiển thị loading
  if (isLoading) {
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
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.875rem",
                marginTop: "8px",
              }}
            >
              Kết nối đến máy chủ...
            </p>
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

  // Hiển thị lỗi
  if (error && !paymentInfo) {
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
                width: "64px",
                height: "64px",
                backgroundColor: "#fee2e2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <span style={{ fontSize: "32px", color: "#dc2626" }}>⚠️</span>
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#dc2626",
                marginBottom: "12px",
              }}
            >
              Có lỗi xảy ra
            </h3>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "24px",
                lineHeight: "1.5",
                maxWidth: "500px",
              }}
            >
              {error}
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => router.back()}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e5e7eb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
              >
                Quay lại
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  // Reload lại trang để thử fetch lại
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1d4ed8")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2563eb")
                }
              >
                Thử lại
              </button>
              <button
                onClick={() => router.push("/user/my-appointments")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#059669")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#10b981")
                }
              >
                Xem lịch hẹn
              </button>
            </div>
          </div>
        </div>
      </MainContent>
    );
  }

  // Tính toán các giá trị tiền
  const tong_tien =
    paymentInfo.tong_tien_thanh_toan - paymentInfo.tong_tien_da_tra;
  const phan_tram_thanh_toan =
    paymentInfo.tong_tien_thanh_toan === paymentInfo.tong_tien_da_tra
      ? "100%"
      : `${Math.round(
          (paymentInfo.tong_tien_da_tra / paymentInfo.tong_tien_thanh_toan) *
            100
        )}%`;

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
          {/* Error Banner */}
          {error && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                border: "1px solid #fca5a5",
                borderRadius: "8px",
                padding: "16px 20px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "flex-start",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "#dc2626",
                  marginRight: "12px",
                  marginTop: "2px",
                }}
              >
                ⚠️
              </span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    color: "#dc2626",
                    fontWeight: "500",
                    marginBottom: "4px",
                  }}
                >
                  Thông báo
                </p>
                <p style={{ color: "#7f1d1d", fontSize: "14px" }}>{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#7f1d1d",
                  cursor: "pointer",
                  fontSize: "20px",
                  padding: "0 4px",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#dc2626")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#7f1d1d")}
              >
                ×
              </button>
            </div>
          )}

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
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#374151";
                e.currentTarget.style.backgroundColor = "#f3f4f6";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.backgroundColor = "transparent";
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
                      {paymentInfo.ten_san_pham || "N/A"}
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
                      {paymentInfo.ngay_dat_lich} lúc {paymentInfo.thoi_gian}
                    </div>
                  </div>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#1f2937",
                      fontSize: "18px",
                    }}
                  >
                    {paymentInfo.tong_tien_thanh_toan?.toLocaleString() || "0"}{" "}
                    VND
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
                    {paymentInfo.tong_tien_thanh_toan?.toLocaleString() || "0"}{" "}
                    VND
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
                      Số tiền thanh toán:{" "}
                      <span style={{ fontSize: "14px", color: "#92400e" }}>
                        {phan_tram_thanh_toan}
                      </span>
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#dc2626",
                        fontSize: "24px",
                      }}
                    >
                      {paymentInfo.tong_tien_da_tra?.toLocaleString() || "0"}{" "}
                      VND
                    </span>
                  </div>

                  {paymentInfo.tong_tien_da_tra <
                    paymentInfo.tong_tien_thanh_toan && (
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
                        Số tiền còn lại
                      </div>
                      <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                        Số tiền còn lại{" "}
                        <span style={{ fontWeight: "600", color: "#dc2626" }}>
                          {tong_tien.toLocaleString()} VND
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
                      if (error) {
                        setError(
                          "Vui lòng giải quyết vấn đề trước khi thanh toán"
                        );
                        return;
                      }
                      setSelectedMethod(method.id);
                      if (method.id === "test") {
                        handlePayment("test");
                      }
                    }}
                    disabled={isProcessing || !!error}
                    style={{
                      width: "100%",
                      padding: "24px",
                      color: "white",
                      borderRadius: "12px",
                      fontWeight: "600",
                      border: "none",
                      cursor: isProcessing || error ? "not-allowed" : "pointer",
                      opacity: isProcessing || error ? 0.6 : 1,
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
                      if (!isProcessing && !error) {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isProcessing && !error) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
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

          Processing Overlay
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
                animation: "fadeIn 0.3s ease",
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
            </div>
          )}
        </div>
      </div>

      <style>{`
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </MainContent>
  );
}
