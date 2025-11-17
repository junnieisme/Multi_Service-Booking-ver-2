"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import Header from "../../components/Layout/Header"; // Tạm comment lại
import { Star, MapPin, Clock } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Khi có API thực tế, sẽ gọi API search ở đây
  useEffect(() => {
    if (query) {
      setLoading(true);
      // TODO: Gọi API search thực tế
      // fetch(`/api/search?q=${query}`)
      //   .then(res => res.json())
      //   .then(data => setServices(data))
      //   .finally(() => setLoading(false));

      // Tạm thời set empty array và không loading
      setServices([]);
      setLoading(false);
    }
  }, [query]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Component Header tạm thời
  const SimpleHeader = () => (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          ServiceHub
        </h1>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {query ? `Kết quả tìm kiếm cho "${query}"` : "Tìm kiếm dịch vụ"}
            </h1>
            <p className="text-gray-600">
              {services.length} dịch vụ được tìm thấy
            </p>
          </div>

          {/* Services Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🔧</div>
                        <span className="text-gray-600 text-sm">
                          Hình ảnh dịch vụ
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {service.name}
                        </h3>
                        <span className="text-green-600 font-bold">
                          {formatPrice(service.price)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {service.provider}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{service.rating}</span>
                          <span>({service.reviewCount})</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{service.location}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {service.category}
                        </span>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Đặt ngay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
