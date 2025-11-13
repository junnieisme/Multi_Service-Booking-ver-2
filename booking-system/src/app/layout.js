// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Hệ thống Đặt lịch Đa dịch vụ",
  description: "Đặt lịch dịch vụ nhanh chóng và tiện lợi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#f9fafb",
        }}
      >
        {children}
      </body>
    </html>
  );
}
