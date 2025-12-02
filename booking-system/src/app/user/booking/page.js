"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("id");

  // Lấy user từ localStorage (đảm bảo có user đăng nhập)
  const userFromStorage = localStorage.getItem("user");
  if (!userFromStorage) {
    router.push("/login");
    return null;
  }

  const user = JSON.parse(userFromStorage);
  const khachHangId = user.id;
  const so_dien_thoai = user.so_dien_thoai;

  const [service, setService] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    ho_ten: user.name,
    id_khach_hang: khachHangId,
    so_dien_thoai: so_dien_thoai,
    id_chi_tiet_thuong_hieu: serviceId,
    ngay_dat_lich: getTodayString(),
    thoi_gian: "14:00",
    ghi_chu: "",
    paymentMethod: "deposit",
    agreeTerms: false,
    tong_tien_thanh_toan: 0,
    tong_tien_da_tra: 0,
  });

  // Gọi API thật để lấy thông tin dịch vụ
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/chi-tiet-thuong-hieu/get-data-by-id/" +
            serviceId
        );

        if (!response.ok) {
          console.warn("Không thể kết nối API dịch vụ");
          alert("Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.");
          router.push("/");
          return;
        }

        const result = await response.json();

        // Kiểm tra trạng thái trả về từ API
        if (result.status === true && result.data) {
          console.log("Dữ liệu nhận từ API: ", result.data);
          setService(result.data[0]); // 👉 set dữ liệu API vào state
        } else {
          console.warn("Không có dữ liệu cho ID này");
          alert("Dịch vụ không tồn tại hoặc đã bị xóa.");
          router.push("/");
        }
      } catch (err) {
        console.error("Lỗi API:", err);
        alert("Có lỗi xảy ra khi tải thông tin dịch vụ.");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) {
      fetchData();
    } else {
      alert("Không tìm thấy ID dịch vụ.");
      router.push("/");
    }
  }, [serviceId, router]);

  // Tính toán tiền
  const gst = service ? service.don_gia * 0.1 : 0;
  const totalAmount = service ? Number(service.don_gia) + gst : 0;
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
  // Cập nhật giá trị tiền cho booking data
  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      tong_tien_da_tra: finalAmount,
      tong_tien_thanh_toan: totalAmount,
    }));
  }, [finalAmount, totalAmount]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // --- VALIDATION ---
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "ho_ten":
        if (!value || !value.trim()) {
          error = "Vui lòng nhập họ và tên.";
        }
        break;

      case "so_dien_thoai":
        const so_dien_thoaiRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!value || !value.trim()) {
          error = "Vui lòng nhập số điện thoại.";
        } else if (!so_dien_thoaiRegex.test(value)) {
          error = "Số điện thoại không hợp lệ.";
        }
        break;

      case "ngay_dat_lich":
        if (!value) {
          error = "Vui lòng chọn ngày.";
        } else {
          const selectedDate = new Date(value);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);

          if (selectedDate < todayDate) {
            error = "Ngày hẹn không thể chọn trong quá khứ.";
          }
        }
        break;

      case "thoi_gian":
        if (!value) {
          error = "Vui lòng chọn giờ.";
        } else {
          const [hours, minutes] = value.split(":").map(Number);
          if (hours < 8 || hours > 22) {
            error = "Vui lòng đặt lịch trong khung giờ (08:00 - 22:00).";
          } else if (bookingData.ngay_dat_lich) {
            const now = new Date();
            const selectedDateTime = new Date(
              `${bookingData.ngay_dat_lich}T${value}`
            );
            if (selectedDateTime < now) {
              error = "Giờ này đã qua, vui lòng chọn giờ khác.";
            }
          }
        }
        break;

      case "agreeTerms":
        if (!value) {
          error = "Bạn cần đồng ý với điều khoản dịch vụ.";
        }
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate từng field
    newErrors.ho_ten = validateField("ho_ten", bookingData.ho_ten);
    newErrors.so_dien_thoai = validateField(
      "so_dien_thoai",
      bookingData.so_dien_thoai
    );
    newErrors.ngay_dat_lich = validateField(
      "ngay_dat_lich",
      bookingData.ngay_dat_lich
    );
    newErrors.thoi_gian = validateField("thoi_gian", bookingData.thoi_gian);
    newErrors.agreeTerms = validateField("agreeTerms", bookingData.agreeTerms);

    // Kiểm tra xem có lỗi nào không
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key]) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (fieldName, value) => {
    setBookingData({
      ...bookingData,
      [fieldName]: value,
    });

    // Clear error khi user bắt đầu nhập
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!validateForm()) {
      console.log("Form validation failed. Errors:", errors);

      // Scroll to first error
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        const element = document.querySelector(
          `[data-field="${firstErrorField}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          if (firstErrorField !== "agreeTerms") {
            element.querySelector("input")?.focus();
          }
        }
      }

      setIsSubmitting(false);
      return;
    }

    console.log(
      "Form validation passed. Submitting booking data:",
      bookingData
    );

    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/dat-lich/them-moi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (result.status === true) {
          alert(result.message);

          // Lưu thông tin booking vào localStorage để trang checkout/payment sử dụng
          if (bookingData.paymentMethod !== "counter") {
            localStorage.setItem(
              "lastBookingInfo",
              JSON.stringify({
                ...bookingData,
                serviceName: service?.ten_dich_vu,
                serviceImage: service?.hinh_anh,
                depositAmount: depositAmount,
                totalAmount: totalAmount,
              })
            );
          }

          // Redirect theo payment method
          if (bookingData.paymentMethod === "counter") {
            router.push("/user/booking/success");
          } else {
            router.push("/user/checkout");
          }
        } else {
          alert(result.message || "Có lỗi xảy ra khi đặt lịch.");
        }
      } else {
        const errorMsg =
          result.message || `Lỗi ${response.status}: ${response.statusText}`;
        alert(errorMsg);

        // Nếu lỗi 401 (Unauthorized), chuyển về login
        if (response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      }
    } catch (err) {
      console.error("Lỗi gửi dữ liệu:", err);
      alert(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn hủy đặt lịch? Thông tin đã nhập sẽ bị mất."
      )
    ) {
      router.back();
    }
  };

  const handleBackToService = () => {
    router.push(`/services/${serviceId}`);
  };

  if (isLoading) {
    return (
      <MainContent>
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            ...vietnameseFont,
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
              marginBottom: "16px",
            }}
          ></div>
          <p style={{ color: "#6b7280" }}>Đang tải thông tin dịch vụ...</p>

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

  if (!service) {
    return (
      <MainContent>
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            ...vietnameseFont,
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "32px", color: "#dc2626" }}>⚠️</span>
          </div>
          <h3 style={{ color: "#dc2626", marginBottom: "12px" }}>
            Không tìm thấy dịch vụ
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Về trang chủ
          </button>
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
          ...vietnameseFont,
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
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
          >
            {/* Responsive grid cho desktop */}
            <style jsx>{`
              @media (min-width: 1024px) {
                .booking-container {
                  grid-template-columns: 1fr 1fr !important;
                }
              }
            `}</style>
            <div
              className="booking-container"
              style={{
                display: "grid",
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
                    <div data-field="ho_ten">
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
                        value={bookingData.ho_ten}
                        onChange={(e) =>
                          handleFieldChange("ho_ten", e.target.value)
                        }
                        placeholder="Họ tên người đặt lịch"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          border: errors.ho_ten
                            ? "2px solid #dc2626"
                            : "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontFamily: "inherit",
                          transition: "border-color 0.2s ease",
                        }}
                      />
                      {errors.ho_ten && (
                        <div
                          style={{
                            color: "#dc2626",
                            fontSize: "0.75rem",
                            marginTop: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span style={{ fontSize: "14px" }}>⚠</span>
                          {errors.ho_ten}
                        </div>
                      )}
                    </div>

                    {/* Số điện thoại */}
                    <div data-field="so_dien_thoai">
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
                        value={bookingData.so_dien_thoai}
                        onChange={(e) =>
                          handleFieldChange("so_dien_thoai", e.target.value)
                        }
                        placeholder="0912345678"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          border: errors.so_dien_thoai
                            ? "2px solid #dc2626"
                            : "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontFamily: "inherit",
                          transition: "border-color 0.2s ease",
                        }}
                      />
                      {errors.so_dien_thoai && (
                        <div
                          style={{
                            color: "#dc2626",
                            fontSize: "0.75rem",
                            marginTop: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span style={{ fontSize: "14px" }}>⚠</span>
                          {errors.so_dien_thoai}
                        </div>
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
                        value={
                          service.dia_chi_cu_the + ", " + service.tinh_thanh
                        }
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
                        gridTemplateColumns: "1fr",
                        gap: "1rem",
                      }}
                    >
                      {/* Ngày */}
                      <div data-field="ngay_dat_lich">
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
                          value={bookingData.ngay_dat_lich}
                          onChange={(e) =>
                            handleFieldChange("ngay_dat_lich", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "0.875rem",
                            border: errors.ngay_dat_lich
                              ? "2px solid #dc2626"
                              : "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "border-color 0.2s ease",
                          }}
                        />
                        {errors.ngay_dat_lich && (
                          <div
                            style={{
                              color: "#dc2626",
                              fontSize: "0.75rem",
                              marginTop: "4px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>⚠</span>
                            {errors.ngay_dat_lich}
                          </div>
                        )}
                      </div>

                      {/* Giờ */}
                      <div data-field="thoi_gian">
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
                          value={bookingData.thoi_gian}
                          onChange={(e) =>
                            handleFieldChange("thoi_gian", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "0.875rem",
                            border: errors.thoi_gian
                              ? "2px solid #dc2626"
                              : "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "border-color 0.2s ease",
                          }}
                        />
                        {errors.thoi_gian && (
                          <div
                            style={{
                              color: "#dc2626",
                              fontSize: "0.75rem",
                              marginTop: "4px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>⚠</span>
                            {errors.thoi_gian}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tùy chọn thanh toán */}
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
                              handleFieldChange("paymentMethod", e.target.value)
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
                              handleFieldChange("paymentMethod", e.target.value)
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
                              handleFieldChange("paymentMethod", e.target.value)
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
                        value={bookingData.ghi_chu}
                        onChange={(e) =>
                          handleFieldChange("ghi_chu", e.target.value)
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
                    Nhân viên sẽ được phân công xác nhận thời gian đã hẹn để
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
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Giá gốc
                      </span>
                      <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                        {formatCurrency(service.don_gia)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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

                {/* Terms Checkbox với validation */}
                <div data-field="agreeTerms">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: errors.agreeTerms ? "1rem" : "1rem",
                      backgroundColor: errors.agreeTerms
                        ? "#fef2f2"
                        : "#f8fafc",
                      borderRadius: "8px",
                      border: errors.agreeTerms
                        ? "2px solid #dc2626"
                        : "1px solid #e2e8f0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.agreeTerms}
                      onChange={(e) =>
                        handleFieldChange("agreeTerms", e.target.checked)
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
                          color: errors.agreeTerms ? "#dc2626" : "#374151",
                        }}
                      >
                        Tôi đồng ý với điều khoản dịch vụ{" "}
                        <span style={{ color: "red" }}>*</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        Xác nhận thông tin trên là chính xác.
                      </div>
                      {errors.agreeTerms && (
                        <div
                          style={{
                            color: "#dc2626",
                            fontSize: "0.75rem",
                            marginTop: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span style={{ fontSize: "14px" }}>⚠</span>
                          {errors.agreeTerms}
                        </div>
                      )}
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
                    disabled={isSubmitting}
                    style={{
                      padding: "1rem 1.5rem",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#dc2626",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      opacity: isSubmitting ? 0.7 : 1,
                      ...vietnameseFont,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid white",
                            borderTop: "2px solid transparent",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                        Đang xử lý...
                      </>
                    ) : (
                      "Xác nhận đặt lịch"
                    )}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    style={{
                      padding: "1rem 1.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#6b7280",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      opacity: isSubmitting ? 0.7 : 1,
                      ...vietnameseFont,
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = "#f9fafb";
                        e.target.style.borderColor = "#9ca3af";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = "white";
                        e.target.style.borderColor = "#d1d5db";
                      }
                    }}
                  >
                    Hủy
                  </button>
                </div>

                {/* Validation Summary */}
                {Object.keys(errors).some((key) => errors[key]) && (
                  <div
                    style={{
                      backgroundColor: "#fef2f2",
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid #fecaca",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ color: "#dc2626", fontSize: "16px" }}>
                        ⚠
                      </span>
                      <span style={{ color: "#dc2626", fontWeight: "600" }}>
                        Vui lòng kiểm tra lại các trường sau:
                      </span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {errors.ho_ten && (
                        <li style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                          {errors.ho_ten}
                        </li>
                      )}
                      {errors.so_dien_thoai && (
                        <li style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                          {errors.so_dien_thoai}
                        </li>
                      )}
                      {errors.ngay_dat_lich && (
                        <li style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                          {errors.ngay_dat_lich}
                        </li>
                      )}
                      {errors.thoi_gian && (
                        <li style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                          {errors.thoi_gian}
                        </li>
                      )}
                      {errors.agreeTerms && (
                        <li style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                          {errors.agreeTerms}
                        </li>
                      )}
                    </ul>
                  </div>
                )}

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

        @media (min-width: 1024px) {
          .booking-container {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </MainContent>
  );
}
