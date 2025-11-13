// src/app/provider/appointments/page.js
"use client";
import { useState, useEffect } from "react";

export default function ProviderAppointments() {
  const [appointments, setAppointments] = useState([]);

  // TODO: Call API to get provider appointments
  useEffect(() => {
    setAppointments([
      {
        id: 1,
        customerName: "Nguyễn Văn A",
        serviceName: "Cắt tóc nam",
        date: "2024-01-15",
        time: "10:00",
        status: "pending",
      },
    ]);
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    // TODO: Call API to update status
    console.log("Update status:", appointmentId, newStatus);
  };

  return (
    <div>
      <h1>Quản lý lịch đặt</h1>

      <div className="appointments-list">
        {appointments.map((apt) => (
          <div key={apt.id} className="appointment-card">
            <h3>{apt.serviceName}</h3>
            <p>Khách hàng: {apt.customerName}</p>
            <p>
              Thời gian: {apt.date} {apt.time}
            </p>
            <p>Trạng thái: {apt.status}</p>

            {apt.status === "pending" && (
              <div>
                <button onClick={() => updateStatus(apt.id, "confirmed")}>
                  Xác nhận
                </button>
                <button onClick={() => updateStatus(apt.id, "cancelled")}>
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
