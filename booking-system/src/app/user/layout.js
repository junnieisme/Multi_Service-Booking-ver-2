// src/app/user/layout.js
import Header from "@/components/Layout/Header";
import UserSidebar from "@/components/Layout/UserSidebar";

export default function UserLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1, marginTop: "80px" }}>
        <UserSidebar />
        {children}
      </div>
    </div>
  );
}
