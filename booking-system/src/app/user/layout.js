import Header from "@/components/Layout/Header";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {children}
    </div>
  );
}
