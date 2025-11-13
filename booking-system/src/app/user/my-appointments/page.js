// src/app/user/my-appointments/page.js
"use client";
import { useState, useEffect } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  // TODO: Call API to get user appointments
  useEffect(() => {
    // Mock data
    setAppointments([
      {
        id: 1,
        serviceName: "Cắt tóc nam",
        date: "2024-01-15",
        time: "10:00",
        status: "confirmed",
        provider: "Barber Shop ABC",
        price: 80000,
      },
      {
        id: 2,
        serviceName: "Spa thư giãn",
        date: "2024-01-20",
        time: "14:00",
        status: "pending",
        provider: "Spa XYZ",
        price: 250000,
      },
    ]);
  }, []);

  const cancelAppointment = async (appointmentId) => {
    // TODO: Call API to cancel appointment
    if (confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
      console.log("Cancel appointment:", appointmentId);
      alert("Hủy lịch hẹn thành công!");
    }
  };

  return (
    <div>
      <h1>Lịch hẹn của tôi</h1>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button onClick={() => setFilter("all")}>Tất cả</button>
        <button onClick={() => setFilter("upcoming")}>Sắp tới</button>
        <button onClick={() => setFilter("completed")}>Hoàn thành</button>
        <button onClick={() => setFilter("cancelled")}>Đã hủy</button>
      </div>

      {/* Appointments List */}
      <div className="appointments-list">
        {appointments.map((apt) => (
          <div key={apt.id} className="appointment-card">
            <h3>{apt.serviceName}</h3>
            <p>
              Ngày: {apt.date} | Giờ: {apt.time}
            </p>
            <p>Nhà cung cấp: {apt.provider}</p>
            <p>Trạng thái: {apt.status}</p>
            {apt.status === "pending" && (
              <button onClick={() => cancelAppointment(apt.id)}>
                Hủy lịch
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
