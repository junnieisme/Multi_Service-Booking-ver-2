// src/app/provider/dashboard/page.js
"use client";

import MainLayout from "@/components/MainLayout";
import { Calendar, DollarSign, Users, TrendingUp } from "lucide-react";

export default function ProviderDashboardPage() {
  // API Call: GET /api/provider/dashboard

  const stats = [
    {
      title: "Réservations aujourd'hui",
      value: "12",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
      change: "+2 depuis hier",
    },
    {
      title: "Revenu ce mois",
      value: "3,450€",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      change: "+15% depuis le mois dernier",
    },
    {
      title: "Clients totaux",
      value: "156",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      change: "+8 nouveaux ce mois",
    },
    {
      title: "Note moyenne",
      value: "4.7",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
      change: "⭐ Sur 120 avis",
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      client: "Marie Dupont",
      service: "Coiffure",
      time: "10:00",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Jean Martin",
      service: "Massage",
      time: "11:30",
      status: "pending",
    },
    {
      id: 3,
      client: "Sophie Leblanc",
      service: "Manucure",
      time: "14:00",
      status: "confirmed",
    },
  ];

  return (
    <MainLayout userRole="provider">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Tableau de bord</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6">
          {/* Upcoming Bookings */}
          <div className="col-span-2 bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">
              Réservations d'aujourd'hui
            </h3>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {booking.client.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{booking.client}</p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{booking.time}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status === "confirmed"
                        ? "Confirmé"
                        : "En attente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Activité récente</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taux de confirmation</span>
                <span className="font-bold text-green-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taux d'annulation</span>
                <span className="font-bold text-red-600">5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Temps de réponse moy.</span>
                <span className="font-bold">2h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            Revenus des 30 derniers jours
          </h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Graphique des revenus (intégrer Chart.js ou Recharts)
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
