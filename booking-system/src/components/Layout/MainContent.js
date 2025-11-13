// src/components/Layout/MainContent.js
export default function MainContent({ children, className = "" }) {
  return (
    <main style={{
      flex: 1,
      padding: "2rem",
      marginLeft: "256px",
      minHeight: "calc(100vh - 80px)", 
      backgroundColor: "#f9fafb"
    }} className={className}>
      {children}
    </main>
  );
}