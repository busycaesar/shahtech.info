import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ProjectSection from "@/Components/projectSection";
import { getPinnedRepos } from "@/Lib";

// Shows the repos pinned on the GitHub profile, so pinning a repo updates the site.
export default function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getPinnedRepos()
      .then((data) => setProjects(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div id="projects" className="content-section">
      <h1>
        <strong>PROJECTS</strong>
      </h1>
      <Row className="align-items-stretch">
        {projects.map((project) => (
          <Col key={project.url} lg={4} md={6} sm={12} className="mb-3 d-flex">
            <ProjectSection {...project} />
          </Col>
        ))}
      </Row>
      <div>
        <a href="https://github.com/busycaesar?tab=repositories" target="_blank" rel="noopener noreferrer">
          <Button variant="dark" className="!text-lg my-2">
            All repos on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
}
