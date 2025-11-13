// src/app/user/service-details/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ServiceDetails() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id");
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // TODO: Call API to get service details
  useEffect(() => {
    if (serviceId) {
      // Mock data
      setService({
        id: serviceId,
        name: "Cắt tóc nam cao cấp",
        description:
          "Dịch vụ cắt tóc chuyên nghiệp với các barber có tay nghề cao",
        price: 80000,
        duration: 45,
        category: "Làm đẹp",
        provider: {
          name: "Barber Shop ABC",
          address: "123 Nguyễn Huệ, Q1, TP.HCM",
          rating: 4.5,
        },
        availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      });
    }
  }, [serviceId]);

  const handleBook = async () => {
    // TODO: Call API to book appointment
    console.log("Booking:", { serviceId, selectedDate, selectedTime });
    alert("Đặt lịch thành công!");
    window.location.href = "/user/my-appointments";
  };

  return (
    <div>
      {service && (
        <>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
          <p>Giá: {service.price.toLocaleString()} VND</p>
          <p>Thời gian: {service.duration} phút</p>

          {/* Booking Form */}
          <div className="booking-form">
            <h3>Đặt lịch</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Chọn giờ</option>
              {service.availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
            >
              Đặt lịch ngay
            </button>
          </div>
        </>
      )}
    </div>
  );
}
