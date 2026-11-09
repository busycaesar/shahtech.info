import React, { useEffect, useState } from "react";
import { getEngagements } from "@/Lib";
import EngagementSection from "@/Components/engagementSection";
import Label from "@/Components/label";
import { Row, Col } from "react-bootstrap";

const byDate = (a, b) => (a.date || "").localeCompare(b.date || "");

function EngagementGrid({ engagements, upcoming }) {
  return (
    <Row className="align-items-stretch">
      {engagements.map((engagement) => (
        <Col
          key={`${engagement.title}-${engagement.date}`}
          lg={4}
          md={6}
          sm={12}
          className="mb-3 d-flex"
        >
          <EngagementSection engagement={engagement} upcoming={upcoming} />
        </Col>
      ))}
    </Row>
  );
}

export default function Speaking() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    getEngagements()
      .then((data) => {
        if (!Array.isArray(data)) return;
        // Upcoming: next event first. Past: most recent first.
        setUpcoming(data.filter((e) => e.status === "upcoming").sort(byDate));
        setPast(data.filter((e) => e.status === "past").sort(byDate).reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="speaking" className="content-section">
      <h1>
        <strong>SPEAKING</strong>
      </h1>

      {upcoming.length > 0 && (
        <div style={{ marginBottom: "2em" }}>
          <Label tone="green">Upcoming</Label>
          <EngagementGrid engagements={upcoming} upcoming />
        </div>
      )}

      {past.length > 0 && (
        <div>
          <Label tone="gray">Past</Label>
          <EngagementGrid engagements={past} />
        </div>
      )}
    </div>
  );
}
