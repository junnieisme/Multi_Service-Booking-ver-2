// src/app/provider/services/page.js
"use client";
import { useState, useEffect } from "react";

export default function ProviderServices() {
  const [services, setServices] = useState([]);

  // TODO: Call API to get provider services
  useEffect(() => {
    setServices([
      {
        id: 1,
        name: "Cắt tóc nam",
        price: 80000,
        duration: 45,
        category: "Làm đẹp",
        status: "active",
      },
    ]);
  }, []);

  const addService = () => {
    // TODO: Implement add service
    window.location.href = "/provider/services/create";
  };

  return (
    <div>
      <div className="header">
        <h1>Dịch vụ của tôi</h1>
        <button onClick={addService}>+ Thêm dịch vụ</button>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>Giá: {service.price.toLocaleString()} VND</p>
            <p>Thời gian: {service.duration} phút</p>
            <button>Chỉnh sửa</button>
          </div>
        ))}
      </div>
    </div>
  );
}
