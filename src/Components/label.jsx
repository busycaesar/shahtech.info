import React from "react";

const TONES = {
  green: { background: "#d1fae5", color: "#065f46" },
  gray: { background: "#e5e7eb", color: "#374151" },
  navy: { background: "#dbe4f0", color: "#1b2a41" },
};

// Small pill used to title a group inside a section.
export default function Label({ tone = "navy", children }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "0.25em 0.75em",
        borderRadius: "999px",
        marginBottom: "0.75em",
        ...TONES[tone],
      }}
    >
      {children}
    </span>
  );
}
