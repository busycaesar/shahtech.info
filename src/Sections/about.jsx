/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AboutData } from "@/Data";
import { BIO, getTagline } from "@/Data/content";
import { BUSINESS_CALL_URL, MENTORSHIP_URL, SOCIAL_LINKS } from "@/siteConfig";

const BOOKING_LINKS = [
  { label: "Book mentorship", url: MENTORSHIP_URL },
  { label: "Work with me", url: BUSINESS_CALL_URL },
];

export default function About({ certificateCount }) {
  const [about, setAbout] = useState({});

  useEffect(() => {
    AboutData()
      .then((data) => setAbout(data || {}))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="about" className="content-section">
      <h1 style={{ fontSize: "4em" }}>
        <strong>{(about.name || "Dev J. Shah").toUpperCase()}</strong>
      </h1>
      <h2 style={{ fontSize: "1.6em", fontWeight: 500, marginTop: "0.4em" }}>
        {getTagline(certificateCount)}
      </h2>

      <p style={{ maxWidth: "46em", marginTop: "1em", lineHeight: 1.6 }}>
        {BIO.join(" ")}
      </p>

      <div className="flex flex-wrap gap-3" style={{ marginTop: "1.25em" }}>
        {BOOKING_LINKS.map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="dark" className="!text-xl">
              {label}
            </Button>
          </a>
        ))}
      </div>

      <Row className="text-center flex items-center" style={{ marginTop: "2em" }}>
        {SOCIAL_LINKS.map((link) => {
          const url = new URL(link);
          const username = url.pathname.split("/");
          return (
            <Col
              key={link}
              md={3}
              sm={6}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                boxShadow: "0 2px 12px rgba(27,42,65,0.07)",
                borderLeft: "4px solid #1b2a41",
                margin: "0.5em",
                width: "160px",
                height: "160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "1em 1.25em",
              }}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${url.hostname}`}
                  alt={`Link to Dev's ${url.hostname}`}
                  className="h-10 w-10 rounded-full"
                />
                <div
                  style={{
                    marginTop: "0.6em",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#1b2a41",
                    wordBreak: "break-word",
                  }}
                >
                  {url.hostname}
                  <br />
                  <span style={{ fontWeight: 400, color: "#6b7280" }}>
                    /{username[username.length - 1]}
                  </span>
                </div>
              </a>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
