import React from "react";

const SHADOW = "0 2px 12px rgba(27,42,65,0.07)";
const SHADOW_HOVER = "0 4px 20px rgba(27,42,65,0.14)";

// Shared card look: white, rounded, accent bar on the left, lifts on hover.
export default function Card({ href, accent = "#1b2a41", padded = true, children }) {
  const style = {
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: SHADOW,
    borderLeft: `4px solid ${accent}`,
    overflow: "hidden",
    padding: padded ? "1.25em 1.5em" : 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    color: "inherit",
    textDecoration: "none",
    transition: "box-shadow 0.15s, transform 0.15s",
  };

  if (!href) return <div style={style}>{children}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = SHADOW_HOVER;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = SHADOW;
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </a>
  );
}
