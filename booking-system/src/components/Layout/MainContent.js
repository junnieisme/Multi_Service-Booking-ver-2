// src/components/Layout/MainContent.js
export default function MainContent({ children, className = "" }) {
  return (
    <main
      style={{
        flex: 1,
        padding: "0",
        marginTop: "80px",
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#f9fafb",
        width: "100%",
        overflow: "auto",
      }}
      className={className}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          minHeight: "100%",
        }}
      >
        {children}
      </div>
    </main>
  );
}
