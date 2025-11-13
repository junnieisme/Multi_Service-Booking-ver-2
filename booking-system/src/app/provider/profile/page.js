"use client";
import { useState } from "react";
import MainLayout from "@/components/MainLayout";

export default function BusinessProfilePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleSave = async () => {
    // API Call: PUT /api/provider/profile
  };

  return (
    <MainLayout userRole="provider">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Hồ sơ thương hiệu</h2>
        <div className="bg-white p-6 rounded-lg border space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tên thương hiệu
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Bảo vệ
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
