/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@/Components/card";

export default function Certificates({ certificates }) {
  return (
    <div id="certificates" className="content-section">
      <h1>
        <strong>CERTIFICATES</strong>
      </h1>
      <Row className="align-items-stretch">
        {certificates.map((cert) => (
          <Col key={cert.verifyUrl} lg={4} md={6} sm={12} className="mb-3 d-flex">
            <Card href={cert.verifyUrl}>
              <div style={{ display: "flex", gap: "0.9em", alignItems: "flex-start" }}>
                {cert.issuer && (
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${cert.issuer.domain}`}
                    alt=""
                    style={{ width: "32px", height: "32px", flexShrink: 0, borderRadius: "6px" }}
                  />
                )}
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.35 }}>
                    {cert.name}
                  </h2>
                  {cert.issuer && (
                    <p style={{ margin: "0.3em 0 0", fontSize: "0.85rem", color: "#6b7280" }}>
                      {cert.issuer.name}
                    </p>
                  )}
                </div>
              </div>
              <span
                style={{
                  marginTop: "auto",
                  paddingTop: "1em",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#1b2a41",
                }}
              >
                Verify certificate
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
