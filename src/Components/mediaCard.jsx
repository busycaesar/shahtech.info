/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Card from "./card";

// Card with a cover image on top. If the image fails, a plain navy block stays.
export default function MediaCard({ href, image, aspect = "2 / 1", badge, children }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Card href={href} padded={false}>
      <div
        style={{
          position: "relative",
          aspectRatio: aspect,
          flexShrink: 0,
          background: "#1b2a41",
          overflow: "hidden",
        }}
      >
        {image && !imageFailed && (
          <img
            src={image}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {badge && (
          <span
            style={{
              position: "absolute",
              top: "0.6em",
              left: "0.6em",
              padding: "0.25em 0.9em",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              background: "#2d6a4f",
              color: "#ffffff",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        style={{
          padding: "0.75em 1em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {children}
      </div>
    </Card>
  );
}

export function CardTitle({ children, lines = 3 }) {
  return (
    <p
      style={{
        margin: 0,
        fontWeight: 600,
        fontSize: "0.95rem",
        color: "#1b2a41",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
      }}
    >
      {children}
    </p>
  );
}

export function CardMeta({ children }) {
  return (
    <div style={{ margin: "0.5em 0 0", fontSize: "0.78rem", color: "#6b7280" }}>
      {children}
    </div>
  );
}
