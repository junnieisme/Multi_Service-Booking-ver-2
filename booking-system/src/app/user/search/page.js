"use client";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { Star, MapPin } from "lucide-react";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  // API Call: GET /api/services/search?q=${query}
  const services = []; // Replace with API data

  return (
    <MainLayout userRole="user">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Kết quả"{query}"</h2>
        <div className="grid grid-cols-3 gap-6">{/* Map services here */}</div>
      </div>
    </MainLayout>
  );
}
