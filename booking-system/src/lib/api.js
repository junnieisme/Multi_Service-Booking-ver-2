import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
};

// User APIs
export const userAPI = {
  getAppointments: () => api.get("/user/appointments"),
  createAppointment: (appointmentData) =>
    api.post("/user/appointments", appointmentData),
  cancelAppointment: (appointmentId) =>
    api.delete(`/user/appointments/${appointmentId}`),
  getServices: () => api.get("/user/services"),
  getServiceDetails: (serviceId) => api.get(`/user/services/${serviceId}`),
};

// Provider APIs
export const providerAPI = {
  getAppointments: () => api.get("/provider/appointments"),
  updateAppointmentStatus: (appointmentId, status) =>
    api.patch(`/provider/appointments/${appointmentId}`, { status }),
  getServices: () => api.get("/provider/services"),
  createService: (serviceData) => api.post("/provider/services", serviceData),
  updateService: (serviceId, serviceData) =>
    api.put(`/provider/services/${serviceId}`, serviceData),
};

// Payment APIs
export const paymentAPI = {
  createPayment: (paymentData) => api.post("/payments", paymentData),
  confirmPayment: (paymentId) => api.post(`/payments/${paymentId}/confirm`),
};

export default api;
