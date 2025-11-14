"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("id");

  const [service, setService] = useState(null);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    address: "Hà Nội",
    date: "06/02/2025",
    time: "14:00",
    notes: "",
    paymentMethod: "full", // 'full', 'deposit', 'counter'
    agreeTerms: false,
  });

  // Mock data for services
  const servicesData = {
    1: {
      id: 1,
      name: "Cắt tóc nam",
      category: "Làm đẹp",
      price: 150000,
      duration: "30 phút",
      image: "✂️",
      provider: "Barber Pro",
      description:
        "Dịch vụ cắt tóc nam chuyên nghiệp với đội ngũ barber giàu kinh nghiệm.",
    },
    2: {
      id: 2,
      name: "Massage thư giãn",
      category: "Sức khỏe",
      price: 300000,
      duration: "60 phút",
      image: "💆",
      provider: "Spa Relax",
      description:
        "Trải nghiệm massage thư giãn tuyệt vời giúp giảm căng thẳng, mệt mỏi.",
    },
  };

  useEffect(() => {
    // Simulate API call to get service details
    setTimeout(() => {
      const serviceData = servicesData[serviceId];
      if (serviceData) {
        setService(serviceData);
      }
    }, 500);
  }, [serviceId]);

  const gst = service ? service.price * 0.1 : 0; // 10% GST
  const totalAmount = service ? service.price + gst : 0;
  const depositAmount = service ? totalAmount * 0.3 : 0; // 30% deposit

  // Calculate final amount based on payment method
  const getFinalAmount = () => {
    switch (bookingData.paymentMethod) {
      case "deposit":
        return depositAmount;
      case "counter":
        return 0; // No payment needed online for counter payment
      case "full":
      default:
        return totalAmount;
    }
  };

  const finalAmount = getFinalAmount();
  const remainingAmount = totalAmount - depositAmount;

  const handleSubmit = async () => {
    if (!bookingData.agreeTerms) {
      alert("Vui lòng đồng ý với điều khoản và điều kiện dịch vụ!");
      return;
    }

    // Nếu chọn thanh toán sau, chuyển thẳng đến trang success
    if (bookingData.paymentMethod === "counter") {
      // Lưu thông tin booking vào localStorage hoặc state management
      const bookingInfo = {
        ...bookingData,
        service,
        totalAmount,
        bookingId: `BK${Date.now()}`,
        bookingDate: new Date().toISOString(),
      };
      localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
      router.push("/booking/success");
      return;
    }

    // Nếu chọn cọc hoặc trả hết, chuyển đến trang thanh toán
    const paymentInfo = {
      ...bookingData,
      service,
      amount: finalAmount,
      paymentType: bookingData.paymentMethod === "deposit" ? "deposit" : "full",
      totalAmount,
      depositAmount,
      remainingAmount:
        bookingData.paymentMethod === "deposit" ? remainingAmount : 0,
    };
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    router.push("/payment");
  };

  const handleCancel = () => {
    router.back();
  };

  const handleBackToService = () => {
    router.push(`/services/${serviceId}`);
  };

  if (!service) {
    return (
      <MainContent>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div style={{ fontSize: "2rem" }}>⏳</div>
          <p>Đang tải thông tin dịch vụ...</p>
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={handleBackToService}
            style={{
              background: "none",
              border: "none",
              color: "#6b7280",
              cursor: "pointer",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              padding: "0.5rem 0",
            }}
          >
            ← Quay lại xem chi tiết dịch vụ
          </button>

          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Đặt lịch dịch vụ
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1rem" }}>
              Hoàn thành thông tin để đặt lịch dịch vụ của bạn
            </p>
          </div>
        </div>

        {/* Main Booking Container */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Left Column - Booking Form */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Service Information (Read-only) */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1rem",
                  }}
                >
                  Thông tin dịch vụ
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "8px",
                      padding: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "60px",
                    }}
                  >
                    {service.image}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#1f2937",
                      }}
                    >
                      {service.name}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {service.provider} • {service.duration}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.875rem",
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    {service.name}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1.5rem",
                  }}
                >
                  Thông tin đặt lịch
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        color: "#374151",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={bookingData.fullName}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Nhập họ và tên đầy đủ"
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.outline = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        color: "#374151",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Nhập số điện thoại"
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.outline = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        color: "#374151",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Địa chỉ *
                    </label>
                    <select
                      value={bookingData.address}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          address: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        backgroundColor: "white",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.outline = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP.HCM">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                    </select>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          color: "#374151",
                          marginBottom: "0.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Ngày hẹn *
                      </label>
                      <input
                        type="text"
                        value={bookingData.date}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            date: e.target.value,
                          })
                        }
                        placeholder="DD/MM/YYYY"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#3b82f6";
                          e.target.style.outline = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          color: "#374151",
                          marginBottom: "0.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Giờ hẹn *
                      </label>
                      <select
                        value={bookingData.time}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            time: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          backgroundColor: "white",
                          cursor: "pointer",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#3b82f6";
                          e.target.style.outline = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                        }}
                      >
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                  </div>

                  {/* Tùy chọn thanh toán - 3 radio button chọn 1 */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        color: "#374151",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Tùy chọn thanh toán *
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Cọc 30% */}
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "1rem",
                          border:
                            bookingData.paymentMethod === "deposit"
                              ? "2px solid #3b82f6"
                              : "1px solid #d1d5db",
                          borderRadius: "8px",
                          backgroundColor:
                            bookingData.paymentMethod === "deposit"
                              ? "#f0f9ff"
                              : "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="deposit"
                          checked={bookingData.paymentMethod === "deposit"}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              paymentMethod: e.target.value,
                            })
                          }
                          style={{
                            width: "18px",
                            height: "18px",
                            margin: "0",
                            cursor: "pointer",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "#1f2937",
                            }}
                          >
                            Cọc 30%
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Đặt cọc 30% giá trị đơn hàng (
                            {depositAmount.toLocaleString()} VND)
                          </div>
                        </div>
                      </label>

                      {/* Trả hết */}
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "1rem",
                          border:
                            bookingData.paymentMethod === "full"
                              ? "2px solid #3b82f6"
                              : "1px solid #d1d5db",
                          borderRadius: "8px",
                          backgroundColor:
                            bookingData.paymentMethod === "full"
                              ? "#f0f9ff"
                              : "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="full"
                          checked={bookingData.paymentMethod === "full"}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              paymentMethod: e.target.value,
                            })
                          }
                          style={{
                            width: "18px",
                            height: "18px",
                            margin: "0",
                            cursor: "pointer",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "#1f2937",
                            }}
                          >
                            Trả hết
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Thanh toán 100% giá trị đơn hàng (
                            {totalAmount.toLocaleString()} VND)
                          </div>
                        </div>
                      </label>

                      {/* Thanh toán sau */}
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "1rem",
                          border:
                            bookingData.paymentMethod === "counter"
                              ? "2px solid #3b82f6"
                              : "1px solid #d1d5db",
                          borderRadius: "8px",
                          backgroundColor:
                            bookingData.paymentMethod === "counter"
                              ? "#f0f9ff"
                              : "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="counter"
                          checked={bookingData.paymentMethod === "counter"}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              paymentMethod: e.target.value,
                            })
                          }
                          style={{
                            width: "18px",
                            height: "18px",
                            margin: "0",
                            cursor: "pointer",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "#1f2937",
                            }}
                          >
                            Thanh toán sau
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Thanh toán toàn bộ khi đến sử dụng dịch vụ
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "1rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.agreeTerms}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          agreeTerms: e.target.checked,
                        })
                      }
                      style={{
                        width: "18px",
                        height: "18px",
                        marginTop: "0.125rem",
                        cursor: "pointer",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#374151",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Tôi đồng ý với điều khoản và điều kiện dịch vụ
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        Bằng cách tick vào ô này, bạn xác nhận đã đọc và đồng ý
                        với các điều khoản, điều kiện và chính sách bảo mật của
                        chúng tôi.
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        color: "#374151",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Ghi chú
                    </label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Nhập ghi chú cho dịch vụ (nếu có)..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        resize: "vertical",
                        transition: "border-color 0.2s",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.outline = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment & Confirmation */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {/* Confirmation Message */}
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #bae6fd",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#0369a1",
                    marginBottom: "0.5rem",
                  }}
                >
                  Xác nhận đặt lịch
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#0369a1",
                    lineHeight: "1.5",
                  }}
                >
                  Nhân viên sẽ được phân công 1 giờ trước thời gian đã hẹn
                </p>
              </div>

              {/* ĐIỀU KHOẢN THANH TOÁN - ĐÃ ĐỔI CHỖ LÊN TRÊN */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1rem",
                  }}
                >
                  Điều khoản thanh toán
                </h3>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    lineHeight: "1.5",
                  }}
                >
                  <p style={{ marginBottom: "0.75rem" }}>
                    <strong>1. Thanh toán toàn bộ:</strong> Quý khách sẽ thanh
                    toán 100% giá trị dịch vụ ngay khi đặt lịch.
                  </p>
                  <p style={{ marginBottom: "0.75rem" }}>
                    <strong>2. Đặt cọc 30%:</strong> Quý khách đặt cọc 30% giá
                    trị đơn hàng, số tiền còn lại sẽ thanh toán khi sử dụng dịch
                    vụ.
                  </p>
                  <p style={{ marginBottom: "0.75rem" }}>
                    <strong>3. Thanh toán sau:</strong> Quý khách sẽ thanh toán
                    toàn bộ khi đến sử dụng dịch vụ tại địa điểm.
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    <strong>Lưu ý:</strong> Trong trường hợp hủy lịch, số tiền
                    đặt cọc sẽ không được hoàn lại.
                  </p>
                </div>
              </div>

              {/* TỔNG THANH TOÁN - ĐÃ ĐỔI XUỐNG DƯỚI */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1rem",
                  }}
                >
                  Tổng thanh toán
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Tổng tiền dịch vụ
                    </span>
                    <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                      {service.price.toLocaleString()} VND
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Thuế (VAT 10%)
                    </span>
                    <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                      {gst.toLocaleString()} VND
                    </span>
                  </div>

                  {/* Dynamic payment details based on selected method */}
                  {bookingData.paymentMethod === "deposit" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: "0.5rem",
                          borderTop: "1px dashed #e5e7eb",
                        }}
                      >
                        <span
                          style={{ fontSize: "0.875rem", color: "#6b7280" }}
                        >
                          Đặt cọc (30%)
                        </span>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#dc2626",
                          }}
                        >
                          {depositAmount.toLocaleString()} VND
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          Số tiền còn lại (thanh toán sau)
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {(totalAmount - depositAmount).toLocaleString()} VND
                        </span>
                      </div>
                    </>
                  )}

                  {bookingData.paymentMethod === "counter" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "0.5rem",
                        borderTop: "1px dashed #e5e7eb",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Phương thức thanh toán
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#059669",
                        }}
                      >
                        Thanh toán sau
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "0.75rem",
                      borderTop:
                        bookingData.paymentMethod === "counter"
                          ? "1px dashed #e5e7eb"
                          : "2px solid #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                      }}
                    >
                      {bookingData.paymentMethod === "deposit"
                        ? "Số tiền đặt cọc"
                        : bookingData.paymentMethod === "counter"
                        ? "Số tiền thanh toán sau"
                        : "Số tiền thanh toán"}
                    </span>
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color:
                          bookingData.paymentMethod === "counter"
                            ? "#059669"
                            : "#dc2626",
                      }}
                    >
                      {bookingData.paymentMethod === "counter"
                        ? totalAmount.toLocaleString() + " VND"
                        : finalAmount.toLocaleString() + " VND"}
                    </span>
                  </div>

                  {bookingData.paymentMethod === "counter" && (
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#ecfdf5",
                        borderRadius: "6px",
                        border: "1px solid #a7f3d0",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#065f46",
                          textAlign: "center",
                          lineHeight: "1.4",
                          margin: 0,
                        }}
                      >
                        💳 Bạn sẽ thanh toán toàn bộ số tiền khi đến sử dụng
                        dịch vụ tại địa điểm
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Help Section */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1rem",
                  }}
                >
                  Cần hỗ trợ?
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    lineHeight: "1.5",
                    marginBottom: "1rem",
                  }}
                >
                  Gọi cho chúng tôi trong trường hợp bạn gặp bất kỳ vấn đề gì
                  với dịch vụ của chúng tôi.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>📞</span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#2563eb",
                    }}
                  >
                    1900 1234
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handleSubmit}
                  disabled={!bookingData.agreeTerms}
                  style={{
                    padding: "1rem 1.5rem",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: bookingData.agreeTerms
                      ? "#dc2626"
                      : "#9ca3af",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: bookingData.agreeTerms ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    boxShadow: bookingData.agreeTerms
                      ? "0 2px 4px rgba(220, 38, 38, 0.2)"
                      : "none",
                  }}
                  onMouseOver={(e) => {
                    if (bookingData.agreeTerms) {
                      e.target.style.backgroundColor = "#b91c1c";
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow =
                        "0 4px 8px rgba(220, 38, 38, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (bookingData.agreeTerms) {
                      e.target.style.backgroundColor = "#dc2626";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 2px 4px rgba(220, 38, 38, 0.2)";
                    }
                  }}
                >
                  Đặt lịch
                </button>

                <button
                  onClick={handleCancel}
                  style={{
                    padding: "1rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    color: "#6b7280",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f9fafb";
                    e.target.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.borderColor = "#d1d5db";
                  }}
                >
                  Hủy
                </button>
              </div>

              {/* Insurance Program */}
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #fcd34d",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#92400e",
                    lineHeight: "1.4",
                  }}
                >
                  Yêu cầu của bạn đủ điều kiện cho{" "}
                  <strong>Chương trình Bảo hiểm ServiceHub</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
