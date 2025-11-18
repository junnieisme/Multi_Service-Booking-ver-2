"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("id");

  const [service, setService] = useState(null);
  const [errors, setErrors] = useState({});

  // Font chữ chuẩn cho Tiếng Việt
  const vietnameseFont = {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  };

  // Hàm lấy ngày hiện tại format YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    address: "",
    date: getTodayString(),
    time: "14:00",
    notes: "",
    paymentMethod: "deposit",
    agreeTerms: false,
  });

  // Mock data
  const servicesData = {
    1: {
      id: 1,
      loai_dich_vu: "Lưu trú",
      ten_thuong_hieu: "InterContinental Danang",
      ten_dich_vu: "Combo resort cho 3 ngày 2 đêm và nhiều tiện ích khác",
      hinh_anh:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/43859674.jpg?k=04578449670209583432815834e3761046669662656640161662653705512240&o=&hp=1",
      tinh_thanh: "Đà Nẵng",
      dia_chi_cu_the: "Bãi Bắc bán đảo Sơn Trà",
      gia: 5000000,
      thoi_gian: "Check-in 14:00",
    },
    2: {
      id: 2,
      loai_dich_vu: "Ẩm thực",
      ten_thuong_hieu: "Madame Lan Restaurant",
      ten_dich_vu: "Set menu đặc sản miền Trung cho gia đình",
      hinh_anh:
        "https://dulichkhampha24.com/wp-content/uploads/2020/01/nha-hang-madame-lan-da-nang-1.jpg",
      tinh_thanh: "Đà Nẵng",
      dia_chi_cu_the: "04 Bạch Đằng, Hải Châu",
      gia: 300000,
      thoi_gian: "2 giờ",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const serviceData = servicesData[serviceId];
      if (serviceData) {
        setService(serviceData);
        setBookingData((prev) => ({
          ...prev,
          address: `${serviceData.dia_chi_cu_the}, ${serviceData.tinh_thanh}`,
        }));
      }
    }, 500);
  }, [serviceId]);

  // Tính toán tiền
  const gst = service ? service.gia * 0.1 : 0;
  const totalAmount = service ? service.gia + gst : 0;
  const depositAmount = service ? totalAmount * 0.3 : 0;

  const getFinalAmount = () => {
    switch (bookingData.paymentMethod) {
      case "deposit":
        return depositAmount;
      case "counter":
        return 0;
      case "full":
      default:
        return totalAmount;
    }
  };

  const finalAmount = getFinalAmount();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // --- VALIDATION ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!bookingData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên.";
      isValid = false;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!bookingData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
      isValid = false;
    } else if (!phoneRegex.test(bookingData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
      isValid = false;
    }

    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.date = "Ngày hẹn không hợp lệ.";
      isValid = false;
    }

    if (!bookingData.agreeTerms) {
      alert("Bạn cần đồng ý với điều khoản dịch vụ.");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (bookingData.paymentMethod === "counter") {
        router.push("/user/booking/success");
      } else {
        router.push("/user/checkout");
      }
    }
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
        <div
          style={{ textAlign: "center", padding: "4rem", ...vietnameseFont }}
        >
          <div style={{ fontSize: "2rem" }}>⏳</div>
          <p>Đang tải thông tin dịch vụ...</p>
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "2rem",
          ...vietnameseFont, // Áp dụng font chữ tiếng Việt
        }}
      >
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
              ...vietnameseFont,
            }}
          >
            ← Quay lại xem chi tiết
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
              Vui lòng điền thông tin chính xác để chúng tôi phục vụ tốt nhất
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
              {/* Service Information */}
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
                  Dịch vụ đã chọn
                </h3>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={service.hinh_anh}
                      alt="Service"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        lineHeight: "1.3",
                        marginBottom: "4px",
                      }}
                    >
                      {service.ten_dich_vu}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#6b7280",
                        fontWeight: "500",
                      }}
                    >
                      {service.ten_thuong_hieu}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Form */}
              <div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1.5rem",
                  }}
                >
                  Thông tin cá nhân
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {/* Họ tên */}
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
                      Họ và tên <span style={{ color: "red" }}>*</span>
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
                      placeholder="Nguyễn Văn A"
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: errors.fullName
                          ? "1px solid red"
                          : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontFamily: "inherit",
                      }}
                    />
                    {errors.fullName && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "0.75rem",
                          marginTop: "4px",
                        }}
                      >
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Số điện thoại */}
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
                      Số điện thoại <span style={{ color: "red" }}>*</span>
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
                      placeholder="0912345678"
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: errors.phone
                          ? "1px solid red"
                          : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontFamily: "inherit",
                      }}
                    />
                    {errors.phone && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "0.75rem",
                          marginTop: "4px",
                        }}
                      >
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Địa chỉ liên hệ (READ ONLY) */}
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
                      Địa điểm sử dụng dịch vụ (Mặc định)
                    </label>
                    <input
                      type="text"
                      value={bookingData.address}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        backgroundColor: "#f3f4f6",
                        color: "#6b7280",
                        cursor: "not-allowed",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  {/* Ngày và Giờ hẹn */}
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
                        Ngày nhận phòng/dùng bữa{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="date"
                        min={getTodayString()}
                        value={bookingData.date}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            date: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          border: errors.date
                            ? "1px solid red"
                            : "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      />
                      {errors.date && (
                        <span
                          style={{
                            color: "red",
                            fontSize: "0.75rem",
                            marginTop: "4px",
                          }}
                        >
                          {errors.date}
                        </span>
                      )}
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
                        Giờ hẹn <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="time"
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
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

                  {/* --- ĐẨY LÊN ĐÂY: TÙY CHỌN THANH TOÁN --- */}
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
                      Tùy chọn thanh toán{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Option 1: Cọc */}
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
                          style={{ width: "18px", height: "18px" }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "#1f2937",
                            }}
                          >
                            Đặt cọc 30%
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Thanh toán trước {formatCurrency(depositAmount)}
                          </div>
                        </div>
                      </label>

                      {/* Option 2: Full */}
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
                          style={{ width: "18px", height: "18px" }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "#1f2937",
                            }}
                          >
                            Thanh toán hết
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Thanh toán 100% giá trị đơn hàng
                          </div>
                        </div>
                      </label>

                      {/* Option 3: Counter */}
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
                          style={{ width: "18px", height: "18px" }}
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
                            Thanh toán tại quầy/resort
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Ghi chú */}
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
                      Ghi chú thêm
                    </label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Yêu cầu đặc biệt (nếu có)..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        resize: "vertical",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Review & Confirmation */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {/* Xác nhận đặt lịch */}
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
                    margin: 0,
                  }}
                >
                  Nhân viên sẽ được phân công 1 giờ trước thời gian đã hẹn để
                  phục vụ bạn tốt nhất.
                </p>
              </div>

              {/* Tổng thanh toán */}
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
                  Chi phí
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
                      Giá gốc
                    </span>
                    <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                      {formatCurrency(service.gia)}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      VAT (10%)
                    </span>
                    <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                      {formatCurrency(gst)}
                    </span>
                  </div>

                  <div
                    style={{
                      borderTop: "1px dashed #e5e7eb",
                      margin: "0.5rem 0",
                    }}
                  ></div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                      }}
                    >
                      {bookingData.paymentMethod === "counter"
                        ? "Tổng tiền (trả sau)"
                        : "Cần thanh toán ngay"}
                    </span>
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#dc2626",
                      }}
                    >
                      {formatCurrency(finalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
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
                    marginTop: "2px",
                    cursor: "pointer",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Tôi đồng ý với điều khoản dịch vụ
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    Xác nhận thông tin trên là chính xác.
                  </div>
                </div>
              </div>

              {/* Buttons */}
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
                    ...vietnameseFont,
                  }}
                >
                  Xác nhận đặt lịch
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
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    ...vietnameseFont,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f9fafb";
                    e.target.style.borderColor = "#9ca3af";
                  }}
                  onMouseOut={(e) => {
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
                    margin: 0,
                  }}
                >
                  Yêu cầu của bạn đủ điều kiện cho{" "}
                  <strong>Chương trình Bảo hiểm ServiceHub</strong>
                </p>
              </div>

              {/* Help Section */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
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
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
