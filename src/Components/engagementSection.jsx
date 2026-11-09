import React from "react";
import { formatDate } from "@/Lib/formatDate";

const ACCENT_UPCOMING = "#2d6a4f";
const ACCENT_PAST = "#1b2a41";

export default function EngagementSection({ engagement, upcoming = false }) {
  const {
    title,
    talkTitle,
    date,
    userGroup,
    location,
    eventPage,
    slides,
    code,
    afterEvent,
  } = engagement;

  const afterEventLinks = [
    { label: "LinkedIn", url: afterEvent?.linkedin },
    { label: "X", url: afterEvent?.x },
    { label: "YouTube", url: afterEvent?.youtube },
  ].filter((link) => link.url);

  const accentColor = upcoming ? ACCENT_UPCOMING : ACCENT_PAST;
  const hasResources = slides || code || afterEventLinks.length > 0;

  const openEventPage = () => window.open(eventPage, "_blank", "noopener,noreferrer");

  return (
    <div
      onClick={openEventPage}
      style={{
      background: "#ffffff",
          borderRadius: "14px",
          boxShadow: "0 2px 12px rgba(27,42,65,0.07)",
          borderLeft: `4px solid ${accentColor}`,
          padding: "1.25em 1.5em",
          marginBottom: 0,
          cursor: "pointer",
          transition: "box-shadow 0.15s",
          width: "100%",
          display: "flex",
          flexDirection: "column",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(27,42,65,0.14)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,42,65,0.07)")}
    >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1em",
            flexWrap: "wrap",
            marginBottom: "0.35em",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#1b2a41",
              lineHeight: 1.35,
            }}
          >
            {title}
          </h2>
          {upcoming && (
            <span
              className="rsvp-badge"
              style={{
                display: "inline-block",
                padding: "0.25em 0.9em",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                background: "#2d6a4f",
                color: "#ffffff",
                whiteSpace: "nowrap",
                alignSelf: "flex-start",
              }}
            >
              RSVP NOW
            </span>
          )}
        </div>

        {/* TODO: add talkTitle to each entry in engagements.json */}
        {talkTitle && (
          <p style={{ margin: "0 0 0.35em", fontSize: "0.95rem", color: "#1b2a41" }}>
            {talkTitle}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.25em 1.5em",
            marginBottom: 0,
          }}
        >
          {date && (
            <span style={{ fontSize: "0.9rem", color: "#4b5563", fontWeight: 500 }}>
              {formatDate(date)}
            </span>
          )}
          <span style={{ fontSize: "0.9rem", color: "#4b5563", fontWeight: 500 }}>
            By {userGroup.name}
          </span>
          <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            @ {location.name}
          </span>
        </div>

        {hasResources && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em", alignItems: "center", marginTop: "auto", paddingTop: "1em" }}>
            {slides && (
              <a
                href={slides}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "32px",
                  padding: "0 0.75em",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: "#1b2a41",
                  color: "#f1f2ee",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Slides
              </a>
            )}
            {code && (
              <a
                href={code}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "32px",
                  padding: "0 0.75em",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: "#1b2a41",
                  color: "#f1f2ee",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Code
              </a>
            )}
            {afterEventLinks.map(({ label, url }) => {
              const hostname = new URL(url).hostname;
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "999px",
                    background: "#f3f4f6",
                    overflow: "hidden",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${hostname}`}
                    alt={label}
                    style={{ width: "28px", height: "28px", objectFit: "contain" }}
                  />
                </a>
              );
            })}
          </div>
        )}
    </div>
  );
}
